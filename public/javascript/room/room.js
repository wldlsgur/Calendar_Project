var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Modal from "../Common/modal";
const server = "http://13.209.148.137:80";
const modal = new Modal();
const id = document.querySelector("#user_id");
const roomTitleTag = document.querySelector(".create-form__title");
const roomPwTag = document.querySelector(".create-form__pw");
const roomMaxPersonnelTag = document.querySelector(".create-form__max");
class RoomController {
    constructor() { }
    Post(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(roomTitleTag === null || roomTitleTag === void 0 ? void 0 : roomTitleTag.value) ||
                !(roomPwTag === null || roomPwTag === void 0 ? void 0 : roomPwTag.value) ||
                !(roomMaxPersonnelTag === null || roomMaxPersonnelTag === void 0 ? void 0 : roomMaxPersonnelTag.value)) {
                return alert("모두 정보를 입력하세요");
            }
            if (!parseInt(roomMaxPersonnelTag === null || roomMaxPersonnelTag === void 0 ? void 0 : roomMaxPersonnelTag.value)) {
                return alert("인원은 숫자로 입력해주세요");
            }
            let result = yield axios
                .post("/room/make", {
                user_id: id === null || id === void 0 ? void 0 : id.value,
                title: roomTitleTag.value,
                pw: roomPwTag.value,
                people: roomMaxPersonnelTag.value,
            })
                .catch((err) => {
                return console.log(err);
            });
            if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.res) {
                modal.CreateRoomHidden();
                e.preventDefault();
                return location.reload();
            }
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
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" /><p class="room__name">${response.data[i].title}</p><p class="room__now">${response.data[i].nowpeople}/${response.data[i].people}</p>
          `;
                make_room
                    .querySelector(".room__name")
                    .addEventListener("click", modalRoom.Show);
                this.room.appendChild(make_room);
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
    all_my_room() {
        axiosModule
            .params("http://13.209.148.137:80/room/show/my", "get", null)
            .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                let make_room = document.createElement("div");
                make_room.classList.add("my-room");
                make_room.innerHTML = `
          <input type="hidden" value="${response.data[i].room_id}" class="room_key" /><p class="my-room__name">${response.data[i].title}</p><p class="my-room__now">${response.data[i].nowpeople}/${response.data[i].people}</p>`;
                make_room
                    .querySelector(".my-room__name")
                    .addEventListener("click", (e) => {
                    modal.MyRoomSetInfo(e);
                    modal.MyRoomInfoShow();
                });
                this.myRoom.appendChild(make_room);
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
class modal_room {
    constructor() { }
    Show(e) {
        let modal = document.querySelector(".modal-room");
        modal.querySelector(".room_id").value = e.target.previousSibling.value;
        modal.querySelector(".title").innerHTML = e.target.innerHTML;
        modal.querySelector(".room-pw").value = "";
        modal.querySelector(".personnel").innerHTML =
            e.target.nextSibling.innerHTML;
        modal.style.display = "block";
    }
    Hidden() {
        document.querySelector(".modal-room").style.display = "none";
    }
    Join(e) {
        let personnel = document.querySelector(".modal-room .personnel").innerHTML;
        let splitPersonnel = personnel.split("/");
        let allRoomId = document.querySelectorAll(".my-room .room_key");
        if (parseInt(splitPersonnel[0]) < parseInt(splitPersonnel[1])) {
            let roomInfo = {
                room_id: e.target.parentNode.parentNode.querySelector(".room_id").value,
                pw: e.target.parentNode.parentNode.querySelector(".room-pw").value,
            };
            //이미 참여상태인지도
            axiosModule
                .body("http://13.209.148.137:80/room/check", "post", roomInfo)
                .then((res) => {
                if (res.data.res === true) {
                    for (let id of allRoomId) {
                        if (id.value === roomInfo.room_id) {
                            return (location.href =
                                "http://13.209.148.137:80/page/calander");
                        }
                    }
                    axiosModule
                        .body("http://13.209.148.137:80/room/join", "post", {
                        room_id: roomInfo.room_id,
                        user_id: document.querySelector("#user_id").value,
                    })
                        .then((res) => {
                        if (res.data.res === true) {
                            return (location.href =
                                "http://13.209.148.137:80/page/calander");
                        }
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    return alert("비밀번호가 틀립니다.");
                }
            })
                .catch((err) => {
                console.log(err);
            });
        }
        else {
            alert("정원초과");
        }
    }
}
class modal_myroom {
    constructor() { }
    Show(e) {
        let modal = document.querySelector(".modal-myroom");
        modal.querySelector(".room_id").value = e.target.previousSibling.value;
        modal.querySelector(".title").innerHTML = e.target.innerHTML;
        modal.querySelector(".room-pw").value = "";
        modal.querySelector(".personnel").innerHTML =
            e.target.nextSibling.innerHTML;
        modal.style.display = "block";
    }
    Join(e) {
        let roomInfo = {
            room_id: e.target.parentNode.parentNode.querySelector(".room_id").value,
            pw: e.target.parentNode.parentNode.querySelector(".room-pw").value,
        };
        axiosModule
            .body("http://13.209.148.137:80/room/check", "post", roomInfo)
            .then((res) => {
            if (res.data.res) {
                alert("방 참여 성공");
                return (location.href = "http://13.209.148.137:80/page/calander");
            }
            alert("비밀번호를 잘못 입력하셧습니다");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    Delete(e) {
        let target = e.target;
        let room_key = target.parentNode.parentNode.querySelector(".room_id").value;
        axiosModule
            .params("http://13.209.148.137:80/room/myroom", "delete", {
            key: room_key,
        })
            .then((res) => {
            alert("방 삭제 성공");
            modalMyroom.Hidden();
            return location.reload();
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
export default RoomController;
