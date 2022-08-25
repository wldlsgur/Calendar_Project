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
class personnelController {
    constructor() {
        var _a;
        this.roomId = (_a = document.querySelector("#room_id")) === null || _a === void 0 ? void 0 : _a.value;
    }
    getDataOfServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axiosModule.params("/calander/personnel", "get", {
                roomId: this.roomId,
            });
            if (response.data.length < 1) {
                return;
            }
            this.setData(response);
        });
    }
    setData(response) {
        console.log(response.data);
        let root = document.querySelector(".personnelList");
        for (let i in response.data) {
            let div1 = document.createElement("div");
            let input = document.createElement("input");
            let div2 = document.createElement("div");
            let img = document.createElement("img");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            div1.setAttribute("class", "personnel");
            input.setAttribute("class", "personnel__userId");
            input.setAttribute("type", "hidden");
            div2.setAttribute("class", "personnelUser");
            img.setAttribute("class", "personnelUser__img");
            img.setAttribute("src", "/image/user/" + response.data[i].photo_path);
            p1.setAttribute("class", "personnelUser__name");
            p1.innerHTML = response.data[i].name;
            p2.setAttribute("class", "personnel__moderator");
            if (response.data[i].chief) {
                p2.innerHTML = "방장";
            }
            else {
                p2.innerHTML = "인원";
            }
            div2.appendChild(img);
            div2.appendChild(p1);
            div1.appendChild(input);
            div1.appendChild(div2);
            div1.appendChild(p2);
            root === null || root === void 0 ? void 0 : root.appendChild(div1);
        }
    }
}
export default personnelController;