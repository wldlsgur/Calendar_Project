var _a, _b;
const week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
let today = new Date();
(_a = document.querySelector(".bi-caret-left")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    initCalander();
});
(_b = document.querySelector(".bi-caret-right")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    initCalander();
});
window.onload = () => {
    initCalander();
};
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
export {};
