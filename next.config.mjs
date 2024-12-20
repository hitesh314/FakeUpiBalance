/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_GOOGLE_CLIENT_ID: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
    NEXTAUTH_GOOGLE_CLIENT_SECRET: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_JWT_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_API: process.env.BASE_URL_API,
    SUBDOMAIN_RELATIONSHIP: process.env.SUBDOMAIN_RELATIONSHIP,
    SUBDOMAIN_PARENTING: process.env.SUBDOMAIN_PARENTING,
    AIDANDHEALPARENTING_CLIENT_ID: process.env.AIDANDHEALPARENTING_CLIENT_ID,
    AIDANDHEALPARENTING_CLIENT_SECRET:
      process.env.AIDANDHEALPARENTING_CLIENT_SECRET,
    BASE_URL_PARENTING: process.env.BASE_URL_PARENTING,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "ivxstcbvquihbkyokmye.supabase.co",
      "res.cloudinary.com",
      "aid-and-heal-posts.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
