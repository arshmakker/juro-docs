import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/installation">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const FeatureList = [
    {
      title: '🤖 AI-Native Integration',
      description: 'Seamlessly integrates with Claude, ChatGPT, and other MCP-compatible tools. Ask questions in plain English about your compliance status.',
    },
    {
      title: '🏢 Enterprise-Grade Compliance',
      description: 'Multi-regulation support for GDPR, DORA, SOC 2, ISO 27001, WCAG, and OWASP Top 10. Real-time scanning across 20+ programming languages.',
    },
    {
      title: '⚡ Zero Configuration',
      description: 'Auto-detects project types and relevant regulations. Works out of the box with smart defaults and progressive enhancement.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <div key={idx} className="col col--4">
              <div className="text--center padding-horiz--md">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Enterprise-grade compliance scanning solution that integrates seamlessly with AI tools. Automate GDPR, DORA, and regulatory compliance with real-time scanning.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
