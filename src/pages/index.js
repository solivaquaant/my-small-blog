import React, { useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Terminal from "react-console-emulator";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import styles from "./index.module.css";

import personalPic1 from "@site/static/img/personal-pic/personal-pic-1.jpg";
import personalPic2 from "@site/static/img/personal-pic/personal-pic-2.jpg";
import personalPic3 from "@site/static/img/personal-pic/personal-pic-3.jpg";
import personalPic4 from "@site/static/img/personal-pic/personal-pic-4.jpg";
import personalPic5 from "@site/static/img/personal-pic/personal-pic-5.jpg";
import donateQr from "@site/static/img/donate-qr.png";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const constraintsRef = useRef(null);
  const scratchCanvasRef = useRef(null);
  const scratchContainerRef = useRef(null);
  const isScratchingRef = useRef(false);

  const SITE_THEMES = {
    pink: { hex: "#fca7db", rgb: "252, 167, 219" },
    red: { hex: "#aa1313", rgb: "170, 19, 19" },
    cyan: { hex: "#3dffff", rgb: "61, 255, 255" },
    green: { hex: "#00bf63", rgb: "0, 191, 99" },
    yellow: { hex: "#ffec3d", rgb: "255, 236, 61" },
  };

  const [terminalTheme, setTerminalTheme] = React.useState("pink");

  useEffect(() => {
    const t = SITE_THEMES[terminalTheme] || SITE_THEMES.pink;
    document.documentElement.style.setProperty("--theme-color", t.hex);
    document.documentElement.style.setProperty("--theme-color-rgb", t.rgb);
  }, [terminalTheme]);
  const [viruses, setViruses] = React.useState([]);
  const [virusCount, setVirusCount] = React.useState(0);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [fadeConfetti, setFadeConfetti] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const virusSpawnRef = useRef(null);
  const trashBinRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    if (virusCount > 0) setShowTooltip(false);
  }, [virusCount]);

  const tags = [
    { name: "Web", link: "/docs/tags/web" },
    { name: "Android", link: "/docs/tags/android" },
    { name: "Reverse engineering", link: "/docs/tags/reverse-engineering" },
    { name: "Cryptography", link: "/docs/tags/cryptography" },
    { name: "Forensics", link: "/docs/tags/forensics" },
    { name: "Windows", link: "/docs/tags/windows" },
    { name: "Linux", link: "/docs/tags/linux" },
    { name: "Binary exploitation", link: "/docs/tags/binary-exploitation" },
    { name: "Steganography", link: "/docs/tags/steganography" },
    { name: "Network", link: "/docs/tags/network" },
    { name: "OSINT", link: "/docs/tags/osint" },
    { name: "Scripting", link: "/docs/tags/scripting" },
    { name: "AI - ML", link: "/docs/tags/ai-ml" },
  ];

  const photos = [
    {
      id: 1,
      src: personalPic1,
      text: "con oi esports thi dung",
      rotate: -12,
      x: -50,
      y: 20,
      zIndex: 1,
    },
    {
      id: 2,
      src: personalPic2,
      text: "(●'◡'●)",
      rotate: 8,
      x: 60,
      y: -30,
      zIndex: 2,
    },
    {
      id: 3,
      src: personalPic3,
      text: "( •̀ ω •́ )✧",
      rotate: -5,
      x: 0,
      y: 80,
      zIndex: 3,
    },
    {
      id: 4,
      src: personalPic4,
      text: "(p≧w≦q)",
      rotate: -10,
      x: -90,
      y: 100,
      zIndex: 4,
    },
    {
      id: 5,
      src: personalPic5,
      text: "（￣︶￣）↗",
      rotate: 15,
      x: 100,
      y: 50,
      zIndex: 5,
    },
  ];

  const commands = {
    whoami: {
      description: "Display current user profile.",
      fn: () =>
        "USER: Thai Ngoc Diem Trinh (Thai Trinh)\n" +
        "YEAR: 2004\n" +
        "GENDER: Female\n" +
        "ROLE: CTF Player | Security researcher | Blogger\n" +
        "STATUS: Active & learning ",
    },
    ls: {
      description: "List directory contents.",
      fn: () => "hobby.txt\nflag.txt",
    },
    cat: {
      description: "Read file content. Usage: cat <filename>.",
      fn: (...args) => {
        const filename = args[0];
        if (!filename) return "Usage: cat <filename>.";
        if (filename === "hobby.txt") {
          return (
            "FACT: I am an Esports fan >O.O<\n" +
            "MY FAVORITE TEAMS:\n" +
            "   > FINHAY Cerberus Esports (PUBG PC)\n" +
            "   > T1 (League of Legends)\n\n" +
            "MESSAGE: Please give them your biggest cheers <3"
          );
        }
        if (filename === "flag.txt") {
          return "SOLIVAQUAANT{g00d_7h1ng5_74k3_71m3_gr347_7h1ng5_74k3_4_817_l0ng3r}";
        }
        return `cat: ${filename}: No such file or directory.`;
      },
    },
    sudo: {
      description: "Execute a command as another user.",
      fn: () =>
        "Permission denied: You are not in the sudoers file. Nice try ^^",
    },
    date: {
      description: "Display current date and time.",
      fn: () => new Date().toString(),
    },
    coffee: {
      description: "Order a coffee.",
      fn: () => {
        const art = `
          ( (
           ) )
        .______.
        |      |]
        \\      /
         '----'

Here is your coffee! Now go write some exploits ^^`;
        return art.replace(/ /g, "\u00A0");
      },
    },
    theme: {
      description: "Change site theme: [red|cyan|green|yellow|pink]",
      fn: (...args) => {
        const themeColor = args[0]?.toLowerCase();

        if (!themeColor || !SITE_THEMES[themeColor]) {
          return (
            "Current theme: " +
            terminalTheme +
            "\nAvailable themes: " +
            Object.keys(SITE_THEMES).join(", ")
          );
        }

        setTerminalTheme(themeColor);
        return `Theme changed to '${themeColor}'.`;
      },
    },
  };

  const getThemeColors = () => {
    const themes = {
      green: {
        text: "#00ff00",
        glow: "rgba(0, 255, 0, 0.1)",
        border: "#333",
      },
      amber: {
        text: "#ffb900",
        glow: "rgba(255, 185, 0, 0.1)",
        border: "#4a4a00",
      },
      cyan: {
        text: "#00ffff",
        glow: "rgba(0, 255, 255, 0.1)",
        border: "#003a3a",
      },
      pink: {
        text: "#ff006e",
        glow: "rgba(255, 0, 110, 0.1)",
        border: "#4a0033",
      },
    };
    return themes[terminalTheme] || themes.green;
  };

  // Minigame: Virus spawning
  useEffect(() => {
    const spawnVirus = () => {
      if (virusCount >= 5) return; // Stop spawning at 5
      const rand = Math.random();
      let type, icon;
      if (rand < 0.2) {
        type = "bomb";
        icon = "💣";
      } else if (rand < 0.5) {
        type = "fruit";
        const fruits = ["🍌", "🍓", "🥑"];
        icon = fruits[Math.floor(Math.random() * fruits.length)];
      } else {
        type = "virus";
        const viruses = ["🐛", "☠️", "🦠", "⚠️", "👾", "👹", "👻"];
        icon = viruses[Math.floor(Math.random() * viruses.length)];
      }

      const id = Math.random();
      const newItem = {
        id,
        icon,
        type, 
        x: Math.random() * (window.innerWidth - 60),
        y: Math.random() * (window.innerHeight * 0.6),
      };
      setViruses((prev) => [...prev, newItem]);

      // Auto-disappear after 8 seconds if not caught
      const timeout = setTimeout(() => {
        setViruses((prev) => prev.filter((v) => v.id !== id));
      }, 8000);

      return timeout;
    };

    if (virusCount < 5) {
      virusSpawnRef.current = setInterval(spawnVirus, 5000);
    }

    return () => {
      if (virusSpawnRef.current) clearInterval(virusSpawnRef.current);
    };
  }, [virusCount]);

  // Confetti effect when 5 viruses caught
  useEffect(() => {
    if (virusCount === 5) {
      setShowConfetti(true);
      setFadeConfetti(false);
      const timerFade = setTimeout(() => setFadeConfetti(true), 7000);
      const timerDelete = setTimeout(() => setShowConfetti(false), 8000);
      return () => {
        clearTimeout(timerFade);
        clearTimeout(timerDelete);
      };
    }
  }, [virusCount]);

  const handleVirusDelete = (id, icon, type) => {
    setViruses((prev) => prev.filter((v) => v.id !== id));

    if (type === "bomb") {
      // Bomb resets counter to 0
      setVirusCount(0);
      setSuccessMessage("💥 Reset!");
      setTimeout(() => setSuccessMessage(""), 1000);
    } else if (type === "virus") {
      // Virus increments counter
      const nextCount = virusCount + 1;
      setVirusCount(nextCount);
      if (nextCount >= 5) {
        setSuccessMessage("Completed!");
      } else {
        const messages = ["Patched!", "Quarantined!", "Blocked!", "Eliminated!"];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        setSuccessMessage(msg);
      }
      setTimeout(() => setSuccessMessage(""), 1000);
    }
    // If type === "fruit", do nothing (no score change, no message)
  };

  const themeColors = getThemeColors();

  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    const container = scratchContainerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${Math.floor(rect.width)}px`;
      canvas.style.height = `${Math.floor(rect.height)}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      ctx.globalCompositeOperation = "source-over";
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      const t = SITE_THEMES[terminalTheme] || SITE_THEMES.pink;
      gradient.addColorStop(0, t.hex);
      gradient.addColorStop(1, "#a1b1fc");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "white";
      const starsInfo = [
        { x: 250 - 20 - 40 / 2, y: 20 + 40 / 2, w: 40, r: 15 },
        { x: 30 + 70 / 2, y: 80 + 70 / 2, w: 70, r: -10 },
        { x: 250 - 30 - 100 / 2, y: 100 + 100 / 2, w: 100, r: 5 },
        { x: 40 + 50 / 2, y: 250 - 30 - 50 / 2, w: 50, r: -20 },
        { x: 250 - 80 - 30 / 2, y: 250 - 20 - 30 / 2, w: 30, r: 25 },
      ];

      starsInfo.forEach((s) => {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate((s.r * Math.PI) / 180);
        const scale = s.w / 24;
        ctx.scale(scale, scale);
        ctx.translate(-12, -12); // Move origin to center of star 24x24 path
        const p = new Path2D(
          "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
        );
        ctx.fill(p);
        ctx.restore();
      });

      // Draw "Scratch to reveal" instruction text
      ctx.fillStyle = "rgba(255, 255, 255, 0.90)";
      ctx.font = "bold 20px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to reveal", rect.width / 2, rect.height/1.1);

      ctx.globalCompositeOperation = "destination-out";
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, [terminalTheme]);

  const scratchAt = (event) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fill();
  };

  const handleScratchStart = (event) => {
    isScratchingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratchAt(event);
  };

  const handleScratchMove = (event) => {
    if (!isScratchingRef.current) return;
    scratchAt(event);
  };

  const handleScratchEnd = (event) => {
    isScratchingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <Layout
      title={`Home`}
      description="Welcome to solivaquaant's little corner of the Internet"
    >
      <main className={styles.hackerContainer}>
        {/* 1. Hero & typewriter */}
        <div className={styles.sectionContainer}>
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitleText}>solivaquaant</h1>
            <p className={styles.heroSubText}>
              Final-year student majoring in Information Security at University
              of Information Technology - Vietnam National University.
              <br />
              Currently working as a SOC Analyst.
            </p>
            <hr className={styles.heroDivider} />
            <div className={styles.typewriterText}>
              <Typewriter
                options={{
                  strings: [
                    "W3lc0m3 70 my c0zy 5p4c3!_",
                    "H4v3 4 n1c3 d4y </3_",
                    "1nf0m4710n 53cur17y 57ud3n7 @ U17-VNU_",
                    "50C 4n4ly57_",
                    "Blu3 734m_",
                    "7hr347 hun71n6_",
                    "d16174l f0r3n51c5_",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
            <div className={styles.heroButtons}>
              <button
                className={styles.btnPrimary}
                onClick={() => {
                  const dbSection = document.getElementById("database-section");
                  if (dbSection)
                    dbSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Discover now
              </button>
              <button
                className={styles.btnSecondary}
                onClick={() => (window.location.href = "/about-me/")}
              >
                About me
              </button>
            </div>
          </div>
        </div>

        {/* 2. Terminal Interface */}
        <div className={styles.sectionContainer}>
          <div className={styles.terminalWrapper}>
            <div className={styles.terminalContainer}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span className={styles.dotRed}></span>
                  <span className={styles.dotYellow}></span>
                  <span className={styles.dotGreen}></span>
                </div>
                <div className={styles.terminalTitle}>
                  Initializing system...
                </div>
              </div>
              <Terminal
                commands={commands}
                welcomeMessage={
                  "Welcome to solivaquaant.\n" +
                  "Enter 'help' to view available commands."
                }
                promptLabel={"soliva@quaant:~# "}
                style={{
                  borderRadius: "0 0 20px 20px",
                  minHeight: "400px",
                  width: "100%",
                  backgroundColor: "transparent",
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "1.1em",
                  padding: "20px",
                  boxShadow: "none",
                }}
                contentStyle={{
                  color: (SITE_THEMES[terminalTheme] || SITE_THEMES.pink).hex,
                  fontFamily: '"JetBrains Mono", monospace',
                  whiteSpace: "pre",
                  lineHeight: "1.5",
                  fontWeight: "bold",
                }}
                messageClassName={styles.terminalOutput}
                promptLabelStyle={{
                  color: (SITE_THEMES[terminalTheme] || SITE_THEMES.pink).hex,
                  fontWeight: "bold",
                  fontSize: "1em",
                  paddingTop: "0",
                }}
                inputTextStyle={{
                  color: (SITE_THEMES[terminalTheme] || SITE_THEMES.pink).hex,
                  fontWeight: "bold",
                  fontSize: "1em",
                }}
              />
            </div>
          </div>
        </div>

        {/* 3. Tags List */}
        <div className={styles.sectionContainer}>
          <div className={styles.tagsContainer}>
            {tags.map((tag, i) => (
              <button
                key={i}
                className={styles.tagBtn}
                onClick={() => (window.location.href = tag.link)}
              >
                <span className={styles.tagHash}>#</span> {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Profile images*/}
        <div className={styles.sectionContainer}>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h2 className={styles.evidenceTitle}>Evidence board</h2>
            <p className={styles.evidenceSubtitle}>
              The data is being scrambled. Drag and drop to rearrange the
              evidence!
            </p>
          </div>

          <div className={styles.messyDesk} ref={constraintsRef}>
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                className={styles.polaroidCard}
                initial={{ x: photo.x, y: photo.y, rotate: photo.rotate }}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.2}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                  cursor: "grab",
                }}
                whileTap={{ scale: 1.2, cursor: "grabbing", zIndex: 100 }}
              >
                <div className={styles.tape}></div>
                <img
                  src={photo.src}
                  alt="Evidence"
                  className={styles.polaroidImg}
                />
                <div className={styles.handWrittenText}>{photo.text}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Navigation categories */}
        <div className={styles.sectionContainer} id="database-section">
          <div className={styles.dbContainer}>
            <h2 className={styles.dbTitle}>Database access</h2>
            <div className={styles.featuresSection}>
              <Link to="/docs/intro" className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
                <h3>Write-ups</h3>
                <p>
                  Comprehensive guides for CTF challenges, machines, and
                  puzzles.
                </p>
              </Link>

              <Link to="/labs/intro" className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
                <h3>Labs & Projects</h3>
                <p>
                  Personal research, malware analysis labs, and security tools
                  development environment.
                </p>
              </Link>

              <Link to="/blog" className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
                <h3>Knowledge Base</h3>
                <p>
                  Articles on cybersecurity concepts, tutorials, and personal
                  thoughts on the industry.
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* 6. Donation CTA */}
        <div className={styles.sectionContainer}>
          <section className={styles.supportSection}>
            <h2 className={styles.supportTitle}>Support my channel</h2>
            <div className={styles.supportContainer}>
              <div className={styles.supportLeft}>
                <p className={styles.supportText}>
                  Keep the research flowing~
                  <br />
                  If my work helped you,
                  <br />
                  consider supporting me to keep the labs running and
                  <br />
                  the coffee brewing.
                </p>
              </div>
              <div className={styles.supportRight} ref={scratchContainerRef}>
                <img
                  src={donateQr}
                  alt="Donation QR code"
                  className={styles.donateQrImage}
                />
                <canvas
                  ref={scratchCanvasRef}
                  className={styles.scratchCanvas2}
                  onPointerDown={handleScratchStart}
                  onPointerMove={handleScratchMove}
                  onPointerUp={handleScratchEnd}
                  onPointerLeave={handleScratchEnd}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Malware Cleanup Minigame */}
        <div className={styles.minigameContainer}>
          {/* Viruses */}
          {viruses.map((virus) => (
            <motion.div
              key={virus.id}
              className={styles.virus}
              style={{
                left: virus.x,
                top: virus.y,
              }}
              drag
              dragConstraints={false}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                const trash = trashBinRef.current;
                if (!trash) return;

                const trashRect = trash.getBoundingClientRect();
                const centerX = trashRect.left + trashRect.width / 2;
                const centerY = trashRect.top + trashRect.height / 2;
                const distance = Math.sqrt(
                  Math.pow(event.clientX - centerX, 2) +
                    Math.pow(event.clientY - centerY, 2),
                );

                if (distance < 80) {
                  handleVirusDelete(virus.id, virus.icon, virus.type);
                }
              }}
              whileHover={{ scale: 1.2 }}
              whileDrag={{ scale: 1.3, cursor: "grabbing" }}
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -25, 25, -15, 0],
                x: [0, 20, -20, 10, 0],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
                y: { duration: 4, repeat: Infinity, repeatType: "reverse" },
                x: { duration: 5, repeat: Infinity, repeatType: "reverse" },
              }}
            >
              {virus.icon}
            </motion.div>
          ))}

          {/* Trash Bin */}
          <motion.div
            ref={trashBinRef}
            className={styles.trashBin}
            onMouseEnter={() => {
              if (virusCount === 0) {
                hoverTimeoutRef.current = setTimeout(() => setShowTooltip(true), 1000);
              }
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              setShowTooltip(false);
            }}
            animate={{
              y: virusCount >= 5 ? [0, -20, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: virusCount >= 5 ? Infinity : 0,
            }}
            onClick={() => {
              if (virusCount >= 5) {
                setShowConfetti(true);
                setFadeConfetti(false);
                setTimeout(() => setFadeConfetti(true), 7000);
                setTimeout(() => setShowConfetti(false), 8000);
              }
            }}
            style={{ cursor: virusCount >= 5 ? "pointer" : "default" }}
          >
            🗑️
            {showTooltip && (
              <div className={styles.trashTooltip}>
                Drag and drop items to receive a gift
              </div>
            )}
          </motion.div>

          {/* Success Message */}
          {successMessage && (
            <motion.div
              className={styles.successMessage}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {successMessage}
            </motion.div>
          )}

          {/* Virus Counter */}
          <motion.div
            className={styles.virusCounter}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            🦠 {virusCount} / 5
          </motion.div>

          {/* Confetti */}
          {showConfetti && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: "none",
                opacity: fadeConfetti ? 0 : 1,
                transition: "opacity 1s ease-out",
              }}
            >
              <Confetti
                width={windowWidth}
                height={windowHeight}
                numberOfPieces={500}
                gravity={0.05}
                recycle={false}
              />
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
