import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/about">About Beauty Barter</Link>
            </li>  
            <li className="navbar__item active">
                <Link className="navbar__link" to="/viewBarter">View Barters</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/postBarter">Post A Barter</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li>
            {
                localStorage.getItem("barter_user")
                    ?<ul className="navbar_item navbar_logout">
                        <Link className="navbar_link" to="" onClick ={() => {
                            localStorage.removeItem("barter_user")
                            navigate ("/", {replace: true})
                        }}>Logout</Link>
                    </ul>
                    : ""
            }
        </ul>
    )
}