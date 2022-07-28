let modal_create_room = $(".create-room");

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
          return alert("방 생성 완료!");
        }
      })
      .catch((err) => {
        console.log(err);
        return alert("방 생성 실패!");
      });
    CreateRoom.Hidden();
    // 통신해서 만들고 방 리스트들 새로고침 하고 모달창 숨기기
  },
};

var room = {
  root_room: document.querySelector(".room-list"),
  all_room: () => {
    axios
      .get("/room/show/all")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let make_room = document.createElement("div");
          make_room.setAttribute("class", "room");
          make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" placeholder="room_id" />
          <p class="room__name">${response.data[i].title}</p>
          <div class="room__btn">
            <button class="room__join">정원 : ${response.data[i].people}</button>
          </div>
          `;
          room.root_room.appendChild(make_room);
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
$(document).ready(room.all_room);
/* <div class="room">
  <p class="room__name">그냥</p>
  <div class="room__btn">
    <button class="room__join">O</button>
  </div>
</div>; */
