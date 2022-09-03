const createRoom = document.querySelector(".create-room");
const menuBarTag = document.querySelector(".menubar");
const myRoom = document.querySelector(".modal-myroom");
const myRoomId = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".room_id");
const myRoomCheif = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".room_cheif");
const myRoomTitle = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".title");
const myRoomPw = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".room-pw");
const myRoomPersonnel = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".personnel");
const myRoomDeleteBtnTag = document.querySelector(".room-btn__delete");
const room = document.querySelector(".modal-room");
const roomId = room === null || room === void 0 ? void 0 : room.querySelector(".room_id");
const roomTitle = room === null || room === void 0 ? void 0 : room.querySelector(".title");
const roomPw = room === null || room === void 0 ? void 0 : room.querySelector(".room-pw");
const roomPersonnel = room === null || room === void 0 ? void 0 : room.querySelector(".personnel");
const InputComment = document.querySelector(".modalComment");
const commentInfo = document.querySelector(".modalCommentInfo");
const commentInfoDelBtn = document.querySelector(".modalCommentInfo .commentForm__btn--submit");
class Modal {
    constructor() { }
    CreateRoomShow() {
        if (createRoom instanceof HTMLElement) {
            createRoom.style.display = "block";
        }
    }
    CreateRoomHidden() {
        if (createRoom instanceof HTMLElement) {
            createRoom.style.display = "none";
        }
    }
    MyRoomInfoDelBtnShow() {
        if (myRoomDeleteBtnTag instanceof HTMLElement) {
            myRoomDeleteBtnTag.style.display = "block";
        }
    }
    MyRoomInfoDelBtnHidden() {
        if (myRoomDeleteBtnTag instanceof HTMLElement) {
            myRoomDeleteBtnTag.style.display = "none";
        }
    }
    MyRoomInfoShow() {
        if (myRoom instanceof HTMLElement) {
            myRoom.style.display = "block";
            if (myRoomCheif instanceof HTMLInputElement &&
                myRoomCheif.value === "1") {
                return this.MyRoomInfoDelBtnShow();
            }
            this.MyRoomInfoDelBtnHidden();
        }
    }
    MyRoomInfoHidden() {
        if (myRoom instanceof HTMLElement) {
            myRoom.style.display = "none";
        }
    }
    MyRoomSetInfo(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (myRoomId instanceof HTMLInputElement &&
            myRoomCheif instanceof HTMLInputElement &&
            myRoomTitle instanceof HTMLElement &&
            myRoomPw instanceof HTMLInputElement &&
            myRoomPersonnel instanceof HTMLElement) {
            myRoomId.value = (_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.previousSibling) === null || _b === void 0 ? void 0 : _b.previousSibling) === null || _c === void 0 ? void 0 : _c.value;
            myRoomCheif.value = (_e = (_d = e === null || e === void 0 ? void 0 : e.target) === null || _d === void 0 ? void 0 : _d.previousSibling) === null || _e === void 0 ? void 0 : _e.value;
            myRoomTitle.innerHTML = (_f = e === null || e === void 0 ? void 0 : e.target) === null || _f === void 0 ? void 0 : _f.innerHTML;
            myRoomPw.value = "";
            myRoomPersonnel.innerHTML = (_h = (_g = e === null || e === void 0 ? void 0 : e.target) === null || _g === void 0 ? void 0 : _g.nextSibling) === null || _h === void 0 ? void 0 : _h.innerHTML;
        }
    }
    RoomHidden() {
        if (room instanceof HTMLElement) {
            room.style.display = "none";
        }
    }
    RoomShow() {
        if (room instanceof HTMLElement) {
            room.style.display = "block";
        }
    }
    RoomSetInfo(e) {
        if (roomId instanceof HTMLInputElement &&
            roomTitle instanceof HTMLElement &&
            roomPw instanceof HTMLInputElement &&
            roomPersonnel instanceof HTMLElement) {
            roomId.value = e.target.previousSibling.value;
            roomTitle.innerHTML = e.target.innerHTML;
            roomPw.value = "";
            roomPersonnel.innerHTML = e.target.nextSibling.innerHTML;
        }
    }
    MenuBarShow() {
        if (menuBarTag instanceof HTMLElement) {
            menuBarTag.style.display = "block";
        }
    }
    MenuBarHidden() {
        if (menuBarTag instanceof HTMLElement) {
            menuBarTag.style.display = "none";
        }
    }
    InputCommentShow() {
        if (InputComment instanceof HTMLElement) {
            InputComment.style.display = "block";
        }
    }
    InputCommentHidden() {
        if (InputComment instanceof HTMLElement) {
            InputComment.style.display = "none";
        }
    }
    CommnetInfoShow() {
        if (commentInfo instanceof HTMLElement) {
            commentInfo.style.display = "block";
        }
    }
    CommentInfoHidden() {
        if (commentInfo instanceof HTMLElement) {
            commentInfo.style.display = "none";
        }
    }
    CommentInfoDelBtnShow() {
        if (commentInfoDelBtn instanceof HTMLElement) {
            commentInfoDelBtn.style.display = "blcck";
        }
    }
    CommentInfoDelBtnHidden() {
        if (commentInfoDelBtn instanceof HTMLElement) {
            commentInfoDelBtn.style.display = "none";
        }
    }
}
export default Modal;
