import React from 'react';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';

const features = [
    {
        title: <>React Native + WatchKit</>,
        imageUrl: 'img/react-watchkit.png',
        description: (
            <>
                Interactive messaging, background transfers & file transfers all supported.
            </>
        ),
    },
    {
        title: <>Focus on What Matters</>,
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
                ahead and move your docs into the <code>docs</code> directory.
            </>
        ),
    },
    {
        title: <>Powered by React</>,
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                Extend or customize your website layout by reusing React. Docusaurus can
                be extended while reusing the same header and footer.
            </>
        ),
    },
];

function Feature({imageUrl, title, description}) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={classnames('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center" style={{height: 200, width: 200, display: 'flex', alignItems: 'center'}}>
                    <img className={styles.featureImage} src={imgUrl} alt={title}/>
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    const imgUrl = useBaseUrl("img/react-watchkit.png");

    return (
        <>
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
        </>
    );
}

export default Home;
