import Image from "./signUp.js";
const image = new Image();
// $("#image").change(ShowImage);
// $("#sameId__sameIdCb").click(SameIdCheck);
// $(".form-input__id").keyup(InitCheckBox);
// $(".form-input__submit").click(SignUp);
document.querySelector("#image")?.addEventListener("change", (e) => {
  image.ShowImage(e.target);
});
// document.querySelector("#sameId__sameIdCb")?.addEventListener("click");
// document.querySelector(".form-input__id")?.addEventListener("keyup");
// document.querySelector(".form-input__submit")?.addEventListener("click");
