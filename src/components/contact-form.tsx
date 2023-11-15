'use client'
import React, { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { ContactForm } from "@/models/contact-form"

const initialState: ContactForm = {
    name: '',
    phone: '',
    email: '',
    message: '',
}

async function submitContactForm(previousState, formData) {
    return {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message')
    }
}

export default function ContactForm() {
    const [formComplete, setFormComplete] = useState<boolean>(false)
    const [state, formAction] = useFormState(submitContactForm, initialState)
    const { pending } = useFormStatus()
    
    const submitForm = (e) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_KEY_CLIENT, {action: 'submit'}).then(function(token) {
          fetch('/contact/submit', { method: 'POST', cache: 'no-cache', body: JSON.stringify({
            token,
            data: state,
            })
            }).then((response) => response.json())
            .then((data) => {
                console.log('got data', data)
            });
          })
        
        });
    }

    const resetForm = () => {
        console.log('resetting')
    }

    if (formComplete) {
        return (<>
            <p>Thank you for contacting us. </p>
            <p>We'll get back to you as soon as possible.</p>
        </>)
    }

    return (
        <>
            <form action={formAction} onSubmit={(e) => submitForm(e)}>
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
                <div>
                    {state?.message}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="reset" onClick={() => resetForm()} className="btn btn-light mx-3 w-25">Clear</button>

                    <button type="submit" aria-disabled={pending} className="btn btn-primary mx-3 w-25">
                        Submit
                    </button>
                    {/* <button type="submit" onClick={() => submitForm()} className="btn btn-primary mx-3 w-25" aria-disabled={pending} disabled={!formValid} >Submit</button> */}
                   
                </div>
            </form>
        </>
    )
}
