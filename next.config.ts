import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['192.168.2.181','192.168.2.180','192.168.2.163','fakestoreapi.com','m.media-amazon.com','images.unsplash.com','fdn2.gsmarena.com','images.samsung.com','content.rolex.com','www.ikea.com','plus.unsplash.com','images-static.nykaa.com','assets.myntassets.com','store.storeimages.cdn-apple.com','www.fossil.com','www.casio.com','staticimg.titan.co.in','www.boat-lifestyle.com','timexindia.imgix.net','seikowatches.com','cdn.shopify.com'],
  },
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

export default nextConfig;
