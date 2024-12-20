import Survey from "@/components/compatibility/categories/page";
import pagesInformation from "@@/public/data/about-pages.json";
import surveyList from "@@/public/data/surveyList.json";
import PageDetails from "@/components/common/aboutPage";

export async function generateMetadata({ params }) {
  let { slug } = params;

  const pageInfo = pagesInformation.find(
    (item) => item.location === `/${slug}`
  ).id;
  const surveyInfo = surveyList.filter((item) => item.id == pageInfo + 1);
  return {
    title: surveyInfo[0].surveyTitle,
    description: surveyInfo[0].compatibilityTitle,
    authors: {
      name: "Vansun Mediatech",
    },
  };
}

export default async function WidgetsPage() {
  return (
    <div className=" max-w-[100%] sm:container sm:mx-auto">
      <Survey />
      <PageDetails />
    </div>
  );
}
