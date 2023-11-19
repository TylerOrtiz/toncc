'use client'
import React, { useState } from "react"
import { ContactForm } from "@/models/contact-form"

const initialState: ContactForm = {
    name: '',
    phone: '',
    email: '',
    message: '',
}

type FormProps = {
    token: string
    blockNext: boolean
    blockAll: boolean
}

export default function ContactForm({
    token,
    blockNext,
    blockAll,
}: FormProps) {
    const [formComplete, setFormComplete] = useState<boolean>(blockNext)
    const [formState, setFormState] = useState<ContactForm>(initialState)

    const submitForm = async (data: any) => {
        try {
            const response = await fetch('/contact/submit', {
                method: 'POST', headers: { 'X-CSRF-Token': token }, cache: 'no-cache', body: JSON.stringify({
                    data: data,
                })
            })
            const content = await response.json()
            setFormComplete(true)
        } catch {
            console.log('Problem occurred, todo show it')
        }
    }

    function formAction(formData: any) {
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message'),
            job: formData.get('job')
        }
        setFormState(data);
        submitForm(data);
    }

    const resetForm = () => {
        setFormComplete(false)
    }

    if (blockAll) {
        return (<>Sorry, we aren't accepting messages right now.</>)
    }

    if (formComplete) {
        return (<>
            <p>Thank you for contacting us. </p>
            <p>We'll get back to you as soon as possible.</p>

            {blockNext && (
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => resetForm()} className="btn btn-primary mx-3">Send another message?</button>
                </div>
            )}
        </>)
    }

    return (
        <>
            <form action={(e) => formAction(e)}>
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input id="name" type="text" className="form-control" name="name" placeholder="Name" required minLength={3} />
                        <label className="form-label" htmlFor="name">Name</label>
                    </div>
                    {/* <div [hidden]="!(contactForm.controls['name'].invalid && contactForm.controls['name'].touched)" className="alert alert-danger">Name is required</div> */}
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input id="phone" type="tel" className="form-control" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="" required aria-describedby="phone-help" />
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                        <div id="phone-help" className="form-text">Format: 123-456-7890</div>
                    </div>
                    {/* <div [hidden]="!(contactForm.controls['phone'].invalid && contactForm.controls['phone'].touched)" className="alert alert-danger">Phone number is required, format: 123-456-7890</div> */}
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input id="email" type="email" className="form-control" name="email" placeholder="" required minLength={3} />
                        <label className="form-label" htmlFor="email">Email Address</label>
                    </div>
                    {/* <div [hidden]="!(contactForm.controls['emailAddress'].invalid && contactForm.controls['emailAddress'].touched)" className="alert alert-danger">Email is required</div> */}
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <textarea id="message" className="form-control" name="message" placeholder="" required minLength={10} aria-describedby="message-help"></textarea>
                        <label className="form-label" htmlFor="message">Message</label>
                        <div id="message-help" className="form-text">Let us know what you need.</div>
                    </div>
                    {/* <div [hidden]="!(contactForm.controls['message'].invalid && contactForm.controls['message'].touched)" className="alert alert-danger">Message is required</div> */}
                </div>
                <div aria-hidden={true} className="invisible">
                    <input type="hidden" name="job" value={''} />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="reset" onClick={() => resetForm()} className="btn btn-light mx-3 w-25">Clear</button>

                    <button type="submit" className="btn btn-primary mx-3 w-25">
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}
