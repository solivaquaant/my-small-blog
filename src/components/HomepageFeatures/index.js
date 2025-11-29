import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "CTF write-ups",
    Svg: require("@site/static/img/ctf.svg").default,
    description: (
      <>
        Dive into detailed solutions and reflections from the CTF challenges
        I've tackled - focusing on the thought process, techniques, and lessons
        learned.
      </>
    ),
    href: "/my-small-blog/docs/about-me/"
  },
  {
    title: "My projects",
    Svg: require("@site/static/img/my-project.svg").default,
    description: (
      <>
        A showcase of personal projects, tools, and experiments I've built along
        my cybersecurity learning journey.
      </>
    ),
    href: "/my-small-blog/labs/intro", 
  },
  {
    title: "Blogs",
    Svg: require("@site/static/img/blog.svg").default,
    description: (
      <>
        Personal notes, learning paths, and thoughts on cybersecurity topics
        that inspire me - shared to help others grow along with me.
      </>
    ),
    href: "/my-small-blog/blog",
  },
];

function Feature({ Svg, title, description, href }) {
  return (
    <div className={clsx("col col--4", styles.featureCard)}>
      <a href={href} className={styles.featureLink}>
        <div className={styles.featureInner}>
          <div className="text--center">
            <Svg className={styles.featureSvg} role="img" />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3">{title}</Heading>
            <p>{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}


export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
