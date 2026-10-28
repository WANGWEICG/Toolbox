# 王偉的萬用工具箱 v5

保留深色介面、首頁 / 市場 / 用車 / 更多四個分頁。

## 2026-10-28 修正

- 匯率資料來源改為 Frankfurter v2 (`/v2/rates?base=TWD`)，支援 USD、JPY、PHP、EUR、GBP、CNY，並依新版陣列格式解析。
- 為 `data.json` 增加超過三小時的過期警告；股票、匯率、天氣各自檢查，不再把局部失敗顯示成「資料正常」。
- 啟用 PWA manifest 與同專案範圍的 Service Worker；僅快取網站介面，不快取 `data.json`；清快取只刪除工具箱自己的快取。
- 車貸本息平均攤還的輸入防呆：空值、NaN、負數、頭期款超過車價、無效利率、非法期數與 0% 利率。
- GitHub Actions 持續使用 `15 * * * *` 排程，實際啟動可能延遲。數據不是即時股價，也不是銀行成交匯率。

## 檔案

- `index.html`：網站和前端邏輯
- `manifest.json`：PWA App 名稱、圖示與啟動畫面
- `sw.js`：離線網站殼層快取
- `.github/workflows/update-data.yml`：GitHub Actions 自動取得公開資料並更新 `data.json`
- `icon-192.png`、`icon-512.png`：沿用原始專案圖示

## 部署與驗證

1. 將修復內容放在新的 GitHub 分支，不要直接修改 `main`。
2. 建立 Pull Request (`base=main`)，檢查檔案差異後才合併。
3. 合併後在 Actions → Update Toolbox Data → Run workflow 手動執行一次；確認新 `data.json` 內 `fx.TWD_USD`、`fx.USD_TWD`、`fx.TWD_PHP` 非空。
4. 用 iPhone Safari 開啟網頁，檢查更新時間、匯率、車貸與加入主畫面。

若 Actions 標示成功，但 `fx_error` 仍存在，請先查看 `data.json` 與 Action log。外部來源的實際可用性仍需線上執行後確認。