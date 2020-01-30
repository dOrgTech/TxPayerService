import express from "express";

import { sender } from "../controllers";
import {
  checkWeb3Connection,
  checkAccountBalance,
  calculateGas
} from "../web3";
import { handleFunds } from "../email";

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
