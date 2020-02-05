[![Build Status](https://travis-ci.com/dOrgTech/TxPayerService.svg?branch=develop)](https://travis-ci.com/dOrgTech/TxPayerService)

# Tx Payer Service

### Config Environment

Set your own .env, checkout .env-example for reference :)

WHITELISTED_METHODS: The ABI(s) of the contract

WHITELISTED_ADDRESSES: The addresses of the contracts you want to interact with

Note: The whitelisted methods has to be separated with spaces (arguments are separated by commas, not with spaces) - You can see the right format on `.env.example`

### Installing

`npm install`

### Running locally

`npm run dev`

### Deploying microservice

The service can be deployed into AWS Lambda with Serverless library, doing the following steps:

1- Associate your IAM user credentials with the service

```
$ sls config credentials --provider aws --key $PUBLIC_KEY --secret $SECRET_KEY
```

2- Create a `secrets.json` file in the root of the project, it need to have the following structure:

```json
{
  "NETWORK_URL": "",
  "WALLET_MNEMONIC": "",
  "WHITELISTED_ADDRESSES": "",
  "WHITELISTED_METHODS": "",
  "BALANCE_NOTIFICATIONS_EMAIL": "",
  "BALANCE_NOTIFICATION_THRESHOLD": "0",
  "EMAIL": "",
  "EMAIL_HOST": "",
  "EMAIL_PORT": ,
  "EMAIL_USER": "",
  "EMAIL_PASSWORD": ""
}
```

Note: You can check `.env.example` to see how you have to save the variables

3- Once the node_modules are installed and you have your `secrets.json` file, run `npm run deploy`

## Project Architecture

### Endpoints

#### POST - Create tx

`/send-tx`
Parameters to send:

```
{
  to: Recipient Address (string),
  methodAbi: Method ABI (Object),
  parameters: Parameters of contract method (Array)
}
```

This is an example of how you should send the parameters:

```
{
  "to": "0xbcbFF059589c2c6A4530cb816EB398BC4096e923",
  "methodAbi": {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_beneficiary",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_lockingId",
        "type": "uint256"
      }
    ],
    "name": "redeem",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "reputation",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  "parameters": [0x6ebe4210302C28804fF1136706E5166D0F8852f2, 10]
}
```

##### GET - Retrieve provider address

`/address`

#### GET - Retrieve provider address balance

`/balance`
