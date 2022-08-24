import Axios from "/javascript/common/axios.js";
const axiosModule = new Axios();
class Nav {
  constructor() {}

  ShowHidden(): void {
    let menu = document.querySelector(".menubar");
    if (menu instanceof Element) {
      if (menu.style.display === "block") {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
    }
  }
  HrefHome(): void {
    location.href = "/";
  }
  HrefPageRoom(): void {
    location.href = "/page/room";
  }
}

class Modal {
  constructor() {}
  ShowComment() {
    let commentModal = document.querySelector(".modalComment");
    if (commentModal instanceof Element) {
      commentModal.style.display = "block";
    }
  }
  HiddenCommentDetail() {
    let delSubmitBtn = document.querySelector(
      ".modalCommentInfo .commentForm__btn--submit"
    );
    if (delSubmitBtn instanceof Element) {
      delSubmitBtn.style.display = "none";
    }
    let commentModal = document.querySelector(".modalCommentInfo");
    if (commentModal instanceof Element) {
      commentModal.style.display = "none";
    }
  }
  HiddenComment() {
    let modalInfo = document.querySelector(".modalComment");
    if (modalInfo instanceof Element) {
      modalInfo.style.display = "none";
    }
  }
  async SubmitCommnet(): Promise<void> {
    const date = document.querySelector(".commentForm__date");
    const content = document.querySelector(".commentForm__content");
    let submitInfo = {};
    let modal = new Modal();
    if (date instanceof Element && content instanceof Element) {
      if (!date.value || !content.value) {
        return alert("요구사항을 모두 입력해주세요");
      } else {
        submitInfo.date = date.value;
        submitInfo.content = content.value;
        let response = await axiosModule.body("/calander", "post", submitInfo);
        if (response.data.res) {
          alert("작성 성공");
        } else {
          alert("작성 실패");
        }
        return modal.HiddenComment();
      }
    }
  }
}
export { Nav, Modal };
