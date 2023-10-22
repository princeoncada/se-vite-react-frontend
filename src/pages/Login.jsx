import '../styles/Login.css';

function Login() {
    const handleGoogleLogin = () => {
        // Redirect to the Spring Boot backend's Google OAuth login endpoint
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;
    };

    return (
        <main>
            <button className="google-button" onClick={handleGoogleLogin}>Login with Google</button>
        </main>
    );
}

export default Login;