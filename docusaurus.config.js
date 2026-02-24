import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */

const config = {
  title: "solivaquaant",
  tagline:
    "Cybersecurity Student | University of Information Technology - VietNam National University, Ho Chi Minh City",
  favicon: "img/avt-trans.png",
  url: "http://blog.solivaquaant.site/",
  baseUrl: "/",
  organizationName: "solivaquaant",
  projectName: "my-small-blog",
  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "labs",
        path: "labs",
        routeBasePath: "labs",
        sidebarPath: require.resolve("./sidebars-labs.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "about",
        path: "about-me",
        routeBasePath: "about-me",
        sidebarPath: require.resolve("./sidebars-about.js"),
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
            sidebarId: "aboutSidebar",
            docId: "index.md",
            position: "left",
            label: "About me",
            docsPluginId: "about",
          },
          {
            type: "docSidebar",
            sidebarId: "writeupsSidebar",
            position: "left",
            label: "  Write-ups",
          },
          {
            type: "docSidebar",
            sidebarId: "labsSidebar",
            docId: "intro",
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
                to: "/about-me",
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
        copyright: `Copyright © ${new Date().getFullYear()} @solivaquaant, built with Docusaurus on April 25, 2025.`,
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
