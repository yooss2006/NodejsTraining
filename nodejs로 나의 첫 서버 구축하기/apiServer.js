const http = require("http");
http
  .createServer((req, res) => {
    //요청에 맞게 다른 기능을 하는 것을 라우팅이라 한다.
    if (req.url === "/") {
      res.writeHead(200);
      res.end("main url");
    } else if (req.url === "/upload") {
      res.writeHead(200);
      res.end("upload url");
    } else if (req.url === "/delete") {
      res.writeHead(200);
      res.end("delete url");
      //설정해둔 라우팅에 없는 예외는 404에러를 발생한다.
    } else {
      res.writeHead(404);
      res.end("not found");
    }
  })
  .listen(3000, () => {
    console.log("3000번 포트 서버 접속완료");
  });
