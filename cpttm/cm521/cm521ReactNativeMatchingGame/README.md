---

# React Native Matching Game

這是一個基於 React Native 的配對遊戲專案，適用於 iOS 與 Android 平台。本專案用於學習和展示 React Native 多平台開發能力。

## 特色功能

- 配對遊戲玩法簡單有趣
- 支援多種移動裝置
- 具備計分與計時功能
- 使用 React Native 開發跨平台應用
- 儲存玩家分數與遊戲紀錄

## 技術棧

- **前端框架**：React Native (JavaScript/TypeScript)
- **原生模組**：Java (Android), Objective-C/Objective-C++ (iOS)
- **其他**：Ruby（用於輔助腳本或自動化）

## 安裝方式

1. **克隆本專案：**
   ```bash
   git clone https://github.com/BiuwuLOK/cm521ReactNativeMatchingGame.git
   cd cm521ReactNativeMatchingGame
   ```

2. **安裝依賴：**
   ```bash
   npm install
   # 或者使用 yarn
   yarn install
   ```

3. **啟動模擬器：**
   - iOS:  
     ```bash
     npx react-native run-ios
     ```
   - Android:  
     ```bash
     npx react-native run-android
     ```

## 使用方式

1. 啟動 App 後，點擊開始遊戲。
2. 在配對遊戲中，點擊兩張相同的卡片即可配對成功。
3. 遊戲結束後會顯示分數和用時。

## 目錄結構

```
.
├── android/            # Android 原生代碼
├── ios/                # iOS 原生代碼
├── src/                # React Native 主要代碼
│   ├── components/
│   ├── screens/
│   └── utils/
├── App.js              # 入口文件
└── ...
```

## 貢獻方式

歡迎提交 issues 與 pull requests！  
如需協助，請先閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)（如有）。

## 授權

MIT License

---
