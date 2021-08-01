import React from "react"
import {Link} from "react-router-dom"

const Navbar = () => {

    return (
        <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to = "/" className = "navbar-brand">GYM</Link>
            <div className = "collapse navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                    <li className = "navbar-item">
                        <Link to = "/" className = "nav-link">EXERCISES</Link>
                    </li>
                    <li className = "navbar-item">
                        <Link to = "/create" className = "nav-link">CREATE EXERCISE LOG</Link>
                    </li>
                    <li className = "navbar-item">
                        <Link to = "/user" className = "nav-link">CREATE USER</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar