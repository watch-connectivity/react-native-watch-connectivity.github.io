/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'React Native Watch Connectivity',
  tagline: 'Enabling communication between your Watch App & React Native App',
  url: 'https://mtford90.github.io',
  baseUrl: '/react-native-watch-connectivity/',
  favicon: 'img/favicon.ico',
  organizationName: 'mtford90',
  projectName: 'react-native-watch-connectivity',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/mtford90/react-native-watch-connectivity.github.io/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'React Native Watch Connectivity',
        logo: {
          alt: 'Watch Connectivity',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/mtford90/react-native-watch-connectivity',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/',
              },
              {
                label: 'Guides',
                to: '/docs/communication',
              },
              {
                label: 'API',
                to: '/docs/messages',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/mtford90/react-native-watch-connectivity',
              },
            ],
          },
        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ['typescript', 'swift'],
      },
    }),
};

module.exports = config;
