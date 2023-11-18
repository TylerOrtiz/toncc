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

    const submitForm = async (data) => {
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

    function formAction(formData) {
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
                    <label>Name
                        <input type="text" className="form-control" name="name" placeholder="Name" required minLength={3} />
                    </label>

                    {/* <div [hidden]="!(contactForm.controls['name'].invalid && contactForm.controls['name'].touched)" className="alert alert-danger">Name is required</div> */}
                </div>

                <div className="form-group">
                    <label>Phone Number
                        <input type="tel" className="form-control" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </label>

                    {/* <div [hidden]="!(contactForm.controls['phone'].invalid && contactForm.controls['phone'].touched)" className="alert alert-danger">Phone number is required, format: 123-456-7890</div> */}
                </div>

                <div className="form-group">
                    <label>Email Address
                        <input type="email" className="form-control" name="email" placeholder="someone@somewhere.com" required minLength={3} />
                    </label>

                    {/* <div [hidden]="!(contactForm.controls['emailAddress'].invalid && contactForm.controls['emailAddress'].touched)" className="alert alert-danger">Email is required</div> */}
                </div>

                <div className="form-group">
                    <label>Message
                        <textarea className="form-control" name="message" placeholder="Let us know what you need." required minLength={10}></textarea>
                    </label>

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
