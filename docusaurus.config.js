module.exports = {
  title: 'React Native Watch Connectivity',
  tagline: 'Communicate with your watch-app from react native',
  url: 'https://mtford90.github.io',
  baseUrl: '/react-native-watch-connectivity/',
  favicon: 'img/favicon.ico',
  organizationName: 'mtford90', // Usually your GitHub org/user name.
  projectName: 'react-native-watch-connectivity', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Native Watch Connectivity',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
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
              to: 'docs/introduction',
            },
            {
              label: 'Guides',
              to: 'docs/communication',
            },
            {
              label: 'API',
              to: 'docs/messages',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Gitter',
              href: 'https://gitter.im/react-native-watch-connectivity/community',
            }
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
    prism: { additionalLanguages: ['typescript', 'swift']}
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/mtford90/react-native-watch-connectivity.github.io/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/mtford90/react-native-watch-connectivity.github.io/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
