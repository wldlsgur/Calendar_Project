function ShowImage(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    $("#user_image").attr("src", e.target.result);
  };
  reader.readAsDataURL(file);
}

function SignUp(event) {
  event.preventDefault();
  if ($("#sameId__sameIdCb").is(":checked") === false) {
    return alert("중복확인을 해주세요");
  }
  let info = {
    id: $(".form-input__id").val(),
    pw: $(".form-input__pw").val(),
    name: $(".form-input__name").val(),
  };
  if (!info.id || !info.pw || !info.name) {
    return alert("요구사항을 모두 입력해주세요");
  }
  axios
    .post(`/user/insert`, info)
    .then((response) => {
      if (response.data.res === true) {
        if ($("#image").val()) {
          //이미지 선택됬으면 이미지 통신 실행
          const formData = new FormData();
          const imagefile = document.querySelector("#image");
          formData.append("image", imagefile.files[0]);
          axios
            .post(`/uploadimage/${info.id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
              if (response.data.res === true) {
                alert("사진 회원가입 성공");
                return (location.href = "/");
              }
            })
            .catch((err) => {
              alert("사진 업로드 실패");
            });
        } else {
          alert("회원가입 성공");
          return (location.href = "/");
        }
      }
    })
    .catch((error) => {
      alert("회원가입 실패");
      console.log(error);
    });
}

function SameIdCheck() {
  let inputId = $(".form-input__id").val();
  if (!inputId) {
    $(this).prop("checked", false);
    return alert("아이디를 입력해주세요");
  }

  axios
    .get(`/check/sameid/${inputId}`)
    .then((response) => {
      if (response.data.res === false) {
        $(this).prop("checked", false);
        return alert("중복된 아이디 입니다");
      }
      $(this).prop("disabled", true);
      return alert("사용 가능한 아이디 입니다");
    })
    .catch((err) => {
      return alert("에러 발생");
    });
}

function InitCheckBox() {
  let checkid = $("#sameId__sameIdCb");
  if ($(checkid).is(":checked") === true) {
    $(checkid).prop("disabled", false);
    return $(checkid).prop("checked", false);
  }
}
