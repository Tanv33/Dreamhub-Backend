const Joi = require("joi");
const { findOne, getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  nft_tokenId: Joi.string().required(),
  tokenAddress: Joi.string().required(),
  chain: Joi.string(),
});

const getSingleNft = async (req, res) => {
  try { 
    // await schema.validateAsync(req.query);
    // const { nft_tokenId, tokenAddress, chain } = req.query;
    // console.log({ nft_tokenId, tokenAddress, chain });
    const singleNft = await getAggregate("nft", [
      {
        $match: {
          _id: ObjectID(req.params.id),
          // nft_tokenId,
          // tokenAddress: new RegExp(tokenAddress, "i"),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerObject",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "creatorObject",
        },
      },
    ]);

    return res
      .status(200)
      .json({ status: 200, singleNft: singleNft[0], moralis: false });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getSingleNft;
