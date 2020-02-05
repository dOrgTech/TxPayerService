import express from "express";

import { address } from "../controllers";
import { checkWeb3Connection } from "../utils/web3";

const router = express.Router();

router.get("/address", checkWeb3Connection, address);

export default router;
