import type { Metadata } from 'next'
import { Cloudinary } from "@cloudinary/url-gen";
import PortfolioContent from '@/data/portfolios';
import { Portfolio } from '@/models/portfolio';
export const metadata: Metadata = {
    title: 'TON Custom Carpentry | Portfolio',
    description: `See some of the highlighted work John has done 
    and learn more about what types of work he specializes in.`,
}

import Gallery, { GalleryItems } from '@/components/gallery';

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});

export default async function Portfolio() {
    const hydratedPortfolios = PortfolioContent.map((folio) => {
        const images: GalleryItems[] = []
        folio?.media?.forEach(media => {
            const urltemp = cld.image(media.url).toURL()
            // TODO: Add in actions and transforms etc.
            const small = urltemp//this.cloudinary.url(media.url, { crop: 'scale', width: 150, quality: 'auto:low' });
            const medium = urltemp//this.cloudinary.url(media.url, { crop: 'scale', width: width, quality: 'auto:eco' });
            const large = urltemp//this.cloudinary.url(media.url, { crop: 'scale', quality: 'auto:best' });
            images.push({
                thumbnail: small,
                original: large,
                originalAlt: media.alt,
                thumbnailAlt: media.alt
            });
        })

        return {
            ...folio,
            galleryImages: images,
        }
    })

    return (
        <div className="page-content">
            <div className="row">
                <div className="col">
                    <h1 className="font-weight-light">Projects</h1>
                    <h2 className="font-weight-light">Review some of our highlighted work.</h2>
                </div>
            </div>
            {hydratedPortfolios.map((item) => (
                <div className="row" key={item.id}>
                    <div className="col">
                        <hr />
                        <h2 className="d-inline pt-4">{item.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        <Gallery items={item.galleryImages}/>
                    </div>
                </div>
            ))}
        </div>
    )
}