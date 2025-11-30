import React, { useRef } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Terminal from 'react-console-emulator';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import styles from './index.module.css';

import t1 from '@site/static/img/t1.jpg';
import ces from '@site/static/img/ces.jpg';
import love from '@site/static/img/love.jpg';
import ball from '@site/static/img/ball.jpg';

// import myAvatar from '@site/static/img/real-avt.jpg';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const constraintsRef = useRef(null);

  const photos = [
    {
      id: 1,
      src: ces,
      text: "con oi esports thi dung",
      rotate: -12, 
      x: -50,      
      y: 20,
      zIndex: 1
    },
    {
      id: 2,
      src: ball,
      text: "(●'◡'●)",
      rotate: 8,   
      x: 60,       
      y: -30,
      zIndex: 2
    },
    {
      id: 3,
      src: love, 
      text: "( •̀ ω •́ )✧",
      rotate: -5,
      x: 0,
      y: 80, 
      zIndex: 3
    },
    {
      id: 4,
      src: t1, 
      text: "DORANNNNNNN",
      rotate: -10,
      x: -90,
      y: 100, 
      zIndex: 4
    }
  ];

  const commands = {
    whoami: {
      description: 'Display current user profile.',
      fn: () => (
        "USER: Thai Ngoc Diem Trinh (Thai Trinh)\n" +
        "YEAR: 2004\n" +
        "GENDER: Female\n" +
        "ROLE: CTF Player | Security researcher | Blogger\n" +
        "STATUS: Active & learning "
      ),
    },
    ls: {
      description: 'List directory contents.',
      fn: () => 'secret.txt\nflag.txt',
    },
    cat: {
      description: 'Read file content. Usage: cat <filename>.',
      fn: (...args) => {
        const filename = args[0];
        if (!filename) return "Usage: cat <filename>.";
        if (filename === 'secret.txt') {
          return (
            "FACT: I am an Esports fan O.O\n" +
            "MY FAVORITE TEAMS:\n" +
            "   > FINHAY Cerberus Esports (PUBG PC)\n" +
            "   > T1 (League of Legends)\n\n" +
            "MESSAGE: Please give them your biggest cheers <3"
          );
        }
        if (filename === 'flag.txt') {
          return "MESSAGE: \"Good things take time. Great things take a bit longer.\"";
        }
        return `cat: ${filename}: No such file or directory.`;
      },
    },
    sudo: {
      description: 'Execute a command as another user.',
      fn: () => "Permission denied: You are not in the sudoers file. Nice try ^^",
    },
    date: {
      description: 'Display current date and time.',
      fn: () => new Date().toString(),
    },
    coffee: {
      description: 'Order a coffee.',
      fn: () => {
        const art = `
          ( (
           ) )
        .______.
        |      |]
        \\      /
         '----'

Here is your coffee! Now go write some exploits ^^`;
        return art.replace(/ /g, '\u00A0'); 
      }
    },
  };

  return (
    <Layout
      title={`Home`}
      description="Welcome to solivaquaant's little corner of the Internet">
      
      <main className={styles.hackerContainer}>
        
        {/* 1. Hero & typewriter */}
        <div className={styles.heroHeader}>
          <h1 className={styles.glitchTitle}>
            Thái Ngọc Diễm Trinh
          </h1>
          <div className={styles.typewriterText}>
            <span>Running process: </span>
            <span style={{color: '#fff', fontWeight: 'bold'}}>
              <Typewriter
                options={{
                  strings: [
                    'SOC Analyst...',
                    'CTF player...', 
                    'Writing exploits...', 
                    'Sharing knowledge...',
                    'Threat hunting...',
                    'Digital forensics...',
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
                "Welcome to " + siteConfig.title + ".\n" +
                "Enter 'help' to view available commands."
              }
              promptLabel={'soli@vaquaant:~# '}
              style={{ 
                  borderRadius: '0 0 10px 10px', 
                  minHeight: '400px', 
                  width: '100%', 
                  maxWidth: '900px',
                  boxShadow: '0 10px 30px rgba(0, 255, 0, 0.1)',
                  border: '1px solid #333',
                  fontFamily: '"Consolas", "Courier New", monospace',
              }}
              contentStyle={{
                  color: '#00ff00', 
                  fontSize: '1.1em', 
                  fontFamily: 'monospace',
                  whiteSpace: 'pre',
              }}
              inputTextStyle={{
                  color: '#ffffff',
                  fontWeight: 'bold'
              }}
            />
        </div>

        {/* 3. Profile images*/}
        <div style={{textAlign: 'center', marginTop: '4rem'}}>
            <h2 style={{fontSize: '2rem', color: '#00ff00'}}>
              &lt; EVIDENCE_BOARD /&gt;
            </h2>
            <p style={{color: '#ccc'}}>
              The data is being scrambled. 
              Drag and drop to rearrange the evidence!
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
                cursor: "grab" 
              }}
              whileTap={{ 
                scale: 1.2, 
                cursor: "grabbing",
                zIndex: 100 
              }}
            >
              <div className={styles.tape}></div>
              <img src={photo.src} alt="Evidence" className={styles.polaroidImg} />
              <div className={styles.handWrittenText}>
                {photo.text}
              </div>
            </motion.div>
          ))}
        </div>
        {/* End of Profile Images */}

        {/* 4. Navigation categories */}
        <div style={{marginTop: '4rem'}}>
            <h2 style={{fontSize: '2rem', color: '#00ff00'}}>
              &lt; DATABASE_ACCESS /&gt;
            </h2>
            <div className={styles.featuresSection}>
                
                <Link to="/docs/about-me/" className={styles.featureCard}>
                    <div className={styles.cornerMark}></div>
                    <h3>01. WRITE-UPS</h3>
                    <p>
                        Comprehensive guides for CTF challenges, machines, 
                        and puzzles.
                    </p>
                    <span style={{color: '#00ff00', marginTop: '10px', display: 'block'}}>
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
                    <span style={{color: '#00ff00', marginTop: '10px', display: 'block'}}>
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
                    <span style={{color: '#00ff00', marginTop: '10px', display: 'block'}}>
                        &gt; Execute access
                    </span>
                </Link>
            </div>
        </div>
      </main>
    </Layout>
  );
}