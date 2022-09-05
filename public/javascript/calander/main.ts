import Nav from "../Common/nav.js";
import Modal from "../Common/modal.js";
import CommentController from "./comment.js";
import CalanderController from "./calander.js";
import PersonnelController from "./personnel.js";
import MsgController from "./msg.js";

const socket = io();
let today: Date = new Date();

const nav: Nav = new Nav();
const modal: Modal = new Modal();
const commentController: CommentController = new CommentController();
const msgController: MsgController = new MsgController(socket);
const personnelcontroller: PersonnelController = new PersonnelController();
const calanderController: CalanderController = new CalanderController();
const menuBarTag = document.querySelector(".menubar");
const userId: HTMLInputElement | null = document.querySelector("#user_id");
const roomId: HTMLInputElement | null = document.querySelector("#room_id");
const userName: HTMLInputElement | null = document.querySelector("#userName");

window.onload = () => {
  CalanderViewSet();
  personnelcontroller.Get().then((result: object) => {
    if (result) {
      personnelcontroller.SetPersonnelCalander(result);
    }
    msgController.SocketJoin();
  });
};
document.querySelector(".header__menu")?.addEventListener("click", () => {
  if (menuBarTag instanceof HTMLElement) {
    if (menuBarTag.style.display === "block") {
      return modal.MenuBarHidden();
    }
    modal.MenuBarShow();
  }
});
document
  .querySelector(".menulist__logout")
  ?.addEventListener("click", nav.MovePageLogin);
document
  .querySelector(".menulist__room")
  ?.addEventListener("click", nav.MovePageRoom);

document
  .querySelector(".header__add")
  ?.addEventListener("click", modal.InputCommentShow);
document
  .querySelector(".commentForm__btn--exit")
  ?.addEventListener("click", modal.InputCommentHidden);
document
  .querySelector(".commentForm__btn--submit")
  ?.addEventListener("click", commentController.Post);
document
  .querySelector(".modalCommentInfo .commentForm__btn--exit")
  ?.addEventListener("click", modal.CommentInfoHidden);
document
  .querySelector(".modalCommentInfo .commentForm__btn--submit")
  ?.addEventListener("click", commentController.Delete);
document.querySelector(".bi-caret-left")?.addEventListener("click", () => {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  CalanderViewSet();
});
document.querySelector(".bi-caret-right")?.addEventListener("click", () => {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  CalanderViewSet();
});
document
  .querySelector(".chatWrite")
  ?.addEventListener("submit", msgController.PostMsgSocket);
document
  .querySelector(".chatWrite__input")
  ?.addEventListener("keyup", (e: any) => {
    if (e.keyCode === 13) {
      msgController.PostMsgSocket(e);
    }
  });

function CalanderViewSet() {
  calanderController.SetCalanderDate(today);
  commentController.Get(today).then((result) => {
    if (result) {
      commentController.SetCommentCalander(result);
    }
  });
}

socket.on("joinRoom", (data: any) => {
  let root = document.querySelector(".chatList__msg");
  let joinmsg = document.createElement("div");
  joinmsg.setAttribute("class", "joinAndLeave");
  joinmsg.innerHTML = `${data.userName}님 입장`;
  root?.appendChild(joinmsg);
});

socket.on("leaveRoom", (data: any) => {
  let root = document.querySelector(".chatList__msg");
  let joinmsg = document.createElement("div");
  joinmsg.setAttribute("class", "joinAndLeave");
  joinmsg.innerHTML = `${data.userName}님 퇴장`;
  root?.appendChild(joinmsg);
});

socket.on(
  "chat-msg",
  (data: { userName: string; userId: any; imgSrc: string; msg: string }) => {
    console.log("Hi");
    let root = document.querySelector(".chatList__msg");
    let msg = document.createElement("div");

    if (data.userId === userId) {
      msg.setAttribute("class", "mymsg");

      let content = document.createElement("p");
      content.setAttribute("class", "mymsg__content");
      content.innerHTML = data.msg;

      msg.appendChild(content);
    } else {
      msg.setAttribute("class", "msg");

      let div2 = document.createElement("div");
      div2.setAttribute("class", "msg__NameAndContent");

      let img = document.createElement("img");
      img.setAttribute("class", "msg__img");
      img.setAttribute("src", data.imgSrc);

      let name = document.createElement("p");
      name.setAttribute("class", "msg__name");
      name.innerHTML = data.userName;

      let content = document.createElement("p");
      content.setAttribute("class", "msg__content");
      content.innerHTML = data.msg;

      div2.appendChild(img);
      div2.appendChild(name);

      msg.appendChild(div2);
      msg.appendChild(content);
    }
    root?.appendChild(msg);
  }
);
