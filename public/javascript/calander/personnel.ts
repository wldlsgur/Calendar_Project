const server = "http://13.209.148.137:80/";
const roomIdTag: HTMLInputElement | null = document.querySelector("#room_id");
class PersonnelController {
  constructor() {}

  async Get() {
    let result = await axios
      .get("calander/personnel", { params: { roomId: roomIdTag?.value } })
      .catch((err: object) => {
        console.log(err);
      });
    if (!result.data[0]) {
      return null;
    }
    console.log(typeof result);
    return result.data;
  }

  SetPersonnelCalander(result: Promise<any>) {
    let root = document.querySelector(".personnelList");
    for (let i in result) {
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
      img.setAttribute("src", "/image/user/" + result[i].photo_path);

      p1.setAttribute("class", "personnelUser__name");
      p1.innerHTML = result[i].name;

      p2.setAttribute("class", "personnel__moderator");
      if (result[i].chief) {
        p2.innerHTML = "방장";
      } else {
        p2.innerHTML = "인원";
      }

      div2.appendChild(img);
      div2.appendChild(p1);

      div1.appendChild(input);
      div1.appendChild(div2);
      div1.appendChild(p2);

      root?.appendChild(div1);
    }
  }
}

export default PersonnelController;
