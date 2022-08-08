class Axios {
  constructor() {}
  body(req_url, req_method, req_data) {
    return axios({
      url: req_url,
      method: req_method,
      data: req_data,
    });
  }
  params(req_url, req_method, req_data) {
    return axios({
      url: req_url,
      method: req_method,
      params: req_data,
    });
  }
}

export default Axios;
