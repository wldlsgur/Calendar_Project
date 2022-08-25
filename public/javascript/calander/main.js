var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
const roomId = (_a = document.querySelector("#room_id")) === null || _a === void 0 ? void 0 : _a.value;
const userName = (_b = document.querySelector("#userName")) === null || _b === void 0 ? void 0 : _b.value;
(_c = document
    .querySelector(".header__menu")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", nav.ShowHidden);
(_d = document
    .querySelector(".menulist__logout")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", nav.HrefHome);
(_e = document
    .querySelector(".menulist__room")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", nav.HrefPageRoom);
// navEvent
(_f = document
    .querySelector(".header__add")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", modal.ShowComment);
(_g = document
    .querySelector(".commentForm__btn--exit")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", modal.HiddenComment);
(_h = document
    .querySelector(".commentForm__btn--submit")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", modal.SubmitCommnet);
(_j = document
    .querySelector(".modalCommentInfo .commentForm__btn--exit")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", modal.HiddenCommentDetail);
(_k = document
    .querySelector(".modalCommentInfo .commentForm__btn--submit")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", staticCC.DeleteContent);
// modalEvent
function SetCalander() {
    initCalander();
    let calandercontroller = new calanderController(today);
    calandercontroller.getContent();
}
(_l = document.querySelector(".bi-caret-left")) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    SetCalander();
});
(_m = document.querySelector(".bi-caret-right")) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    SetCalander();
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
    let trCnt = 0; //행 몇 줄인지 카운트
    let dayTr = document.createElement("tr");
    for (let i in week) {
        let dayTd = document.createElement("td");
        dayTd.setAttribute("class", "dayOfWeek");
        dayTd.innerHTML = week[i];
        dayTr.appendChild(dayTd);
    }
    calander.appendChild(dayTr); //월화수목금 입력
    let tag = document.createElement("tr");
    trCnt++;
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
            trCnt++;
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
function SocketJoin() {
    socket.emit("joinRoom", roomId, userName);
}
socket.on("joinRoom", (userName) => {
    console.log("소켓 on 실행");
    let root = document.querySelector(".chatList__msg");
    let joinmsg = document.createElement("div");
    joinmsg.innerHTML = `${userName}님 입장`;
    root === null || root === void 0 ? void 0 : root.appendChild(joinmsg);
});
