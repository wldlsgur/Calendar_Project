function Common_Axios(req_url, req_method, req_data) {
  console.log(req_url, req_method, req_data);
  axios({
    url: req_url,
    method: req_method,
    data: req_data,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
