var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const server = "http://13.209.148.137:80";
const server = "localhost";
const idInput = document.querySelector(".login-form__id");
const pwInput = document.querySelector(".login-form__pw");
class Login {
    constructor() { }
    DoLoginCheck(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            let info = {
                user_id: idInput === null || idInput === void 0 ? void 0 : idInput.value,
                user_pw: pwInput === null || pwInput === void 0 ? void 0 : pwInput.value,
            };
            if (!info.user_id || !info.user_pw) {
                return alert("정보를 모두 입력해주세요");
            }
            let result = yield axios.post(`/user/login`, info).catch((err) => {
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
        });
    }
}
export default Login;
