import type { Metadata } from 'next'
import { Cloudinary } from "@cloudinary/url-gen";
import PortfolioContent from '@/data/portfolios';
import { Portfolio } from '@/models/portfolio';
export const metadata: Metadata = {
    title: 'TON Custom Carpentry | Portfolio',
    description: `See some of the highlighted work John has done 
    and learn more about what types of work he specializes in.`,
}
import { get_media_by_ids } from '../../api/cloudinary'
import Gallery, { GalleryItems } from '@/components/gallery';

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
});

async function getData() {
    const ids = PortfolioContent.reduce( (ac, f) => {
        const currentIds = f.media.map(g=>g.public_id)
        ac.push(...currentIds)
        return ac
    } , [])
    const res = await get_media_by_ids(ids)
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
  
    const payload = await res.json()
    const hydratedPortfolio = PortfolioContent.map((folio) => {
        const images: GalleryItems[] = folio?.media?.map((media) => {
            const mediaPayload = payload.find((f)=>f.public_id === media.public_id)
            
            return {
                thumbnail: mediaPayload.thumbnail,
                original: mediaPayload.display,
                originalAlt: mediaPayload.alt,
                thumbnailAlt: mediaPayload.alt
            }
        }) ?? []
        
        return {
            ...folio,
            galleryImages: images,
        }
    })

    return hydratedPortfolio
  }

export default async function Portfolio() {
    const hydratedPortfolios = await getData()

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