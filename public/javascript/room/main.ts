import Modal from "../Common/modal";
import RoomController from "./room";

const modal: Modal = new Modal();
const roomController: RoomController = new RoomController();
const modalMyroom = new modal_myroom();
const modalRoom = new modal_room();
const creatRoom = new CreateRoom(document.querySelector(".create-room"));
const room = new Room(
  document.querySelector(".room-list"),
  document.querySelector(".my-room-list")
);

// 이벤트 등록
window.onload = () => {
  room.all_room();
  room.all_my_room();
};
document
  .querySelector(".header__add")
  ?.addEventListener("click", modal.CreateRoomShow);
document
  .querySelector(".create-form__exit")
  ?.addEventListener("click", modal.CreateRoomHidden);
document
  .querySelector(".create-form__create")
  ?.addEventListener("click", roomController.Post);
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
  } else {
    menu.style.display = "block";
  }
});
document
  .querySelector(".menulist__logout")
  .addEventListener("click", function () {
    location.href = "http://13.209.148.137:80";
  });
