const server = "http://13.209.148.137:80";

class Nav {
  constructor() {}

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
