import axios from "axios";

//initializes Axios with HTTP base Url and headers.
export default axios.create({
    baseURL: "http://localhost:8080/users",
    headers: {
        "Content-type": "application/json"
    }
});