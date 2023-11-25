const express = require("express");
const profile = require("./profile");
const follow = require("./follow");
const search = require("./search");
const web3 = require("./web3");
const nft = require("./nft");
const sell = require("./sell");
const blog = require("./blog");
const bid = require("./bid");
const history = require("./history");
const auction = require("./auction");
const { tokenVerification } = require("../../middleware/token-verification");

const router = express.Router();

router.use("/profile", profile);
router.use("/follow", tokenVerification, follow);
router.use("/search", search);
router.use("/web3", web3);
router.use("/nft", nft);
router.use("/history", history);
router.use("/blog", blog);
router.use("/bid", bid);
router.use("/sell", sell);
router.use("/auction", auction);

module.exports = router;
