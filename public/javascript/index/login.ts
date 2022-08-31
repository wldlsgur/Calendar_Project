// const server = "http://13.209.148.137:80";
const server = "localhost";
const idInput = <HTMLInputElement>document.querySelector(".login-form__id");
const pwInput = <HTMLInputElement>document.querySelector(".login-form__pw");

class Login {
  constructor() {}

  async DoLoginCheck(event: { preventDefault: () => void }) {
    event.preventDefault();
    let info = {
      user_id: idInput?.value,
      user_pw: pwInput?.value,
    };
    if (!info.user_id || !info.user_pw) {
      return alert("정보를 모두 입력해주세요");
    }
    let result = await axios.post(`/user/login`, info).catch((err: any) => {
      return console.log(err);
    });
    console.log(result);
    switch (result.data.msg) {
      case "not found":
        alert("등록된 사용가 없습니다");
        break;
      case "success":
        alert("로그인 성공!");
        location.href = "/page/room";
        break;
      case "failed":
        alert("로그인 실패");
        break;
    }
  }
}

export default Login;
