# My little site

This is a personal website and technical repository built with Docusaurus 3, a modern static site generator. The platform serves as a central hub for sharing cybersecurity research, technical documentation, and write-ups.

## Content overview

The repository is structured to host several types of content:

- **Write-ups**: Detailed walkthroughs and solutions for various CTF challenges.
- **Labs**: Documentation and guides related to cybersecurity laboratory environments.
- **Technical blog**: Articles focusing on programming, cybersecurity trends, and personal project updates.

## Core technologies

- **Framework**: Docusaurus 3.
- **Frontend**: React and MDX for interactive documentation.

## Local development

To set up the project on your local machine, follow these steps:

1. **Clone the repository**

```
git clone https://github.com/solivaquaant/my-small-blog.git
cd my-small-blog
```

2. **Install required dependencies**

```
npm install
```

3. **Start the development server**

```
npm run start
```

Once started, the site will be accessible at `http://localhost:3333/`.

## Production and deployment

To generate a production-ready build:

```
npm run build
```

To preview the production build locally:

```
npm run serve
```

## Project structure

```
my-own-blog/
├── blog/                # Blog posts in Markdown
├── docs/                # Documentation or write-ups
├── labs/                # Labs and related content
├── src/                 # Custom React components and pages
├── static/              # Static assets like images and files
├── docusaurus.config.js # Main configuration file
└── ...
```

## License

This project is open-source and available under the MIT License.
