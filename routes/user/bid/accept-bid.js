const Joi = require("joi");
const {
  deleteManyDocument,
  updateDocument,
  findOne,
  insertNewDocument,
} = require("../../../helpers");

const schema = Joi.object({
  bid_id: Joi.string().required(),
  bidder_id: Joi.string().required(),
});

const acceptBid = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { bid_id, bidder_id } = req.body;
    const check_bid = await findOne("bid", {
      _id: bid_id,
      bidder_id,
    });
    if (!check_bid) {
      return res.status(404).send({ status: 404, message: "no bid found" });
    }
    const updateNft = await updateDocument(
      "nft",
      { _id: check_bid.nft_id },
      { owner: bidder_id, nftType: "mint" }
    );
    const deleteBids = await deleteManyDocument("bid", {
      nft_id: check_bid.nft_id,
    });
    const history = await insertNewDocument("history", {
      nft_id: check_bid.nft_id,
      action: "offer accepted",
      from: req.userId,
      price: check_bid.bid_price,
      to: bidder_id,
    });
    req.io.emit(check_bid?.nft_id.valueOf() + "acceptbid", { bid: [] });
    return res
      .status(200)
      .send({ status: 200, message: "Bid accepted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = acceptBid;
