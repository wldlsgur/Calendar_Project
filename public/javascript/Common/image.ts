class ImageController {
  constructor() {}
  ShowUserImage(target: HTMLImageElement, src: string) {
    target.src = src;
  }
}

export default ImageController;
