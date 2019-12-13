export const handleFunds = async (_, response, next) => {
  const { balance, wallet } = response.locals;
  if (balance && wallet) {
    console.log(`sending email has been sent to refill wallet ${wallet}`);
    return;
  }
  //console.log("not sending email");
  next();
};
