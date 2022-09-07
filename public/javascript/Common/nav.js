import server from "./server";
class Nav {
    constructor() { }
    MovePageSignup() {
        location.href = `${server}/page/signup`;
    }
    MovePageLogin() {
        location.href = `${server}/page`;
    }
    MovePageRoom() {
        location.href = `${server}/page/room`;
    }
    MovePageCalander() {
        location.href = `${server}/page/calander`;
    }
}
export default Nav;
