# Google 試算表成績後端設定

## 一、建立後端

1. 建立 Google 試算表，例如命名為 `Air Guardian Scores`。
2. 在該試算表選擇「擴充功能 → Apps Script」。
3. 刪除編輯器原有程式，貼上本資料夾的 `Code.gs`，然後儲存。
4. 按「部署 → 新增部署」。
5. 部署類型選擇「網頁應用程式」。
6. 「執行身分」選擇「我」。
7. 「誰可以存取」選擇「任何人」。
8. 完成 Google 授權後，複製結尾為 `/exec` 的網頁應用程式網址。

第一次收到成績後，程式會自動建立 `Scores` 工作表，包含：完成時間、姓名、分數、總題數、答對率、答錯題數與遊戲場次編號。

## 二、把網址填進遊戲

打開 `index.html`，搜尋：

```js
const SCORE_API_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

將引號中的文字換成步驟一取得的正式 `/exec` 網址，例如：

```js
const SCORE_API_URL = 'https://script.google.com/macros/s/你的部署ID/exec';
```

不要使用結尾為 `/dev` 的測試網址。

## 三、測試

1. 重新開啟 `index.html`。
2. 輸入測試姓名並完成 10 題。
3. 結算頁應顯示 `Score sent to the teacher’s Google Sheet.`。
4. 回到 Google 試算表確認 `Scores` 分頁新增一列。

如果結算頁顯示尚未連接，代表 `SCORE_API_URL` 還沒有換成正式 `/exec` 網址。

## 四、隱私

- 遊戲只應收集教學所需的姓名與成績。
- 不要收集身分證、電話或健康資料。
- 不需要把 Google 試算表設為公開；只需讓 Apps Script 網頁應用程式可以接收提交。
