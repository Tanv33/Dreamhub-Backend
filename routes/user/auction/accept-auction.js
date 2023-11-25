const Joi = require("joi");
const {
  deleteManyDocument,
  updateDocument,
  findOne,
  insertNewDocument,
} = require("../../../helpers");

const schema = Joi.object({
  auction_id: Joi.string().required(),
  auctioner_id: Joi.string().required(),
});

const acceptAuction = async (req, res) => {
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
    const checkNft = await findOne("nft", { _id: check_auction.nft_id });
    const updateNft = await updateDocument(
      "nft",
      { _id: check_auction.nft_id },
      { owner: auctioner_id, nftType: "mint" }
    );
    const deleteAuctions = await deleteManyDocument("auction", {
      nft_id: check_auction.nft_id,
    });
    const history = await insertNewDocument("history", {
      nft_id: check_auction.nft_id,
      action: "transfer",
      from: checkNft.owner,
      price: check_auction.auction_price,
      to: auctioner_id,
    });
    req.io.emit(check_auction?.nft_id.valueOf() + "acceptauction", {
      auction: [],
    });
    return res
      .status(200)
      .send({ status: 200, message: "Auction accepted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = acceptAuction;
