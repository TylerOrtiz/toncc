'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function PrimaryFooter() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <footer className="footer text-center my-3 py-2">
                        <span><a href="tel:+1704918304">704.918.9304</a> &diams; TON Custom Carpentry &diams; <a href="mailto:john@toncustomcarpentry.com">john@toncustomcarpentry.com</a></span>
                    </footer>
                </div>
            </div>
        </>
    )
}