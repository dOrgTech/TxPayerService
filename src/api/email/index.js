import nodemailer from "nodemailer";

const {
  BALANCE_NOTIFICATIONS_EMAIL,
  BALANCE_NOTIFICATION_THRESHOLD,
  EMAIL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD
} = process.env;

const message = (balance, wallet, cancelled) => ({
  from: `TxPayerService <${EMAIL}>`,
  to: `DOrg Funding <${BALANCE_NOTIFICATIONS_EMAIL}>`,
  subject: `${cancelled ? "Critical" : "Low"} Balance Alert - TX_PAYER_SERVICE`,
  text: `Ethereum wallet: ${wallet}\nWallet balance: ${balance}`,
  html: `<h2>Tx Payer Service</h2><p>Ethereum wallet: <a href=https://etherscan.io/address/${wallet}>${wallet}</a></p><p>Wallet balance: ${balance} ETH</p>`
});

const sendEmail = (balance, wallet, cancelled) => {
  const transporter = nodemailer.createTransport({
    // pool: true,
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    // secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });

  transporter.sendMail(message(balance, wallet, cancelled), (err, res) => {
    if (err) {
      console.log(
        `Failed to send ${
          cancelled ? "critical" : "low"
        } balance email:\n${err}`
      );
    } else {
      console.log(`Sent ${cancelled ? "critical" : "low"} balance email`);
    }
  });
};

export const handleFunds = async (_, response, next) => {
  const { balance, wallet, cancelled } = response.locals;

  if (BALANCE_NOTIFICATIONS_EMAIL && balance < BALANCE_NOTIFICATION_THRESHOLD) {
    sendEmail(balance, wallet, cancelled);
  }

  if (!cancelled) next();
};
