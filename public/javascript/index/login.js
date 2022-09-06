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
const server = "http://13.209.148.137:80";
const nav = new Nav();
const idInput = document.querySelector(".login-form__id");
const pwInput = document.querySelector(".login-form__pw");
class Login {
    constructor() { }
    DoLoginCheck(event) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            if (!(idInput === null || idInput === void 0 ? void 0 : idInput.value) || !(pwInput === null || pwInput === void 0 ? void 0 : pwInput.value)) {
                return alert("정보를 모두 입력해주세요");
            }
            let result = yield axios
                .post(`${server}/user/login`, {
                user_id: idInput === null || idInput === void 0 ? void 0 : idInput.value,
                user_pw: pwInput === null || pwInput === void 0 ? void 0 : pwInput.value,
            })
                .catch((err) => {
                return console.log(err);
            });
            if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.msg) {
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
        });
    }
}
export default Login;
