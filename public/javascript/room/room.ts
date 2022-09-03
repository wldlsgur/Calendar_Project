import Modal from "../Common/modal.js";
import Nav from "../Common/nav.js";

const server = "http://13.209.148.137:80";
const modal: Modal = new Modal();
const nav: Nav = new Nav();
const id: HTMLInputElement | null = document.querySelector("#user_id");
const roomTitleTag: HTMLInputElement | null = document.querySelector(
  ".create-form__title"
);
const roomPwTag: HTMLInputElement | null =
  document.querySelector(".create-form__pw");
const roomMaxPersonnelTag: HTMLInputElement | null =
  document.querySelector(".create-form__max");
const roomPersonnelTag = document.querySelector(".modal-room .personnel");
const allMyRoomKeyTag = document.querySelectorAll(".my-room .room_key");
const rootRoomTag = document.querySelector(".room-list");
const rootMyRoomTag = document.querySelector(".my-room-list");
class RoomController {
  constructor() {}

  async Post(e: { preventDefault: () => void }) {
    if (
      !roomTitleTag?.value ||
      !roomPwTag?.value ||
      !roomMaxPersonnelTag?.value
    ) {
      return alert("모두 정보를 입력하세요");
    }
    if (!parseInt(roomMaxPersonnelTag?.value)) {
      return alert("인원은 숫자로 입력해주세요");
    }
    let result = await axios
      .post("/room/make", {
        user_id: id?.value,
        title: roomTitleTag.value,
        pw: roomPwTag.value,
        people: roomMaxPersonnelTag.value,
      })
      .catch((err: object) => {
        return console.log(err);
      });

    if (result?.data?.res) {
      modal.CreateRoomHidden();
      e.preventDefault();
      return location.reload();
    }
  }
  async Delete(e: { target: any }) {
    let target = e.target;
    let room_key = target.parentNode.parentNode.querySelector(".room_id").value;

    let result = await axios
      .delete("/room/myroom", {
        params: {
          key: room_key,
        },
      })
      .catch((err: object) => {
        console.log(err);
      });
    if (result?.data?.res) {
      modal.MyRoomInfoHidden();
      return location.reload();
    }
  }

  async MyRoomJoin(e: { target: any }) {
    let target = e.target;
    let room_id = target.parentNode.parentNode.querySelector(".room_id").value;
    let pw = target.parentNode.parentNode.querySelector(".room-pw").value;

    let result = await axios
      .post("/room/check", { room_id: room_id, pw: pw })
      .catch((err: object) => {
        return console.log(err);
      });
    if (!result?.data?.res) {
      return alert("비밀번호를 잘못 입력하셧습니다");
    }
    return nav.MovePageCalander();
  }

  async RoomJoin(e: any) {
    let splitPersonnel = roomPersonnelTag?.innerHTML.split("/");
    if (!splitPersonnel) {
      return;
    }
    if (parseInt(splitPersonnel[0]) >= parseInt(splitPersonnel[1])) {
      return alert("정원초과");
    }

    let room_id =
      e.target.parentNode.parentNode.querySelector(".room_id").value;
    let pw = e.target.parentNode.parentNode.querySelector(".room-pw").value;

    let roomCheckresult = await axios
      .post("/room/check", { room_id: room_id, pw: pw })
      .catch((err: object) => {
        return console.log(err);
      });

    if (!roomCheckresult?.data?.res) {
      return alert("비밀번호가 틀립니다.");
    }
    for (let id of allMyRoomKeyTag) {
      if (id instanceof HTMLInputElement && id.value === room_id) {
        return nav.MovePageCalander();
      }
    }
    let roomJoinResult = await axios
      .post("/room/join", {
        room_id: room_id,
        user_id: id?.value,
      })
      .catch((err: object) => {
        return console.log(err);
      });
    if (roomJoinResult?.data?.res) {
      return nav.MovePageCalander();
    }
  }

  async GetAllRoomList() {
    let result = await axios.get("/room/show/all").catch((err: object) => {
      console.log(err);
    });
    if (!result?.data) {
      return console.log(result);
    }
    for (let i = 0; i < result.data.length; i++) {
      let make_room = document.createElement("div");
      make_room.setAttribute("class", "room");
      make_room.innerHTML = `
        <input type="hidden" value="${result.data[i].room_id}" class="room_key" /><p class="room__name">${result.data[i].title}</p><p class="room__now">${result.data[i].nowpeople}/${result.data[i].people}</p>
        `;
      make_room.querySelector(".room__name")?.addEventListener("click", (e) => {
        modal.RoomSetInfo(e);
        modal.RoomShow();
      });
      rootRoomTag?.appendChild(make_room);
    }
  }

  async GetAllMyRoomList() {
    let result = await axios.get("/room/show/my").catch((err: object) => {
      return console.log(err);
    });
    if (!result?.data) {
      return console.log(result);
    }
    for (let i = 0; i < result.data.length; i++) {
      let make_room = document.createElement("div");
      make_room.classList.add("my-room");
      make_room.innerHTML = `
        <input type="hidden" value="${result.data[i].room_id}" class="room_key" /><input type="hidden" value="${result.data[i].chief}" class="room_chief" /><p class="my-room__name">${result.data[i].title}</p><p class="my-room__now">${result.data[i].nowpeople}/${result.data[i].people}</p>`;
      make_room
        .querySelector(".my-room__name")
        ?.addEventListener("click", (e) => {
          modal.MyRoomSetInfo(e);
          modal.MyRoomInfoShow();
        });
      rootMyRoomTag?.appendChild(make_room);
    }
  }
}

export default RoomController;
