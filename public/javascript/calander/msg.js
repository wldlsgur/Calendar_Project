const userId = document.querySelector("#user_id");
const roomId = document.querySelector("#room_id");
const userName = document.querySelector("#userName");
const userImg = document.querySelector(".user-info > img");
const chatScroll = document.querySelector(".chatList__msg");
const inputMsgTag = document.querySelector(".chatWrite__input");
class MsgController {
    constructor(socket) {
        this.socket = socket;
    }
    SocketJoin() {
        this.socket.emit("joinRoom", {
            roomId: roomId === null || roomId === void 0 ? void 0 : roomId.value,
            userName: userName === null || userName === void 0 ? void 0 : userName.value,
        });
    }
    SocketLeave() {
        this.socket.emit("leaveRoom", {
            roomId: roomId === null || roomId === void 0 ? void 0 : roomId.value,
            userName: userName === null || userName === void 0 ? void 0 : userName.value,
        });
    }
    PostMsgSocket(e) {
        if (!(inputMsgTag === null || inputMsgTag === void 0 ? void 0 : inputMsgTag.value)) {
            return alert("메세지를 입력해주세요");
        }
        this.socket.emit("chat-msg", {
            roomId: roomId === null || roomId === void 0 ? void 0 : roomId.value,
            userName: userName === null || userName === void 0 ? void 0 : userName.value,
            msg: inputMsgTag === null || inputMsgTag === void 0 ? void 0 : inputMsgTag.value,
            imgSrc: userImg === null || userImg === void 0 ? void 0 : userImg.src,
            userId: userId === null || userId === void 0 ? void 0 : userId.value,
        });
        inputMsgTag.value = "";
        if (chatScroll instanceof HTMLElement) {
            chatScroll.scrollTop = chatScroll === null || chatScroll === void 0 ? void 0 : chatScroll.scrollHeight;
        }
        return e.preventDefault();
    }
}
export default MsgController;
