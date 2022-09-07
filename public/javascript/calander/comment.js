var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Modal from "../Common/modal.js";
import server from "../Common/server";
const modal = new Modal();
const userIdAI = document.querySelector("#user_id");
const date = document.querySelector(".commentForm__date");
const content = document.querySelector(".commentForm__content");
class CommentController {
    Post() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(date === null || date === void 0 ? void 0 : date.value) || !(content === null || content === void 0 ? void 0 : content.value)) {
                return alert("요구사항을 모두 입력해주세요");
            }
            let response = yield axios
                .post(`${server}/calander`, {
                date: date.value,
                content: content.value,
            })
                .catch((err) => {
                console.log(err);
            });
            if (!((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.res)) {
                alert("작성 실패");
            }
            modal.CreateRoomHidden();
            return location.reload();
        });
    }
    Delete(e) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios
                .delete(`${server}/calander`, {
                contentId: (_d = (_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.querySelector(".contentId")) === null || _d === void 0 ? void 0 : _d.value,
            })
                .catch((err) => {
                console.log(err);
            });
            if ((_e = response === null || response === void 0 ? void 0 : response.data) === null || _e === void 0 ? void 0 : _e.res) {
                alert("삭제 실패");
            }
            modal.CommentInfoHidden();
            return location.reload();
        });
    }
    Get(today) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let year = String(today.getFullYear()); // 년도
                let month = String(today.getMonth() + 1); // 월
                if (month.length < 2) {
                    month = "0" + String(today.getMonth() + 1);
                }
                let result = yield axios
                    .get(`${server}/calander/content`, {
                    params: {
                        date: year + "-" + month,
                    },
                })
                    .catch((err) => {
                    console.log(err);
                    return reject(err);
                });
                console.l0g("get : ", result.data);
                resolve(result.data);
            }));
        });
    }
    SetCommentCalander(result) {
        var _a;
        let arrayDay = document.querySelectorAll(".day");
        for (let i in result) {
            let responseDay = result[i].date.split("-");
            for (let j in arrayDay) {
                let htmlDay = String(arrayDay[j].innerHTML);
                if (htmlDay.length < 2) {
                    htmlDay = "0" + arrayDay[j].innerHTML;
                }
                if (responseDay[2] === htmlDay) {
                    let div = document.createElement("div");
                    let img = document.createElement("img");
                    let name = document.createElement("p");
                    let contentId = document.createElement("input");
                    let userId = document.createElement("input");
                    let content = document.createElement("input");
                    div.setAttribute("class", "contentInfo");
                    name.addEventListener("click", (e) => {
                        let userIdTag = e.target.parentNode.querySelector(".contentInfo__userId");
                        if (userIdAI instanceof HTMLInputElement &&
                            userIdTag instanceof HTMLInputElement) {
                            if (userIdAI.value === userIdTag.value) {
                                modal.CommentInfoDelBtnShow();
                            }
                            else {
                                modal.CommentInfoDelBtnHidden();
                            }
                        }
                        modal.CommentSetInfo(e);
                        modal.CommnetInfoShow();
                    });
                    img.setAttribute("class", "contentInfo__img");
                    img.setAttribute("src", `${server}/image/user/` + result[i].photo_path);
                    name.setAttribute("class", "contentInfo__name");
                    name.innerHTML = result[i].name;
                    contentId.setAttribute("class", "contentInfo__contentId");
                    contentId.setAttribute("value", result[i].content_id);
                    contentId.setAttribute("type", "hidden");
                    userId.setAttribute("class", "contentInfo__userId");
                    userId.setAttribute("value", result[i].user_id);
                    userId.setAttribute("type", "hidden");
                    content.setAttribute("class", "contentInfo__content");
                    content.setAttribute("value", result[i].content);
                    content.setAttribute("type", "hidden");
                    div.appendChild(img);
                    div.appendChild(name);
                    div.appendChild(contentId);
                    div.appendChild(userId);
                    div.appendChild(content);
                    (_a = arrayDay[j].parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                }
            }
        }
    }
}
export default CommentController;
