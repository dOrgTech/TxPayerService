import express from "express";

import { sender } from "../controllers";
import {
  checkWeb3Connection,
  checkAccountBalance,
  tryContractMethod
} from "../web3";
import { handleFunds } from "../email";

const router = express.Router();

router.post(
  "/send-tx",
  checkWeb3Connection,
  checkAccountBalance,
  handleFunds,
  tryContractMethod,
  sender
);

export default router;
