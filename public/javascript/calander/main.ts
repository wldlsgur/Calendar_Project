import { Nav, Modal } from "/javascript/calander/nav_modal.js";
import calanderController from "./content.js";

const week = new Array(
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일"
);
const nav = new Nav();
const modal = new Modal();
let today: Date = new Date();

document
  .querySelector(".header__menu")
  ?.addEventListener("click", nav.ShowHidden);
document
  .querySelector(".menulist__logout")
  ?.addEventListener("click", nav.HrefHome);
document
  .querySelector(".menulist__room")
  ?.addEventListener("click", nav.HrefPageRoom);
// navEvent

document
  .querySelector(".header__add")
  ?.addEventListener("click", modal.ShowComment);
document
  .querySelector(".commentForm__btn--exit")
  ?.addEventListener("click", modal.HiddenComment);
document
  .querySelector(".commentForm__btn--submit")
  ?.addEventListener("click", modal.SubmitCommnet);
// modalEvent
function SetCalander() {
  initCalander();
  let calandercontroller = new calanderController(today);
  calandercontroller.getContent();
}
document.querySelector(".bi-caret-left")?.addEventListener("click", () => {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  SetCalander();
});
document.querySelector(".bi-caret-right")?.addEventListener("click", () => {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  SetCalander();
});
window.onload = () => {
  SetCalander();
};
// calanderEvent

function initCalander(): void {
  if (document.querySelector(".table-calander__tbody")) {
    document.querySelector(".table-calander__tbody")?.remove();
  }
  let year: string = String(today.getFullYear()); // 년도
  let month: string = String(today.getMonth() + 1); // 월

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

  let allDay: number = new Date(
    today.getFullYear(),
    today.getMonth(),
    0
  ).getDate();

  for (let i = 1; i <= allDay; i++) {
    if (cnt % 7 === 0) {
      calander?.appendChild(tag);
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
  calander?.appendChild(tag);
  table?.appendChild(calander);
}
