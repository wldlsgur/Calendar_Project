import Nav from "../Common/nav.js";

// const server = "http://13.209.148.137:80";
const nav = new Nav();
const img = document.querySelector("#image");
const imgBox = <HTMLImageElement>document.querySelector("#user_image");
const sameIdCheckBox = <HTMLInputElement>(
  document.querySelector("#sameId__sameIdCb")
);
const inputId = <HTMLInputElement>document.querySelector(".form-input__id");
const inputPw = <HTMLInputElement>document.querySelector(".form-input__pw");
const inputName = <HTMLInputElement>document.querySelector(".form-input__name");

class Image {
  constructor() {}
  ShowImage(): void {
    let reader: FileReader | null = new FileReader();
    reader.onload = function (e): void {
      if (e.target) {
        imgBox.src = String(e.target.result);
      }
    };
    reader.readAsDataURL(img?.files[0]);
  }
}

class SignUP {
  constructor() {}
  async doSignUp(e: { preventDefault: () => void }) {
    if (!sameIdCheckBox?.checked) {
      return alert("중복확인을 해주세요");
    }
    if (!inputId?.value || inputPw?.value || !inputName?.value) {
      return alert("요구사항을 모두 입력해주세요");
    }
    let userInfoInsertResult = await axios
      .post(`/user/insert`, {
        id: inputId?.value,
        pw: inputPw?.value,
        name: inputName?.value,
      })
      .catch((err: object) => {
        return console.log(err);
      });
    if (userInfoInsertResult?.data?.res) {
      if (img?.value) {
        const formData: FormData = new FormData();
        formData.append("image", img.files[0]);

        let imageInfoInsertResult = await axios
          .post(`/uploadimage/${inputId?.value}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch((err: object) => {
            return console.log(err);
          });

        if (imageInfoInsertResult?.data?.res) {
          alert("사진 등록 회원가입 성공");
        } else {
          alert("회원가입 성공");
        }
        e.preventDefault();
        return nav.MovePageSignup;
      }
    }
  }

  async SameIdCheck(this: any) {
    if (!inputId?.value) {
      this.checked = false;
      return alert("아이디를 입력해주세요");
    }
    let result = await axios
      .get(`/user/sameid/${inputId?.value}`)
      .catch((err: object) => {
        return console.log(err);
      });
    if (!result?.data?.res) {
      this.checked = false;
      return alert("중복된 아이디 입니다");
    }
    this.disabled = true;
    this.checked = true;
    return alert("사용 가능한 아이디 입니다");
  }

  InitCheckBox() {
    if (sameIdCheckBox.checked) {
      sameIdCheckBox.disabled = false;
      return (sameIdCheckBox.checked = false);
    }
  }
}

export { Image, SignUP };
