const express = require("express");
const { tokenVerification } = require("../../../middleware");
const buyNft = require("./buy-nft");
const getAllNFTOnSell = require("./get-all-on-sell");
const getUserNFTOnSell = require("./get-user-nft-on-sell");
const removeFromSell = require("./remove-from-sell");
const sellNFT = require("./sell-nft");

const router = express.Router();

router.get("/get-all", getAllNFTOnSell);
router.post("/create", tokenVerification, sellNFT);
router.get("/get-user-nfts-on-sell/:id", getUserNFTOnSell);
router.put("/buy-nft", tokenVerification, buyNft);
router.delete("/remove-from-sell", removeFromSell);

module.exports = router;
