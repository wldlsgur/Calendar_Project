// const server = "http://13.209.148.137:80";
class Nav {
    constructor() { }
    MovePageSignup() {
        location.href = `/page/signup`;
    }
    MovePageLogin() {
        location.href = `/page`;
    }
    MovePageRoom() {
        location.href = `/page/room`;
    }
    MovePageCalander() {
        location.href = `/page/calander`;
    }
}
export default Nav;
