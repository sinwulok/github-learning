---

# cm633-react-from-scratch

從零開始打造 React 專案的教學與範例。

## 介紹

本專案示範如何不依賴 create-react-app 等腳手架，由零開始手動搭建 React 開發環境。內容涵蓋基本的專案結構、必要的設定（如 webpack、Babel）、以及簡單的 React 應用程式範例。

## 專案結構

```
cm633-react-from-scratch/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.js
├── package.json
├── webpack.config.js
├── .babelrc
└── README.md
```

## 安裝與使用

1. **安裝相依套件**

   ```bash
   npm install
   ```

2. **啟動開發伺服器**

   ```bash
   npm start
   ```

   預設瀏覽器會自動開啟 `http://localhost:3000`。

3. **建置專案**

   ```bash
   npm run build
   ```

   產生的檔案會在 `dist/` 目錄下。

## 主要功能

- 使用 webpack 進行模組打包
- 使用 Babel 轉譯現代 JavaScript 與 JSX
- 支援 CSS 與圖片等靜態資源
- 基本的 React 應用範例

## 需求

- Node.js >= 14
- npm >= 6

## 貢獻

歡迎提出 issue 或 pull request，一起完善這份從零開始的 React 專案範例！

## 授權

本專案採用 MIT 授權條款。

---
