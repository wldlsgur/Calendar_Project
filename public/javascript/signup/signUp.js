var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Nav from "../Common/nav.js";
import ServerController from "../Common/address.js";
const serverController = new ServerController();
const server = serverController.GetServerAddress();
const nav = new Nav();
const img = document.querySelector("#image");
const imgBox = document.querySelector("#user_image");
const sameIdCheckBox = (document.querySelector("#sameId__sameIdCb"));
const inputId = document.querySelector(".form-input__id");
const inputPw = document.querySelector(".form-input__pw");
const inputName = document.querySelector(".form-input__name");
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
    doSignUp(e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (!(sameIdCheckBox === null || sameIdCheckBox === void 0 ? void 0 : sameIdCheckBox.checked)) {
                return alert("중복확인을 해주세요");
            }
            if (!(inputId === null || inputId === void 0 ? void 0 : inputId.value) || !(inputPw === null || inputPw === void 0 ? void 0 : inputPw.value) || !(inputName === null || inputName === void 0 ? void 0 : inputName.value)) {
                return alert("요구사항을 모두 입력해주세요");
            }
            let userInfoInsertResult = yield axios
                .post(`${server}/user`, {
                id: inputId === null || inputId === void 0 ? void 0 : inputId.value,
                pw: inputPw === null || inputPw === void 0 ? void 0 : inputPw.value,
                name: inputName === null || inputName === void 0 ? void 0 : inputName.value,
            })
                .catch((err) => {
                return console.log(err);
            });
            if ((_a = userInfoInsertResult === null || userInfoInsertResult === void 0 ? void 0 : userInfoInsertResult.data) === null || _a === void 0 ? void 0 : _a.res) {
                if (img === null || img === void 0 ? void 0 : img.value) {
                    const formData = new FormData();
                    formData.append("image", img.files[0]);
                    let imageInfoInsertResult = yield axios
                        .post(`${server}/uploadimage/${inputId === null || inputId === void 0 ? void 0 : inputId.value}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    })
                        .catch((err) => {
                        return console.log(err);
                    });
                    if ((_b = imageInfoInsertResult === null || imageInfoInsertResult === void 0 ? void 0 : imageInfoInsertResult.data) === null || _b === void 0 ? void 0 : _b.res) {
                        alert("사진 등록 회원가입 성공");
                    }
                    else {
                        alert("회원가입 성공");
                    }
                    return nav.MovePageLogin();
                }
            }
        });
    }
    SameIdCheck() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(inputId === null || inputId === void 0 ? void 0 : inputId.value)) {
                this.checked = false;
                return alert("아이디를 입력해주세요");
            }
            let result = yield axios
                .get(`${server}/user/sameid/${inputId === null || inputId === void 0 ? void 0 : inputId.value}`)
                .catch((err) => {
                return console.log(err);
            });
            if (!((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.res)) {
                this.checked = false;
                return alert("중복된 아이디 입니다");
            }
            this.disabled = true;
            this.checked = true;
            return alert("사용 가능한 아이디 입니다");
        });
    }
    InitCheckBox() {
        if (sameIdCheckBox.checked) {
            sameIdCheckBox.disabled = false;
            return (sameIdCheckBox.checked = false);
        }
    }
}
export { Image, SignUP };
