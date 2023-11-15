import mailer from '@sendgrid/mail'
async function recaptchaValidate(token: string, ipaddress?: string): Promise<boolean> {
    const payload = {
        secret: process.env.RECAPTCHA_KEY_SERVER,
        response: token,
        remoteip: ipaddress
    }
    const finalPayload = Object.keys(payload)
        .map((key: string) => {
            const value = payload[key]
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        })
        .join('&')
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST', 
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
        body: finalPayload
    })
    const json = await response.json()

    return json.success
}

function parsePayload(payload: any) {
    const recaptchaToken = payload.token
    const form = {
        name: payload.data.name,
        phone: payload.data.phone,
        email: payload.data.email,
        message: payload.data.message,
    }
    return {recaptchaToken, form}
}

async function sendEmail(data) {
    const msg = {
        to: 'noreply@toncustomcarpentry.com', // Change to your recipient
        from: { email: 'noreply@toncustomcarpentry.com', name: 'TONCC Lead'},
        subject: 'New Message for TON',
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

export async function POST(request: Request) {
    const rawPayload = await request.json()
    const requestIpAddress = request.headers.get('x-forwarded-for') ?? undefined
    const payload = parsePayload(rawPayload)

    const recaptcha = await recaptchaValidate(payload.recaptchaToken, requestIpAddress)
    if ( recaptcha === false ) {
        return new Response(JSON.stringify({"message": "recaptcha error"}), { status: 400, headers: {'Content-Type': 'application/json'}})
    }

    await sendEmail(payload.form)

    return new Response(JSON.stringify({"message": "ok"}), {status: 200, headers: {'Content-Type': 'application/json'}})
}