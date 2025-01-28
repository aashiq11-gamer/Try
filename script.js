function doPost(e) {
  const ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1JXFTXZpx7gSNJS8HT4O2JjsQUdmgk0TmUY599G-vPz4/edit");
  const sheet = ss.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  const action = data.action;

  if (action === "signUp") {
    // Sign-Up Action
    const { name, email, password } = data;

    // Check if email already exists
    const rows = sheet.getDataRange().getValues();
    const emailExists = rows.some(row => row[1] === email);

    if (emailExists) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Email already registered!" })).setMimeType(ContentService.MimeType.JSON);
    }

    // Add user data to sheet
    sheet.appendRow([name, email, password]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Sign-Up successful!" })).setMimeType(ContentService.MimeType.JSON);
  } else if (action === "signIn") {
    // Sign-In Action
    const { email, password } = data;

    // Validate credentials
    const rows = sheet.getDataRange().getValues();
    const validUser = rows.some(row => row[1] === email && row[2] === password);

    if (validUser) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Sign-In successful!" })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid credentials!" })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid action!" })).setMimeType(ContentService.MimeType.JSON);
}
if (result.status === "success") {
  alert(result.message);
  window.location.href = "game.html"; // Redirect to the game page
} else {
  alert(result.message);
}