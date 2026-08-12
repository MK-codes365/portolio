import sentinelBackgroundLarge from '~/assets/slice-background-large.jpg';
import sentinelBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import sentinelBackground from '~/assets/slice-background.jpg';
import sentinelAppLarge from '~/assets/sentinel-app-large.jpg';
import sentinelAppPlaceholder from '~/assets/sentinel-app-placeholder.jpg';
import sentinelApp from '~/assets/sentinel-app.jpg';
import sentinelApp2Large from '~/assets/sentinel-app-2-large.jpg';
import sentinelApp2Placeholder from '~/assets/sentinel-app-2-placeholder.jpg';
import sentinelApp2 from '~/assets/sentinel-app-2.jpg';
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
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import styles from './ai-legal-sentinal.module.css';

const title = 'AI Legal Sentinel';
const description =
  'An intelligent AI-powered legal document analysis and contract risk evaluation platform. Employs advanced natural language processing to extract critical clauses, identify non-compliance risks, and provide plain-language legal summaries.';
const roles = ['AI / LLM Integration', 'Full Stack Architecture', 'NLP & Document Parsing', 'API Design'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

const clausesData = [
  {
    id: 'liability',
    title: 'Limitation of Liability',
    riskLevel: 'danger',
    riskLabel: 'High Risk',
    snippet: '"Provider total liability shall not exceed $10,000 regardless of breach severity..."',
    aiAnalysis: 'The current $10,000 cap is disproportionately low compared to the estimated $250,000 annual contract value, creating substantial unmitigated exposure for the client.',
    recommendation: 'Negotiate liability cap to match 12 months of paid fees ($250,000) or add explicit mutual carve-outs for data breaches and gross negligence.'
  },
  {
    id: 'renewal',
    title: 'Automatic Renewal Term',
    riskLevel: 'warning',
    riskLabel: 'Moderate Risk',
    snippet: '"Agreement automatically renews for 2-year terms unless terminated 60 days prior..."',
    aiAnalysis: 'A 60-day notice window before an automatic 24-month lock-in carries operational risk if cancellation deadlines are missed.',
    recommendation: 'Reduce renewal term to 1 year and request standard 30-day prior cancellation notice with email reminder triggers.'
  },
  {
    id: 'gdpr',
    title: 'Data Privacy & GDPR',
    riskLevel: 'safe',
    riskLabel: 'Safe / Compliant',
    snippet: '"All processing adheres to EU GDPR standard contractual clauses with AES-256 encryption..."',
    aiAnalysis: 'Fully compliant with standard enterprise privacy requirements, subprocessor transparency, and 72-hour breach reporting protocols.',
    recommendation: 'No amendments necessary. Standard compliance requirements are fully met.'
  },
];

const InteractiveRiskDashboard = () => {
  const [selectedClause, setSelectedClause] = useState(clausesData[0]);

  return (
    <div className={styles.interactiveContainer}>
      <div className={styles.clauseList}>
        <div className={styles.dashboardHeader}>
          <div className={styles.dashboardTitle}>
            <span>📋</span> Interactive Contract Inspector
          </div>
          <span style={{ fontSize: '11px', color: 'var(--textLight)' }}>Select clause to inspect</span>
        </div>
        {clausesData.map((clause) => (
          <div
            key={clause.id}
            className={styles.clauseCard}
            data-active={selectedClause.id === clause.id}
            onClick={() => setSelectedClause(clause)}
          >
            <div className={styles.clauseHeader}>
              <span className={styles.clauseName}>{clause.title}</span>
              <span className={styles.clauseBadge} data-level={clause.riskLevel}>
                {clause.riskLabel}
              </span>
            </div>
            <div className={styles.clauseSnippet}>{clause.snippet}</div>
          </div>
        ))}
      </div>

      <div className={styles.analysisPanel}>
        <div className={styles.gaugeHeader}>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreVal}>88%</span>
            <span className={styles.scoreLabel}>Score</span>
          </div>
          <div>
            <div className={styles.analysisTitle}>AI Sentinel Audit</div>
            <div style={{ fontSize: '12px', color: 'var(--textLight)' }}>
              1 Critical Alert • 1 Moderate Warning • 12 Safe Clauses
            </div>
          </div>
        </div>

        <div>
          <div className={styles.analysisTitle}>AI Legal Findings:</div>
          <div className={styles.aiResponse}>{selectedClause.aiAnalysis}</div>
        </div>

        <div>
          <div className={styles.analysisTitle}>Actionable Recommendation:</div>
          <div className={styles.recommendation}>
            <span className={styles.actionTag}>Suggested Edit: </span>
            {selectedClause.recommendation}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AiLegalSentinel = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.sentinel}>
        <ProjectBackground
          src={sentinelBackground}
          srcSet={`${sentinelBackground} 1280w, ${sentinelBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={sentinelBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/MK-codes365/AI-Legal-Sentinal"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${sentinelApp} 800w, ${sentinelAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={sentinelAppPlaceholder}
              alt="AI Legal Sentinel interface and document analysis dashboard."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/* Interactive Risk & Clause Inspector */}
        <ProjectSection>
          <ProjectSectionContent>
            <InteractiveRiskDashboard />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Intelligent Clause Analysis & Extraction</ProjectSectionHeading>
              <ProjectSectionText>
                Automates the identification of high-risk clauses, indemnity provisions, and liability limits across complex contracts and NDAs with high precision and explainability.
              </ProjectSectionText>
              <ProjectSectionText>
                Generates concise, human-readable summaries and risk scores to help legal teams and individuals evaluate agreements in minutes rather than hours.
              </ProjectSectionText>
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Compliance & Security Architecture</ProjectSectionHeading>
              <ProjectSectionText>
                Built with a secure processing pipeline ensuring client confidential documents remain encrypted at rest and in transit without persistent unencrypted storage.
              </ProjectSectionText>
              <ProjectSectionText>
                Full source code, documentation, and prompt pipelines are available on <Link href="https://github.com/MK-codes365/AI-Legal-Sentinal">GitHub</Link>.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Interactive Legal Review Interface</ProjectSectionHeading>
              <ProjectSectionText>
                Sleek responsive web interface featuring real-time clause highlighting, conversational query assistant, and exportable PDF audit reports.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={`${sentinelApp2} 800w, ${sentinelApp2Large} 1920w`}
              width={800}
              height={500}
              placeholder={sentinelApp2Placeholder}
              alt="AI Legal Sentinel document review interface"
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
