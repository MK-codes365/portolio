import healconnectBackgroundLarge from '~/assets/slice-background-large.jpg';
import healconnectBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import healconnectBackground from '~/assets/slice-background.jpg';
import healconnectAppLarge from '~/assets/healconnect-app-large.jpg';
import healconnectAppPlaceholder from '~/assets/healconnect-app-placeholder.jpg';
import healconnectApp from '~/assets/healconnect-app.jpg';
import healconnectApp2Large from '~/assets/healconnect-app-2-large.jpg';
import healconnectApp2Placeholder from '~/assets/healconnect-app-2-placeholder.jpg';
import healconnectApp2 from '~/assets/healconnect-app-2.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import styles from './healconnect.module.css';

const title = 'Heal Connect';
const description =
  'Bridging healthcare gaps with AI-powered telemedicine. Heal Connect is a comprehensive platform designed to revolutionize medical services access in rural and underserved communities.';
const roles = ['React Frontend', 'AWS Bedrock Integration', 'UX Design', 'System Architecture'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const HealConnect = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.healconnect}>
        <ProjectBackground
          src={healconnectBackground}
          srcSet={`${healconnectBackground} 1280w, ${healconnectBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={healconnectBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://healconnect-iota.vercel.app/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${healconnectApp} 800w, ${healconnectAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={healconnectAppPlaceholder}
              alt="Heal Connect application dashboard."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>AI symptom analysis & support</ProjectSectionHeading>
              <ProjectSectionText>
                Integrates the AWS Bedrock Nova model to offer 24/7 preliminary symptom checkers, disease information, and personalized health recommendations in natural language.
              </ProjectSectionText>
              <ProjectSectionText>
                Provides clinical decision support to healthcare workers and doctors, automatically summarizing patient history, suggesting tests, and identifying potential complications.
              </ProjectSectionText>
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Four-Tier Integrated Delivery</ProjectSectionHeading>
              <ProjectSectionText>
                Unifies patients, health workers, doctors, and administrators into one coordinated ecosystem. Health workers can onboard patients and collect vitals locally, which doctors can then review during remote teleconsultations.
              </ProjectSectionText>
              <ProjectSectionText>
                Built using React + Vite for quick loading, custom-tailored CSS for deep dark aesthetics, and a scalable serverless backend leveraging AWS Lambda and DynamoDB. The full source code is available on <Link href="https://github.com/MK-codes365/healconnect">GitHub</Link>.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Sleek Mobile Teleconsultation</ProjectSectionHeading>
              <ProjectSectionText>
                Fully responsive design with Progressive Web App (PWA) support. Patients can check their digital medical records, schedule appointments, and connect directly with specialists.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${healconnectApp2} 800w, ${healconnectApp2Large} 1920w`}
              width={800}
              height={500}
              placeholder={healconnectApp2Placeholder}
              alt="Heal Connect video teleconsultation UI"
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
