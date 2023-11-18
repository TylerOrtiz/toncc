import { v2 as cloudinary } from 'cloudinary'
import { cache } from 'react'

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
 
export type list<T> = {
    count: number,
    results: T[]
}

export type resource_custom = {
    custom: {
        alt: string
    }
}
export type resource = {
    asset_id: string,
    public_id: string,
    format: string,
    version: number,
    resource_type: string,
    type: string,
    created_at: string,
    bytes: number,
    width: number,
    height: number,
    folder: string,
    url: string,
    secure_url: string,
    tags: string[]
    context: resource_custom,
}

const all_cloudinary_images = async (): Promise<list<resource>> => {
    const data = await cloudinary.api.resources({
        resource_type: 'image',
        max_results: 500,
        tags: true,
        image_metadata: true,
        media_metadata: true,
        context: true
    })
    const { rate_limit_allowed, rate_limit_remaining, resources } = data
    console.debug(`Cloudinary Rate Limiting: ${rate_limit_remaining} / ${rate_limit_allowed} `)
    return { count: resources.length, results: resources }
}

const all_cloudinary_images_cached = cache(all_cloudinary_images)

const get_tagged_media = async (tags: string | string[]) => {
    const images = await all_cloudinary_images_cached()
    const tagsSearch = Array.isArray(tags) ? tags : [tags]
    const matching = images.results.filter(a => a.tags.some(r => tagsSearch.includes(r)))
    return matching
}

export const get_media_with_tags = async(tags: string | string[]) => {
    const media = await get_tagged_media(tags);
    const mediaData = media.map( f => {
        return {
            ...wrap_media(f.public_id),
            alt: f.context?.custom?.alt
        } 
    })
    return Response.json(mediaData)
}

const wrap_media = (id: string) => {
    return {
        thumbnail: cloudinary.url(id, { quality: 'auto:low', secure: true }),
        display: cloudinary.url(id, { quality: 'auto:good', secure: true }),
        enlarged: cloudinary.url(id, { quality: 'auto:best', secure: true }),
    }
}