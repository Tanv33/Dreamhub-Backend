const Joi = require("joi");
const {
  findOne,
  updateDocument,
  insertNewDocument,
  getAggregate,
  
} = require("../../../helpers");

const schemaQuery = Joi.object({
  nft_tokenId: Joi.string().required(),
  tokenAddress: Joi.string().required(),
  chain: Joi.string(),
});
const schema1Body = Joi.object({
  nftId: Joi.string(),
  id: Joi.string().required(),
  actualPrice: Joi.string(),
  minimumBid: Joi.string(),
  bidGap: Joi.string(),
  startDate: Joi.number(),
  endDate: Joi.number(),
  nftType: Joi.string().valid("mint", "sell", "auction", "bid").required(),
});

const sellNFT = async (req, res) => {
  try {
    // await schemaQuery.validateAsync(req.query);
    // await schema1Body.validateAsync(req.body);
    const { nftType, actualPrice } = req.body;
    const { nft_tokenId, tokenAddress, chain, nftId, id } = req.query;
    // const singleNft = await findOne("nft", {
    //   nft_tokenId,
    //   tokenAddress: new RegExp(tokenAddress, "i"),
    // });
    // console.log(singleNft);
    // if (!singleNft) {

    //   const createNftInDb = await insertNewDocument("nft", {
    //     nft_chain_id: chain,
    //     nft_tokenId: newData?.token_id,
    //     tokenAddress: newData?.token_address,
    //     owner: req.userId,
    //     royality: "0",
    //     ...req.body,
    //   });
    //   req.body.nftId = createNftInDb?._id;
    // }

    const findUser = await findOne("user", { _id: id });
    if (!findUser) {
      return res
        .status(404)
        .send({ status: 404, message: "No user found with your given id" });
    }

    const findNFT = await findOne("nft", {
      _id: nftId.toString(),
      owner: id,
    });

    if (!findNFT) {
      return res.status(404).send({ status: 404, message: "No NFT Found" });
    }

    const checkNftOnMint = await findOne("nft", {
      _id: nftId.toString(),
      owner: id,
      mintType: "mint",
    });

    if (!checkNftOnMint) {
      return res
        .status(404)
        .send({ status: 404, message: "This nft is already on sell" });
    }

    const sell = await updateDocument(
      "nft",
      { _id: nftId.toString() },
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
        nftType,
        actualPrice,
        // created_by: id,
        // owner: id,
      }
    );

    const history = await insertNewDocument("history", {
      nft_id: nftId.toString(),
      action: nftType,
      from: id,
      price: req?.body?.actualPrice,
    });

    return res.status(200).send({ status: 200, sell });
  } catch (e) {
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = sellNFT;
