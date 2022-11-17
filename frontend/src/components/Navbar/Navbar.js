import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-5 sticky-top">
            <a href="/" className="navbar-brand">
                Product List
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