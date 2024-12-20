const React = require("react");
const {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} = require("@react-email/components");

export const NotifyPartnerEmail = ({ primaryUserID, partnerUserID }) => {
  const previewText = `Read Your Partner's review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Img
              src="/images/aidAndHealLogo.png"
              width="96"
              height="96"
              alt="Aid&Heal"
              style={userImage}
            />
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Your Partner has filled the survey.</Text>
              <Text style={review}>
                Our Survey indicated that you have Strong Compatibility
              </Text>
              <Text style={paragraph}>
                The love compatibility survey results are in! We've shared the
                outcome with your Partner.
              </Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                Although it's too late to change your answers, we encourage open
                communication. Take this opportunity to discuss the results and
                share your thoughts directly with your partner.
              </Text>

              <Button
                style={button}
                href={`${baseUrl}/relationship/love-compatibility/surveyResult?primaryUserID=${primaryUserID}&partnerUserID=${partnerUserID}&sendPartnerMail=false`}
              >
                Get Detailed Analysis
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Section>
            <Row>
              <Text style={{ ...paragraph, fontWeight: "700" }}>
                Common questions
              </Text>
              <Text>
                <Link href="#" style={link}>
                  How do the love compatibility survey work?
                </Link>
              </Text>
              <Text>
                <Link
                  href="mailto:hiteshjohar314@gmail.com?subject=Your%20Feedback&body=Please%20share%20your%20thoughts%20with%20us."
                  style={link}
                >
                  Share Your Feedback
                </Link>
              </Text>
              <Text>
                <Link href="#" style={link}>
                  How can I improve the results?
                </Link>
              </Text>
              <Hr style={hr} />
              <Text style={footer}>Aid And Heal, Gurgaon, India</Text>
              <Link href="" style={reportLink}>
                Report issues
              </Link>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#ff5a5f",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
