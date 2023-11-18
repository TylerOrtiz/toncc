import { type NextRequest } from "next/server";
import { get_media_with_tags } from '../../../api/cloudinary'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const tags = searchParams.get('tag')
  const media = await get_media_with_tags('featured')

  return Response.json(media)
}
