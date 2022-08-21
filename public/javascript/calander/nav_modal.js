var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Axios from "/javascript/common/axios.js";
const axiosModule = new Axios();
class Nav {
    constructor() { }
    ShowHidden() {
        let menu = document.querySelector(".menubar");
        if (menu instanceof Element) {
            if (menu.style.display === "block") {
                menu.style.display = "none";
            }
            else {
                menu.style.display = "block";
            }
        }
    }
    HrefHome() {
        location.href = "/";
    }
    HrefPageRoom() {
        location.href = "/page/room";
    }
}
class Modal {
    constructor() { }
    ShowComment() {
        let commentModal = document.querySelector(".modalComment");
        if (commentModal instanceof Element) {
            commentModal.style.display = "block";
        }
    }
    HiddenComment() {
        let commentModal = document.querySelector(".modalComment");
        if (commentModal instanceof Element) {
            commentModal.style.display = "none";
        }
    }
    SubmitCommnet() {
        return __awaiter(this, void 0, void 0, function* () {
            const date = document.querySelector(".commentForm__date");
            const content = document.querySelector(".commentForm__content");
            let submitInfo = {};
            let modal = new Modal();
            if (date instanceof Element && content instanceof Element) {
                if (!date.value || !content.value) {
                    return alert("요구사항을 모두 입력해주세요");
                }
                else {
                    submitInfo.date = date.value;
                    submitInfo.content = content.value;
                    let response = yield axiosModule.body("/calander", "post", submitInfo);
                    if (response.data.res) {
                        alert("작성 성공");
                    }
                    else {
                        alert("작성 실패");
                    }
                    return modal.HiddenComment();
                }
            }
        });
    }
}
export { Nav, Modal };
