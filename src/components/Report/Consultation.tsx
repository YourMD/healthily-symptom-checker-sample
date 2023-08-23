import { useEffect, useState } from "react";

import { APIResponse, Article } from "@/types/api";
import Articles from "./Article";
import Heading from "../Heading";
import Cause from "./Cause";
import Summary from "./Summary";
import DateTime from "../DateTime";
import ConsultationInfoBox from "./ConsultationInfoBox";
import { Button } from "../Button";
import {
  ArticleContainer,
  BackImage,
  ButtonContainer,
  ReportHeader,
  Wrapper,
} from "./report.styles";
import CauseArticle from "./CauseArticle";

import Back from "../../media/back-icon.svg";
import { useRouter } from "next/router";
import { openInNewTab } from "@/utils/link";

const Consultation: React.FC<{
  report: APIResponse["report"];
}> = ({ report }) => {
  const summary = report?.summary;

  if (!summary) return;

  const {
    articles_v3: articles = [],
    consultation_triage,
    extracted_symptoms,
    additional_symptoms,
    negative_symptoms,
    duration,
    user_profile,
    influencing_factors,
  } = summary;

  const router = useRouter();
  const [showCause, setShowCause] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number>();
  const [dateTime, setDateTime] = useState<number | undefined>();

  useEffect(() => {
    setDateTime(Date.now());
  }, []);

  const [componentLoaded, setComponentLoaded] = useState(false);

  // This component was throwing a hydration error relating
  // to next/image component. With more time I'd fix it
  // but this is a workaround given tight deadlines
  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  const handleArticleClick = (selectedArticleIndex: number) => {
    setShowCause(true);
    setSelectedArticleIndex(selectedArticleIndex);
    setSelectedArticle(articles[selectedArticleIndex]);
  };

  return (
    <Wrapper>
      {componentLoaded && (
        <>
          <ReportHeader>
            <Heading as="h1" kind="heading">
              Your report
            </Heading>
            <DateTime dateTime={dateTime} />
          </ReportHeader>
          {showCause && (
            <BackImage
              src={Back}
              alt="Go back"
              onClick={() => setShowCause(false)}
            />
          )}
          {showCause ? (
            <Cause article={selectedArticle} index={selectedArticleIndex} />
          ) : (
            <>
              {!!articles.length && (
                <>
                  <Heading kind="heading" as="h2">
                    Possible Causes
                  </Heading>
                  <Articles articles={articles} onClick={handleArticleClick} />
                </>
              )}
            </>
          )}
          {showCause && selectedArticle && (
            <>
              <Heading as="h3" kind="heading">
                Useful reading
              </Heading>
              <CauseArticle article={selectedArticle} />
            </>
          )}

          {consultation_triage && !showCause && (
            <>
              <Heading kind="heading" as="h2">
                Summary
              </Heading>
              <Summary level={consultation_triage.level}>
                {consultation_triage.triage_advice}
              </Summary>
            </>
          )}

          {!showCause && (
            <>
              <ConsultationInfoBox
                positiveSymptoms={[
                  ...extracted_symptoms,
                  ...additional_symptoms,
                ]}
                negativeSymptoms={negative_symptoms}
                duration={duration}
                userProfile={user_profile}
                influencingFactors={influencing_factors}
              />
              <ButtonContainer>
                <Button
                  onClick={() =>
                    openInNewTab("https://www.livehealthily.com/legal/safe-use")
                  }
                  fullWidth
                  light
                >
                  How to use Healthily safely
                </Button>

                <Button onClick={() => router.reload()} fullWidth>
                  Start a new consultation
                </Button>
              </ButtonContainer>
              <ArticleContainer className="dark">
                <span>
                  The suggested next steps are base on a group of people with
                  similar characteristics such as your age, sex and health
                  background, who are generally healthy and don’t suffer from
                  any chronic or rare medical conditions. Healthily can’t
                  consider all the information a doctor can, and is not able to
                  identify all conditions or symptoms.
                </span>
              </ArticleContainer>
            </>
          )}

          {showCause && (
            <ButtonContainer>
              {/*<Button
                onClick={() =>
                  openInNewTab("https://www.livehealthily.com/app")
                }
                fullWidth
                light
              >
                Track your symptoms
              </Button>*/}

              <Button onClick={() => router.reload()} fullWidth>
                That's all, thanks
              </Button>
            </ButtonContainer>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Consultation;
