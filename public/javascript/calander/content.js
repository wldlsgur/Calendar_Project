var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Axios from "/javascript/common/axios.js";
const axiosModule = new Axios();
class calanderController {
    constructor(today) {
        this.today = today;
    }
    getContent() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let year = String(this.today.getFullYear()); // 년도
            let month = String(this.today.getMonth() + 1); // 월
            let arrayDay = document.querySelectorAll(".day");
            if (month.length < 2) {
                month = "0" + String(this.today.getMonth() + 1);
            }
            let response = yield axiosModule.params("/calander/content", "get", {
                date: year + "-" + month,
            });
            if (!response.data[0]) {
                return;
            }
            for (let i in response.data) {
                let responseDay = response.data[i].date.split("-");
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
                        (_a = arrayDay[j].parentNode) === null || _a === void 0 ? void 0 : _a.appendChild(div);
                        // 이벤트 달고
                    }
                }
            }
        });
    }
}
class ContentInfo {
    constructor(img, name, content_id, user_id, text) {
        this.img = img;
        this.name = name;
        this.content_id = content_id;
        this.user_id = user_id;
        this.content = text;
    }
    SetModalData() {
        var _a, _b, _c;
        (_a = document
            .querySelector(".contentId")) === null || _a === void 0 ? void 0 : _a.setAttribute("value", this.content_id);
        (_b = document.querySelector(".userInfo__img")) === null || _b === void 0 ? void 0 : _b.setAttribute("src", this.img);
        document.querySelector(".commentInfo__date");
        document.querySelector(".commentInfo__content");
        (_c = document.querySelector(".userInfo__name")) === null || _c === void 0 ? void 0 : _c.innerHTML = this.name;
    }
}
function viewContent() {
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
