import type { Metadata } from 'next'
import TestimonialsContent from '@/data/testimonials';
export const metadata: Metadata = {
    title: 'TON Custom Cabinets | Testimonials',
    description: `Still not convinced? Hear directly from prior and
    current clients with their testimonials.`,
}

export default async function Testimonials() {
    const testimonials = TestimonialsContent
    const tesimonialClassBase = 'col blockquote testimonial-quote'
    const testimonialClassLeft = `${tesimonialClassBase} testimonial-quote-left`
    const testimonialClassRight = `${tesimonialClassBase} testimonial-quote-right`

    return (
        <div className="page-content">
            <h1 className="fw-light">Testimonials</h1>
            <h2 className="fw-light">Hear some feedback from some of our clients!</h2>

            {testimonials.map((item, idx) => {
                const ourclass = idx % 2 === 0 ? testimonialClassLeft : testimonialClassRight
                return (
                    <div className="row" key={item.name}>
                        <blockquote className={ourclass} >
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            <footer className="blockquote-footer">{item.name}</footer>
                        </blockquote>
                    </div>
                )
            })}
        </div>
    )
}