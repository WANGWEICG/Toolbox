# 王偉的萬用工具箱 v2 Stable

這版的核心改變：**瀏覽器不再直接呼叫 TWSE / Frankfurter / Open-Meteo**。

GitHub Actions 會定時執行 `scripts/update_data.py`，把結果寫進 `data/summary.json`。GitHub Pages 只需要讀取同一個網站下的 `data/summary.json`，因此大幅降低 iPhone / PWA / CORS 導致的「連線失敗」。

## 第一次安裝後一定要做一次

1. GitHub Repository → **Actions**
2. 左側選 **Update Toolbox Data**
3. 按 **Run workflow**
4. 執行成功後，Repository 會自動更新 `data/summary.json`
5. GitHub Pages 重新發布後，工具箱就會顯示資料

## GitHub Pages

設定維持：Settings → Pages → Deploy from a branch → `main` → `/(root)`。

## 排程

- 台灣平日市場時段附近：每 30 分鐘更新
- 其他時間：每 3 小時更新

> GitHub Actions 的 schedule 不是即時報價系統，可能會延遲數分鐘。0050 / 0056 仍應視為參考資料，不是券商逐筆即時成交資訊。
