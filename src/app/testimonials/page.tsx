import type { Metadata } from 'next'
import Card from '@/components/card';
import TestimonialsContent from '@/data/testimonials';
export const metadata: Metadata = {
    title: 'TON Custom Carpentry | Testimonials',
    description: `Still not convinced? Hear directly from prior and
    current clients with their testimonials.`,
}

export default async function Testimonials() {
    const testimonials = TestimonialsContent

    return (
        <div className="page-content">
            <h1 className="font-weight-light">Testimonials</h1>
            <h2 className="font-weight-light">Hear some feedback from some of our clients!</h2>

            <div className="row">
                {testimonials.map((item) => (
                    <div className="col-sm-6 col-lg-4 mx-auto my-2" key={item.name}>
                        <Card cardTitle={item.name} cardContent={item.content}></Card>
                    </div>
                ))}
            </div>
        </div>
    )
}