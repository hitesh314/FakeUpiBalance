import Survey from "@/components/compatibility/categories/page";
import compChkStyles from "@/styles/mainScreen.module.css";
import PageDetails from "@/components/common/aboutPage";
import { useSurveyContext } from "@/../../context/surveyContext";
import surveyList from "@@/public/data/surveyList.json";

export async function generateMetadata({ params }) {
  const seoData = surveyList
    .filter((item) => item.slug == params.surveyPage)
    ?.at(0);

  return {
    title: seoData.bannerTitle,
    description: seoData.bannerDescription,
    openGraph: {
      title: seoData.surveyTitle,
      description: seoData.compatibilityTitle,
      type: "website",
      url: `https://www.aidandheal.com${seoData.redirectUrl}`,
    },
  };
}

export default function Home() {
  return (
    <>
      <div className={`${compChkStyles.timeSurvey}`}>
        <Survey />
        <PageDetails pageId={""} />
      </div>
    </>
  );
}
