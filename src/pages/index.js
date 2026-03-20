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
        </Layout>
    );
}

export default Home;
