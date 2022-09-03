const createRoom = document.querySelector(".create-room");
const menuBarTag = document.querySelector(".menubar");

const myRoom = document.querySelector(".modal-myroom");
const myRoomId: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".room_id");
const myRoomTitle: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".title");
const myRoomPw: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".room-pw");
const myRoomPersonnel: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".personnel");

const room = document.querySelector(".modal-room");
const roomId: HTMLInputElement | null | undefined =
  room?.querySelector(".room_id");
const roomTitle: HTMLInputElement | null | undefined =
  room?.querySelector(".title");
const roomPw: HTMLInputElement | null | undefined =
  room?.querySelector(".room-pw");
const roomPersonnel: HTMLInputElement | null | undefined =
  room?.querySelector(".personnel");
class Modal {
  constructor() {}
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
  MyRoomSetInfo(e: any) {
    if (
      myRoomId instanceof HTMLInputElement &&
      myRoomTitle instanceof HTMLInputElement &&
      myRoomPw instanceof HTMLInputElement &&
      myRoomPersonnel instanceof HTMLInputElement
    ) {
      myRoomId.value = e?.target?.previousSibling?.value;
      myRoomTitle.innerHTML = e?.target?.innerHTML;
      myRoomPw.value = "";
      myRoomPersonnel.innerHTML = e?.target?.nextSibling?.innerHTML;
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
  RoomSetInfo(e: any) {
    if (
      roomId instanceof HTMLInputElement &&
      roomTitle instanceof HTMLInputElement &&
      roomPw instanceof HTMLInputElement &&
      roomPersonnel instanceof HTMLInputElement
    ) {
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
}

export default Modal;