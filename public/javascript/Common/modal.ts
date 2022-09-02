const createRoom = document.querySelector(".create-room");
const myRoom = document.querySelector(".modal-myroom");
const myRoomId: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".room_id");
const myRoomTitle: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".title");
const myRoomPw: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".room-pw");
const myRoomPersonnel: HTMLInputElement | null | undefined =
  myRoom?.querySelector(".personnel");

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
}

export default Modal;
