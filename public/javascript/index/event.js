function MovePageSignup() {
  location.href = "page/signup";
}

function Login() {
  let info = {
    id: $(".login-form__id").val(),
    pw: $(".login-form__pw").val(),
  };

  if (!info.id || !info.pw) {
    return alert("정보를 모두 입력해주세요");
  }

  // axios
  //   .post("/check/login", info)
  //   .then((response) => {})
  //   .catch((err) => {});
}
