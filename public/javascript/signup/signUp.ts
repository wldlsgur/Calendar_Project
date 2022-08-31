// const server = "http://13.209.148.137:80";
const server = "localhost";
const selectImg = document.querySelector("#user_image");

class Image {
  constructor() {}
  ShowImage(input: EventTarget | null) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
      // 이미지 파일인지 검사 (생략)
      // FileReader 인스턴스 생성
      const reader = new FileReader();
      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        selectImg?.src = e.target.result;
      };
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.files[0]);
    }
  }
}

// function SignUp(e) {
//   e.preventDefault();
//   if ($("#sameId__sameIdCb").is(":checked") === false) {
//     return alert("중복확인을 해주세요");
//   }
//   let info = {
//     id: $(".form-input__id").val(),
//     pw: $(".form-input__pw").val(),
//     name: $(".form-input__name").val(),
//   };
//   if (!info.id || !info.pw || !info.name) {
//     return alert("요구사항을 모두 입력해주세요");
//   }
//   axios
//     .post(`http://13.209.148.137:80/user/insert`, info)
//     .then((response) => {
//       if (response.data.res === true) {
//         if ($("#image").val()) {
//           //이미지 선택됬으면 이미지 통신 실행
//           const formData = new FormData();
//           const imagefile = document.querySelector("#image");
//           formData.append("image", imagefile.files[0]);
//           axios
//             .post(`http://13.209.148.137:80/uploadimage/${info.id}`, formData, {
//               headers: { "Content-Type": "multipart/form-data" },
//             })
//             .then((response) => {
//               if (response.data.res === true) {
//                 alert("사진 회원가입 성공");
//                 return (location.href = "http://13.209.148.137:80");
//               }
//             })
//             .catch((err) => {
//               console.log(err);
//               alert("사진 업로드 실패");
//             });
//         } else {
//           alert("회원가입 성공");
//           return (location.href = "http://13.209.148.137:80");
//         }
//       }
//     })
//     .catch((error) => {
//       alert("회원가입 실패");
//       console.log(error);
//     });
// }

// function SameIdCheck() {
//   let inputId = $(".form-input__id").val();
//   if (!inputId) {
//     $(this).prop("checked", false);
//     return alert("아이디를 입력해주세요");
//   }

//   axios
//     .get(`http://13.209.148.137:80/check/sameid/${inputId}`)
//     .then((response) => {
//       if (response.data.res === false) {
//         $(this).prop("checked", false);
//         return alert("중복된 아이디 입니다");
//       }
//       $(this).prop("disabled", true);
//       return alert("사용 가능한 아이디 입니다");
//     })
//     .catch((err) => {
//       return alert("에러 발생");
//     });
// }

// function InitCheckBox() {
//   let checkid = $("#sameId__sameIdCb");
//   if ($(checkid).is(":checked") === true) {
//     $(checkid).prop("disabled", false);
//     return $(checkid).prop("checked", false);
//   }
// }

export default Image;
