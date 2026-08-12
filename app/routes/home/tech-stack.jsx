import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { Divider } from '~/components/divider';
import { useState } from 'react';
import styles from './tech-stack.module.css';

// SVG Icons for all tech stack items
const CppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 10h-2V8h-2v2h-2v2h2v2h2v-2h2v-2zm-6 2c0-3.31-2.69-6-6-6S4 8.69 4 12s2.69 6 6 6c2.59 0 4.8-1.64 5.6-4h-2.24c-.72 1.19-2.02 2-3.36 2-2.21 0-4-1.79-4-4s1.79-4 4-4c1.34 0 2.64.81 3.36 2H16c-.8-2.36-3.01-4-5.6-4z" />
  </svg>
);

const SqlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 3.8 2 6v12c0 2.2 4.5 4 10 4s10-1.8 10-4V6c0-2.2-4.5-4-10-4zm0 2c4.4 0 8 1.3 8 2s-3.6 2-8 2-8-1.3-8-2 3.6-2 8-2zm0 6c4.4 0 8 1.3 8 2s-3.6 2-8 2-8-1.3-8-2 3.6-2 8-2zm0 6c4.4 0 8 1.3 8 2s-3.6 2-8 2-8-1.3-8-2 3.6-2 8-2z" />
  </svg>
);

const HtmlIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6H7.6l.3 3h9.6l-.6 6.8-4.8 1.3-4.8-1.3-.3-3.2h3l.2 1.6 1.9.5 1.9-.5.2-2H6.9L6.1 3h12.2l-.3 3z" />
  </svg>
);

const CssIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.4 6h-11l.3 3h10.4l-.6 6.8-4.7 1.3-4.7-1.3-.3-3.2H11l.1 1.6 1.9.5 1.9-.5.2-2H4.9l-.3-3h13.5l-.3-3z" />
  </svg>
);

const JsIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path fill="#000" d="M6 18.2c.3.5.7.8 1.5.8.7 0 1.2-.4 1.2-1.3v-6.9h1.7v7c0 1.8-1.1 2.3-2.9 2.3-1.7 0-2.6-.8-2.9-2l1.4-.1zm8.2 2.2c-.3-.6-.5-1.1-.5-2h1.6c0 .6.3 1.1.9 1.1.6 0 .9-.3.9-.8 0-.5-.4-.7-1-1l-.5-.2c-1.3-.6-1.9-1.2-1.9-2.5 0-1.5 1.1-2.4 2.9-2.4 1.5 0 2.5.7 2.8 1.8h-1.5c-.2-.5-.6-.8-1.3-.8-.5 0-.8.3-.8.7 0 .4.3.6.9.9l.5.2c1.5.7 2.1 1.3 2.1 2.7 0 1.7-1.2 2.6-3.1 2.6-1.8-.1-2.7-1-3-2.3z" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24">
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" stroke="#61DAFB" strokeWidth="1.3" fill="none" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" stroke="#61DAFB" strokeWidth="1.3" fill="none" />
    <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" stroke="#61DAFB" strokeWidth="1.3" fill="none" />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7.7v11L12 22l10-5.3V7.7L12 2zm8 13.5l-8 4.2-8-4.2V8.8l8-4.2 8 4.2v6.7z" />
  </svg>
);

const ExpressIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
  </svg>
);

const DynamoDbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2.2c4.13 0 7.8 1.25 7.8 2.3S16.13 8.8 12 8.8 4.2 7.55 4.2 6.5 7.87 4.2 12 4.2zm0 5.8c4.13 0 7.8 1.25 7.8 2.3v1.9c-1.8 1.05-4.66 1.7-7.8 1.7s-6-0.65-7.8-1.7v-1.9c0-1.05 3.67-2.3 7.8-2.3zm0 5.8c4.13 0 7.8 1.25 7.8 2.3v1.4c-1.8 1.05-4.66 1.7-7.8 1.7s-6-0.65-7.8-1.7v-1.4c0-1.05 3.67-2.3 7.8-2.3z" />
  </svg>
);

const MongoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C7.5 7.5 7.5 12.5 7.5 15.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-3 0-8-4.5-13.5zm0 15.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.8.8-4.5 2.5-7.5 1.7 3 2.5 5.7 2.5 7.5 0 1.4-1.1 2.5-2.5 2.5z" />
  </svg>
);

const AwsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.8 14.5c-2.4 1.8-5.8 2.7-8.8 2.7-4.2 0-8-1.6-10.8-4.2-.2-.2 0-.5.2-.4 3.1 1.8 6.9 2.8 10.7 2.8 2.7 0 5.6-.6 8.3-2 .4-.2.7.2.4.5zm1.5-1.5c-.3-.4-2-.2-3.1-.1-.3 0-.4-.3-.1-.5 1.7-1.2 4.4-.8 4.7-.4.3.4-.1 3.1-1.7 4.5-.2.2-.5.1-.4-.2.3-1 .6-2.8.6-3.3zM6.9 8.2c0-1.7 1-2.8 2.6-2.8 1.3 0 2.2.8 2.5 1.9l-1.3.4c-.2-.7-.6-1.1-1.2-1.1-.8 0-1.3.6-1.3 1.6 0 1.1.5 1.7 1.3 1.7.6 0 1.1-.4 1.3-1.1l1.3.4c-.4 1.2-1.3 1.9-2.6 1.9-1.7 0-2.6-1.2-2.6-2.9zm6.7-2.6h1.4l1.8 5.7 1.8-5.7h1.4l-2.5 7.1h-1.4l-2.5-7.1z" />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.98 11.08h-2.1v2.1h2.1v-2.1zm-2.8 0h-2.1v2.1h2.1v-2.1zm-2.8 0h-2.1v2.1h2.1v-2.1zm8.4 0h-2.1v2.1h2.1v-2.1zm-5.6-2.8h-2.1v2.1h2.1V8.28zm2.8 0h-2.1v2.1h2.1V8.28zm2.8 0h-2.1v2.1h2.1V8.28zm-2.8-2.8h-2.1v2.1h2.1V5.48zm11.75 6.7c-.5-.4-1.6-.4-2.4-.1-.3-.9-.9-1.7-1.8-2.2l-.6-.4-.4.6c-.4.7-.6 1.4-.6 2.2 0 .2 0 .3.1.5-1.1.2-4.4.2-6.5-.8-1.5-.7-2.7-.6-3.6.3-.5.5-.8 1.2-.9 2-.2 1.4.3 2.7 1.4 3.7 2.4 2.1 6.5 2.2 9.5 1.5 2.8-.7 4.9-2.4 5.7-4.6.8-.2 1.6-.6 2.1-1.3l.4-.5-.6-.3z" />
  </svg>
);

const GithubActionsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.546 10.93L13.067.452a1.503 1.503 0 0 0-2.126 0L8.835 2.56l3.155 3.155a1.78 1.78 0 0 1 1.565.466 1.776 1.776 0 0 1 .465 1.572l3.044 3.044a1.777 1.777 0 0 1 1.572.465 1.784 1.784 0 0 1 0 2.52 1.784 1.784 0 0 1-2.52 0 1.78 1.78 0 0 1-.466-1.565l-2.84-2.84v4.542a1.778 1.778 0 0 1 .466 1.565 1.784 1.784 0 0 1-2.52 2.52 1.784 1.784 0 0 1-2.52-2.52c.11-.53.466-1.02.466-1.565v-4.542l-2.84 2.84a1.78 1.78 0 0 1-.466 1.565 1.784 1.784 0 0 1-2.52-2.52 1.78 1.78 0 0 1 1.565-.466l3.044-3.044a1.776 1.776 0 0 1 .465-1.572L6.722 4.673.454 10.94a1.503 1.503 0 0 0 0 2.126l10.48 10.48a1.503 1.503 0 0 0 2.125 0l10.487-10.488a1.503 1.503 0 0 0 0-2.128z" />
  </svg>
);

const PostmanIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 0C6.044 0 0 6.044 0 13.5S6.044 27 13.5 27 27 20.956 27 13.5 20.956 0 13.5 0zm0 4.2c2.1 0 3.9.7 5.4 1.9l-2.1 2.1c-.9-.7-2-1.1-3.3-1.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4c2.6 0 4.7-1.8 5.2-4.3h-5.2v-2.9h8.2c.1.5.1 1 .1 1.6 0 5.1-3.5 8.8-8.3 8.8-5.1 0-9.3-4.2-9.3-9.3s4.2-9.3 9.3-9.3z" />
  </svg>
);

const JestIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
  </svg>
);

const ZodIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm6 13.5l-6 3-6-3V8.5l6-3 6 3v7zM7.5 13h5.2l-5.2 3.8v1.2h9v-2.2H11.3l5.2-3.8V10.8h-9V13z" />
  </svg>
);

const BullMqIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
  </svg>
);

const SwaggerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5c-1.3 1-3 1.5-4.8 1.5-2.8 0-5.1-1.4-6.3-3.6l1.8-1.1c.8 1.5 2.4 2.5 4.5 2.5 1.2 0 2.3-.4 3.1-1 .9-.8 1.2-1.8 1-2.9-.4-1.7-2.1-2.4-3.9-3-2.3-.8-4.4-1.8-4.1-4.2.3-2.3 2.4-3.8 5-3.8 2.2 0 4.1 1 5.1 2.7l-1.8 1.1c-.6-1.1-1.8-1.7-3.3-1.7-1.3 0-2.3.5-2.5 1.5-.3 1.2.9 1.8 2.5 2.3 2.5.8 5 1.8 4.7 4.7-.2 2.1-1.6 3.7-3.6 4.6z" />
  </svg>
);

export const TechStack = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  const skillCategories = [
    {
      category: 'Languages',
      badge: '⚡ Languages',
      skills: [
        { name: 'C++', icon: <CppIcon />, color: '#00599C' },
        { name: 'SQL', icon: <SqlIcon />, color: '#00758F' },
      ],
    },
    {
      category: 'Frontend',
      badge: '🎨 Frontend',
      skills: [
        { name: 'HTML5', icon: <HtmlIcon />, color: '#E34F26' },
        { name: 'CSS3', icon: <CssIcon />, color: '#1572B6' },
        { name: 'JavaScript (ES6+)', icon: <JsIcon />, color: '#F7DF1E' },
        { name: 'React', icon: <ReactIcon />, color: '#61DAFB' },
      ],
    },
    {
      category: 'Backend',
      badge: '⚙️ Backend',
      skills: [
        { name: 'Node.js', icon: <NodeIcon />, color: '#5FA04E' },
        { name: 'Express.js', icon: <ExpressIcon />, color: '#E2E8F0' },
      ],
    },
    {
      category: 'Database',
      badge: '🗄️ Database',
      skills: [
        { name: 'AWS DynamoDB', icon: <DynamoDbIcon />, color: '#4053D6' },
        { name: 'MongoDB', icon: <MongoIcon />, color: '#47A248' },
      ],
    },
    {
      category: 'DevOps & Cloud',
      badge: '🚀 DevOps & Cloud',
      skills: [
        { name: 'AWS', icon: <AwsIcon />, color: '#FF9900' },
        { name: 'Docker', icon: <DockerIcon />, color: '#2496ED' },
        { name: 'GitHub Actions', icon: <GithubActionsIcon />, color: '#2088FF' },
        { name: 'Git', icon: <GitIcon />, color: '#F05032' },
        { name: 'Postman', icon: <PostmanIcon />, color: '#FF6C37' },
        { name: 'Jest', icon: <JestIcon />, color: '#C21325' },
        { name: 'Zod', icon: <ZodIcon />, color: '#3E67B1' },
        { name: 'BullMQ', icon: <BullMqIcon />, color: '#E0234E' },
        { name: 'OpenAPI / Swagger', icon: <SwaggerIcon />, color: '#85EA2D' },
      ],
    },
  ];

  return (
    <Section
      className={styles.techStackSection}
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
                  Skills & Tools
                </div>
              </div>
              <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
                Technical Arsenal
              </Heading>

              <div className={styles.categoriesContainer}>
                {skillCategories.map((group, groupIdx) => (
                  <div
                    key={group.category}
                    className={styles.categoryBlock}
                    data-visible={visible}
                    style={{ transitionDelay: `${groupIdx * 120}ms` }}
                  >
                    <div className={styles.categoryHeader}>
                      <span className={styles.categoryBadge}>{group.badge}</span>
                      <div className={styles.categoryLine} />
                    </div>

                    <div className={styles.skillsGrid}>
                      {group.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={styles.rectCard}
                          style={{ '--brand-color': skill.color }}
                          title={skill.name}
                        >
                          <div className={styles.iconWrapper} style={{ color: skill.color }}>
                            {skill.icon}
                          </div>
                          <div className={styles.skillInfo}>
                            <span className={styles.skillName}>{skill.name}</span>
                          </div>
                          <div className={styles.glowBg} />
                        </div>
                      ))}
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
