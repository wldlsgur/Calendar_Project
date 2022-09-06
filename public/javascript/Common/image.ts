const server = "http://13.209.148.137:80";
class ImageController {
  constructor() {}
  ShowUserImage(target: HTMLImageElement, src: string) {
    target.src = `${server}/image/user/${src}`;
  }
}

export default ImageController;
