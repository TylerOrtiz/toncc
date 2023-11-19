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

const query_get_tagged_media = async (tags: string | string[]) => {
    const images = await all_cloudinary_images_cached()
    const tagsSearch = Array.isArray(tags) ? tags : [tags]
    const matching = images.results.filter(a => a.tags.some(r => tagsSearch.includes(r)))
    return matching
}

const query_get_media_by_ids = async (ids: string[]) => {
    const images = await all_cloudinary_images_cached()
    const matching = images.results.filter(a => ids.indexOf(a.public_id) >= 0)
    return matching
}

export const get_media_with_tags = async(tags: string | string[]) => {
    const media = await query_get_tagged_media(tags);
    const mediaData = media.map( f => {
        return {
            public_id: f.public_id,
            alt: f.context?.custom?.alt,
            ...wrap_media(f.public_id),
        } 
    })
    return Response.json(mediaData)
}

export const get_media_by_ids = async(ids: string[]) => {
    const media = await query_get_media_by_ids(ids);
    const mediaData = media.map( f => {
        return {
            public_id: f.public_id,
            alt: f.context?.custom?.alt,
            ...wrap_media(f.public_id),
        } 
    })
    return Response.json(mediaData)
}

const wrap_media = (id: string) => {
    return {
        thumbnail: cloudinary.url(id, { quality: 'auto:low', background: "black", crop: 'fill', width: 250, height: 175, secure: true }),
        display: cloudinary.url(id, { quality: 'auto:good', background: "black", crop: 'fill', aspect_ratio: "16:9", height: 768, secure: true }),
        enlarged: cloudinary.url(id, { quality: 'auto:best', background: "black", crop: 'fill', aspect_ratio: "16:9", height: 1024, secure: true }),
    }
}