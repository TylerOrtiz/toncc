'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function PrimaryFooter() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <footer className="footer text-center my-3 py-2">
                        <span><a href="tel:+17044542371">704.454.2371</a> &diams; TON Custom Cabinets &diams; <a href="mailto:john@toncustomcarpentry.com">john@toncustomcarpentry.com</a></span>
                    </footer>
                </div>
            </div>
        </>
    )
}