# Air Guardian Taiwan — 互動式空汙衛教小遊戲程式設計規劃書

## 1. 文件目的

本文件供下一位實作 Agent 直接依規格製作單一 `index.html`。本階段只定義產品、內容、互動、視覺、資料結構、技術與驗收規格，不撰寫成品程式。

## 2. 專案目標與受眾

- 目標受眾：居住或工作於台灣的越南人；介面與衛教內容皆使用簡明英文。
- 學習目標：認識台灣空污的區域與季節差異、健康危害、進入人體的途徑、高風險族群、防護方式，以及出門前查看 AQI。
- 產品形式：一頁式、10 題、拖放／點選皆可玩的分類遊戲。
- 成品限制：僅建立一個 `index.html`，CSS 與 JavaScript 全部內嵌，不依賴框架、建置工具或後端。
- 裝置：手機、平板與桌機皆可完整操作。

## 3. 遊戲概念

暫定英文名稱：**Air Guardian Taiwan**

玩家逐題看到一張英文敘述卡，判斷它是否是正確的空污知識或健康行動：

- 正確敘述拖到／送到 **Earth（地球）**。
- 錯誤迷思拖到／丟進 **Trash Bin（垃圾桶）**。
- 選對：地球發光，場景中的人物、動植物變開心，顯示簡短衛教補充，接著進入下一題。
- 選錯：卡片退回原位，地球變髒、人物與動植物顯得不舒服、畫面逐步變暗，並顯示提示；同一題持續作答直到答對。
- 完成 10 題後顯示學習摘要與「出門前查看 AQI」的外部連結。

此玩法判斷的是「敘述應被保留還是丟棄」，不是 Yes/No 測驗。畫面需一直清楚提示：**Good advice → Earth / Harmful myth → Trash**。

## 4. 頁面與遊戲流程

### 4.1 Welcome 狀態

- 標題：`Air Guardian Taiwan`
- 引導文：`Keep helpful air-quality facts on Earth. Throw harmful myths in the trash.`
- 操作提示：`Drag the card, or tap a destination.`
- `Start Game` 按鈕。
- 提供 `How to Play` 可展開說明，避免首次使用者不理解分類規則。

### 4.2 Playing 狀態

固定包含：

- 頂部：遊戲標題、`Question X of 10`、10 格進度條、`Sound`（若實作音效）及 `Restart`。
- 中央場景：天空、遠山／城市剪影、樹、花、小狗、兒童、青壯年、老婦人、老爺爺，以及地球和垃圾桶。
- 題目區：主題標籤、可移動敘述卡、簡短拖放指令。
- 兩個大型投放區：`KEEP IT — EARTH` 與 `TRASH THE MYTH`。
- 回饋區：使用 `aria-live` 顯示答對說明或答錯提示。
- 觸控／鍵盤替代操作：卡片下方有 `Send to Earth`、`Send to Trash` 兩個按鈕；不能只靠拖曳。

### 4.3 Correct feedback 狀態

- 地球短暫產生金綠色光暈與星光動畫。
- 全場景恢復／提升明亮度，角色笑臉、站姿有精神，樹葉與花朵飽和。
- 卡片以動畫進入正確目標。
- 顯示 `Correct!`、該題 `explanation`，以及 `Next` 按鈕。
- 不自動快速跳題，讓英文閱讀速度較慢的使用者有時間閱讀。

### 4.4 Incorrect feedback 狀態

- 不換題、不增加已完成題數。
- 地球增加灰色污漬；人物、狗、樹和花切換成病懨懨狀態。
- 全頁污染遮罩依「本局累積錯誤次數」加深，但文字和按鈕對比仍須符合可讀性要求。
- 顯示 `Not quite — try again.` 和該題提示。
- 卡片抖動後回到原位；錯誤投放區短暫紅框，不永久禁用任何選項。
- 每次錯誤都允許再次嘗試，直到選對才出現 `Next`。

### 4.5 Completion 狀態

- 標題：`You are an Air Guardian!`
- 顯示 `10/10 facts completed`，另列 `Attempts`，不以錯誤羞辱或扣分。
- 以 4 張重點卡回顧：`Know the season`、`Protect your lungs`、`Care for higher-risk people`、`Check AQI before you go`。
- 主要 CTA：`Check Taiwan AQI Now`，另開新分頁並加上 `rel="noopener noreferrer"`。
- 次要 CTA：`Play Again`，完全重設題目、錯誤次數、污染遮罩與角色狀態。

## 5. 十題正式題庫

實作時將以下內容放在 JavaScript `questions` 陣列，保留 `id`, `topic`, `statement`, `correctTarget`, `hint`, `explanation` 欄位。題目順序可固定以確保衛教敘事由淺入深；重新遊玩可選擇洗牌，但不是必要功能。

| # | Topic | Statement shown on card | Correct target | Hint after a wrong try | Explanation after correct answer |
|---|---|---|---|---|---|
| 1 | Taiwan: regional differences | `Air pollution levels can differ across Taiwan because of local traffic, industry, geography, weather, and pollution carried from other areas.` | Earth | `Think about whether every place has the same roads, factories, landscape, and wind.` | `Air quality is not the same everywhere. Local emissions, terrain, weather, and transported pollution all matter.` |
| 2 | Taiwan: seasonal differences | `Air pollution is always the same in every season in Taiwan.` | Trash | `Weather and wind change with the seasons.` | `Air quality changes by season. Fall and winter often bring conditions that allow pollution to build up.` |
| 3 | Fall and winter | `In fall and winter, weaker winds, less vertical mixing, and seasonal transport can make pollution harder to disperse.` | Earth | `Ask whether still, stable air clears pollution quickly.` | `Stable air can trap pollutants near the ground, and seasonal winds may also carry pollution into Taiwan.` |
| 4 | Health effects | `Air pollution only causes a bad smell; it does not affect health.` | Trash | `Pollution can affect more than the nose.` | `Air pollution can irritate the eyes and airways and raise risks for lung and cardiovascular health.` |
| 5 | Entering the body | `Fine particles can enter through the nose and mouth and travel deep into the lungs when we breathe.` | Earth | `Consider what happens to very small particles in inhaled air.` | `PM2.5 is small enough to reach deep parts of the lungs; reducing exposure helps protect breathing and health.` |
| 6 | Warning symptoms | `Coughing, wheezing, chest tightness, or unusual shortness of breath should always be ignored on polluted days.` | Trash | `Would ignoring breathing trouble be a safe response?` | `Reduce exposure and seek appropriate medical help when symptoms are severe, unusual, or do not improve.` |
| 7 | Higher-risk groups | `Children, pregnant women, older adults, and people with heart or lung disease need extra care when air quality is poor.` | Earth | `Some bodies and health conditions are more sensitive to pollution.` | `These groups may be more vulnerable and should follow AQI activity advice carefully.` |
| 8 | Outdoor activity | `When AQI is poor, everyone should exercise hard outdoors to make the lungs stronger.` | Trash | `Hard exercise makes you breathe more air—and more pollution.` | `Adjust the time, place, or intensity of outdoor activity according to the AQI and your health.` |
| 9 | Protection | `Checking AQI before going out can help you plan safer activities and reduce exposure.` | Earth | `AQI is designed to guide daily decisions.` | `Use the current AQI to decide when, where, and how intensely to be active outdoors.` |
| 10 | Understanding AQI | `You must memorize the concentration of every pollutant before AQI can help you.` | Trash | `AQI was created to simplify complex pollution data.` | `AQI turns pollutant measurements into simple colors, numbers, health-risk levels, and activity advice.` |

內容注意事項：

- 使用 `heart or lung disease`，修正原需求中 `Older adults` 重複列出的問題。
- 避免斷言每個人都必須使用同一種口罩或完全禁止外出；防護建議應依 AQI、個人健康及官方指引調整。
- 不顯示會誤導台灣使用者的其他國家 AQI 色階。
- AQI 重點須明確傳達：「不必背每種污染物濃度，先看顏色、數字、健康風險與活動建議。」

## 6. 視覺與角色狀態規格

### 6.1 美術方向

- 友善、扁平插畫、衛教但不幼稚；適合成人與家庭共同使用。
- 建議直接用 HTML/CSS 圖形或內嵌 SVG，確保單檔、清晰縮放且沒有外部圖片版權問題。
- 主色：天空藍、葉綠、地球藍綠；正確為綠／金色光；錯誤為灰褐／暗紫，避免只用紅綠辨識。
- 所有核心資訊必須由文字、圖示與形狀共同表達，不能只靠顏色。

### 6.2 場景角色

必須同時可見或在小螢幕以緊湊群組呈現：

- 一棵樹、至少兩朵小花、一隻狗。
- 一位老婦人、一位老爺爺、一位兒童、一位青壯年。
- 正常／開心狀態：笑臉、挺直姿勢、眼睛有神，狗搖尾巴，花朵抬頭，樹葉明亮。
- 生病／難受狀態：皺眉、垂肩、咳嗽小動作或不適符號，狗耳朵下垂，花朵垂下，樹葉灰暗。
- 不應以誇張、恐怖或污名化方式描繪疾病、高齡或懷孕。

### 6.3 污染程度

以 `wrongCount` 驅動 0–5 級視覺狀態：

- 0：明亮乾淨。
- 1：極淡灰霧。
- 2：天空降低飽和，角色不舒服。
- 3：地球污漬增加，遠景霧化。
- 4：整體明顯昏暗但內容仍清楚。
- 5：污染效果封頂，不再降低亮度；禁止讓主要文字低於 4.5:1 對比。

答對時播放發光並讓角色短暫開心；若玩家先前答錯，建議污染層降低 1 級而非一次清零。完成全部題目時才恢復完全明亮，形成環境被共同修復的結尾。

## 7. 互動與狀態模型

建議狀態：

```text
screen: "welcome" | "playing" | "complete"
currentIndex: 0..9
completedCount: 0..10
wrongCount: number
currentQuestionWrongCount: number
isDragging: boolean
isAnswered: boolean
feedback: null | { type, message }
```

核心函式責任：

- `startGame()`：初始化並進入第 1 題。
- `renderQuestion()`：更新題號、卡片與無障礙文字。
- `submitAnswer(target)`：統一處理拖放、點擊與鍵盤答案。
- `handleCorrect()`：鎖定重複作答、播放正確狀態、顯示 explanation。
- `handleIncorrect()`：增加錯誤、更新污染狀態、顯示 hint、允許重試。
- `nextQuestion()`：前進或結算。
- `updateSceneMood()`：依污染程度與回饋更新 CSS class／data attribute。
- `restartGame()`：完整清除狀態、計時器及動畫 class。

防呆：

- `isAnswered === true` 時忽略重複 drop/click，避免連點跳過題目。
- 拖曳只處理卡片；投放完成或取消都移除 hover class。
- 支援 Pointer Events；不要只用 HTML5 Drag and Drop，因其觸控體驗不一致。
- 動畫結束使用一次性事件或安全 timeout，重開遊戲時清掉殘留 timeout。

## 8. RWD 規格

- Mobile（約 320–599 px）：單欄；場景在上、卡片在中、兩個投放按鈕／區域並排或上下排列；所有點擊目標至少 44×44 CSS px。
- Tablet（600–1023 px）：場景與卡片維持中央，Earth/Trash 左右分列。
- Desktop（1024 px 以上）：最大內容寬約 1200 px；人物與自然元素分布於地球周圍，卡片位於視線中央。
- 不設定固定頁面高度；小手機與橫向模式可自然捲動，不能裁切 `Next` 或回饋內容。
- 使用 `clamp()` 控制字級、間距與插畫尺度。
- 於 200% 縮放、320 px 寬度與橫向手機測試，不得水平溢出。

## 9. 無障礙與可用性

- 所有按鈕為原生 `<button>`，焦點樣式清楚。
- 拖曳是增強功能，按鈕是等價且完整的主要替代路徑。
- 回饋容器使用 `role="status"` / `aria-live="polite"`；答錯後焦點不應被任意搶走。
- Earth 與 Trash 有可讀文字，不能只使用插畫。
- `prefers-reduced-motion: reduce` 時關閉抖動、漂浮與大幅移動，只保留即時狀態變化。
- 裝飾 SVG 設 `aria-hidden="true"`；有資訊意義的圖示提供文字標籤。
- 英文句子盡量短，字級正文至少 16 px，避免全大寫長句。

## 10. AQI 外部資源

- 完成頁 CTA 連至台灣環境部英文版 Taiwan Air Quality Monitoring Network：`https://airtw.moenv.gov.tw/ENG/`
- 可另提供 `Learn what AQI means` 連至：`https://airtw.moenv.gov.tw/ENG/Information/Standard/AirQualityIndicator.aspx`
- 外部資料僅使用連結，不在本版串接即時 API；因此遊戲離線仍可玩，只有開啟監測網需要網路。
- 實作前快速確認網址仍有效；若網站路徑變更，改用環境部官方英文入口，不使用第三方 AQI 服務替代。

## 11. 單檔實作結構建議

```text
index.html
├─ <head>: metadata, title, inline <style>
├─ <body>
│  ├─ <main id="app">
│  │  ├─ welcome panel
│  │  ├─ game panel
│  │  │  ├─ header/progress
│  │  │  ├─ illustrated scene
│  │  │  ├─ question card
│  │  │  ├─ Earth/Trash targets
│  │  │  └─ feedback/actions
│  │  └─ completion panel
│  └─ inline <script>: data, state, rendering, interaction
```

- 加入 `<meta name="viewport" content="width=device-width, initial-scale=1">`。
- `lang="en"`。
- 不使用 CDN 字型；採系統字型堆疊，避免離線缺字或載入阻塞。
- CSS class 以元件／狀態命名，如 `.scene`, `.question-card`, `.drop-zone`, `.is-sick`, `.is-correct`。
- JS 不要把英文內容散落在事件處理函式，題庫與 UI 字串集中管理。
- 不儲存個資、不要求登入、不使用定位。

## 12. 驗收標準

### 功能

- [ ] Welcome、10 題、Completion 流程都能完成。
- [ ] 10 題文字、正確目標、提示與解釋均符合第 5 節。
- [ ] 每題可拖至 Earth／Trash，也可用按鈕與鍵盤完成。
- [ ] 答錯不前進、提供提示且可無限重試，直到答對。
- [ ] 答對地球發光；答錯地球變髒、所有指定角色／動植物變得病懨懨。
- [ ] 累積答錯使介面逐步變暗，效果有封頂且不影響閱讀。
- [ ] 進度只在答對後增加；第 10 題答對才結算。
- [ ] Restart／Play Again 能完整重置所有狀態。
- [ ] Taiwan AQI CTA 開啟正確的官方英文網站。

### 裝置與品質

- [ ] Chrome、Safari、Firefox、Edge 最新穩定版基本流程可用。
- [ ] iOS Safari 與 Android Chrome 可用觸控拖放或按鈕完成。
- [ ] 320 px、768 px、1024 px、1440 px 無水平溢出或關鍵內容遮擋。
- [ ] 僅鍵盤可完成整局，焦點順序合理且狀態有螢幕閱讀器文字回饋。
- [ ] `prefers-reduced-motion` 生效。
- [ ] 無 console error、無遺失外部資源；斷網時除外部 AQI 連結外仍能遊玩。

## 13. 實作優先順序

1. 建立語意化 HTML 骨架、題庫資料與狀態機。
2. 完成按鈕作答、正誤回饋、重試、進度及結算。
3. 加入 Pointer Events 拖放，並確保不破壞鍵盤／點擊路徑。
4. 完成場景、所有指定角色的 happy/sick 狀態與污染分級。
5. 加入發光、抖動、角色反應等動畫及 reduced-motion 規則。
6. 完成 RWD、無障礙、跨瀏覽器與離線測試。

## 14. 本版不包含

- 即時 AQI API、定位、地圖或依城市顯示數值。
- 多語切換或越南文翻譯（本需求指定英文介面）。
- 後端、帳號、排行榜、資料庫或學習紀錄上傳。
- 醫療診斷或針對個人的治療建議。

