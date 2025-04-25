import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Left Column: Avatar */}
          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <img 
              src={require('@site/static/img/avatar.jpg').default} 
              alt="Avatar" 
              style={{ maxWidth: '250px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
            />
          </div>

          {/* Right Column: Text Content */}
          <div style={{ flex: '2 1 500px' }}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p style={{ lineHeight: '1.6' }}>
              Hi there! I'm currently a student majoring in Information Security, passionate about cybersecurity and everything that comes with it. 
              <br /><br />
              This site is my personal space to document what I'm learning - from CTF write-ups and study notes, to thoughts and experiments as I dive deeper into the field. 
              It's both a knowledge base for myself and a place to share with others who are also on this path. 
              <br /><br />
              Thanks for stopping by - I hope you find something helpful here!
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/about-me">
                Know more about me (❁´◡`❁)
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to my little site!`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
