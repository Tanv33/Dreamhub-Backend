const mongoose = require("mongoose");
const schemaType = require("../../types");

const nftSchema = new mongoose.Schema(
  {
    title: {
      type: schemaType.TypeString,
    },
    description: {
      type: schemaType.TypeString,
    },
    nftImg: {
      type: schemaType.TypeString,
    },
    blockHash: {
      type: schemaType.TypeString,
    },
    blockNumber: {
      type: schemaType.TypeNumber,
    },
    contractAddress: {
      type: schemaType.TypeString,
    },
    cumulativeGasUsed: {
      type: schemaType.TypeNumber,
    },
    effectiveGasPrice: {
      type: schemaType.TypeNumber,
    },
    from: {
      type: schemaType.TypeString,
    },
    gasUsed: {
      type: schemaType.TypeNumber,
    },
    logsBloom: {
      type: schemaType.TypeString,
    },
    status: {
      type: schemaType.TypeBoolean,
    },
    to: {
      type: schemaType.TypeString,
    },
    transactionHash: {
      type: schemaType.TypeString,
    },
    transactionIndex: {
      type: schemaType.TypeNumber,
    },
    type: {
      type: schemaType.TypeString,
    },
    events: {
      // Transfer: {
      // 	address: {
      // 		type: schemaType.TypeString
      // 	},
      // 	blockHash: {
      // 		type: schemaType.TypeString
      // 	},
      // 	blockNumber: {
      // 		type: schemaType.TypeNumber
      // 	},
      // 	event: {
      // 		type: schemaType.TypeString
      // 	},
      // 	id: {
      // 		type: schemaType.TypeString
      // 	},
      // 	logIndex: {
      // 		type: schemaType.TypeNumber
      // 	},
      // 	raw: {
      // 		data: {
      // 			type: schemaType.TypeString
      // 		},
      // 		topics: {
      // 			type: schemaType.TypeArray
      // 		}
      // 	},
      // 	removed: {
      // 		type: schemaType.TypeBoolean
      // 	},
      // 	returnValues: {
      // 		0: {
      // 			type: schemaType.TypeString
      // 		},
      // 		1: {
      // 			type: schemaType.TypeString
      // 		},
      // 		2: {
      // 			type: schemaType.TypeString
      // 		},
      // 		from: {
      // 			type: schemaType.TypeString
      // 		},
      // 		to: {
      // 			type: schemaType.TypeString
      // 		},
      // 		tokenId: {
      // 			type: schemaType.TypeString
      // 		}
      // 	},
      // 	signature: {
      // 		type: schemaType.TypeString
      // 	},
      // 	transactionHash: {
      // 		type: schemaType.TypeString
      // 	},
      // 	transactionIndex: {
      // 		type: schemaType.TypeNumber
      // 	}
      // }
    },
    pinataImgUrl: {
      type: schemaType.TypeString,
    },
    pinataMetaDataUrl: {
      type: schemaType.TypeString,
    },
    actualPrice: {
      type: schemaType.TypeString,
    },
    royality: {
      type: schemaType.TypeString,
    },
    size: {
      type: schemaType.TypeString,
    },
    nft_tokenId: {
      type: schemaType.TypeString,
    },
    abstraction: {
      type: schemaType.TypeString,
    },
    created_by: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    owner: {
      type: schemaType.ObjectID,
      ref: "user",
    },
    minimumBid: {
      type: schemaType.TypeString,
    },
    bidGap: {
      type: schemaType.TypeString,
    },
    // startDate: {
    //   type: schemaType.TypeDate,
    // },
    // endDate: {
    //   type: schemaType.TypeDate,
    // },
    startDate: {
      type: schemaType.TypeNumber,
    },
    tokenAddress: {
      type: schemaType.TypeString,
    },
    endDate: {
      type: schemaType.TypeNumber,
    },
    nft_chain_id: {
      type: schemaType.TypeString,
    },
    nftType: {
      type: schemaType.TypeString,
      default: "mint",
      enum: ["mint", "sell", "auction", "bid"],
    },
  },
  { timestamps: true }
);

module.exports = nftSchema;
