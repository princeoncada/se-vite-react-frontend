import { Navigate } from 'react-router-dom';

function Protected(x) {
    if (sessionStorage.getItem("auth") !== "true") {
        return <Navigate to="/" />;
    }
    return x.children;
}
export default Protected;
