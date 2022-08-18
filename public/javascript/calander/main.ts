import test from "/javascript/calander/onload.js";
const today: Date = new Date();
let week = new Array(
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일"
);
let year: string = String(today.getFullYear()); // 년도
let month: string = String(today.getMonth() + 1); // 월
let date: string = String(today.getDate()); // 날짜
let day: string = String(today.getDay()); // 요일

window.onload = (): void => {
  let nowDate = document.querySelector(".header__title");
  if (nowDate instanceof Element) {
    nowDate.innerHTML = `${year}년 ${month}월 ${date}일`;
  }

  let calander = document.querySelector(".table-calander");

  let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  console.log(firstDay.getDay()); //1일 기준 요일 결과 값은 int형

  let tag = "<tr>";
  let cnt = 0;
  for (let i = 0; i < firstDay.getDay(); i++) {
    //요일 int만큼 빈 값 넣어준다.
    tag += `<th></th>`;
    cnt++;
  }

  let allDay: number = new Date(
    today.getFullYear(),
    today.getMonth(),
    0
  ).getDate();
  console.log(allDay);
  for (let i = 1; i <= allDay; i++) {
    if (cnt % 7 == 0) {
      tag += "<tr>";
    }
    tag += `<td>${i}</td>`;
    cnt++;
  }
};
