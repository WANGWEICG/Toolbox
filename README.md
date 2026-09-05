# 王偉的萬用工具箱 v1

手機優先的純前端 PWA，可直接部署到 GitHub Pages。

## v1 功能
- 0050 / 0056：臺灣證券交易所 OpenAPI（非券商即時逐筆報價）
- TWD 匯率：Frankfurter
- 手機定位天氣：Open-Meteo
- 車貸試算：一般本息攤還 + 利息先繳模式
- 油車 vs 電車能源成本
- Tesla 台灣 / TWSE / 中央氣象署 / 168 官方入口
- 本機快取與離線 App shell
- 可加入 iPhone / Android 主畫面

## GitHub Pages 部署
1. 建立一個新的 GitHub repository，例如 `wangwei-toolbox`
2. 把本資料夾所有檔案上傳到 repository 根目錄
3. GitHub → Settings → Pages
4. Build and deployment 選 `Deploy from a branch`
5. Branch 選 `main` / `(root)` → Save
6. 等 GitHub Pages 網址出現後，用 Safari 開啟
7. iPhone：分享 → 加入主畫面

## 注意
外部 API 是否能被瀏覽器直接讀取，仍受 API 端 CORS、臨時維護與網路環境影響。
本 App 若讀取失敗會提示，不會拿假資料冒充即時資料。
