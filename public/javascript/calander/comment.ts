import Modal from "../Common/modal.js";

const modal: Modal = new Modal();
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
}
export default CommentController;
