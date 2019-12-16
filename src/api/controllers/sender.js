import {
  getTransactionNumber,
  getDefaultAccount,
  newContract,
  sendContractMethod,
  callContractMethod
} from "../web3";

const transactionHash = (hash, response) => {
  console.log(`Transaction done. Hash of transaction: ${hash}`);
  response.send({
    status: 200,
    message: "Transaction done",
    hash
  });
};

const callResult = (result, response) => {
  console.log(`Call done. Response: ${result}`);
  response.send({
    status: 200,
    message: "Call done",
    hash
  });
};

const onError = (error, response) => {
  console.log(`An error has occured: ${error}`);
  response.send({ status: 503, message: "An error has occured", error });
};

export const sender = async (request, response) => {
  try {
    const { to, methodAbi, parameters } = request.body;
    const { gas, gasLimit } = request;
    const { WHITELISTED_ADDRESSES, WHITELISTED_METHODS } = process.env;
    const defaultAccount = await getDefaultAccount();

    const addressRequested = WHITELISTED_ADDRESSES.split(" ");
    const methodRequested = WHITELISTED_METHODS.split(" ");

    const validAddress = addressRequested.includes(to);
    const validMethod = methodRequested.filter(method => {
      return method.startsWith(`${methodAbi.name}(`);
    });

    const regExp = /\(([^)]+)\)/;
    const methodInputsTypes = regExp.exec(validMethod[0]);

    let correctParameters = true;
    methodInputsTypes &&
      methodInputsTypes[1].split(",").forEach((inputType, index) => {
        if (inputType !== methodAbi.inputs[index].type)
          correctParameters = false;
      });

    if (validAddress && validMethod.length > 0 && correctParameters) {
      try {
        const nonce = await getTransactionNumber(defaultAccount);
        const txObject = {
          from: defaultAccount,
          nonce,
          gas,
          gasLimit
        };
        const contractInstance = newContract([methodAbi], defaultAccount);

        contractInstance.options.address = to;

        const mutability = methodAbi.stateMutability;
        if (mutability) {
          switch (mutability) {
            case "pure":
            case "view":
              const result = await callContractMethod(
                contractInstance,
                methodAbi.name,
                ...parameters
              );
              callResult(result, response);
              break;
            default:
              const receipt = await sendContractMethod(
                contractInstance,
                methodAbi.name,
                txObject,
                ...parameters
              );
              transactionHash(receipt.transactionHash, response);
              break;
          }
        }
      } catch (error) {
        onError(error, response);
      }
    } else {
      const message = !validAddress
        ? "Contract address is not valid or added in whitelist"
        : !validMethod
        ? "Method ABI is not valid or added in whitelist"
        : "Parameters of method are not correct";
      response.send({ status: 400, message });
    }
  } catch (error) {
    console.log(`An error has occured: ${error}`);
    response.send({ status: 503, message: `An error has occured: ${error}` });
  }
};
