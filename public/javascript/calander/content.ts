import Axios from "/javascript/common/axios.js";
const axiosModule = new Axios();

class calanderController {
  today: Date;
  constructor(today: Date) {
    this.today = today;
  }
  async getContent(): Promise<void> {
    let year: string = String(this.today.getFullYear()); // 년도
    let month: string = String(this.today.getMonth() + 1); // 월
    let arrayDay = document.querySelectorAll(".day");
    if (month.length < 2) {
      month = "0" + String(this.today.getMonth() + 1);
    }

    let response = await axiosModule.params("/calander/content", "get", {
      date: year + "-" + month,
    });
    if (!response.data[0]) {
      return;
    }
    for (let i in response.data) {
      let responseDay = response.data[i].date.split("-");
      for (let j in arrayDay) {
        let htmlDay: String = String(arrayDay[j].innerHTML);
        if (htmlDay.length < 2) {
          htmlDay = "0" + arrayDay[j].innerHTML;
        }
        if (responseDay[2] === htmlDay) {
          let div: Element = document.createElement("div");
          let img: Element = document.createElement("img");
          let name: Element = document.createElement("p");
          let contentId: Element = document.createElement("input");
          let userId: Element = document.createElement("input");
          let content: Element = document.createElement("input");

          div.setAttribute("class", "contentInfo");

          img.setAttribute("class", "contentInfo__img");
          img.setAttribute("src", "/image/user/" + response.data[i].photo_path);

          name.setAttribute("class", "contentInfo__name");
          name.innerHTML = response.data[i].name;

          contentId.setAttribute("class", "contentInfo__contentId");
          contentId.setAttribute("value", response.data[i].content_id);
          contentId.setAttribute("type", "hidden");

          userId.setAttribute("class", "contentInfo__userId");
          userId.setAttribute("value", response.data[i].user_id);
          userId.setAttribute("type", "hidden");

          content.setAttribute("class", "contentInfo__content");
          content.setAttribute("value", response.data[i].content);
          content.setAttribute("type", "hidden");

          div.appendChild(img);
          div.appendChild(name);
          div.appendChild(contentId);
          div.appendChild(userId);
          div.appendChild(content);
          arrayDay[j].parentNode?.appendChild(div);

          // 이벤트 달고
        }
      }
    }
  }
}

export default calanderController;
