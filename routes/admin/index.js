const express = require("express");
const router = express.Router();

const user = require("./user");
const profile = require("./profile");
const nft = require("./nft");
const blog = require("./blog");
const roles = require("./roles");

router.use("/user", user);
router.use("/nft", nft);
router.use("/profile", profile);
router.use("/blog", blog);
router.use("/roles", roles);

module.exports = router;
