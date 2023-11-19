'use client'
import React, { useState } from "react"
import { ContactForm } from "@/models/contact-form"
import { usePhoneInput } from 'react-international-phone';


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
    const {
        inputValue,
        handlePhoneValueChange,
        inputRef,
    } = usePhoneInput({
        defaultCountry: 'us',
        disableCountryGuess: true,
        disableDialCodeAndPrefix: true,
        value: '',
    });

    const [formComplete, setFormComplete] = useState<boolean>(blockNext)

    const submitForm = async (data: any) => {
        const response = await fetch('/contact/submit', {
            method: 'POST', headers: { 'X-CSRF-Token': token }, cache: 'no-cache', body: JSON.stringify({
                data: data,
            })
        })
        await response.json()
        setFormComplete(true)
    }

    function formAction(formData: any) {
        const data: ContactForm = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            job: formData.get('job'),
            phone: inputValue,
        }

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
            <form action={formAction}>
                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input id="name" type="text" className="form-control" name="name" placeholder="Name" required minLength={3} />
                        <label className="form-label" htmlFor="name">Name</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input ref={inputRef} id="phone" name="phone" className="form-control" placeholder="" required value={inputValue} onChange={handlePhoneValueChange} />
                        <label className="form-label" htmlFor="phone">Phone Number</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <input id="email" type="email" className="form-control" name="email" placeholder="" required minLength={3} />
                        <label className="form-label" htmlFor="email">Email Address</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-floating mb-3">
                        <textarea id="message" className="form-control" name="message" placeholder="" required minLength={10} maxLength={1000} aria-describedby="message-help" style={{ minHeight: 200 }}></textarea>
                        <label className="form-label" htmlFor="message">Message</label>
                        <div id="message-help" className="form-text">Let us know what you need.</div>
                    </div>
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
