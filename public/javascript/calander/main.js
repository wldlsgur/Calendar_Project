const today = new Date();
const week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
let year = String(today.getFullYear()); // 년도
let month = String(today.getMonth() + 1); // 월
let date = String(today.getDate()); // 날짜
let day = String(today.getDay()); // 요일
window.onload = () => {
    let nowDate = document.querySelector(".header__title");
    if (nowDate instanceof Element) {
        nowDate.innerHTML = `${year}년 ${month}월 ${date}일`;
    }
    let title = document.querySelector(".table-calander__title");
    if (title instanceof Element) {
        title.innerHTML = `${year}년 ${month}월`;
    }
    let calander = document.querySelector(".table-calander__tbody");
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
};
export {};
