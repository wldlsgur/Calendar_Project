var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
import { Nav, Modal } from "/javascript/calander/nav_modal.js";
import calanderController from "./content.js";
import personnelController from "./personnel.js";
const week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
let today = new Date();
const socket = io();
const nav = new Nav();
const modal = new Modal();
const personnelcontroller = new personnelController();
const staticCC = new calanderController(today);
const userId = (_a = document.querySelector("#user_id")) === null || _a === void 0 ? void 0 : _a.value;
const roomId = (_b = document.querySelector("#room_id")) === null || _b === void 0 ? void 0 : _b.value;
const userName = (_c = document.querySelector("#userName")) === null || _c === void 0 ? void 0 : _c.value;
(_d = document
    .querySelector(".header__menu")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", nav.ShowHidden);
(_e = document
    .querySelector(".menulist__logout")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", nav.HrefHome);
(_f = document
    .querySelector(".menulist__room")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", nav.HrefPageRoom);
// navEvent
(_g = document
    .querySelector(".header__add")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", modal.ShowComment);
(_h = document
    .querySelector(".commentForm__btn--exit")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", modal.HiddenComment);
(_j = document
    .querySelector(".commentForm__btn--submit")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", modal.SubmitCommnet);
(_k = document
    .querySelector(".modalCommentInfo .commentForm__btn--exit")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", modal.HiddenCommentDetail);
(_l = document
    .querySelector(".modalCommentInfo .commentForm__btn--submit")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", staticCC.DeleteContent);
// modalEvent
function SetCalander() {
    initCalander();
    let calandercontroller = new calanderController(today);
    calandercontroller.getContent();
}
(_m = document.querySelector(".bi-caret-left")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    SetCalander();
});
(_o = document.querySelector(".bi-caret-right")) === null || _o === void 0 ? void 0 : _o.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    SetCalander();
});
(_p = document.querySelector(".chatWrite")) === null || _p === void 0 ? void 0 : _p.addEventListener("submit", SendMsg);
(_q = document.querySelector(".chatWrite__input")) === null || _q === void 0 ? void 0 : _q.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        SendMsg(e);
    }
});
window.onload = () => {
    SetCalander();
    personnelcontroller.getDataOfServer();
    SocketJoin();
};
// calanderEvent
function initCalander() {
    var _a;
    if (document.querySelector(".table-calander__tbody")) {
        (_a = document.querySelector(".table-calander__tbody")) === null || _a === void 0 ? void 0 : _a.remove();
    }
    let year = String(today.getFullYear()); // 년도
    let month = String(today.getMonth() + 1); // 월
    let nowDate = document.querySelector(".header__title");
    if (nowDate instanceof Element) {
        nowDate.innerHTML = `${year}년 ${month}월`;
    } //title 현재 월 일
    let table = document.querySelector(".table-calander");
    let calander = document.createElement("tbody");
    calander.setAttribute("class", "table-calander__tbody");
    let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    let dayTr = document.createElement("tr");
    for (let i in week) {
        let dayTd = document.createElement("td");
        dayTd.setAttribute("class", "dayOfWeek");
        dayTd.innerHTML = week[i];
        dayTr.appendChild(dayTd);
    }
    calander.appendChild(dayTr); //월화수목금 입력
    let tag = document.createElement("tr");
    let cnt = 0;
    for (let i = 0; i < firstDay.getDay(); i++) {
        //요일 int만큼 빈 값 넣어준다.
        tag.innerHTML += `<td></td>`;
        cnt++;
    }
    let allDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    for (let i = 1; i <= allDay; i++) {
        if (cnt % 7 === 0) {
            calander === null || calander === void 0 ? void 0 : calander.appendChild(tag);
            tag = document.createElement("tr");
        }
        let td = document.createElement("td");
        let div = document.createElement("div");
        div.setAttribute("class", "day");
        div.innerHTML = String(i);
        td.appendChild(div);
        tag.appendChild(td);
        cnt++;
        if (i === allDay) {
            //마지막 빈칸
            while (true) {
                if (cnt % 7 === 0) {
                    break;
                }
                let td = document.createElement("td");
                tag.appendChild(td);
                cnt++;
            }
        }
    }
    calander === null || calander === void 0 ? void 0 : calander.appendChild(tag);
    table === null || table === void 0 ? void 0 : table.appendChild(calander);
}
function SendMsg(e) {
    var _a;
    e.preventDefault();
    let msg = document.querySelector(".chatWrite__input");
    if (!(msg === null || msg === void 0 ? void 0 : msg.value)) {
        return alert("메세지를 입력해주세요");
    }
    let imgSrc = (_a = document.querySelector(".user-info > img")) === null || _a === void 0 ? void 0 : _a.src;
    socket.emit("chat-msg", {
        roomId: roomId,
        userName: userName,
        msg: msg === null || msg === void 0 ? void 0 : msg.value,
        imgSrc: imgSrc,
        userId: userId,
    });
    msg.value = "";
    let chatscroll = document.querySelector(".chatList__msg");
    if (chatscroll instanceof Element) {
        chatscroll.scrollTop = chatscroll === null || chatscroll === void 0 ? void 0 : chatscroll.scrollHeight;
    }
}
function SocketJoin() {
    socket.emit("joinRoom", { roomId: roomId, userName: userName });
}
function SocketLeave() {
    socket.emit("leaveRoom", { roomId: roomId, userName: userName });
}
socket.on("joinRoom", (data) => {
    let root = document.querySelector(".chatList__msg");
    let joinmsg = document.createElement("div");
    joinmsg.setAttribute("class", "joinAndLeave");
    joinmsg.innerHTML = `${data.userName}님 입장`;
    root === null || root === void 0 ? void 0 : root.appendChild(joinmsg);
});
socket.on("leaveRoom", (data) => {
    let root = document.querySelector(".chatList__msg");
    let joinmsg = document.createElement("div");
    joinmsg.setAttribute("class", "joinAndLeave");
    joinmsg.innerHTML = `${data.userName}님 퇴장`;
    root === null || root === void 0 ? void 0 : root.appendChild(joinmsg);
});
socket.on("chat-msg", (data) => {
    let root = document.querySelector(".chatList__msg");
    let msg = document.createElement("div");
    if (data.userId === userId) {
        msg.setAttribute("class", "mymsg");
        let content = document.createElement("p");
        content.setAttribute("class", "mymsg__content");
        content.innerHTML = data.msg;
        msg.appendChild(content);
    }
    else {
        msg.setAttribute("class", "msg");
        let div2 = document.createElement("div");
        div2.setAttribute("class", "msg__NameAndContent");
        let img = document.createElement("img");
        img.setAttribute("class", "msg__img");
        img.setAttribute("src", data.imgSrc);
        let name = document.createElement("p");
        name.setAttribute("class", "msg__name");
        name.innerHTML = data.userName;
        let content = document.createElement("p");
        content.setAttribute("class", "msg__content");
        content.innerHTML = data.msg;
        div2.appendChild(img);
        div2.appendChild(name);
        msg.appendChild(div2);
        msg.appendChild(content);
    }
    root === null || root === void 0 ? void 0 : root.appendChild(msg);
});
export default SocketLeave;
