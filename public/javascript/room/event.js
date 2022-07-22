const { response } = require("../../../app");

let modal_create_room = $(".create-room");

var CreateRoom = {
  Show: function () {
    modal_create_room.css("display", "block");
  },
  Hidden: function () {
    modal_create_room.css("display", "none");
  },
  Create: function () {
    let info = {
      user_id: $("#user_id").val(),
      title: $(".create-form__title").val(),
      pw: $(".create-form__pw").va(),
      max: $(".create-form__max").val(),
    };
    console.log(info);
    ajax("/room/make", info)
      .then((response) => {})
      .catch((err) => {});

    // 통신해서 만들고 방 리스트들 새로고침 하고 모달창 숨기기
  },
};
