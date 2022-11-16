import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-5">
            <a href="/" className="navbar-brand">
                Products List
            </a>
            <div className="navbar-nav">
                <li className="nav-item">
                    <Link to={"/new_product"} className="nav-link">
                        Add New Product
                    </Link>
                </li>
            </div>
        </nav>
    )
}

export default Navbar