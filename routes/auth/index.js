const express = require("express");
const { tokenVerification } = require("../../middleware");
const adminLogin = require("./admin-auth/login");
const adminSignup = require("./admin-auth/signup");
const loginUser = require("./login");
const signup = require("./signup");
// const addWalletAddress = require("./signup/add-wallet-address");
const signupWithEmail = require("./signup/signup-with-email");

const router = express.Router();

// User
router.post("/register", signup);
router.post("/register/email", signupWithEmail);
router.post("/login", loginUser);
// router.get("/register/metamask/:username", tokenVerification, addWalletAddress);

// Admin
router.post("/admin/register", adminSignup);
router.post("/admin/login", adminLogin);

module.exports = router;
