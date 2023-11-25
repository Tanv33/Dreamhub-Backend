const express = require("express");
const { tokenVerification, adminVerification } = require("../middleware");
const userType = require("./user-type");
const auth = require("./auth");
const user = require("./user");
const token = require("./check-token");
const admin = require("./admin");
const metadata = require("./nft-metadata");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/user-type", userType);
router.use("/auth", auth);
router.use("/user", user);
router.use("/token", token);
router.use("/admin", adminVerification, admin);
router.use("/nft-metadata", metadata);

module.exports = router;
