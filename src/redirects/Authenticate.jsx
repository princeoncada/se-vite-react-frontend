import {useEffect} from "react";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

function Authenticate() {
    const navigate = useNavigate()

    useEffect(() => {
        if(Cookies.get("jwtToken")!==undefined) {
            sessionStorage.setItem("auth", "true")
        }
        const delayDuration = 2000;
        const timeoutId = setTimeout(() => {
            navigate("/home");
        }, delayDuration);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <main>
            <p>Authenticating...</p>
        </main>
    )
}

export default Authenticate;