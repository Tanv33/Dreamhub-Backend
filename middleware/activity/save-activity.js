const { insertNewDocument } = require("../../helpers");

const saveActivity = async (req, res, action) => {
  try {
    const activity = await insertNewDocument("activity", {
      user_id: req.userId,
      date: new Date().getTime(),
      action,
    });
    req?.io?.to(req.userId).emit("activity", activity);
    // console.log("2");
    return;
  } catch (e) {
    console.log(e);
    // return res.status(500).json({ status: 500, message: e.message });
    return;
  }
};

module.exports = saveActivity;
