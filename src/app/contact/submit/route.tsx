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

async function sendEmail(data: any) {
    const msg: any = {
        to: { email: 'noreply@toncustomcarpentry.com', name: 'TON Website'},
        from: { email: data.email, name: data.name},
        subject: 'TON CC Lead',
        dynamic_template_data: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            message: data.message,
        },
        template_id: 'd-e9f46f55f52f4e119d8f1299e2dd1254'
      }

    try {
        mailer.setApiKey(process.env.SENDGRID_API_KEY ?? '')
        await mailer.send(msg)
    } catch(ex: any) {
        console.log('ex', ex)
        console.log('ex', ex?.response?.body?.errors.map((f:any)=>f.message).join(''))
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