const Joi = require("joi");
const { findOne, deleteDocument } = require("../../../helpers");

const schema = Joi.object({
  auction_id: Joi.string().required(),
  auctioner_id: Joi.string().required(),
});

const cancelAuction = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { auction_id, auctioner_id } = req.body;
    const check_auction = await findOne("auction", {
      _id: auction_id,
      auctioner_id,
    });
    if (!check_auction) {
      return res.status(404).send({ status: 404, message: "no auction found" });
    }
    const cancelAuction = await deleteDocument("auction", { _id: auction_id });
    req.io.emit(check_auction?.nft_id.valueOf() + "cancelauction", {
      id: auction_id,
    });
    return res.status(200).send({
      status: 200,
      cancelAuction,
      message: "Auction canceled successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = cancelAuction;
