import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer, faPencilRuler, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: 'TON Custom Carpentry | About',
    description: `Having moved across the country and back, TON Custom Carpentry
    has experience in both east and west coast designs with over 30 years of building services experience.`,
}

export default function About() {
    return (
        <div className="page-content">
            <h1 className="fw-light">Learn more about our services and history</h1>

            <div className="row">
                <div className="col-12 mb-2">
                    <h2 className="fw-light">Services offered</h2>
                </div>
                <div className="col-12">
                    <dl>
                        <dt>
                            <FontAwesomeIcon className="me-3" icon={faHammer} />
                            Remodeling
                        </dt>
                        <dd>We specialize in remodeling both kitchens and bathrooms.</dd>
                        <dt>
                            <FontAwesomeIcon className="me-3" icon={faPencilRuler} />Custom Millwork
                        </dt>
                        <dd>Have a unique space that off the shelf offerings won't fit?</dd>
                        <dd>We can create custom cabinets, bookcases, railings, libraries, desks for an exact fit for your space.</dd>
                        <dt>
                            <FontAwesomeIcon className="me-3" icon={faPaperPlane} />Construction Management
                        </dt>
                        <dd>With over 30 years of building services experience, we can help with consulting, project management, and
                            design services.</dd>
                    </dl>
                </div>
            </div>

            <div className="row">
                <div className="col-12 mb-2">
                    <h2 className="fw-light">A bit of history</h2>
                </div>
                <div className="col-12 col-md-6 mx-auto">
                    <p>Starting in the late 1970s, working for a design and build firm in the Hudson Valley, owner John Ortiz got
                        his start working on projects ranging from new custom homes and additions to brownstones and loft conversions
                        in
                        NYC. Soon after, he progressed to running his own crews and began work on both residential and commercial
                        projects through the mid 1990s.</p>

                    <p>In the mid 1990s, John relocated to Colorado and worked on residential and commercial projects throughout
                        the entire Rocky Mountain region. After gaining experience working with a wide variety of design influences
                        from
                        all across the country, he returned to the East Coast.</p>

                    <p>Upon his return, John established TON Custom Carpentry and has continued working on projects ranging from
                        custom homes to additions, kitchens, baths and more. TON Custom Carpentry looks forward to bringing quality
                        craftsmanship to your home.</p>
                </div>
                <div className="col-12 col-md-6 mx-auto">
                    <img className="img-fluid" src="/history-map.png" alt="Location history map of TON Custom Carpentry" />
                </div>
            </div>
        </div>
    )
}
