// const Joi = require("joi");
const { insertNewDocument, findOne } = require("../../../helpers");
// const fs = require("fs");
const cloudinary = require("cloudinary").v2;
// const schema = Joi.object({
// 	blockHash: Joi.string().required()
// });

// Remove all the unnecessary code from the nft object
const createNft = async (req, res) => {
  try {
    // await schema.validateAsync(req.body);
    console.log(req.body);
    console.log(req.file);
    const _id = req.params.id;
    const findUser = await findOne("user", { _id });
    if (!findUser) {
      return res
        .status(404)
        .send({ status: 404, message: "No user found with your given id" });
    }
    if (!req.file) {
      return res
        .status(400)
        .send({ status: 400, message: "Image File missing" });
    }
    const nftImage = await cloudinary.uploader.upload(req.file.path);
    req.body.nftImg = nftImage.url;
    // fs.unlinkSync(req.file.path);
   
    const body = JSON.parse(req.body.body);
    const nft = await insertNewDocument("nft", {
      ...body,
      title: req?.body?.title,
      description: req?.body?.description,
      royality: req?.body?.royality,
      size: req?.body?.size,
      abstraction: req?.body?.abstraction,
      nft_chain_id: req?.body?.nft_chain_id,
      nft_tokenId: req?.body?.nft_tokenId,
      tokenAddress: req?.body?.tokenAddress,
      created_by: _id,
      owner: _id,
      nftImg: req?.body?.nftImg,
      // nftImg: nftImage.url,
      // nftImg: req?.file?.filename,
    });

    const mintHistory = await insertNewDocument("history", {
      nft_id: nft._id,
      action: "mint",
      from: req.userId,
    });
    // fs.unlinkSync(req.file.path);
    return res.status(200).send({ status: 200, nft });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = createNft;

// const Joi = require("joi");
// const { insertNewDocument, findOne } = require("../../../helpers");
// const { NFT_ABI, NFT_ADDRESS } = require("../../../lib");

// const schema = Joi.object({
// 	address: Joi.string().required()
// });

// const createNft = async (req, res) => {
// 	try {
// 		await schema.validateAsync(req.body);
// 		const { address } = req.body;
// 		const check_address = await req.web3.utils.isAddress(address);
// 		if (!check_address) {
// 			return res.status(400).send({
// 				status: 400,
// 				message: "Your provided address is not valid"
// 			});
// 		}
// 		const findUser = await findOne("user", { username: address });
// 		if (!findUser) {
// 			return res
// 				.status(404)
// 				.send({ status: 404, message: "No user found with your given address" });
// 		}
// 		const nft = await new req.web3.eth.Contract(NFT_ABI.abi, NFT_ADDRESS);
// 		console.log(nft);
// 		const data = await nft.methods.safeMint(address).send({ from: address });
// 		console.log(data);
// 		if (data) {
// 			const newNft = await insertNewDocument("nft", {
// 				...data,
// 				created_by: findUser._id
// 			});
// 			return res.status(200).send({ status: 200, newNft });
// 		} else {
// 			return res.status(400).send({ status: 400, message: "Error occurred while creating Nft" });
// 		}
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(400).send({ status: 400, message: e.message });
// 	}
// };
// module.exports = createNft;
