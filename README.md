# 王偉的萬用工具箱 v3 Stable

這版的重點：iPhone 不再直接呼叫 TWSE / Frankfurter / Open-Meteo。
GitHub Actions 會每小時抓一次公開資料並寫入 `data.json`，
前端只讀同一個 GitHub Pages 網站的 `data.json`。

## 你只要做三件事

1. 用新版 `index.html` 覆蓋原本的 index.html
2. 把 `data.json` 放到 Repository 根目錄
3. 在 GitHub 建立 `.github/workflows/update-data.yml`，內容使用本包裡的檔案

然後進 GitHub：
Actions → Update Toolbox Data → Run workflow

跑完後，`data.json` 會自動更新。
