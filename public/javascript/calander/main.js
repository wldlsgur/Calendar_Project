var _a, _b, _c, _d, _e, _f, _g, _h;
import { Nav, Modal } from "/javascript/calander/nav_modal.js";
import calanderController from "./content.js";
const week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
const nav = new Nav();
const modal = new Modal();
let today = new Date();
(_a = document
    .querySelector(".header__menu")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", nav.ShowHidden);
(_b = document
    .querySelector(".menulist__logout")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", nav.HrefHome);
(_c = document
    .querySelector(".menulist__room")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", nav.HrefPageRoom);
// navEvent
(_d = document
    .querySelector(".header__add")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", modal.ShowComment);
(_e = document
    .querySelector(".commentForm__btn--exit")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", modal.HiddenComment);
(_f = document
    .querySelector(".commentForm__btn--submit")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", modal.SubmitCommnet);
// modalEvent
(_g = document.querySelector(".bi-caret-left")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    initCalander();
});
(_h = document.querySelector(".bi-caret-right")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    initCalander();
});
window.onload = () => {
    initCalander(); //초기 캘린더 화면
    let calandercontroller = new calanderController(today);
    calandercontroller.getContent();
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
    let tag = document.createElement("tr");
    let cnt = 0;
    for (let i = 0; i < firstDay.getDay(); i++) {
        //요일 int만큼 빈 값 넣어준다.
        tag.innerHTML += `<td></td>`;
        cnt++;
    }
    let allDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    for (let i = 1; i <= allDay; i++) {
        if (cnt % 7 == 0) {
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
    }
    calander === null || calander === void 0 ? void 0 : calander.appendChild(tag);
    table === null || table === void 0 ? void 0 : table.appendChild(calander);
}
