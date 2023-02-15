// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "开源Web3D低代码平台",
  tagline: "致力于建设共享互助开放的Web3D生态，让Web3D引擎和编辑器开发轻而易举",
  // url: 'https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/website',
  url: 'https://meta3d-website.4everland.app/',
  baseUrl: '/',
  // baseUrl: '/website/build/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Meta3D', // Usually your GitHub org/user name.
  projectName: 'Meta3D-Website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
        title: 'Meta3D',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            href: 'https://meta3d-platform-production.4everland.app/',
            // href: 'https://meta3d-production-6eaj4630a6b9e7-1302358347.tcloudbaseapp.com/platform/',
            label: '进入平台',
          },
          {
            type: 'doc',
            docId: '简介',
            position: 'left',
            label: '文档',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Meta3D-Technology/Meta3D/discussions',
            label: '论坛',
          },
          {
            href: 'https://www.zhihu.com/column/c_1521448592849649664',
            label: '博客',
          },

          {
            href: 'https://github.com/Meta3D-Technology/Meta3D',
            label: 'GitHub',
            // position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: '文档',
          //   items: [
          //     {
          //       label: '首页',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: '社区',
            items: [
              {
                label: '论坛',
                href: 'https://github.com/Meta3D-Technology/Meta3D/discussions',
              },
              {
                label: '与我们交流加QQ群',
                // href: 'https://qm.qq.com/cgi-bin/qm/qr?k=nS2aXzVnD2MsrwaZinPdE5KzGXdpMDX_&jump_from=webapi&authKey=lRRtao0aHyzsDRgakbPNvh/BYkFRnGfUQRBrsAbd3NftO7nzpx7AREz+wC8ZJuDS',
                href: 'https://qm.qq.com/cgi-bin/qm/qr?k=SaSgwsyiccUjc3Mx3Jqliv9HJnHxL-WI&jump_from=webapi&authKey=+EQRAdLQ80spfX++pA3UB4erf6cxC+Mo4jH6bfovhdE7MOvI5WBUljCZ6roGaNZh'
              },
              {
                label: '一起开发Meta3D加QQ群',
                href: 'https://qm.qq.com/cgi-bin/qm/qr?k=Kiaj6UDk6FuKDPHKpHYruzB8eAt0xRRy&jump_from=webapi&authKey=D6yCua8jRdfWgAQqSSRMRQvaYxGVL5XN671Cz/g2CSYRJ9WPPgNPZIzcCZKwQZBC',
              },
              // {
              //   label: '商务合作加QQ群',
              //   href: 'https://qm.qq.com/cgi-bin/qm/qr?k=mpAhyrgUZVkwxpip-cYlHUO9i_kZR-IF&jump_from=webapi&authKey=bEP7ZI5TBy8RLW9qc3jxqnMCTdMCQMtjis3l0Uf/6ntG2cF94neaIdOztVWNbuRi',
              // },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '开发者的知乎',
                href: 'https://www.zhihu.com/people/dreamforest-yyc',
              },
              {
                label: '开发者的博客',
                href: 'https://www.cnblogs.com/chaogex/',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
