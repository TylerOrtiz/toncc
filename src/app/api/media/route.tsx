import { type NextRequest } from "next/server";

const cloudinary = require('cloudinary').v2;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const tags = searchParams.get('tag')
  console.log('tags', tags)
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  let searchTags = '';
  let inputsTags = tags.split(',');

  for (let i = 0; i < inputsTags.length; i++) {
    if (i === 0) {
      // end it
      searchTags += `tags:${inputsTags[i]} `;
    } else {
      // concat it
      searchTags += `OR tags:${inputsTags[i]} `;
    }
  }

  console.log(`built tag list ${searchTags}`);

  cloudinary.search
    .expression(searchTags)
    .with_field('context')
    .with_field('tags')
    .max_results(10)
    .execute().then((result) => {
      console.log(result);
      let logString = `CloudinaryByTag '${tags}' returned ${result.resources.length} results.\n`;
      logString += `Remaining api calls ${result.rate_limit_remaining}/${result.rate_limit_allowed}`;
      // sails.log.info(logString);

      if (result.resources) {
        let response = result.resources.map((e) => {
          return {
            url: e.secure_url,
            id: e.public_id
          }
        });
        return Response.json(response)
      } else {
        return Response.error()
      }
    });


  return Response.json({ message: "Nothing here yet" })
}
