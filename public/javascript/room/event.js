import Axios from "/javascript/common/axios.js";
class CreateRoom {
  constructor() {}
  Show() {
    document.querySelector(".create-room").style.display = "block";
  }
  Hidden() {
    document.querySelector(".create-room").style.display = "none";
  }
  Create(event) {
    event.preventDefault();
    let info = {
      user_id: $("#user_id").val(),
      title: $(".create-form__title").val(),
      pw: $(".create-form__pw").val(),
      people: $(".create-form__max").val(),
    };
    axiosModule
      .body("/room/make", "post", info)
      .then((response) => {
        if (response.data.res === true) {
          creatRoom.Hidden();
          alert("방 생성 완료!");
          return location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        return alert("방 생성 실패!");
      });
  }
}

class Room {
  constructor(rootRoom, rootMyRoom) {
    this.room = rootRoom;
    this.myRoom = rootMyRoom;
  }

  all_room() {
    axiosModule
      .params("/room/show/all", "get", null)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.setAttribute("class", "room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" />
          <p class="room__name">${response.data[i].title}</p>
          <p class="room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>
          `;
          this.room.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  all_my_room() {
    axiosModule
      .params("/room/show/my", "get", null)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.classList.add("my-room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" /><p class="my-room__name">${response.data[i].title}</p><p class="my-room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>`;
          make_room
            .querySelector(".my-room__name")
            .addEventListener("click", modalMyroom.Show);
          this.myRoom.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
class modal_myroom {
  constructor() {}
  Show(e) {
    let modal = document.querySelector(".modal-myroom");
    modal.querySelector(".room_id").value = e.target.previousSibling.value;
    modal.querySelector(".title").innerHTML = e.target.innerHTML;
    modal.querySelector(".personnel").innerHTML =
      e.target.nextSibling.innerHTML;
    modal.style.display = "block";
  }
  Hidden() {
    document.querySelector(".modal-myroom").style.display = "none";
  }
  Delete(e) {
    let target = e.target;
    let room_key = target.parentNode.parentNode.querySelector(".room_id").value;

    axiosModule
      .params("/room/myroom", "delete", { key: room_key })
      .then((res) => {
        alert("방 삭제 성공");
        // $(".my-room-list").load(location.href + ".my-room-list");
        modalMyroom.Hidden();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// 클래스 생성
const modalMyroom = new modal_myroom();
const axiosModule = new Axios(); //ajax 모듈화 클래스
const creatRoom = new CreateRoom(document.querySelector(".create-room"));
const room = new Room(
  document.querySelector(".room-list"),
  document.querySelector(".my-room-list")
);

// 이벤트 등록
$(document).ready(function () {
  room.all_room();
  room.all_my_room();
});
$(".header__add").click(creatRoom.Show);
$(".create-form__exit").click(creatRoom.Hidden);
$(".create-form__create").click(creatRoom.Create);
document
  .querySelector(".room-btn__exit")
  .addEventListener("click", modalMyroom.Hidden);
document
  .querySelector(".room-btn__delete")
  .addEventListener("click", modalMyroom.Delete);
