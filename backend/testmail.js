// Load .env file
require("dotenv").config({ path: __dirname + "/.env" });

const mailSender = require("./utils/mailSender");

console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_USER:", process.env.MAIL_USER);

(async () => {
  try {
    const response = await mailSender(
      "yourreceiver@gmail.com",
      "Test Mail",
      "<h1>Hello from AI Based IT Training System</h1>"
    );
    console.log("✅ Mail sent successfully", response);
  } catch (err) {
    console.error("❌ Mail test failed", err);
  }
})();
