import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import profileImage from './assets/mypic.jpg';
import { Terminal, User, Code, Briefcase, Award, Mail, Phone, Github, Linkedin, ExternalLink, FileText, Download } from 'lucide-react';

const TerminalPortfolio = () => {
  const [currentSection, setCurrentSection] = useState('welcome');
  const [typedText, setTypedText] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const welcomeText = "Welcome to Abhishek Dixit's Interactive Portfolio Terminal";
  
  useEffect(() => {
    if (currentSection === 'welcome') {
      let i = 0;
      const timer = setInterval(() => {
        if (i < welcomeText.length) {
          setTypedText(welcomeText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentSection]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Matrix Rain Effect
  useEffect(() => {
    const createMatrixRain = () => {
      const container = document.querySelector('.matrix-rain');
      if (!container) return;

      const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      
      for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
          text += characters[Math.floor(Math.random() * characters.length)] + '\n';
        }
        column.textContent = text;
        
        container.appendChild(column);
      }
    };

    const timer = setTimeout(createMatrixRain, 1000);
    return () => clearTimeout(timer);
  }, []);

  const commands = {
    'help': 'Show available commands',
    'about': 'Display personal information',
    'projects': 'Show my projects',
    'experience': 'Display work experience',
    'skills': 'List technical skills',
    'achievements': 'Show awards and achievements',
    'contact': 'Display contact information',
    'resume': 'View or download my resume',
    'clear': 'Clear terminal',
    'welcome': 'Return to welcome screen',
    'whoami': 'Display current user info',
    'ls': 'List available sections',
    'pwd': 'Show current directory',
    'cat': 'Display file contents (usage: cat <section>)'
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
    
    // Add command to history
    setCommandHistory(prev => [...prev, trimmedCmd]);
    
    // Add command to terminal output
    setTerminalOutput(prev => [...prev, {
      type: 'command',
      content: `abhishek@portfolio:~$ ${trimmedCmd}`
    }]);

    // Process command
    let output = '';
    
    switch (command) {
      case 'help':
        output = Object.entries(commands).map(([cmd, desc]) => `${cmd.padEnd(15)} - ${desc}`).join('\n');
        break;
      case 'about':
      case 'cat':
        if (command === 'cat' && args[0] === 'about' || command === 'about') {
          output = getAboutContent();
        } else if (command === 'cat' && args[0]) {
          output = getCatContent(args[0]);
        } else if (command === 'cat') {
          output = 'Usage: cat <section>\nAvailable sections: about, projects, experience, skills, achievements, contact, resume';
        } else {
          output = getAboutContent();
        }
        break;
      case 'projects':
        output = getProjectsContent();
        break;
      case 'experience':
        output = getExperienceContent();
        break;
      case 'skills':
        output = getSkillsContent();
        break;
      case 'achievements':
        output = getAchievementsContent();
        break;
      case 'contact':
        output = getContactContent();
        break;
      case 'resume':
        output = getResumeContent();
        break;
      case 'clear':
        setTerminalOutput([]);
        setCurrentCommand('');
        return;
      case 'welcome':
        setCurrentSection('welcome');
        output = 'Returned to welcome screen. Type "help" for available commands.';
        break;
      case 'whoami':
        output = 'abhishek\nAI/ML Enthusiast | Software Developer | Innovation Leader';
        break;
      case 'ls':
        output = 'about  projects  experience  skills  achievements  contact  resume';
        break;
      case 'pwd':
        output = '/home/abhishek/portfolio';
        break;
      case 'echo':
        output = args.join(' ') || '';
        break;
      case '':
        // Empty command, just show new prompt
        setCurrentCommand('');
        return;
      default:
        output = `Command not found: ${command}\nType "help" for available commands.`;
    }

    // Add output to terminal
    if (output) {
      setTerminalOutput(prev => [...prev, {
        type: 'output',
        content: output
      }]);
    }

    setCurrentCommand('');
  };

  const projects = [
    {
      title: "MODULAR CONTROL PROTOCOL (MCP) – SERVER & CLIENT SYSTEM",
      period: "July 2024 - Present",
      description: "Designed an Agentic AI system using Gemini 2.5 Pro to autonomously execute multi-step tasks.",
      achievements: [
        "Built scalable n8n-based server-client architecture with dynamic Firecrawl API integration",
        "Automated web scraping workflows, processing 500+ data entries per day with 30% faster task execution"
      ],
      tech: ["Gemini 2.5 Pro", "n8n", "Firecrawl API", "Webhooks"]
    },
    {
      title: "AI-Powered Email Automation Agent",
      period: "May 2025 – Present",
      description: "Developed a fully automated AI agent in n8n that sent over 500+ personalized cold emails using GPT-generated content.",
      achievements: [
        "Achieved 80%+ email delivery rate",
        "Saved over 10 hours/week of manual effort",
        "Built plug-and-play, zero-touch outreach system"
      ],
      tech: ["n8n", "OpenAI GPT API", "Google Sheets", "Gmail API"]
    },
    {
      title: "Stock Market Prediction Model",
      period: "Oct 2024",
      description: "Led a team of 10 in developing Stock Market Prediction model using AI/ML for forecasting stock prices.",
      achievements: [
        "Team leader of 10 members",
        "Designed project architecture",
        "Managed task allocation and guided model development"
      ],
      tech: ["Python", "Pandas", "Matplotlib", "MySQL"]
    },
    {
      title: "Eye-Controlled Mouse – Assistive Technology Startup",
      period: "Dec 2023",
      description: "Founded a tech startup developing patented hands-free computer control using eye-tracking and computer vision.",
      achievements: [
        "Award-winning innovator with top finishes at national competitions",
        "Competitions hosted by IIT Jodhpur, IIT Kanpur, IIT Guwahati",
        "Patented technology for assistive computing"
      ],
      tech: ["Python", "OpenCV", "PyAutoGUI", "MediaPipe"]
    }
  ];

  const experience = [
    {
      title: "AI Research Intern",
      company: "NIT Mizoram",
      period: "July 2025",
      description: "Virtual Internship under Dr. Lenin",
      achievements: [
        "Developed an AI legal chatbot using RAG to suggest BNS charges from user inputs",
        "Covered 50+ case categories",
        "Integrated GPT-4, Python, and vector embedding models",
        "Achieved 91% accuracy on legal classification test cases"
      ]
    },
    {
      title: "Training Program",
      company: "HCL Technologies",
      period: "Oct 2024",
      description: "Comprehensive training in data engineering and analytics",
      achievements: [
        "Gained hands-on experience with ETL and data pipeline automation",
        "Built large-scale data workflows using Python, SQL, and Big Data",
        "Designed DB schemas ensuring scalability"
      ]
    }
  ];

  const skills = {
    "Languages": ["Python", "C", "C++", "SQL", "HTML", "CSS"],
    "Tools": ["n8n", "Git", "GitHub", "Excel", "PowerBI", "GCP", "Google Colab", "Jupyter", "PyCharm"],
    "Libraries": ["Pandas", "NumPy", "Matplotlib", "PySpark", "OpenCV", "Mediapipe", "PyautoGUI"],
    "Core Subjects": ["DSA", "DBMS", "OOPS"]
  };

  const achievements = [
    "First-Place Wins at IITs: IIT Kanpur – Paper Presentation (Jan 2024)",
    "IIT Guwahati – Tech-Expo (Aug 2024)",
    "IIT Jodhpur – Patent Showcase & Poster Presentation (Promeo'25)",
    "IIM Ahmedabad – National-Level Hackathon Finalist/Winner",
    "IIT Jammu – Top 11/605",
    "Avinya Hackathon @ IIT Guwahati – Top 10/350",
    "National Innovation Award – 4th Place, Panipat (Presented by Dr. Kiran Bedi)",
    "Navonmesh AIdea Challenge – Finalist",
    "SRMS Hackathon 3.0 – Consolation Prize"
  ];

  const getCatContent = (section) => {
    switch (section) {
      case 'about': return getAboutContent();
      case 'projects': return getProjectsContent();
      case 'experience': return getExperienceContent();
      case 'skills': return getSkillsContent();
      case 'achievements': return getAchievementsContent();
      case 'contact': return getContactContent();
      case 'resume': return getResumeContent();
      default: return `cat: ${section}: No such file or directory`;
    }
  };

  const getAboutContent = () => {
    return `ABHISHEK DIXIT\n================\nAI/ML Enthusiast & Software Developer\n\nDESCRIPTION:\nAI/ML enthusiast skilled in software development, data engineering, and automation. \nProven success in predictive analytics, accessibility-focused solutions, and leadership \nin national-level competitions. Eager to bring expertise in AI-driven and data-centric \ninnovation to forward-thinking organizations.\n\nEDUCATION:\n• B.Tech in Computer Science (AI & ML) 2022-2026\n  Bansal Institute of Engineering and Technology, Lucknow\n  CGPA: 8.17\n\n• Intermediate 2022\n  Prabha Sunrise Educational Institute, Kanpur\n  Percentage: 75.4%\n\n• High School 2020\n  Prabha Sunrise Educational Institute, Kanpur\n  Percentage: 80.5%`;
  };

  const getProjectsContent = () => {
    let content = 'PROJECTS\n========\n\n';
    projects.forEach((project, index) => {
      content += `${index + 1}. ${project.title} (${project.period})\n`;
      content += `   --------------------------------------------------------\n`;
      content += `   • ${project.description}\n`;
      project.achievements.forEach(ach => {
        content += `   • ${ach}\n`;
      });
      content += `   • Tech Stack: ${project.tech.join(', ')}\n\n`;
    });
    return content;
  };

  const getExperienceContent = () => {
    let content = 'PROFESSIONAL EXPERIENCE\n=======================\n\n';
    experience.forEach(exp => {
      content += `${exp.title} – ${exp.company} (${exp.period})\n`;
      content += `--------------------------------------------\n`;
      content += `${exp.description}\n`;
      exp.achievements.forEach(ach => {
        content += `• ${ach}\n`;
      });
      content += `\n`;
    });
    return content;
  };

  const getSkillsContent = () => {
    let content = 'TECHNICAL SKILLS\n================\n\n';
    Object.entries(skills).forEach(([category, skillList]) => {
      content += `${category.toUpperCase()}:\n`;
      content += `----------\n`;
      content += `${skillList.join(', ')}\n\n`;
    });
    return content;
  };

  const getAchievementsContent = () => {
    let content = 'ACHIEVEMENTS & AWARDS\n=====================\n\n';
    achievements.forEach(ach => {
      content += `🏆 ${ach}\n`;
    });
    return content;
  };

  const getContactContent = () => {
    return `CONTACT INFORMATION\n===================\n\n📞 PHONE:    +91 9555762116\n📧 EMAIL:    abhishek1530002@gmail.com\n🔗 LINKEDIN: https://www.linkedin.com/in/abhishek-dixit-a22b192a1/\n🐙 GITHUB:   https://github.com/dixitabhi1\n\n💬 MESSAGE:\nLet's connect and build something amazing together!\n\n📍 LOCATION: Lucknow, India`;
  };

  const getResumeContent = () => {
    return `RESUME OPTIONS\n==============\n\n📄 VIEW RESUME:     Open resume in browser\n💾 DOWNLOAD RESUME: Download PDF copy\n\n[View Resume](./Abhishek-Dixit-RESUME.pdf)\n[Download Resume](./Abhishek-Dixit-RESUME.pdf)`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        setCurrentCommand(commandHistory[commandHistory.length - 1]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        setCurrentCommand(matches[0]);
      }
    }
  };

  const renderTerminalOutput = (content) => {
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const linkifiedContent = content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert markdown-style links to clickable links
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const finalContent = linkifiedContent.replace(markdownLinkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    return <span dangerouslySetInnerHTML={{ __html: finalContent }} />;
  };

  return (
    <div className="terminal-container min-h-screen" onClick={() => inputRef.current?.focus()}>
      {/* Matrix Rain Background */}
      <div className="matrix-rain"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Terminal Header */}
        <div className="terminal-header mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="ml-4 text-gray-400">abhishek@portfolio: ~</span>
          </div>
        </div>

        {/* Welcome Screen */}
        {currentSection === 'welcome' && terminalOutput.length === 0 && (
          <div className="text-center space-y-6 mb-8">
            <div className="ascii-art terminal-text font-mono text-sm">
              <pre>{`
    ___    ____  __  _________ __  __________ __
   /   |  / __ )/ / / /  _/ __/ / / / ____/ //_/
  / /| | / __  / /_/ // /_\\ \\/ /_/ / __/ / ,<   
 / ___ |/ /_/ / __  // /___/ / __  / /___/ /| |  
/_/  |_/_____/_/ /_/___/____/_/ /_/_____/_/ |_|  
                                                
 ____  ________  ________
/ __ \\/  _/ __ \\/ /  _/_  __
/ / / // // /_/ / // /  / / /
/ /_/ // // ____/ // /  / /_/ 
\\____/___/_/   /_/___/  \\____/ 
                                                
              PORTFOLIO TERMINAL v1.0
`}</pre>
            </div>
            
            {/* CRAZY TECHY HOLOGRAPHIC DISPLAY */}
            <div className="cyberpunk-hud">
              <div className="holo-display">
                {/* Holographic Shader */}
                <div className="holo-shader"></div>
                
                {/* Scan Lines */}
                <div className="scan-lines"></div>
                
                {/* Data Streams */}
                <div className="data-streams">
                  <div className="data-stream"></div>
                  <div className="data-stream"></div>
                  <div className="data-stream"></div>
                  <div className="data-stream"></div>
                </div>
                
                {/* Particle System */}
                <div className="particle-system">
                  <div className="tech-particle"></div>
                  <div className="tech-particle"></div>
                  <div className="tech-particle"></div>
                  <div className="tech-particle"></div>
                </div>
                
                {/* Glitch Profile Image */}
                <div className="glitch-profile">
                  <img src={profileImage} alt="Abhishek Dixit" />
                </div>
                
                {/* HUD Info Display */}
                <div className="hud-info">
                  <div className="hud-line">
                    <span>SUBJECT:</span>
                    <span>ABHISHEK DIXIT</span>
                  </div>
                  <div className="hud-line">
                    <span>CLASS:</span>
                    <span>AI/ML DEVELOPER</span>
                  </div>
                  <div className="hud-line">
                    <span>STATUS:</span>
                    <span>ACTIVE</span>
                  </div>
                  <div className="hud-line">
                    <span>LEVEL:</span>
                    <span>EXPERT</span>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold typing-animation terminal-accent">{typedText}</h1>
            <p className="text-lg terminal-text">AI/ML Enthusiast | Software Developer | Innovation Leader</p>
            <div className="terminal-card text-left">
              <p className="terminal-accent mb-2">Welcome to my interactive portfolio terminal!</p>
              <p className="terminal-text mb-2">Type 'help' to see available commands.</p>
              <p className="terminal-text">Try commands like: about, projects, skills, experience, achievements, contact, resume</p>
            </div>
          </div>
        )}

        {/* Terminal Output */}
        <div ref={terminalRef} className="terminal-output mb-4 max-h-96 overflow-y-auto">
          {terminalOutput.map((line, index) => (
            <div key={index} className={`mb-2 ${line.type === 'command' ? 'terminal-accent' : 'terminal-text'}`}>
              <pre className="whitespace-pre-wrap font-mono">
                {line.type === 'output' ? renderTerminalOutput(line.content) : line.content}
              </pre>
            </div>
          ))}
        </div>

        {/* Command Input */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="terminal-prompt">abhishek@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyPress}
            className="terminal-input flex-1"
            placeholder="Type a command..."
            autoFocus
            spellCheck={false}
          />
        </div>

        {/* Command History (last 5 commands) */}
        {commandHistory.length > 0 && (
          <div className="terminal-card mb-6">
            <h3 className="terminal-accent font-semibold mb-2">Recent Commands:</h3>
            <div className="text-sm">
              {commandHistory.slice(-5).map((cmd, index) => (
                <div key={index} className="command-line">
                  <span className="terminal-accent">$ </span>
                  <span className="terminal-text">{cmd}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center terminal-card">
          <p className="terminal-text text-sm">
            © 2025 Abhishek Dixit. Built with React & Terminal Love ❤️
          </p>
          <p className="terminal-text text-xs mt-2">
            Tip: Use Tab for auto-completion, ↑ arrow for command history
          </p>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;

