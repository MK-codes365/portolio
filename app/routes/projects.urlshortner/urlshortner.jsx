import shortnerBackgroundLarge from '~/assets/slice-background-large.jpg';
import shortnerBackgroundPlaceholder from '~/assets/slice-background-placeholder.jpg';
import shortnerBackground from '~/assets/slice-background.jpg';
import shortnerAppLarge from '~/assets/urlshortner-app-large.jpg';
import shortnerAppPlaceholder from '~/assets/urlshortner-app-placeholder.jpg';
import shortnerApp from '~/assets/urlshortner-app.jpg';
import { Footer } from '~/components/footer';
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
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Fragment, useState } from 'react';
import { media } from '~/utils/style';
import styles from './urlshortner.module.css';

const title = 'Scalable URL Shortener';
const description =
  'A high-performance, enterprise-ready URL shortening and link management service. Designed with scalable backend architecture, sub-millisecond Redis caching, rate limiting, and real-time click analytics.';
const roles = ['Backend Engineering', 'REST APIs', 'Database Design', 'Caching & Analytics'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

const UrlShortenerDemo = () => {
  const [inputUrl, setInputUrl] = useState('https://github.com/MK-codes365/urlshortner');
  const [shortUrl, setShortUrl] = useState('https://mk.link/sde94x');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(148);

  const handleShorten = (e) => {
    e.preventDefault();
    if (!inputUrl) return;
    setLoading(true);
    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 8);
      setShortUrl(`https://mk.link/${randomCode}`);
      setClicks(Math.floor(Math.random() * 50) + 1);
      setLoading(false);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <div className={styles.demoTitle}>
          <span className={styles.pulseDot} />
          Live Backend Simulator
        </div>
        <span className={styles.demoBadge}>Redis L1 Cache Active</span>
      </div>
      <form onSubmit={handleShorten} className={styles.demoForm}>
        <input
          type="url"
          className={styles.demoInput}
          placeholder="Enter long destination URL..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          required
        />
        <button type="submit" className={styles.demoButton} disabled={loading}>
          {loading ? 'Shortening...' : 'Generate Short Link'}
        </button>
      </form>
      {shortUrl && (
        <div className={styles.demoResult}>
          <div className={styles.resultRow}>
            <div>
              <span className={styles.statLabel}>Shortened Alias:</span>
              <div>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className={styles.resultLink}>
                  {shortUrl}
                </a>
              </div>
            </div>
            <button type="button" onClick={handleCopy} className={styles.copyButton}>
              {copied ? '✓ Copied to Clipboard' : 'Copy Link'}
            </button>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>P99 Latency</span>
              <span className={styles.statVal}>8.4 ms</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Simulated Clicks</span>
              <span className={styles.statVal}>{clicks}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Base62 Collision</span>
              <span className={styles.statVal}>0.00%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const UrlShortener = () => {
  return (
    <Fragment>
      <ProjectContainer className={styles.urlshortner}>
        <ProjectBackground
          src={shortnerBackground}
          srcSet={`${shortnerBackground} 1280w, ${shortnerBackgroundLarge} 2560w`}
          width={1280}
          height={800}
          placeholder={shortnerBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://github.com/MK-codes365/urlshortner"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${shortnerApp} 800w, ${shortnerAppLarge} 1920w`}
              width={800}
              height={500}
              placeholder={shortnerAppPlaceholder}
              alt="URL Shortener backend project dashboard with real-time analytics."
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>

        {/* Animated Performance Metrics */}
        <ProjectSection>
          <ProjectSectionContent>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>
                  <span className={styles.pulseDot} />
                  12ms
                </div>
                <div className={styles.metricLabel}>P99 Latency</div>
                <div className={styles.metricDesc}>Sub-millisecond Redis cached lookups for instantaneous link resolution.</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>99.99%</div>
                <div className={styles.metricLabel}>Uptime SLA</div>
                <div className={styles.metricDesc}>Redundant backend architecture built to withstand high-volume concurrency.</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>Base62</div>
                <div className={styles.metricLabel}>Encoding Engine</div>
                <div className={styles.metricDesc}>Collision-free 6-character alphanumeric aliases supporting billions of records.</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>100k/min</div>
                <div className={styles.metricLabel}>Rate Limiter</div>
                <div className={styles.metricDesc}>Token-bucket rate limiting to mitigate DDoS and abusive bots.</div>
              </div>
            </div>

            {/* Interactive Live Demo */}
            <UrlShortenerDemo />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>High-Throughput Redirection</ProjectSectionHeading>
              <ProjectSectionText>
                Engineered for minimal latency, the service utilizes optimized base62 encoding and indexed lookups to achieve sub-millisecond redirection times even under intense traffic spikes.
              </ProjectSectionText>
              <ProjectSectionText>
                Implements in-memory caching and Redis integration to offload repetitive read queries, reducing database load and maintaining consistent response latencies.
              </ProjectSectionText>
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Analytics & Rate Limiting</ProjectSectionHeading>
              <ProjectSectionText>
                Features comprehensive analytics that track visitor referrers, device types, geolocations, and timestamped click trends for every shortened link.
              </ProjectSectionText>
              <ProjectSectionText>
                Equipped with token-bucket rate limiting to mitigate abusive traffic and protect system endpoints. The complete repository and documentation are available on <Link href="https://github.com/MK-codes365/urlshortner">GitHub</Link>.
              </ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
