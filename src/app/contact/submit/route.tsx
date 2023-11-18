import mailer from '@sendgrid/mail'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

function parsePayload(payload: any) {
    const form = {
        name: payload.data.name,
        phone: payload.data.phone,
        email: payload.data.email,
        message: payload.data.message,
        honeypot: payload.data.job
    }
    return form
}

async function sendEmail(data) {
    const msg = {
        to: 'noreply@toncustomcarpentry.com', // Change to your recipient
        from: { email: 'noreply@toncustomcarpentry.com', name: 'TON Website <no-reply>'},
        subject: 'TON CC Lead',
        content: [{
            type: 'text/html',
            value: 'temp'
        }],
        dynamic_template_data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
        },
        template_id: 'd-e9f46f55f52f4e119d8f1299e2dd1254'
      }

    try {
        mailer.setApiKey(process.env.SENDGRID_API_KEY)
        const response = await mailer.send(msg)
        console.log('sent', response)
    } catch(ex) {
        console.log('ex', ex)
        console.log('ex', ex?.response?.body?.errors.map(f=>f.message).join(''))
        return false
    }
    

}

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    const rawPayload = await request.json()
    const payload = parsePayload(rawPayload)

    revalidatePath('/contact/submit')
    
    if ( payload.honeypot !== '' ) {
        return Response.json({message: "invalid request"}, { status: 400, headers: { 'Set-Cookie': '_blockAllMessage=true'} })
    }

    await sendEmail(payload)

    return Response.json({"message": "ok"}, {status: 200, headers: { 'Set-Cookie': '_blockNextMessage=true'}})
}