function MovePageSignup() {
  location.href = "page/signup";
}

function Login(event) {
  event.preventDefault();
  let info = {
    user_id: $(".login-form__id").val(),
    user_pw: $(".login-form__pw").val(),
  };

  if (!info.user_id || !info.user_pw) {
    return alert("정보를 모두 입력해주세요");
  }

  axios
    .post("/check/login", info)
    .then((response) => {
      switch (response.data.msg) {
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
    })
    .catch((err) => {
      alert("에러 발생");
      console.log(err);
    });
}
