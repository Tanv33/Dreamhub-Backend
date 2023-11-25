const { findOneAndSelect, getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getProfile = async (req, res) => {
	try {
		const _id = req.params.id;
		// let user = await findOneAndSelect(
		// 	"user",
		// 	{
		// 		_id
		// 	},
		// 	"-followers -following"
		// );
		let user = await getAggregate("user", [
			{
				$match: {
					_id: ObjectID(_id)
				}
			},
			{
				$addFields: {
					lengthOfFollowers: {
						$size: "$followers"
					},
					lengthOfFollowing: {
						$size: "$following"
					}
				}
			},
			{
				$project: {
					following: 0,
					followers: 0
				}
			}
		]);
		if (!user[0]) {
			return res.status(404).send({ status: 404, message: "No User Found" });
		}
		return res.status(200).send({ status: 200, user });
	} catch (e) {
		console.log(e);
		return res.status(400).send({ status: 400, message: e.message });
	}
};

module.exports = getProfile;
