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
          div.addEventListener("click", viewContent);

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
class ContentInfo {
  img: string;
  name: string;
  content_id: string;
  user_id: string;
  content: string;
  constructor(
    img: string,
    name: string,
    content_id: string,
    user_id: string,
    text: string
  ) {
    this.img = img;
    this.name = name;
    this.content_id = content_id;
    this.user_id = user_id;
    this.content = text;
  }

  SetModalData() {
    document
      .querySelector(".contentId")
      ?.setAttribute("value", this.content_id);
    document.querySelector(".userInfo__img")?.setAttribute("src", this.img);
    document.querySelector(".commentInfo__date");
    document.querySelector(".commentInfo__content");
    document.querySelector(".userInfo__name")?.innerHTML = this.name;
  }
}
function viewContent(this: any) {
  let modal = document.querySelector(".modalCommentInfo");
  if (modal instanceof Element) {
    let img = this.querySelector(".contentInfo__img").src;
    let name = this.querySelector(".contentInfo__name").innerHTML;
    let content_id = this.querySelector(".contentInfo__contentId").value;
    let user_id = this.querySelector(".contentInfo__userId").value;
    let text = this.querySelector(".contentInfo__content").value;

    modal.style.display = "block";
    let content = new ContentInfo(img, name, content_id, user_id, text);
    content.SetModalData();
  }
}
export default calanderController;
