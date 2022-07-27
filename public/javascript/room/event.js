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
