/**
 * Air Guardian Taiwan score recorder.
 * Create this Apps Script from the Google Sheet that should receive scores.
 */
const SHEET_NAME = 'Scores';
const HEADERS = [
  'Submitted at',
  'Player name',
  'Score',
  'Total questions',
  'Percentage',
  'Wrong answers',
  'Session ID'
];

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'Air Guardian Taiwan score recorder'
  });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = readPayload_(event);
    const name = cleanText_(data.name, 80);
    const score = cleanInteger_(data.score, 0, 10);
    const total = cleanInteger_(data.total, 1, 10);
    const wrong = cleanInteger_(data.wrong, 0, 10);
    const sessionId = cleanText_(data.sessionId || '', 100);

    if (!name) throw new Error('Player name is required.');
    if (score > total) throw new Error('Score cannot be greater than total.');
    if (wrong !== total - score) throw new Error('Wrong-answer count is invalid.');

    const sheet = getScoreSheet_();
    const submittedAt = Utilities.formatDate(
      new Date(),
      'Asia/Taipei',
      'yyyy-MM-dd HH:mm:ss'
    );
    const percentage = Math.round((score / total) * 100);

    sheet.appendRow([
      submittedAt,
      name,
      score,
      total,
      percentage + '%',
      wrong,
      sessionId
    ]);

    return jsonResponse_({ ok: true, message: 'Score saved.' });
  } catch (error) {
    return jsonResponse_({ ok: false, message: error.message });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function getScoreSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Open Apps Script from the target Google Sheet.');

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#dff5ed')
      .setFontColor('#164f3e');
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function readPayload_(event) {
  if (!event) return {};
  if (event.postData && event.postData.type === 'application/json') {
    return JSON.parse(event.postData.contents || '{}');
  }
  return event.parameter || {};
}

function cleanInteger_(value, minimum, maximum) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < minimum || number > maximum) {
    throw new Error('Invalid score data.');
  }
  return number;
}

function cleanText_(value, maxLength) {
  let text = String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
