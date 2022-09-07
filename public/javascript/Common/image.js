import server from "./server";
class ImageController {
    constructor() { }
    ShowUserImage(target, src) {
        target.src = `${server}/image/user/${src}`;
    }
}
export default ImageController;
