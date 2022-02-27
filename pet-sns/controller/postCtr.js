const Post = require("../model/post");

const formatDate = (date) => {
  let d = new Date(date);
  //getMonth()는 0-1월 1-2월 이므로 + 1을 해서
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = "" + d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

const postCtr = {
  upload: async (req, res) => {
    //게시글 생성하는 파트
    const { title, content } = req.body;
    const image = req.file.location;
    //formatDate 는 날짜 데이터를 yyyy-mm-dd의 형식으로 만들어주는 함수이다.
    const publishedDate = formatDate(new Date());
    const post = new Post({
      title: title,
      content: content,
      image: image,
      publishedDate: publishedDate,
      user: req.userInfo,
    });
    try {
      await post.save();
      res.redirect("/");
    } catch (error) {
      res.status(500).send("upload error!!");
    }
  },

  list: async (req, res) => {
    //메인 화면에서 게시글 조회해 나열하는 파트
    const posts = await Post.find({});
    res.render("index", { postList: posts });
  },

  detail: async (req, res) => {
    //게시글 클릭시 게시물 상세페이지 화면
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("detail", { post: post });
  },
  updateLayout: async (req, res) => {
    // 글 수정으로 수정하려면 원래 게시글의 정보를 불러와 화면에 표시후 수정하는 것이므로 게시글 정보를 불러온다.
    const { id } = req.params;
    const post = await Post.findById(id);
    res.render("update", { post: post });
  },
  update: async (req, res) => {
    //게시물 수정기능
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      await Post.findByIdAndUpdate(
        id,
        {
          title: title,
          content: content,
        },
        {
          new: true,
        }
      );
      res.redirect("/");
    } catch (error) {
      res.status(500).send("update error!!");
    }
  },
  delete: async (req, res) => {
    //게시물 삭제
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("delete error!!");
    }
  },
};
module.exports = postCtr;
