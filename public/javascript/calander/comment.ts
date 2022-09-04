import Modal from "../Common/modal.js";

const modal: Modal = new Modal();
const userId = document.querySelector("#user_id");
const date: HTMLInputElement | null =
  document.querySelector(".commentForm__date");
const content: HTMLInputElement | null = document.querySelector(
  ".commentForm__content"
);

class CommentController {
  async Post(): Promise<void> {
    if (!date?.value || !content?.value) {
      return alert("요구사항을 모두 입력해주세요");
    }
    let response = await axios
      .post("/calander", {
        data: date.value,
        content: content.value,
      })
      .catch((err: object) => {
        console.log(err);
      });
    if (!response?.data?.res) {
      alert("작성 실패");
    }
    modal.CreateRoomHidden();
    return location.reload();
  }

  async Delete(e: any): Promise<void> {
    let response = await axios
      .delete("calander", {
        contentId:
          e?.target?.parentNode?.parentNode?.querySelector(".contentId")?.value,
      })
      .catch((err: object) => {
        console.log(err);
      });
    if (response?.data?.res) {
      alert("삭제 실패");
    }
    modal.CommentInfoHidden();
    return location.reload();
  }

  async Get(today: Date): Promise<void> {
    let year: string = String(today.getFullYear()); // 년도
    let month: string = String(today.getMonth() + 1); // 월
    if (month.length < 2) {
      month = "0" + String(today.getMonth() + 1);
    }

    let result = await axios
      .get("/calander/content", {
        params: {
          date: year + "-" + month,
        },
      })
      .catch((err: object) => {
        console.log(err);
      });

    return result.data;
  }

  SetCommentCalander(result: Promise<any>) {
    let arrayDay = document.querySelectorAll(".day");

    for (let i in result.data) {
      let responseDay = result.data[i].date.split("-");
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
          div.addEventListener("click", (e) => {
            if (e.target instanceof HTMLElement) {
              let userIdTag = e.target.querySelector(".contentInfo__userId");
              if (
                userId instanceof HTMLInputElement &&
                userIdTag instanceof HTMLInputElement
              ) {
                if (userId.value === userIdTag.value) {
                  modal.CommentInfoDelBtnShow();
                } else {
                  modal.CommentInfoDelBtnHidden();
                }
              }
            }
            modal.CommentSetInfo(e);
            modal.CommnetInfoShow();
          });

          img.setAttribute("class", "contentInfo__img");
          img.setAttribute("src", "/image/user/" + result.data[i].photo_path);

          name.setAttribute("class", "contentInfo__name");
          name.innerHTML = result.data[i].name;

          contentId.setAttribute("class", "contentInfo__contentId");
          contentId.setAttribute("value", result.data[i].content_id);
          contentId.setAttribute("type", "hidden");

          userId.setAttribute("class", "contentInfo__userId");
          userId.setAttribute("value", result.data[i].user_id);
          userId.setAttribute("type", "hidden");

          content.setAttribute("class", "contentInfo__content");
          content.setAttribute("value", result.data[i].content);
          content.setAttribute("type", "hidden");

          div.appendChild(img);
          div.appendChild(name);
          div.appendChild(contentId);
          div.appendChild(userId);
          div.appendChild(content);
          arrayDay[j].parentNode?.appendChild(div);
        }
      }
    }
  }
}
export default CommentController;
