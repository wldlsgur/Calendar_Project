const createRoom = document.querySelector(".create-room");
const myRoom = document.querySelector(".modal-myroom");
const myRoomId = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".room_id");
const myRoomTitle = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".title");
const myRoomPw = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".room-pw");
const myRoomPersonnel = myRoom === null || myRoom === void 0 ? void 0 : myRoom.querySelector(".personnel");
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
    MyRoomInfoShow() {
        if (myRoom instanceof HTMLElement) {
            myRoom.style.display = "block";
        }
    }
    MyRoomInfoHidden() {
        if (myRoom instanceof HTMLElement) {
            myRoom.style.display = "none";
        }
    }
    MyRoomSetInfo(e) {
        var _a, _b, _c, _d, _e;
        if (myRoomId instanceof HTMLInputElement &&
            myRoomTitle instanceof HTMLInputElement &&
            myRoomPw instanceof HTMLInputElement &&
            myRoomPersonnel instanceof HTMLInputElement) {
            myRoomId.value = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.previousSibling) === null || _b === void 0 ? void 0 : _b.value;
            myRoomTitle.innerHTML = (_c = e === null || e === void 0 ? void 0 : e.target) === null || _c === void 0 ? void 0 : _c.innerHTML;
            myRoomPw.value = "";
            myRoomPersonnel.innerHTML = (_e = (_d = e === null || e === void 0 ? void 0 : e.target) === null || _d === void 0 ? void 0 : _d.nextSibling) === null || _e === void 0 ? void 0 : _e.innerHTML;
        }
    }
}
export default Modal;
