import Gallery, { GalleryItems } from '@/components/gallery';
import { get_media_with_tags } from '../api/cloudinary'

async function getData() {
  const res = await get_media_with_tags('featured')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const payload = await res.json()
  return payload
}

export default async function Home() {
  const featuredImages = await getData()
  const featuredImagesGallery = featuredImages.map((f: any) => {
    return {
      thumbnail: f.thumbnail,
      original: f.display,
      originalAlt: f.alt,
      thumbnailAlt: f.alt
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="page-content">
        <h1 className="font-weight-light">Welcome to TON Custom Carpentry!</h1>
        <h2 className="font-weight-light">Check out some of our work!</h2>

        <div className="row">
          <div className="col-12 col-md-9 mx-auto">
            <Gallery items={featuredImagesGallery} />
          </div>
        </div>
      </div>
    </main>
  )
}
