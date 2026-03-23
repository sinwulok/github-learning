#!/usr/bin/env bash
# 批次把指定 cm* repo 加為 subtree（保留歷史，不 --squash）
# 使用方式:
#   bash add_specific_cm_subtrees_exact.sh        # 預設使用 SSH URLs
#   bash add_specific_cm_subtrees_exact.sh --https  # 使用 HTTPS URLs
set -euo pipefail

USE_HTTPS=false
if [ "${1:-}" = "--https" ]; then
  USE_HTTPS=true
fi

INTEGRATE_BRANCH="subtrees"

# 新增的 repo（把你剛貼出的都放進來）
repos=(
  "sinwulok/react-f7-chatgpt"
)

# 確認在 git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "請在父 repo 資料夾下執行 (git clone ... && cd ...)"
  exit 1
fi

# 建或切到整合分支
if git show-ref --verify --quiet "refs/heads/${INTEGRATE_BRANCH}"; then
  git checkout "${INTEGRATE_BRANCH}"
else
  git checkout -b "${INTEGRATE_BRANCH}"
fi

# 若工作樹沒有 commit（HEAD 無效），提醒建立初始 commit
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "目前沒有任何 commit。請先建立初始 commit，例如："
  echo "  git commit --allow-empty -m \"Initialize cpttm (initial empty commit)\""
  exit 1
fi

count=0
total=${#repos[@]}
for full in "${repos[@]}"; do
  count=$((count+1))
  owner=$(printf '%s' "$full" | cut -d/ -f1)
  name=$(printf '%s' "$full" | cut -d/ -f2)
  echo
  echo "[$count/$total] 處理: $full"

  # 取得 cmNNN 前綴（例如 cm521 -> cm521），若無則用 repo name 的前段作為 parent
  if [[ "$name" =~ ^(cm[0-9]{3,}) ]]; then
    parent="${BASH_REMATCH[1]}"
    short="${name#${parent}-}"   # 若 repo 名為 cm521-xxx，short 會是 xxx
    # 若沒有 dash 後綴，short 就用 repo 名（可能會變成 e.g. cm521ReactNative...）
    if [ -z "$short" ]; then
      short="$name"
    fi
  else
    # 若 repo 名不符合 cmNNN*，則 parent 用 repo 名的前綴 cm-other
    parent="cm-other"
    short="$name"
  fi

  # sanitize shortname
  safe_short=$(printf '%s' "$short" | sed -E 's/[^A-Za-z0-9._-]/-/g')
  prefix="${parent}/${safe_short}"

  # skip if prefix already exists
  if [ -d "$prefix" ]; then
    echo "  已存在目標子資料夾 $prefix，跳過。"
    continue
  fi

  if [ "$USE_HTTPS" = true ]; then
    remote_url="https://github.com/${owner}/${name}.git"
  else
    remote_url="git@github.com:${owner}/${name}.git"
  fi

  remote_name="r_${safe_short}"
  idx=1
  while git remote get-url "$remote_name" >/dev/null 2>&1; do
    remote_name="r_${safe_short}_${idx}"
    idx=$((idx+1))
  done

  echo "  prefix: $prefix"
  echo "  remote: $remote_name -> $remote_url"

  git remote add "$remote_name" "$remote_url" || { echo "  無法新增 remote，跳過 $name"; git remote remove "$remote_name" 2>/dev/null || true; continue; }
  if ! git fetch "$remote_name" --no-tags --quiet; then
    echo "  fetch 失敗 ($remote_url)，已移除 remote，跳過。"
    git remote remove "$remote_name" || true
    continue
  fi

  added=false
  for br in main master; do
    if git ls-remote --exit-code --heads "$remote_name" "$br" >/dev/null 2>&1; then
      echo "  使用分支: $br"
      if git subtree add --prefix="$prefix" "$remote_name" "$br"; then
        echo "  subtree add 成功: $prefix"
        added=true
      else
        echo "  subtree add 失敗: $prefix"
      fi
      break
    fi
  done

  if [ "$added" = false ]; then
    echo "  找不到 main/master 分支或 subtree add 失敗；請手動處理。"
  fi

done

echo
echo "完成。請檢查變更: git status"
echo "如無誤，推送整合分支: git push -u origin ${INTEGRATE_BRANCH}"