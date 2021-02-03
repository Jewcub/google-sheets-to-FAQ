const { google } = require("googleapis");

const formatRow = (row) => ({
  question: row[0],
  answer: row[1],
});

/**
 * Perform authentication with google sheet and retrieve spreadsheet data
 * @returns {[Array]} - 2d array
 */
const getFAQs = async () => {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const api = google.sheets({ version: "v4", auth });
    const response = await api.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: `!A:B`,
    });
    // Col 0 - Question
    // Col 2 - Answer
    const formatted = response.data.values.map((row) => formatRow(row));
    console.log({ formatted });
    return formatted;
  } catch (error) {
    return { error };
  }
};
module.exports = getFAQs;
