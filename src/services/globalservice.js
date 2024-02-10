import axios from "axios";
const apiClient = axios.create({
    baseURL: "https://test.m-aboelela.online/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
});
const globalService = {
//return aboutus , qa , parteners
  getGlobalSites(){
    return apiClient.get(`api/globals`)
  },
   //only accepted projects
  getAllProjectForlandingpage(){
    return apiClient.get(`api/welcome`)
  },
};

export default globalService;


