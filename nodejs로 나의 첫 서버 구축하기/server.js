//http 서버를 좀 더 쉽게 구축할 수 있게 해주는 패키지
const http = require("http");
http
  .createServer((req, res) => {
    //req - 요청, res - 응답
    //res를 보낼 때 header를 통해 상태코드(200)와 어떤 타입인지를 전송한다.
    res.writeHead(200, { "Content-Type": "text/html" });
    //200 : 응답을 잘 보냈을 때
    //404 : 해당 응답이 비정상

    //응답 보낼 코드 작성 res.end
    res.end("<p>hello world</p>");
  })
  //서버 완료시 콜백함수 실행
  .listen(3000, () => {
    console.log("3000번 포트 서버 접속완료");
  });
