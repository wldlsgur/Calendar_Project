function ShowImage(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    $("#user_image").attr("src", e.target.result);
  };
  reader.readAsDataURL(file);
}

function SignUp(event) {
  //   event.preventDefault(); 새로고침 이벤트 제거
  if ($("#sameId__sameIdCb").is(":checked") === false) {
    return alert("중복확인을 해주세요");
  }

  let info = {
    id: $(".form-input__id").val(),
    pw: $(".form-input__pw").val(),
    name: $(".form-inpu__name").val(),
  };

  if (!info.id || !info.pw || !info.name) {
    return alert("요구사항을 모두 입력해주세요");
  }

  const file = document.getElementById("files");
  if (!file.value) {
  }

  const file2 = file.files[0].name;
  const idx = file2.indexOf(".");
  const fileFormatWithDot = file2.substring(idx); // 사진의 포맷임 이걸 DB에 저장해야한다
}

function SameIdCheck() {
  let inputId = $(".form-input__id").val();
  if (!inputId) {
    $(this).prop("checked", false);
    return alert("아이디를 입력해주세요");
  }
  $(this).prop("disabled", true);

  //   axios
  //     .get("/check/sameid", inputId)
  //     .then((response) => {
  //       if (response.res === false) {
  //         return alert("중복된 아이디 입니다");
  //       }
  //     })
  //     .catch((err) => {
  //       alert("에러 발생");
  //     });
}

function InitCheckBox() {
  let checkid = $("#sameId__sameIdCb");
  if ($(checkid).is(":checked") === true) {
    $(checkid).prop("disabled", false);
    return $(checkid).prop("checked", false);
  }
}
