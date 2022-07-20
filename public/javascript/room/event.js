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
      title: $(".create-form__title").val(),
      pw: $(".create-form__pw").va(),
      max: $(".create-form__max").val(),
    };

    // 통신해서 만들고 방 리스트들 새로고침 하고 모달창 숨기기
  },
};
