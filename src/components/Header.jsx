import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <nav className="nav">
                <div className="nav__links">
                    <Link to="/home">
                        <div className="nav__link">Home</div>
                    </Link>
                    <div>|</div>
                    <Link to="/stock/screen">
                        <div className="nav__link">Screen</div>
                    </Link>
                    <div>|</div>
                    <Link to="/stock/search">
                        <div className="nav__link">Search</div>
                    </Link>
                    <div>|</div>
                    <Link to="/logout">
                        <div className="nav__link">Logout</div>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;