// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */

const config = {
  title: "solivaquaant",
  tagline:
    "Cybersecurity Student | University of Information Technology - VietNam National University, Ho Chi Minh City",

  favicon: "img/avt-trans.png",

  // Set the production url of your site here
  url: "http://blog.solivaquaant.site/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "solivaquaant", // Usually your GitHub org/user name.
  projectName: "my-small-blog", // Usually your repo name.

  onBrokenLinks: "throw",
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "labs", // id duy nhất cho mục mới
        path: "labs", // đường dẫn đến thư mục chứa tài liệu
        routeBasePath: "labs", // URL gốc: /labs/
        sidebarPath: require.resolve("./sidebars-labs.js"),
        // editUrl: 'https://github.com/your-username/your-repo/edit/main/',
      },
    ],

    "docusaurus-plugin-image-zoom",
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },

          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      zoom: {
        selector: ".markdown :not(em) > img, .markdown div > img",
        background: {
          light: "rgba(255, 255, 255, 0.9)",
          dark: "rgba(15, 23, 42, 0.75)",
        },
        config: {
          margin: 20,
          scrollOffset: 0,
        },
      },
      // Replace with your project's social card
      image: "img/avt.png",
      navbar: {
        title: "Welcome",
        logo: {
          alt: "My Site Logo",
          src: "img/jumping-avt.gif",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "writeupsSidebar",
            position: "left",
            label: "  Write-ups",
          },
          {
            type: "docSidebar",
            sidebarId: "labsSidebar",
            docId: "intro", // tương ứng với file intro.md trong tryhackme
            position: "left",
            label: "Labs",
            docsPluginId: "labs",
          },
          {
            to: "/blog",
            label: "Blogs",
            position: "left",
          },
          {
            href: "https://github.com/solivaquaant",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "About Me",
            items: [
              {
                label: "Self Introduction",
                to: "/docs/about-me",
              },
            ],
          },
          {
            title: "Contact",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/trinhtnd/",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/trinh.thai.50364/",
              },
              {
                label: "X",
                href: "https://x.com/tndt____",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Github",
                href: "https://github.com/solivaquaant",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} @tndt, built with Docusaurus on April 25, 2025.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      },
    ],
  ],
};

export default config;
