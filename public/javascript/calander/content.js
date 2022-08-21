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
                let day = response.data[i].date.split("-");
                for (let j in arrayDay) {
                    // if (day[2] === arrayDay[j].innerHTML) {
                    //   console.log(day[2]);
                    // }
                    //03이랑 3 이랑 같지가 않아서 매칭이 안된다 해결해야한다
                }
            }
        });
    }
}
export default calanderController;
