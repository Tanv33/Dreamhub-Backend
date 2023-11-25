const Joi = require("joi");
const {
  insertNewDocument,
  deleteDocument,
  findOne,
  updateDocument,
} = require("../../../helpers");

const schema = Joi.object({
  sellId: Joi.string().required(),
  id: Joi.string().required(),
});

const buyNft = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { sellId, id } = req.query;
    const findUser = await findOne("user", { _id: id });
    if (!findUser) {
      return res
        .status(404)
        .send({ status: 404, message: "No user found with your given id" });
    }
    const findNFT = await findOne("nft", { _id: sellId });
    if (!findNFT) {
      return res.status(404).send({ status: 404, message: "No NFT Found" });
    }
    const checkOnSell = await findOne("nft", {
      _id: sellId,
      nftType: { $in: ["sell", "bid"] },
    });
    if (!checkOnSell) {
      return res
        .status(404)
        .send({ status: 404, message: "This nft is not on sell" });
    }
    // await deleteDocument("sell", { _id: sellId });
    // const nft = await insertNewDocument("nft", {
    //   ...req.body,
    //   created_by: id,
    // });
    const nft = await updateDocument(
      "nft",
      { _id: sellId },
      {
        ...req.body,
        events: {
          ...findNFT.events,
          ...req.body.events,
          _BuyMarketItem: [
            ...(findNFT?.events?._BuyMarketItem || []),
            ...([req.body?.events?._BuyMarketItem] || []),
          ],
        },
        nftType: "mint",
        // created_by: id,
        owner: id,
      }
    );
    const history = await insertNewDocument("history", {
      nft_id: sellId,
      action: "transfer",
      from: findNFT.owner,
      price: findNFT.actualPrice,
      to: req.userId,
    });
    return res.status(200).send({ status: 200, nft });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = buyNft;
// getting null in arrat
