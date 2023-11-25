const Joi = require("joi");
const {
  findOne,
  insertNewDocument,
  getAggregate,
} = require("../../../helpers");

const schema = Joi.object({
  nft_id: Joi.string().required(),
  bidder_id: Joi.string().required(),
  bidder_wallet_address: Joi.string().required(),
  bid_price: Joi.string().required(),
});

const placeABid = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { nft_id, bidder_id, bidder_wallet_address } = req.body;
    const check_nft = await findOne("nft", { _id: nft_id });
    if (!check_nft) {
      return res.status(404).send({ status: 404, message: "NFT not found" });
    }
    const check_bid_user = await findOne("user", { _id: bidder_id });
    if (!check_bid_user) {
      return res.status(404).send({ status: 404, message: "user not found" });
    }
    if (check_bid_user.username !== bidder_wallet_address) {
      return res
        .status(400)
        .send({ status: 400, message: "wallet address mismatch" });
    }
    const createBid = await insertNewDocument("bid", { ...req.body });
    const bid = await getAggregate("bid", [
      {
        $match: { _id: createBid._id },
      },
      {
        $lookup: {
          from: "users",
          localField: "bidder_id",
          foreignField: "_id",
          as: "bidderObject",
        },
      },
    ]);
    req.io.emit(nft_id + "placebid", { bid });
    return res
      .status(200)
      .send({ status: 200, createBid, message: "Bid placed successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = placeABid;
