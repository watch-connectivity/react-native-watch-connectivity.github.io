import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

function Home() {
    const {siteConfig} = useDocusaurusContext();
    const imgUrl = useBaseUrl("img/react-watchkit.png");
    const tiwtorUrl = useBaseUrl("img/tiwtor.svg");

    return (
        <Layout title={siteConfig.title} description={siteConfig.tagline}>
            <main className={clsx('hero hero--primary', styles.main)}>
                <div className="container">
                    <img src={imgUrl} alt="React Native Watch Connectivity" />
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('docs/')}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </main>
            <section className={styles.sponsors}>
                <div className="container">
                    <h2>Sponsors</h2>
                    <a href="https://www.tiwtor.app">
                        <img src={tiwtorUrl} alt="Tiwtor — learn Welsh your way" />
                    </a>
                    <p>
                        Development of this library is currently sponsored by{' '}
                        <a href="https://www.tiwtor.app">Tiwtor</a> — a language
                        learning toolkit for self-driven learners, currently
                        focused on Welsh.
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default Home;
