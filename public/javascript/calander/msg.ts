import { Socket } from "socket.io";

const userId: HTMLInputElement | null = document.querySelector("#user_id");
const roomId: HTMLInputElement | null = document.querySelector("#room_id");
const userName: HTMLInputElement | null = document.querySelector("#userName");
const userImg: HTMLImageElement | null =
  document.querySelector(".user-info > img");
const chatScroll = document.querySelector(".chatList__msg");
const inputMsgTag: HTMLInputElement | null =
  document.querySelector(".chatWrite__input");

class MsgController {
  socket;
  constructor(socket: Socket) {
    this.socket = socket;
  }
  SocketJoin(): void {
    this.socket.emit("joinRoom", {
      roomId: roomId?.value,
      userName: userName?.value,
    });
  }
  SocketLeave(): void {
    this.socket.emit("leaveRoom", {
      roomId: roomId?.value,
      userName: userName?.value,
    });
  }
  PostMsgSocket(e: { preventDefault: () => void }) {
    if (!inputMsgTag?.value) {
      return alert("메세지를 입력해주세요");
    }
    this.socket.emit("chat-msg", {
      roomId: roomId?.value,
      userName: userName?.value,
      msg: inputMsgTag?.value,
      imgSrc: userImg?.src,
      userId: userId?.value,
    });
    inputMsgTag.value = "";
    if (chatScroll instanceof HTMLElement) {
      chatScroll.scrollTop = chatScroll?.scrollHeight;
    }
    return e.preventDefault();
  }
}

export default MsgController;
