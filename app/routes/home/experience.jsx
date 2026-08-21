import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { useState } from 'react';
import styles from './experience.module.css';

// SVG Icons for Companies / Experience
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Experience = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  const experiences = [
    {
      role: 'SDE Software Development Engineer Intern',
      company: 'Physio NutriCore',
      type: 'Internship',
      period: 'Aug 2026 – Present',
      location: 'Remote',
      brandColor: '#00D084',
      badgeColor: 'rgba(0, 208, 132, 0.15)',
      borderColor: 'rgba(0, 208, 132, 0.4)',
      responsibilities: [
        <>
          Engineered responsive multi-role portals (User, Coach, Expert, Admin) using{' '}
          <strong>React 19</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>, improving navigation efficiency by <strong>30%</strong>.
        </>,
        <>
          Implemented a centralized <strong>RBAC</strong> system integrating <strong>Firebase Authentication</strong> and custom <strong>JWT route guards</strong>, securing routes and data across 4 permission tiers.
        </>,
        <>
          Integrated <strong>15+ RESTful API endpoints</strong> via custom React hooks (<code>useApi</code>) with request normalization, <strong>Redis caching & rate limiting</strong>, cutting redundant API requests by <strong>35%</strong>.
        </>,
        <>
          Built health analytics/earnings dashboards with <strong>Recharts</strong>; added <strong>Vitest</strong> tests and <strong>Husky/Oxlint</strong> hooks, cutting linting errors by <strong>40%</strong>.
        </>,
      ],
      skills: [
        'React 19',
        'Tailwind CSS',
        'Redis',
        'Rate Limiting',
        'SQL',
        'Framer Motion',
        'Firebase Authentication',
        'RBAC / JWT',
        'RESTful APIs',
        'Recharts',
        'Vitest',
        'Husky & Oxlint',
      ],
    },
    {
      role: 'SDE Software Development Engineer Intern',
      company: 'InAmigos Foundation (IAF)',
      type: 'Internship',
      period: 'Apr 2026 – May 2026',
      location: 'Remote',
      brandColor: '#FF6B6B',
      badgeColor: 'rgba(255, 107, 107, 0.15)',
      borderColor: 'rgba(255, 107, 107, 0.4)',
      responsibilities: [
        <>
          Audited event platform via browser DevTools; improved Lighthouse Performance Score from <strong>64 to 76 (+18.8%)</strong>.
        </>,
        <>
          Built <strong>20+ REST APIs</strong> and developed <strong>20+ responsive, production-ready pages</strong> using the <strong>MERN stack</strong> aligned with client requirements.
        </>,
        <>
          Built responsive React components (Hero, Footer, About, Team Profile) improving cross-device compatibility; delivered live demos and iterated from client feedback.
        </>,
      ],
      skills: [
        'MERN Stack',
        'React.js',
        'REST APIs',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Lighthouse',
        'Browser DevTools',
        'Responsive Design',
      ],
    },
  ];

  return (
    <Section
      className={styles.experienceSection}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  Career & Journey
                </div>
              </div>
              <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
                Professional Experience
              </Heading>

              <div className={styles.timeline}>
                {experiences.map((exp, index) => (
                  <div
                    key={exp.company + exp.role}
                    className={styles.timelineItem}
                    data-visible={visible}
                    style={{
                      '--brand-color': exp.brandColor,
                      '--badge-bg': exp.badgeColor,
                      '--border-accent': exp.borderColor,
                      transitionDelay: `${index * 150 + 200}ms`,
                    }}
                  >
                    {/* Timeline Node marker */}
                    <div className={styles.timelineMarker}>
                      <div className={styles.markerCircle}>
                        <div className={styles.markerInner} />
                      </div>
                      {index !== experiences.length - 1 && <div className={styles.timelineStem} />}
                    </div>

                    {/* Experience Card */}
                    <div className={styles.experienceCard}>
                      <div className={styles.cardHeader}>
                        <div className={styles.roleInfo}>
                          <div className={styles.titleRow}>
                            <h4 className={styles.roleTitle}>{exp.role}</h4>
                            <span className={styles.typeBadge}>{exp.type}</span>
                          </div>
                          <div className={styles.companyRow}>
                            <span className={styles.companyName}>{exp.company}</span>
                          </div>
                        </div>

                        <div className={styles.metaInfo}>
                          <div className={styles.metaItem}>
                            <CalendarIcon />
                            <span>{exp.period}</span>
                          </div>
                          <div className={styles.metaItem}>
                            <LocationIcon />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className={styles.responsibilitiesList}>
                        {exp.responsibilities.map((resp, i) => (
                          <div key={i} className={styles.responsibilityItem}>
                            <span className={styles.bullet} />
                            <p className={styles.responsibilityText}>{resp}</p>
                          </div>
                        ))}
                      </div>

                      <div className={styles.skillsContainer}>
                        <span className={styles.skillsLabel}>Key Technologies & Competencies:</span>
                        <div className={styles.skillsGrid}>
                          {exp.skills.map(skill => (
                            <span key={skill} className={styles.skillChip}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.cardGlow} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
