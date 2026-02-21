import React, { useEffect, useRef } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Terminal from "react-console-emulator";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
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
  const [terminalTheme, setTerminalTheme] = React.useState("green");
  const [viruses, setViruses] = React.useState([]);
  const [virusCount, setVirusCount] = React.useState(0);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const virusSpawnRef = useRef(null);
  const trashBinRef = useRef(null);

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
      fn: () => "secret.txt\nflag.txt",
    },
    cat: {
      description: "Read file content. Usage: cat <filename>.",
      fn: (...args) => {
        const filename = args[0];
        if (!filename) return "Usage: cat <filename>.";
        if (filename === "secret.txt") {
          return (
            "FACT: I am an Esports fan O.O\n" +
            "MY FAVORITE TEAMS:\n" +
            "   > FINHAY Cerberus Esports (PUBG PC)\n" +
            "   > T1 (League of Legends)\n\n" +
            "MESSAGE: Please give them your biggest cheers <3"
          );
        }
        if (filename === "flag.txt") {
          return 'MESSAGE: "Good things take time. Great things take a bit longer."';
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
    donate: {
      description: "Buy me a coffee.",
      fn: () => {
        const art = `
 ▄▄▄▄▄ █ ▄ ▀ ▄ ▄▀█▀▄▀█ ▄▄▄▄▄ 
 █   █ █ ▄ ▄██▄ ▀▄▀▄██ █   █ 
 █▄▄▄█ █▀██▄ ▀███ ▄  █ █▄▄▄█ 
▄▄▄▄▄▄▄█▄▀ ▀▄▀▄█▄▀▄█ █▄▄▄▄▄▄▄
 ▄▀█ ▄▄▀▀▀█▄▀  █ ▀▀█▄█▀▄█ ▄▄▄
▄▄█ ▄ ▄▄ █▀▄ ██ █▄ █▄▀  ██▄  
 ▀▀█ ▄▄ ▄█▄█ ▄ ▄▀▀▀ ▀██▄ █▀▄▀
▄█▀▄  ▄▄▄█▄▀█▀▄█  ███    ▀▀▄▄
▀ █  █▄▄█ ▀▄ ▄▄▄ ▄█ ▀██▀ ▀▄██
██ ▄██▄  █▀▀█▀  ▀█▄▄▄   ███  
▄▄█▄▄▄▄█ ▀▀▀▄▄ ▄ ▄█▄ ▄▄▄ █ ██
 ▄▄▄▄▄ █▀▄▀▄▀ ▀▀▀ █▄ █▄█ ▀▄▄ 
 █   █ █▄█▀▄▀ ▄█▀▄▀  ▄▄▄   ▄█
 █▄▄▄█ █▀ █ █ █  ▀▄▀▀▄█▄█▀█▄ 
▄▄▄▄▄▄▄█▄█▄██▄██▄█▄█▄▄██▄█▄██

If you enjoy my content (or just like me), feel free to support me ^^`;
        return art.replace(/ /g, "\u00A0");
      },
    },
    theme: {
      description: "Change terminal theme: [green|amber|cyan|pink]",
      fn: (...args) => {
        const themeColor = args[0]?.toLowerCase();
        const validThemes = ["green", "amber", "cyan", "pink"];

        if (!themeColor) {
          return (
            "Current theme: " +
            terminalTheme +
            "\nAvailable themes: " +
            validThemes.join(", ")
          );
        }

        if (!validThemes.includes(themeColor)) {
          return `Invalid theme. Available: ${validThemes.join(", ")}`;
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
      if (virusCount >= 10) return; // Stop spawning at 10
      const isBomb = Math.random() < 0.2;
      const id = Math.random();
      const newItem = {
        id,
        icon: isBomb
          ? "💣"
          : ["🐛", "☠️", "🦠", "⚠️", "👾", "👹", "👻"][
              Math.floor(Math.random() * 7)
            ],
        type: isBomb ? "bomb" : "virus",
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

    if (virusCount < 10) {
      virusSpawnRef.current = setInterval(spawnVirus, 5000);
    }

    return () => {
      if (virusSpawnRef.current) clearInterval(virusSpawnRef.current);
    };
  }, [virusCount]);

  // Confetti effect when 10 viruses caught
  useEffect(() => {
    if (virusCount === 10) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [virusCount]);

  const handleVirusDelete = (id, icon, type) => {
    setViruses((prev) => prev.filter((v) => v.id !== id));

    if (type === "bomb") {
      // Bomb resets counter to 0
      setVirusCount(0);
      setSuccessMessage("💥 Reset!");
    } else {
      // Virus increments counter
      setVirusCount((prev) => prev + 1);
      const messages = ["Patched!", "Quarantined!", "Blocked!", "Eliminated!"];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setSuccessMessage(msg);
    }

    setTimeout(() => setSuccessMessage(""), 1000);
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
      ctx.fillStyle = "rgba(10, 10, 10, 1)";
      ctx.fillRect(0, 0, rect.width, rect.height);

      ctx.fillStyle = "rgba(0, 255, 120, 0.08)";
      for (let x = 0; x < rect.width; x += 22) {
        ctx.fillRect(x, 0, 1, rect.height);
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      for (let y = 0; y < rect.height; y += 18) {
        ctx.fillRect(0, y, rect.width, 1);
      }

      ctx.globalCompositeOperation = "destination-out";
    };

    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

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
        <div className={styles.heroHeader}>
          <h1 className={styles.glitchTitle}>Thái Ngọc Diễm Trinh</h1>
          <div className={styles.typewriterText}>
            <span>Running process: </span>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              <Typewriter
                options={{
                  strings: [
                    "SOC Analyst...",
                    "CTF player...",
                    "Writing exploits...",
                    "Sharing knowledge...",
                    "Threat hunting...",
                    "Digital forensics...",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </span>
          </div>
        </div>

        {/* 2. Terminal Interface */}
        <div className={styles.terminalWrapper}>
          <Terminal
            commands={commands}
            welcomeMessage={
              "Initializing system...\n" +
              "Welcome to " +
              siteConfig.title +
              ".\n" +
              "Enter 'help' to view available commands."
            }
            promptLabel={"soli@vaquaant:~# "}
            style={{
              borderRadius: "0 0 10px 10px",
              minHeight: "400px",
              width: "100%",
              maxWidth: "900px",
              boxShadow: `0 10px 30px ${themeColors.glow}`,
              border: `1px solid ${themeColors.border}`,
              fontFamily: '"Consolas", "Courier New", monospace',
            }}
            contentStyle={{
              color: themeColors.text,
              fontSize: "1.1em",
              fontFamily: "monospace",
              whiteSpace: "pre",
              lineHeight: "1",
            }}
            inputTextStyle={{
              color: "#ffffff",
              fontWeight: "bold",
            }}
          />
        </div>

        {/* 3. Profile images*/}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <h2 style={{ fontSize: "2rem", color: "#00ff00" }}>
            &lt; EVIDENCE_BOARD /&gt;
          </h2>
          <p style={{ color: "#ccc" }}>
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
              whileTap={{
                scale: 1.2,
                cursor: "grabbing",
                zIndex: 100,
              }}
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
        {/* End of Profile Images */}

        {/* 4. Navigation categories */}
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#00ff00" }}>
            &lt; DATABASE_ACCESS /&gt;
          </h2>
          <div className={styles.featuresSection}>
            <Link to="/docs/about-me/" className={styles.featureCard}>
              <div className={styles.cornerMark}></div>
              <h3>01. WRITE-UPS</h3>
              <p>
                Comprehensive guides for CTF challenges, machines, and puzzles.
              </p>
              <span
                style={{
                  color: "#00ff00",
                  marginTop: "10px",
                  display: "block",
                }}
              >
                &gt; Execute access
              </span>
            </Link>

            <Link to="/labs/intro" className={styles.featureCard}>
              <div className={styles.cornerMark}></div>
              <h3>02. LABS & PROJECTS</h3>
              <p>
                Personal research, malware analysis labs, and security tools
                development environment.
              </p>
              <span
                style={{
                  color: "#00ff00",
                  marginTop: "10px",
                  display: "block",
                }}
              >
                &gt; Execute access
              </span>
            </Link>

            {/* Cột 3: Blog */}
            <Link to="/blog" className={styles.featureCard}>
              <div className={styles.cornerMark}></div>
              <h3>03. KNOWLEDGE BASE</h3>
              <p>
                Articles on cybersecurity concepts, tutorials, and personal
                thoughts on the industry.
              </p>
              <span
                style={{
                  color: "#00ff00",
                  marginTop: "10px",
                  display: "block",
                }}
              >
                &gt; Execute access
              </span>
            </Link>
          </div>
        </div>

        {/* 5. Donation CTA */}
        <section className={styles.donateSection}>
          <div className={styles.donateHeader}>
            <h2 className={styles.donateTitle}>&lt; SUPPORT_CHANNEL /&gt;</h2>
          </div>
          <div className={styles.donateBody}>
            <div className={styles.donatePanel}>
              <div className={styles.donatePanelInner}>
                <div>
                  <p className={styles.donateCopy}>
                    Keep the research flowing~
                    <br></br>
                    Every coffee helps fund lab gear, challenge fees, and long
                    nights of packet captures.
                  </p>
                </div>
                <div className={styles.donateQrWrap} ref={scratchContainerRef}>
                  <div className={styles.donateQrFrame}>
                    <img
                      src={donateQr}
                      alt="Donation QR code"
                      className={styles.donateQrImage}
                    />
                    <canvas
                      ref={scratchCanvasRef}
                      className={styles.scratchCanvas}
                      onPointerDown={handleScratchStart}
                      onPointerMove={handleScratchMove}
                      onPointerUp={handleScratchEnd}
                      onPointerLeave={handleScratchEnd}
                    />
                    <div className={styles.scratchHint}>scratch to reveal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
            animate={{
              y: virusCount >= 10 ? [0, -20, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: virusCount >= 10 ? Infinity : 0,
            }}
            onClick={() => {
              if (virusCount >= 10) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
              }
            }}
            style={{ cursor: virusCount >= 10 ? "pointer" : "default" }}
          >
            🗑️
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
            🦠 {virusCount} / 10
          </motion.div>

          {/* Confetti */}
          {showConfetti && (
            <>
              {[...Array(150)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.confetti}
                  style={{
                    left: Math.random() * 100 + "%",
                    backgroundColor: [
                      "#00ff00",
                      "#ffb900",
                      "#00ffff",
                      "#ff006e",
                    ][i % 4],
                  }}
                  initial={{ y: -10, opacity: 1 }}
                  animate={{ y: window.innerHeight + 50, opacity: 0 }}
                  transition={{ duration: 3, delay: Math.random() * 0.5 }}
                />
              ))}
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
