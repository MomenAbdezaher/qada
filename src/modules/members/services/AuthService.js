import axios from "axios";
const apiClient = axios.create({
    baseURL: "https://test.m-aboelela.online/api/",
    headers: {},
});

const authService = {
    // personData: {},
    register(credentials) {
        return apiClient.post("person/register", credentials);
    },
    login(credentials) {
        return apiClient.post("person/login", credentials);
    },
};

export default authService;