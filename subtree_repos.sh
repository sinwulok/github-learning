#!/usr/bin/env bash
# subtree_repos_improved.sh
# 將多個 GitHub repo 加為 git subtree（保留歷史），支援多種選項。
#
# 用法範例：
#   ./subtree_repos_improved.sh                       # 使用內建 repos (ssh)
#   ./subtree_repos_improved.sh --https               # 使用 HTTPS URLs
#   ./subtree_repos_improved.sh --squash              # 使用 --squash（不保留完整歷史）
#   ./subtree_repos_improved.sh --repos-file list.txt # 從檔案讀取 repo（owner/repo 每行一個）
#   ./subtree_repos_improved.sh --dry-run             # 模擬模式，不做實際變更
#
# 選項:
#   --https         使用 HTTPS URL 而非 SSH
#   --squash        對每個 subtree 使用 --squash（單一 commit）
#   --branch <b>    對所有 repo 優先使用指定分支（若存在）
#   --repos-file <file>  從檔案讀取 repo 列表（owner/repo）
#   --dry-run       僅列出將做的事，不實際執行
#
set -euo pipefail

# Defaults
USE_HTTPS=false
USE_SQUASH=false
INTEGRATE_BRANCH="subtrees"
REPOS_FILE=""
DRY_RUN=false
PREFERRED_BRANCH=""

# parse args
while (( "$#" )); do
  case "$1" in
    --https) USE_HTTPS=true; shift ;;
    --squash) USE_SQUASH=true; shift ;;
    --repos-file) REPOS_FILE="${2:-}"; shift 2 ;;
    --branch) PREFERRED_BRANCH="${2:-}"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help)
      cat <<'USAGE'
Usage: subtree_repos_improved.sh [options]

Options:
  --https               Use HTTPS URLs (default SSH)
  --squash              Use git subtree --squash
  --repos-file <file>   Read owner/repo list from file (one per line)
  --branch <branch>     Prefer this branch on each remote if it exists
  --dry-run             Show actions without executing
  -h, --help            Show this help
USAGE
      exit 0
      ;;
    *)
      echo "未知選項: $1" >&2
      exit 1
      ;;
  esac
done

# Default repo list (可自行擴充)
repos=(
  # 如果要加入你先前的 skills repo，也可以：
  "sinwulok/skills-getting-started-with-github-copilot"
  "sinwulok/skills-introduction-to-codeql"
  "sinwulok/skills-connect-the-dots"
  "sinwulok/skills-introduction-to-github"
)

# 如果提供 repos-file，用檔案覆蓋內建
if [ -n "$REPOS_FILE" ]; then
  if [ ! -f "$REPOS_FILE" ]; then
    echo "指定的 repos file 不存在: $REPOS_FILE" >&2
    exit 1
  fi
  mapfile -t repos < <(grep -E -v '^\s*(#|$)' "$REPOS_FILE")
fi

# 檢查是在 git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "請在 monorepo 的根目錄執行 (已 git clone 並 cd 進來)" >&2
  exit 1
fi

# 建或切到整合分支
if git show-ref --verify --quiet "refs/heads/${INTEGRATE_BRANCH}"; then
  echo "切換到既有分支: ${INTEGRATE_BRANCH}"
  if [ "$DRY_RUN" = false ]; then git checkout "${INTEGRATE_BRANCH}"; fi
else
  echo "建立並切換到分支: ${INTEGRATE_BRANCH}"
  if [ "$DRY_RUN" = false ]; then git checkout -b "${INTEGRATE_BRANCH}"; fi
fi

# HEAD 必須有效
if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
  echo "目前沒有任何 commit。請先建立初始 commit��例如："
  echo "  git commit --allow-empty -m \"chore: init monorepo\""
  exit 1
fi

count=0
total=${#repos[@]}

# helper: sanitize path part
sanitize() {
  printf '%s' "$1" | sed -E 's/[^A-Za-z0-9._-]/-/g'
}

# helper: detect branch on remote (prefer PREFERRED_BRANCH if provided)
detect_branch_remote() {
  local remote_url="$1"
  local remote_name="$2"
  # fetch refs (quiet)
  git remote add "$remote_name" "$remote_url" 2>/dev/null || true
  git fetch "$remote_name" --quiet --tags || true
  if [ -n "$PREFERRED_BRANCH" ]; then
    if git ls-remote --exit-code --heads "$remote_name" "$PREFERRED_BRANCH" >/dev/null 2>&1; then
      echo "$PREFERRED_BRANCH"
      return 0
    fi
  fi
  if git ls-remote --exit-code --heads "$remote_name" main >/dev/null 2>&1; then
    echo "main"
    return 0
  fi
  if git ls-remote --exit-code --heads "$remote_name" master >/dev/null 2>&1; then
    echo "master"
    return 0
  fi
  # fallback: first head
  first_head=$(git ls-remote --heads "$remote_name" | awk '{print $2}' | head -n1 | sed 's#refs/heads/##')
  if [ -n "$first_head" ]; then
    echo "$first_head"
  else
    echo ""
  fi
}

for full in "${repos[@]}"; do
  count=$((count+1))
  full=$(printf '%s' "$full" | xargs)   # trim
  if [ -z "$full" ]; then
    continue
  fi
  owner="${full%%/*}"
  name="${full##*/}"
  echo
  echo "[$count/$total] 處理: $full"

  # cmNNN 分群邏輯
  if [[ "$name" =~ ^(cm[0-9]{3,}) ]]; then
    parent="${BASH_REMATCH[1]}"
    short="${name#${parent}-}"
    if [ -z "$short" ]; then short="$name"; fi
  else
    parent="cm-other"
    short="$name"
  fi

  safe_short=$(sanitize "$short")
  prefix="${parent}/${safe_short}"

  if [ -d "$prefix" ]; then
    echo "  已存在目標子資料夾 $prefix，跳過。"
    continue
  fi

  if [ "$USE_HTTPS" = true ]; then
    remote_url="https://github.com/${owner}/${name}.git"
  else
    remote_url="git@github.com:${owner}/${name}.git"
  fi

  # 選擇唯一的 remote 名稱
  base_remote="r_${safe_short}"
  remote_name="$base_remote"
  idx=1
  while git remote get-url "$remote_name" >/dev/null 2>&1; do
    remote_name="${base_remote}_${idx}"
    idx=$((idx+1))
  done

  echo "  prefix: $prefix"
  echo "  remote: $remote_name -> $remote_url"
  echo "  branch preference: ${PREFERRED_BRANCH:-(auto detect)}"
  echo "  options: $( [ "$USE_SQUASH" = true ] && echo "--squash" || echo "--no-squash" ) $( [ "$DRY_RUN" = true ] && echo "(dry-run)" || "" )"

  if [ "$DRY_RUN" = true ]; then
    echo "  [dry-run] would: git remote add $remote_name $remote_url && detect branch && git subtree add --prefix=$prefix $remote_name <branch> ${USE_SQUASH:+--squash}"
    continue
  fi

  # add remote and detect branch
  git remote add "$remote_name" "$remote_url" || { echo "  無法新增 remote，跳過 $name"; git remote remove "$remote_name" 2>/dev/null || true; continue; }
  if ! git fetch "$remote_name" --no-tags --quiet; then
    echo "  fetch 失敗 ($remote_url)，已移除 remote，跳過。"
    git remote remove "$remote_name" || true
    continue
  fi

  branch=$(detect_branch_remote "$remote_url" "$remote_name")
  if [ -z "$branch" ]; then
    echo "  無法偵測任何分支，已移除 remote，跳過。"
    git remote remove "$remote_name" || true
    continue
  fi
  echo "  使用分支: $branch"

  # perform subtree add
  subtree_args=(--prefix="$prefix" "$remote_name" "$branch")
  if [ "$USE_SQUASH" = true ]; then
    subtree_args+=(--squash)
  fi

  if git subtree add "${subtree_args[@]}"; then
    echo "  subtree add 成功: $prefix"
    # create SOURCE.md inside the new subtree (記錄來源)
    timestamp="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
    src_path="$prefix/SOURCE.md"
    cat > "$src_path" <<EOF
Source: $remote_url
Branch: $branch
ImportedAt: $timestamp
ImportedBy: $(git config user.name || echo "unknown")
Notes: imported via subtree_repos_improved.sh
EOF
    git add "$src_path"
    git commit -m "chore(subtree): add SOURCE.md for ${owner}/${name} at ${prefix}" || true
    echo "  已新增 $src_path"
  else
    echo "  subtree add 失敗: $prefix (請查看輸出並手動處理)"
  fi

  # cleanup remote
  git remote remove "$remote_name" || true
done

echo
echo "完成。請檢查變更: git status"
echo "如無誤，請推送整合分支: git push -u origin ${INTEGRATE_BRANCH}"