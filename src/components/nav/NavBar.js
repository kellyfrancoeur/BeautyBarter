import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home"><b>Home</b></Link>
            </li> 
            <li className="navbar__item active">
                <Link className="navbar__link" to="/about"><b>About</b></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/viewBarter"><b>View Barters</b></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/postBarter"><b>Post A Barter</b></Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/users"><b>Members</b></Link>
            </li> 
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile"><b>Profile</b></Link>
            </li>
            {
                localStorage.getItem("barter_user")
                    ?<ul className="navbar__item">
                        <Link className="navbar__link" to="" onClick ={() => {
                            localStorage.removeItem("barter_user")
                            navigate ("/", {replace: true})
                        }}><b>Logout</b></Link>
                    </ul>
                    : ""
            }
        </ul>
)}