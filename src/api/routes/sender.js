import express from "express";

import { sender } from "../controllers";
import {
  checkWeb3Connection,
  checkAccountBalance,
  calculateGas
} from "../utils/web3";
import { handleFunds } from "../utils/mailer";

const router = express.Router();

router.post(
  "/send-tx",
  checkWeb3Connection,
  checkAccountBalance,
  handleFunds,
  calculateGas,
  sender
);

export default router;
