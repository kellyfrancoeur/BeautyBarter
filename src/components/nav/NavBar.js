import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav id="main-navbar">
            <ul>
                <li><Link to="/home"><b>Home</b></Link></li>
                <li><Link to="/about"><b>About</b></Link></li>
                <li><Link to="/viewBarter"><b>View Barters</b></Link></li>
                <li><Link to="/postBarter"><b>Post A Barter</b></Link></li>
                <li><Link to="/users"><b>Members</b></Link></li>
                <li><Link to="/profile"><b>Profile</b></Link></li>
                {
                    localStorage.getItem("barter_user")
                        ? <li>
                            <Link id="main-navbar" to="" onClick={() => {
                                localStorage.removeItem("barter_user")
                                navigate("/", { replace: true })
                            }}><b>Logout</b></Link>
                        </li>
                        : ""
                }</ul>
        </nav>
    )
}


