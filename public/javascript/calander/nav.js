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
                axiosModule
                    .body("/calander", "post", submitInfo)
                    .then((res) => {
                    if (res.date.res) {
                        alert("작성 성공!");
                        return modal.HiddenComment;
                    }
                })
                    .catch((err) => {
                    console.log(err);
                    return alert("작성 에러");
                });
            }
        }
    }
}
export { Nav, Modal };
