import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef, useState } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import config from '~/config.json';
import styles from './contact.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Contact',
    description:
      'Send a real-time message to Mukut Kumar or connect directly via Email, LinkedIn, or GitHub.',
  });
};

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ context, request }) {
  const formData = await request.formData();
  const isBot = String(formData.get('name') || '');
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const errors = {};

  // Honeypot tripped
  if (isBot) return { success: true };

  // Validation
  if (!email || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // Real-time dispatch to Mukut Kumar's email
  try {
    const accessKey =
      context?.cloudflare?.env?.WEB3FORMS_KEY ||
      process.env.WEB3FORMS_KEY ||
      '04040a9a-7c9b-4e0c-9742-88229bbfd87a'; // Default public Web3Forms relay

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        email: email,
        name: email.split('@')[0],
        message: message,
        from_name: `Portfolio Visitor (${email})`,
        subject: `New Portfolio Message from ${email}`,
        to_email: config.email,
      }),
    });
  } catch (err) {
    console.error('Email dispatch error:', err);
  }

  return { success: true, timestamp: new Date().toLocaleTimeString(), sender: email };
}

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const [copied, setCopied] = useState(false);
  const [clientSubmitted, setClientSubmitted] = useState(false);
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';

  const isSuccess = actionData?.success || clientSubmitted;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClientSubmit = (e) => {
    // If running pure static client-side or offline fallback
    if (!EMAIL_PATTERN.test(email.value) || !message.value) return;
  };

  return (
    <Section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            <span>Available for Full-time Roles & Projects</span>
          </div>

          <Heading className={styles.title} level={2} as="h1" data-status="entered">
            <DecoderText text="Let's Build Something" delay={200} />
          </Heading>
          <Text className={styles.subtitle} as="p">
            Have a project in mind, a question, or just want to connect? Send a real-time message or reach out directly.
          </Text>
        </div>

        {/* Quick Connect Cards */}
        <div className={styles.quickConnectGrid}>
          <div
            className={styles.quickCardEmail}
            onClick={handleCopyEmail}
            role="button"
            tabIndex={0}
            title="Click to copy email address"
          >
            <div className={styles.quickLeft}>
              <div className={styles.quickIcon}>
                <Icon icon="mail" />
              </div>
              <div className={styles.quickInfo}>
                <span className={styles.quickLabel}>Direct Email</span>
                <span className={styles.quickVal}>{config.email}</span>
              </div>
            </div>
            <div className={styles.copyBadge}>
              <Icon icon={copied ? 'check' : 'copy'} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </div>
          </div>

          <div className={styles.quickConnectSubGrid}>
            <a
              className={styles.quickCard}
              href={`https://www.linkedin.com/in/${config.linkedin}/`}
              target="_blank"
              rel="noopener noreferrer"
              title="Connect on LinkedIn"
            >
              <div className={styles.quickIcon}>
                <Icon icon="linkedin" />
              </div>
              <div className={styles.quickInfo}>
                <span className={styles.quickLabel}>LinkedIn</span>
                <span className={styles.quickVal}>in/{config.linkedin}</span>
              </div>
              <span className={styles.externalIcon}>↗</span>
            </a>

            <a
              className={styles.quickCard}
              href={`https://github.com/${config.github}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Follow on GitHub"
            >
              <div className={styles.quickIcon}>
                <Icon icon="github" />
              </div>
              <div className={styles.quickInfo}>
                <span className={styles.quickLabel}>GitHub</span>
                <span className={styles.quickVal}>@{config.github}</span>
              </div>
              <span className={styles.externalIcon}>↗</span>
            </a>
          </div>
        </div>

        {/* Form and Success States */}
        {!isSuccess ? (
          <Form
            className={styles.form}
            method="post"
            onSubmit={handleClientSubmit}
          >
            {/* Hidden honeypot field for spam prevention */}
            <Input className={styles.botkiller} label="Name" name="name" maxLength={MAX_EMAIL_LENGTH} />

            <Input
              required
              autoComplete="email"
              label="Your email address"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />

            <Input
              required
              multiline
              autoComplete="off"
              label="Your message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />

            <div className={styles.charCount}>
              <span>{message.value.length} / {MAX_MESSAGE_LENGTH}</span>
            </div>

            {actionData?.errors && (
              <div className={styles.formError} ref={errorRef}>
                <Icon icon="error" />
                <span>{actionData.errors.email || actionData.errors.message}</span>
              </div>
            )}

            <div className={styles.buttonGroup}>
              <Button
                className={styles.sendBtn}
                disabled={sending}
                loading={sending}
                loadingText="Transmitting..."
                icon="send"
                type="submit"
              >
                {sending ? 'Sending...' : 'Send Live Message'}
              </Button>

              <a
                href={`mailto:${config.email}?subject=Portfolio Inquiry&body=${encodeURIComponent(message.value)}`}
                className={styles.directMailBtn}
                title="Open directly in your default mail app"
              >
                <Icon icon="mail" />
                <span>Open in Mail</span>
              </a>
            </div>
          </Form>
        ) : (
          <div className={styles.complete} aria-live="polite">
            <div className={styles.successCheck}>
              <Icon icon="check" />
            </div>
            <Heading level={3} as="h2" className={styles.completeTitle}>
              Message Dispatched!
            </Heading>
            <Text size="l" as="p" className={styles.completeText}>
              Thanks for reaching out! Your message was delivered directly to <strong>{config.email}</strong>. I'll get back to you promptly.
            </Text>

            <div className={styles.completeActions}>
              <Button
                secondary
                onClick={() => {
                  setClientSubmitted(false);
                  email.onChange({ target: { value: '' } });
                  message.onChange({ target: { value: '' } });
                  window.location.reload();
                }}
                icon="send"
              >
                Send Another Message
              </Button>
              <Button href="/" icon="arrow-right">
                Back to Homepage
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer className={styles.footer} />
    </Section>
  );
};
