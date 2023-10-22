import Cookies from "js-cookie";

const header_config = {
    headers: {
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        "Content-Type": "application/json",
        Accept: "*/*"
    }
}

export default header_config;