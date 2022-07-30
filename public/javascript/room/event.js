const modal_create_room = $(".create-room");
const user_id = document.querySelector("#user_id").value;

var CreateRoom = {
  Show: function () {
    modal_create_room.css("display", "block");
  },
  Hidden: function () {
    modal_create_room.css("display", "none");
  },
  Create: function (event) {
    event.preventDefault();
    let info = {
      user_id: $("#user_id").val(),
      title: $(".create-form__title").val(),
      pw: $(".create-form__pw").val(),
      people: $(".create-form__max").val(),
    };
    axios
      .post("/room/make", info)
      .then((response) => {
        if (response.data.res === true) {
          CreateRoom.Hidden();
          alert("방 생성 완료!");
          return location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        return alert("방 생성 실패!");
      });
  },
};

var room = {
  root_all_room: document.querySelector(".room-list"),
  root_myall_room: document.querySelector(".my-room-list"),
  all_room: () => {
    axios
      .get("/room/show/all")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.setAttribute("class", "room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" />
          <p class="room__name">${response.data[i].title}</p>
          <p class="room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>
          `;
          room.root_all_room.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  all_my_room: () => {
    axios
      .get("/room/show/my")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.setAttribute("class", "my-room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" />
          <p class="my-room__name">${response.data[i].title}</p>
          <p class="my-room__now">${response.data[i].nowpeople} / ${response.data[i].people}</p>
          `;
          room.root_myall_room.appendChild(make_room);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
$(".header__add").click(CreateRoom.Show);
$(".create-form__exit").click(CreateRoom.Hidden);
$(".create-form__create").click(CreateRoom.Create);
$(document).ready(function () {
  room.all_room();
  room.all_my_room();
});
