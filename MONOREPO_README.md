# github-learning (monorepo) — 學習資源總匯

這個 monorepo 用來集中管理 / 保留你從 GitHub Skills、Coursera、Microsoft 等教學自動產生或 clone 的練習專案。  
每個來源 repo 的內容都被搬到 monorepo 的子目錄底下（例如 `copilot/`, `codeql/`），且原始 commit 歷史會保留在該子目錄路徑中。

目錄範例結構
- copilot/                            # 來自 sinwulok/skills-getting-started-with-github-copilot
- codeql/                             # 來自 sinwulok/skills-introduction-to-codeql
- connect-the-dots/                   # 來自 sinwulok/skills-connect-the-dots
- introduction-to-github/             # 來自 sinwulok/skills-introduction-to-github

來源與授權
- 每個子目錄底下保留一個短 README，說明來源 repo（原始 URL）、來源平台（GitHub Skills / Coursera / ...）與是否可公開分享。  
- 保持原始授權資訊（如 LICENSE）在對應子目錄內；如果沒有 LICENSE，則依照來源使用條款處理。

為什麼使用 monorepo？
- 中央化管理與展示學習成果。
- 容易搜尋、統一 README 與 meta 資訊。
- 可以在 monorepo 上做統一 CI、文件或展示 (Pinned)。

維護建議
1. 子目錄命名：使用簡短、能代表來源及主題的名稱，例如 `copilot/`, `codeql/`。
2. 在每個子目錄放一個 README.md 記錄來源、日期及是否可刪除/封存。
3. 若未來需將某個子專案獨立，保留該子目錄並可透過 git subtree 或 filter-repo 逆向拆出。
4. 若只想保留紀錄但不公開，將該 repo 設為 private 或 archive 原始 repo。

如何使用此 monorepo（簡要）
- Clone 到本地：git clone <MONOREPO_URL>
- 檢視子專案：cd copilot && ls -la
- 若要更新某個來源 repo：在本地重新執行搬移流程（或採用 subtree pull / 再移入）。

聯絡與貢獻
- 若你要加入更多教學 repo，請在 root README 的 “Add new tutorial” 段落下新增條目或發 PR。
