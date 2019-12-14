import nodemailer from "nodemailer";
const { BALANCE_NOTIFICATIONS_EMAIL } = process.env;

// Tested with personal gmail
const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: ""
  }
});

const message = (balance, wallet) => ({
  from: "TxPayerService <DOrg Bot>",
  to: `DOrg Funding<${BALANCE_NOTIFICATIONS_EMAIL}>`,
  subject: "LOW BALANCE ALERT - TX_PAYER_SERVICE",
  text: `Ethereum wallet: ${wallet}
  Wallet balance: ${balance}`,
  html: `<h2>Tx Payer Service</h2><p>Ethereum wallet: <a href=https://etherscan.io/address/${wallet}>${wallet}</a></p><p>Wallet balance: ${balance} ETH</p>`
});

export const handleFunds = async (_, response, next) => {
  const { balance, wallet } = response.locals;
  if (balance && wallet) {
    transporter.sendMail(message(balance, wallet));
    return;
  }
  next();
};
