// const server = "http://13.209.148.137:80";
const server = "localhost";
const img = document.querySelector("#image");
const imgBox = document.querySelector("#user_image");
class Image {
    constructor() { }
    ShowImage() {
        let reader = new FileReader();
        reader.onload = function (e) {
            if (e.target) {
                imgBox.src = String(e.target.result);
            }
        };
        reader.readAsDataURL(img === null || img === void 0 ? void 0 : img.files[0]);
    }
}
class SignUP {
    constructor() { }
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
