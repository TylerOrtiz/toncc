const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
}

module.exports = nextConfig
