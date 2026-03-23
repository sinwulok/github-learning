---

# cm521ReactNativeTestingApp

## 項目簡介

cm521ReactNativeTestingApp 是一個多語言開發的測試應用，旨在展示 React Native 及多平台移動開發技術。專案結合 Java、Objective-C、Objective-C++、JavaScript、TypeScript 及 Ruby，適用於跨平台行動應用程式開發和測試相關流程。

## 技術棧

- **Java**：Android 原生功能實現
- **Objective-C / Objective-C++**：iOS 原生功能實現
- **JavaScript / TypeScript**：React Native 應用核心邏輯
- **Ruby**：自動化或腳本管理（如 Fastlane、測試等）

## 安裝步驟

1. 克隆本倉庫
   ```bash
   git clone https://github.com/BiuwuLOK/cm521ReactNativeTestingApp.git
   cd cm521ReactNativeTestingApp
   ```

2. 安裝依賴
   ```bash
   npm install
   # 或 yarn install
   ```

3. Android 環境設置
   - 安裝 Android Studio 並配置好模擬器或真機

4. iOS 環境設置（僅限 macOS）
   - 安裝 Xcode
   - 安裝 CocoaPods 依賴
     ```bash
     cd ios
     pod install
     cd ..
     ```

## 使用說明

- 啟動 Android 應用
  ```bash
  npx react-native run-android
  ```
- 啟動 iOS 應用
  ```bash
  npx react-native run-ios
  ```

## 功能列表

- 跨平台（Android/iOS）移動應用開發範例
- 集成原生模組（Java/Objective-C/Objective-C++）
- 基於 React Native 的前端業務邏輯
- 支援自動化測試與腳本化流程

## 測試方法

1. 安裝測試依賴
   ```bash
   npm install --dev
   # 或 yarn add --dev
   ```
2. 執行單元測試
   ```bash
   npm test
   # 或 yarn test
   ```
3. 可根據專案內文檔查看具體測試命令或腳本（如 Ruby 腳本）

## 貢獻指南

1. Fork 本倉庫
2. 創建新分支
   ```bash
   git checkout -b feature/your-feature
   ```
3. 提交更改
   ```bash
   git commit -am "Add new feature"
   git push origin feature/your-feature
   ```
4. 發送 Pull Request，並描述你的更改內容

## 提交 Issue

如遇到問題、漏洞或有新功能建議，歡迎通過 [Issues 頁面](https://github.com/BiuwuLOK/cm521ReactNativeTestingApp/issues) 提交 issue。請盡量詳細描述問題重現步驟、預期行為與實際行為，並附上相關截圖或日誌（如有）。

## License

本專案採用 [MIT License](LICENSE)。

---
