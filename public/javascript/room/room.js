var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Modal from "../Common/modal.js";
import Nav from "../Common/nav.js";
const server = "http://13.209.148.137:80";
const modal = new Modal();
const nav = new Nav();
const id = document.querySelector("#user_id");
const roomTitleTag = document.querySelector(".create-form__title");
const roomPwTag = document.querySelector(".create-form__pw");
const roomMaxPersonnelTag = document.querySelector(".create-form__max");
const roomPersonnelTag = document.querySelector(".modal-room .personnel");
const allMyRoomKeyTag = document.querySelectorAll(".my-room .room_key");
const rootRoomTag = document.querySelector(".room-list");
const rootMyRoomTag = document.querySelector(".my-room-list");
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
    Delete(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let target = e.target;
            let room_key = target.parentNode.parentNode.querySelector(".room_id").value;
            let result = yield axios
                .delete("/room/myroom", {
                params: {
                    key: room_key,
                },
            })
                .catch((err) => {
                console.log(err);
            });
            if ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.res) {
                modal.MyRoomInfoHidden();
                return location.reload();
            }
        });
    }
    MyRoomJoin(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let target = e.target;
            let room_id = target.parentNode.parentNode.querySelector(".room_id").value;
            let pw = target.parentNode.parentNode.querySelector(".room-pw").value;
            let result = yield axios
                .post("/room/check", { room_id: room_id, pw: pw })
                .catch((err) => {
                return console.log(err);
            });
            if (!((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.res)) {
                return alert("비밀번호를 잘못 입력하셧습니다");
            }
            return nav.MovePageCalander();
        });
    }
    RoomJoin(e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let splitPersonnel = roomPersonnelTag === null || roomPersonnelTag === void 0 ? void 0 : roomPersonnelTag.innerHTML.split("/");
            if (!splitPersonnel) {
                return;
            }
            if (parseInt(splitPersonnel[0]) >= parseInt(splitPersonnel[1])) {
                return alert("정원초과");
            }
            let room_id = e.target.parentNode.parentNode.querySelector(".room_id").value;
            let pw = e.target.parentNode.parentNode.querySelector(".room-pw").value;
            let roomCheckresult = yield axios
                .post("/room/check", { room_id: room_id, pw: pw })
                .catch((err) => {
                return console.log(err);
            });
            if (!((_a = roomCheckresult === null || roomCheckresult === void 0 ? void 0 : roomCheckresult.data) === null || _a === void 0 ? void 0 : _a.res)) {
                return alert("비밀번호가 틀립니다.");
            }
            for (let id of allMyRoomKeyTag) {
                if (id instanceof HTMLInputElement && id.value === room_id) {
                    return nav.MovePageCalander();
                }
            }
            let roomJoinResult = yield axios
                .post("/room/join", {
                room_id: room_id,
                user_id: id === null || id === void 0 ? void 0 : id.value,
            })
                .catch((err) => {
                return console.log(err);
            });
            if ((_b = roomJoinResult === null || roomJoinResult === void 0 ? void 0 : roomJoinResult.data) === null || _b === void 0 ? void 0 : _b.res) {
                return nav.MovePageCalander();
            }
        });
    }
    GetAllRoomList() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield axios.get("/room/show/all").catch((err) => {
                console.log(err);
            });
            if (!(result === null || result === void 0 ? void 0 : result.data)) {
                return console.log(result);
            }
            for (let i = 0; i < result.data.length; i++) {
                let make_room = document.createElement("div");
                make_room.setAttribute("class", "room");
                make_room.innerHTML = `
        <input type="hidden" value="${result.data[i].room_id}" class="room_key" /><p class="room__name">${result.data[i].title}</p><p class="room__now">${result.data[i].nowpeople}/${result.data[i].people}</p>
        `;
                (_a = make_room.querySelector(".room__name")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                    modal.RoomSetInfo(e);
                    modal.RoomShow();
                });
                rootRoomTag === null || rootRoomTag === void 0 ? void 0 : rootRoomTag.appendChild(make_room);
            }
        });
    }
    GetAllMyRoomList() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield axios.get("/room/show/my").catch((err) => {
                return console.log(err);
            });
            if (!(result === null || result === void 0 ? void 0 : result.data)) {
                return console.log(result);
            }
            for (let i = 0; i < result.data.length; i++) {
                let make_room = document.createElement("div");
                make_room.classList.add("my-room");
                make_room.innerHTML = `
        <input type="hidden" value="${result.data[i].room_id}" class="room_key" /><p class="my-room__name">${result.data[i].title}</p><p class="my-room__now">${result.data[i].nowpeople}/${result.data[i].people}</p>`;
                (_a = make_room
                    .querySelector(".my-room__name")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
                    modal.MyRoomSetInfo(e);
                    modal.MyRoomInfoShow();
                });
                rootMyRoomTag === null || rootMyRoomTag === void 0 ? void 0 : rootMyRoomTag.appendChild(make_room);
            }
        });
    }
}
export default RoomController;
