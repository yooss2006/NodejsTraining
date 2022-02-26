const post = require("../model/post");
const postCtr = {
  upload: async (req, res) => {
    const { tilte, content } = req.body;
    const image = req.file;
    console.log(image);
  },
};

module.exports = postCtr;
