const { find,getAggregate } = require("../../../helpers");

const getMintNft = async (req, res) => {
  try {
    const mintNfts = await getAggregate("nft", [
      {
        $match: {
          nftType: "mint"
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
    return res.status(200).send({ status: 200, mintNfts });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getMintNft;
