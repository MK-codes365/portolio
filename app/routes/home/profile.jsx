import mukutPhoto from '~/assets/mukut-photo.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Icon } from '~/components/icon';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import config from '~/config.json';
import styles from './profile.module.css';

const CodingProfiles = ({ visible }) => {
  const profiles = [
    {
      name: 'GitHub',
      url: `https://github.com/${config.github}`,
      icon: 'github',
      username: config.github,
      color: 'oklch(84.42% 0.19 202.24)', // accent/cyan color
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/in/${config.linkedin}/`,
      icon: 'linkedin',
      username: config.linkedin,
      color: 'oklch(62.8% 0.18 245.5)', // LinkedIn blue
    },
    {
      name: 'LeetCode',
      url: `https://leetcode.com/u/${config.leetcode}/`,
      icon: 'leetcode',
      username: config.leetcode,
      color: 'oklch(74.65% 0.152 70.36)', // orange leetcode color
    },
    {
      name: 'CodeChef',
      url: `https://www.codechef.com/users/${config.codechef}`,
      icon: 'codechef',
      username: config.codechef,
      color: 'oklch(60.5% 0.16 55)', // CodeChef amber/brown color
    },
    {
      name: 'Email',
      url: `mailto:${config.email}`,
      icon: 'mail',
      username: config.email,
      color: 'oklch(65.91% 0.249 13.76)', // red/pink brand color
    },
  ];

  return (
    <div className={styles.profilesContainer} data-visible={visible}>
      {profiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileCard}
          style={{ '--accent-color': profile.color }}
          title={`${profile.name}: ${profile.username}`}
        >
          <div className={styles.profileCardContent}>
            <Icon className={styles.profileIcon} icon={profile.icon} />
            <div className={styles.profileDetails}>
              <span className={styles.profileName}>{profile.name}</span>
              <span className={styles.profileUsername}>{profile.username}</span>
            </div>
          </div>
          <div className={styles.profileCardGlow} />
        </a>
      ))}
    </div>
  );
};

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I'm Mukut Kumar, a passionate SDE Software Development Engineer.
      My focus is in Software Development, Backend Engineering, and building scalable, high-performance web applications. Having a strong
      interest in modern web technologies, scalable architectures, and efficient system design allows me to build robust, user-friendly solutions from
      frontend to backend. If you're interested in the tools and software I
      use check out my <Link href="/uses">uses page</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      In my spare time I like to work on side projects, solve complex algorithmic challenges, and explore new technologies.
      I'm always open to discussing development opportunities and collaborative projects, so feel free to drop me a line.
    </Text>
    <CodingProfiles visible={visible} />
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
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
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={mukutPhoto}
                  srcSet={`${mukutPhoto} 480w, ${mukutPhoto} 960w`}
                  width={960}
                  height={1280}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Mukut Kumar profile picture"
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
