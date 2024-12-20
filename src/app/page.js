import surveyList from "@@/public/data/surveyList.json";
import Widgets from "@/components/relationship/widgetContainer";
import styles from "@/styles/Homepage.module.css";
import PageDetails from "@/components/common/aboutPage";
import BlogList from "@/components/blogs/blog-grid";
import dynamic from "next/dynamic";
import AidAndHealBanner from "@/components/common/bannerHomepage";

import { seoData } from "@@/config/root/seo";

export function generateMetadata(options) {
  const {
    title = seoData.title,
    description = seoData.description,
    url = "https://www.aidandheal.com",
    image = "https://www.aidandheal.com/images/aidAndHealLogoFavicon.png",
    icons,
    structuredData = null,
    ...rest
  } = options || {};

  return {
    title,
    description,
    keywords: seoData.keywords.join(", "),
    authors: [{ name: seoData.author.name }],
    icons: {
      icon: "/images/aidAndHealLogoFavicon.png",
    },
    openGraph: {
      title: seoData.ogTitle,
      description,
      type: "website",
      url,
      siteName: seoData.absoluteTitle,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.ogTitle,
      description,
      images: [image],
    },
    structuredData: structuredData ? JSON.stringify(structuredData) : undefined,
    ...rest,
  };
}

// Export the default asynchronous function named Home
export default async function Home() {
  return <div className="container mx-auto">Hello world</div>;
}
