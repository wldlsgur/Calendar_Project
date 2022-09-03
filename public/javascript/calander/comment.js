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
const modal = new Modal();
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
                .post("/calander", {
                data: date.value,
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
                .delete("calander", {
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
}
export default CommentController;
