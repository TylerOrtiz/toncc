'use client'
import { useState } from "react";
import Link from 'next/link'
import ActiveLink from "./active-link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBriefcase, faEnvelope, faUsers, faInfoCircle, faTimesCircle, faBars } from "@fortawesome/free-solid-svg-icons";

export default function PrimaryNavigation() {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen)
    }

    const togglerClass=`navbar-toggler text-brand-light ${navbarOpen ? 'show' : ''}`
    const toggledClass=`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`

    return (
        <>
            <div className="col-6 col-xl-5 mx-auto my-2">
                <Link className="d-none d-lg-block" href="/">
                    <img className="img-fluid d-block mx-auto" src="/main_logo.png" alt="TON Logo" title="TON Logo" />
                </Link>
            </div>
            <nav className="navbar navbar-expand-lg my-3" role="navigation">
                <div className="col-6 col-sm-5 col-md-4 my-2 d-lg-none">
                    <Link className="navbar-brand" href="/">
                        <img className="img-fluid" src="/mobile_logo.png" alt="TON Logo" title="TON Logo" />
                    </Link>
                </div>
                <button className={togglerClass} type="button" aria-controls="navbarNav" aria-expanded={navbarOpen ? true : false}
                    aria-label="Toggle navigation" onClick={() => toggleNavbar()}>
                    { navbarOpen ? 
                        ( <FontAwesomeIcon className="mx-1" icon={faTimesCircle} /> ) : 
                        ( <FontAwesomeIcon className="mx-1" icon={faBars} />)
                    }
                </button>
                <div className={toggledClass} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <ActiveLink className="nav-link" activeClassName="active" href="/">
                                <FontAwesomeIcon className="mx-1" icon={faHome} />
                                <span>Home</span>
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink className="nav-link" activeClassName="active" href="/about">
                                <FontAwesomeIcon className="mx-1" icon={faInfoCircle} />
                                <span>About</span>
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink className="nav-link" activeClassName="active" href="/portfolio">
                                <FontAwesomeIcon className="mx-1" icon={faBriefcase} />
                                <span>Portfolio</span>
                            </ActiveLink>
                        </li>
                        <li className="nav-item">
                            <ActiveLink className="nav-link" activeClassName="active" href="/testimonials">
                                <FontAwesomeIcon className="mx-1" icon={faUsers} />
                                <span>Testimonials</span>
                            </ActiveLink>
                        </li>

                        <li className="nav-item">
                            <ActiveLink className="nav-link" activeClassName="active" href="/contact">
                                <FontAwesomeIcon className="mx-1" icon={faEnvelope} />
                                <span>Contact</span>
                            </ActiveLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}