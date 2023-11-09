'use client'
import ImageGallery from "react-image-gallery";

export type GalleryItems = {
    original: string;
    thumbnail: string,
    originalAlt: string,
    thumbnailAlt: string
}

type GalleryOptions = {
    showNav: boolean
}

type GalleryProps = {
    items: GalleryItems[]
    options?: GalleryOptions
}

const Gallery = ({items, options}: GalleryProps) => {
    const { ...rest } = options ?? {}
    return (
        <>
          <ImageGallery items={items} {...rest} />
        </>
    )
}

export default Gallery