var _a, _b, _c;
import Modal from "../Common/modal";
import RoomController from "./room";
const modal = new Modal();
const roomController = new RoomController();
const modalMyroom = new modal_myroom();
const modalRoom = new modal_room();
const creatRoom = new CreateRoom(document.querySelector(".create-room"));
const room = new Room(document.querySelector(".room-list"), document.querySelector(".my-room-list"));
// 이벤트 등록
window.onload = () => {
    room.all_room();
    room.all_my_room();
};
(_a = document
    .querySelector(".header__add")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", modal.CreateRoomShow);
(_b = document
    .querySelector(".create-form__exit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", modal.CreateRoomHidden);
(_c = document
    .querySelector(".create-form__create")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", roomController.Post);
document
    .querySelector(".modal-myroom .room-btn__exit")
    .addEventListener("click", modalMyroom.Hidden);
document
    .querySelector(".modal-myroom .room-btn__delete")
    .addEventListener("click", modalMyroom.Delete);
document
    .querySelector(".modal-myroom .room-btn__join")
    .addEventListener("click", modalMyroom.Join);
document
    .querySelector(".modal-room .room-btn__exit")
    .addEventListener("click", modalRoom.Hidden);
document
    .querySelector(".modal-room .room-btn__join")
    .addEventListener("click", modalRoom.Join);
document.querySelector(".header__menu").addEventListener("click", function () {
    let menu = document.querySelector(".menubar");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    }
    else {
        menu.style.display = "block";
    }
});
document
    .querySelector(".menulist__logout")
    .addEventListener("click", function () {
    location.href = "http://13.209.148.137:80";
});
