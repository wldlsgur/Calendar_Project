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
      let day = response.data[i].date.split("-");
      for (let j in arrayDay) {
        // if (day[2] === arrayDay[j].innerHTML) {
        //   console.log(day[2]);
        // }
        //03이랑 3 이랑 같지가 않아서 매칭이 안된다 해결해야한다
      }
    }
  }
}

export default calanderController;
