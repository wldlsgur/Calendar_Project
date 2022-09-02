import Nav from "../Common/nav.js";

// const server = "http://13.209.148.137:80";
const nav: Nav = new Nav();
const idInput = <HTMLInputElement>document.querySelector(".login-form__id");
const pwInput = <HTMLInputElement>document.querySelector(".login-form__pw");

class Login {
  constructor() {}

  async DoLoginCheck(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!idInput?.value || !pwInput?.value) {
      return alert("정보를 모두 입력해주세요");
    }
    let result = await axios
      .post(`/user/login`, {
        user_id: idInput?.value,
        user_pw: pwInput?.value,
      })
      .catch((err: object) => {
        return console.log(err);
      });
    if (result?.data?.msg) {
      switch (result.data.msg) {
        case "not found":
          alert("등록된 사용가 없습니다");
          break;
        case "success":
          alert("로그인 성공!");
          nav.MovePageRoom();
          break;
        case "failed":
          alert("로그인 실패");
          break;
      }
    }
  }
}

export default Login;
