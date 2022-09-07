import server from "./server";
class ImageController {
  constructor() {}
  ShowUserImage(target: HTMLImageElement, src: string) {
    target.src = `${server}/image/user/${src}`;
  }
}

export default ImageController;
