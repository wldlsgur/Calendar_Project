var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const server = "http://13.209.148.137:80/";
const roomIdTag = document.querySelector("#room_id") ?
    class personnelController {
        constructor() {
        }
        Get() {
            return __awaiter(this, void 0, void 0, function* () {
                let result = yield axios.get("calander/personnel", { params: { roomId: roomIdTag === null || roomIdTag === void 0 ? void 0 : roomIdTag.value } }).catch((err) => {
                    console.log(err);
                });
                if (!result.data[0]) {
                    return null;
                }
                console.log(typeof result);
                return result;
            });
        }
        SetPersonnelCalander(result) {
            let root = document.querySelector(".personnelList");
            for (let i in result.data) {
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
                img.setAttribute("src", "/image/user/" + result.data[i].photo_path);
                p1.setAttribute("class", "personnelUser__name");
                p1.innerHTML = result.data[i].name;
                p2.setAttribute("class", "personnel__moderator");
                if (result.data[i].chief) {
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
    :
;
export default personnelController;
