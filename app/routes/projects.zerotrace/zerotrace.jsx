import zerotraceBackgroundLarge from '~/assets/slice-background-large.jpg';
import zerotraceBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import zerotraceBackground from '~/assets/slice-background.jpg';
import zerotraceAppLarge from '~/assets/zerotrace-app-large.jpg';
import zerotraceAppPlaceholder from '~/assets/zerotrace-app-placeholder.jpg';
import zerotraceApp from '~/assets/zerotrace-app.jpg';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { SegmentedControl, SegmentedControlOption } from '~/components/segmented-control';
import { ThemeProvider, useTheme } from '~/components/theme-provider';
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
import styles from './zerotrace.module.css';

const title = 'ZeroTrace Windows Tool';
const description =
  'A robust, enterprise-grade data wiping solution for Windows. Built with a hybrid C++/Python architecture, it combines native OS optimization with a modern user interface.';
const roles = ['Cybersecurity', 'C++ / Python Core', 'Windows API', 'GUI Development'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export const ZeroTrace = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.zerotrace}>
        <ProjectBackground
          src={zerotraceBackground}
          srcSet={`${zerotraceBackground} 1280w, ${zerotraceBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={zerotraceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/MK-codes365/zerotrace"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${zerotraceApp} 800w, ${zerotraceAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={zerotraceAppPlaceholder}
              alt="ZeroTrace application UI showing drive selection and progress bar."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Performance Optimization</ProjectSectionHeading>
              <ProjectSectionText>
                ZeroTrace features a native C++ engine (`wiper_core.cpp`) that interfaces directly with low-level Windows APIs for direct disk I/O, yielding 20-40% faster execution than standard Python implementations.
              </ProjectSectionText>
              <ProjectSectionText>
                In cases where the DLL isn't available, the application automatically falls back to a ctypes-based pure Python core (`wiper.py`) to guarantee reliability and cross-compatibility.
              </ProjectSectionText>
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Industry Standards & Safety</ProjectSectionHeading>
              <ProjectSectionText>
                Supports 5 industry-standard sanitization methods including NIST 800-88, DoD 5220.22-M, and Peter Gutmann. Includes safety interlocks that block system drive selection and handle volume dismounting automatically.
              </ProjectSectionText>
              <ProjectSectionText>
                Generates digitally signed, cryptographic PDF certificates and JSON metadata as proof of complete and irreversible sanitization.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
