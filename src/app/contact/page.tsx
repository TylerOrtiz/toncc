
import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPhoneSquare, faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import ContactForm from '@/components/contact-form';
export const metadata: Metadata = {
    title: 'TON Custom Carpentry | Contact',
    description: `Do you have a space that off the shelf products wont fit?
    No problem! Contact John today for a free consultation.`,
}
import { cookies, headers } from 'next/headers'
export const dynamic = 'force-dynamic'

export default async function Contact() {
    const blockSend = cookies().get('_blockNextMessage')?.value
    const blockAll = cookies().get('_blockAllMessage')?.value
    const csrfToken = headers().get('X-CSRF-Token') || 'missing';
    const blockNewSend = blockSend && blockSend.length > 0  || false
    const blockAllSend = blockAll && blockAll.length > 0 || false

    return (
        <div className="page-content">
            <h1 className="fw-light">Get in touch with us</h1>
            <h2 className="fw-light">Contact us for a consultation or estimate.</h2>

            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="card">
                        <h5 className="card-header">Contact</h5>
                        <div className="card-body">
                            <div className="card-text">
                                <address itemScope itemType="http://schema.org/ContactPoint">
                                    <strong className="text-center d-block">T.O.N. Custom Carpentry LLC.</strong>

                                    <div className="row" itemScope itemType="http://schema.org/PostalAddress">
                                        <div className="col d-flex justify-content-end">
                                            <FontAwesomeIcon className="text-brand-dark" icon={faAddressCard} />
                                        </div>
                                        <div className="col-10">
                                            <span itemProp="streetAddress">5410 Mallard Dr S</span><br />
                                            <span itemProp="addressLocality">Charlotte</span>,&nbsp;
                                            <span itemProp="addressRegion">NC</span>&nbsp;
                                            <span itemProp="postalCode">28227</span>&nbsp;
                                            <span itemProp="addressCountry">USA</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-end">
                                            <FontAwesomeIcon className="text-brand-dark" icon={faPhoneSquare} />
                                        </div>
                                        <div className="col-10">
                                            <a href="tel:704-918-9304">
                                                <span itemProp="telephone">(704) 918-9304</span>
                                            </a><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-end">
                                            <FontAwesomeIcon className="text-brand-dark" icon={faEnvelopeSquare} />
                                        </div>
                                        <div className="col-10">
                                            <a href="mailto:john@toncustomcarpentry.com">
                                                <span itemProp="email">john@toncustomcarpentry.com</span>
                                            </a><br />
                                        </div>
                                    </div>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="card">
                        <h5 className="card-header">Leave a message</h5>
                        <div className="card-body">
                            <ContactForm token={csrfToken} blockNext={blockNewSend} blockAll={blockAllSend}></ContactForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}