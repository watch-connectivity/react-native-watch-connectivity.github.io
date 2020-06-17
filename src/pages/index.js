import React from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import ThemeProvider from '@theme/ThemeProvider';

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    const imgUrl = useBaseUrl("img/react-watchkit.png");



    return (
        <ThemeProvider>
            <Navbar/>
            <main className={classnames('hero hero--primary', styles.main)}>
                <div className="container">
                    <img src={imgUrl}/>
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={classnames(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('docs/')}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </main>
            <Footer/>
        </ThemeProvider>
    );
}

export default Home;
