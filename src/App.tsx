/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Code,
  Cloud,
  Layers,
  Database,
  Mail,
  Share2,
  Network,
  Brain,
  Cpu,
  Zap,
  Bot,
  Video,
  Palette,
  ChevronRight,
  NetworkIcon,
  WifiIcon,
  Github,
  Search,
  Check,
  User,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { p } from "motion/react-client";
import { createClient } from "@supabase/supabase-js";

const Typewriter = ({
  text,
  speed = 50,
  delay = 0,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, started]);

  return <span>{displayedText}</span>;
};

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a href={href} className="hover:text-primary transition-colors duration-200">
    {children}
  </a>
);

const SectionHeader = ({
  number,
  title,
  status,
}: {
  number: string;
  title: string;
  status: string;
}) => (
  <div className="flex items-center gap-4 mb-8 terminal-flicker">
    <h2 className="font-mono text-xl font-bold text-primary glow-text uppercase">
      [{number}] {title}
    </h2>
    <div className="h-[1px] flex-grow bg-primary/20"></div>
    <span className="font-mono text-[10px] text-primary/40 animate-pulse">
      [{status}]
    </span>
  </div>
);

const CompetencyCard = ({
  icon: Icon,
  title,
  skills,
}: {
  icon: any;
  title: string;
  skills: string;
}) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(236, 91, 19, 0.1)" }}
    className="glow-border p-4 bg-primary/5 group transition-all"
  >
    <Icon className="w-6 h-6 text-primary mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
    <p className="font-mono text-xs text-primary/60 mb-1 uppercase">{title}</p>
    <p className="font-bold text-sm text-primary">{skills}</p>
  </motion.div>
);

const ExperienceItem = ({
  date,
  role,
  company,
  description,
  tags,
}: {
  date: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}) => (
  <div className="relative pl-12 group">
    <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-primary rounded-full shadow-[0_0_8px_#ec5b13]"></div>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glow-border p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all"
    >
      <span className="font-mono text-[10px] text-primary/60 uppercase">
        {date} // {role}
      </span>
      <h3 className="text-xl font-bold mt-1 text-primary">{company}</h3>
      <p className="text-sm mt-3 font-mono leading-relaxed text-slate-300">
        {description}
      </p>
      <div className="mt-4 flex gap-4 text-[10px] font-mono text-primary/40">
        {tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </motion.div>
  </div>
);

const ProjectCard = ({
  repo,
  icon: Icon,
  description,
  tags,
}: {
  repo: string;
  icon: any;
  description: string;
  tags: string[];
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glow-border bg-primary/5 overflow-hidden group"
  >
    <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex justify-between items-center">
      <span className="text-[10px] font-mono text-primary/80 uppercase">
        REPO://{repo}
      </span>
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div className="p-6">
      <p className="text-sm font-mono mb-4 text-slate-300">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] border border-primary/30 px-2 py-0.5 text-primary/60 uppercase"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const AnimatedSection = ({
  children,
  id,
  className = "mb-20",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

export default function App() {
  const [status, setStatus] = useState("ONLINE");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
    | string
    | undefined;
  const supabase =
    supabaseUrl && supabaseAnonKey
      ? createClient(supabaseUrl, supabaseAnonKey)
      : null;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev === "ONLINE" ? "SYNCING" : "ONLINE"));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBroadcastSignal = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitError(null);

    if (!supabase) {
      setSubmitState("error");
      setSubmitError(
        "Missing Supabase config. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
      );
      return;
    }

    if (!formState.name.trim() || !formState.email.trim()) {
      setSubmitState("error");
      setSubmitError("Name and email are required.");
      return;
    }

    setSubmitState("sending");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formState.name.trim(),
        email: formState.email.trim(),
        message: formState.message.trim(),
      },
    ]);

    if (error) {
      setSubmitState("error");
      setSubmitError(error.message);
      return;
    }

    setSubmitState("success");
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden scanline">
      <div className="crt-overlay"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-primary/20 py-6 mb-12">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary" />
            <h2 className="font-mono text-lg font-bold tracking-tighter text-primary glow-text">
              SYS_PORTFOLIO_V3
            </h2>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            <NavItem href="#init">// INIT</NavItem>
            <NavItem href="#core">// CORE</NavItem>
            <NavItem href="#deploy">// DEPLOY</NavItem>
            <NavItem href="#credentials">// CREDS</NavItem>
            <NavItem href="#projects">// REPO</NavItem>
            <NavItem href="#connect">// CONNECT</NavItem>
          </nav>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#ec5b13]"></div>
            <span className="font-mono text-[10px] text-primary/60">
              STATUS: {status}
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <AnimatedSection id="init">
          <div className="glow-border bg-primary/5 p-8 rounded-lg relative overflow-hidden terminal-flicker">
            <div className="absolute top-0 right-0 p-2 font-mono text-[10px] text-primary/30">
              VER_3.0.42
            </div>
            <h1 className="font-mono text-primary text-2xl md:text-4xl font-bold mb-4 flex items-center gap-2">
              <span className="text-primary/50">&gt;</span>{" "}
              <Typewriter text="INITIALIZING SYSTEM..." speed={70} />
            </h1>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-3xl md:text-5xl font-black tracking-tighter mb-2 glow-text cursor-blink">
                  <Typewriter
                    text="TERMINAL://SAMARPAN_ROOT"
                    speed={100}
                    delay={1500}
                  />
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  className="text-primary/80 font-mono text-lg italic border-l-2 border-primary pl-4"
                >
                  Security Analyst | Digital Architect | Developer
                </motion.p>
              </div>
              <p className="max-w-2xl leading-relaxed font-mono text-sm text-primary/70">
                <Typewriter
                  text="Engineering digital ecosystems where high-performance code meets artistic vision. Executing protocol 001... bridging stack with AI-augmented systems... rendering creative architectures."
                  speed={20}
                  delay={4500}
                />
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8 }}
                className="flex gap-4"
              >
                <button className="bg-primary text-background-dark px-6 py-2 font-mono font-bold text-sm rounded hover:bg-accent-glow transition-all shadow-[0_0_15px_rgba(236,91,19,0.4)] uppercase">
                  Access_Logs
                </button>
                <button className="border border-primary/40 text-primary px-6 py-2 font-mono text-sm rounded hover:bg-primary/10 transition-all uppercase">
                  Documentation
                </button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Core Competencies */}
        <AnimatedSection id="core">
          <SectionHeader
            number="01"
            title="CORE_COMPETENCIES"
            status="SYS_READY"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CompetencyCard
              icon={Code}
              title="LANGUAGES"
              skills="Python, PHP, TS, JS, BASH"
            />
            <CompetencyCard
              icon={Cloud}
              title="INFRA"
              skills="AWS, GitHub, Azure, Docker, Vercel"
            />
            <CompetencyCard
              icon={Layers}
              title="FRONTEND"
              skills="React, Next.js, HTML/CSS, Tailwind"
            />
            <CompetencyCard
              icon={Database}
              title="BACKEND"
              skills="Node.js, MongoDB, Postgres, OpenAI API,Supabase"
            />
          </div>
          <div className="flex gap-2 mt-6 flex-wrap">
            {[
              "Networking",
              "SIEM",
              "Prompt Engineering",
              "Cloud Architecture",
              "AI/ML",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full font-mono text-[10px] text-primary uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Deployment History */}
        <AnimatedSection id="deploy">
          <SectionHeader
            number="02"
            title="DEPLOYMENT_HISTORY"
            status="LOG_ACCESSED"
          />
          <div className="space-y-8 relative">
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-primary/20"></div>
            <ExperienceItem
              date="CURRENT"
              role="LEAD_FULLSTACK_DEVELOPER"
              company="Online Job-Portal"
              description="Architecting PHP + MySQL job portal built with a simple MVC structure -based ecosystems with  AI integration. Designing scalable  infrastructure with built-in Resume building for high-performance applications."
              tags={["HTML/CSS", "PHP", "MySQL", "AI"]}
            />
            <ExperienceItem
              date="EST. 2025"
              role="CREATIVE_LEAD_DEVELOPER"
              company="QR_MENU_SAAS"
              description="Strategic design and platform management for a QR-based restaurant menu SaaS. Enabling restaurant owners to create contactless, editable digital menus with unique restaurant identities, dynamic menu listings, and scannable QR experiences that allow customers to browse items and calculate order totals seamlessly."
              tags={["REACT", "NODE.js", "SUPABASE", "TAILWIND"]}
            />
            <ExperienceItem
              date="EST. 2024"
              role="SOLE_DEVELOPER"
              company="Face Recognition Attendance System"
              description="Design and development of an automated face recognition attendance system using Python. Leveraging computer vision with OpenCV and facial encoding techniques to identify individuals in real time and seamlessly record attendance data into structured Excel reports."
              tags={["PYTHON", "OPENCV", "EXCEL", "FACE_RECOGNITION"]}
            />
          </div>
        </AnimatedSection>

        {/* Credentials Log */}
        <AnimatedSection id="credentials">
          <SectionHeader
            number="04"
            title="CREDENTIALS_LOG"
            status="VERIFIED_STAMP"
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <p className="font-mono text-xs text-primary/60 border-b border-primary/20 pb-1 uppercase">
                // ACADEMIC_HISTORY
              </p>
              <div className="glow-border p-4 bg-primary/5">
                <h3 className="text-sm font-bold text-primary uppercase">
                  Bsc.CSIT
                </h3>
                <p className="text-[10px] text-primary/60 font-mono">
                  Tribhuvan University, Nepal
                </p>
                <p className="text-[10px] text-primary/40 font-mono mt-1">
                  2023 - 2027 (Expected)
                </p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="font-mono text-xs text-primary/60 border-b border-primary/20 pb-1 uppercase">
                // SPECIALIZATIONS
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Brain,
                    title: "SECURITY_ANALYSIS",
                    sub: "Security Architectures",
                  },
                  {
                    icon: Bot,
                    title: "API Integration",
                    sub: "LLM Orchestration",
                  },
                  {
                    icon: Cpu,
                    title: "Prompt Engineering",
                    sub: "Context Optimization",
                  },
                  {
                    icon: Zap,
                    title: "Autonomous Systems",
                    sub: "Agentic Architectures",
                  },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="glow-border p-4 bg-primary/5 flex items-start gap-3"
                  >
                    <spec.icon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs font-bold text-primary uppercase">
                        {spec.title}
                      </p>
                      <p className="text-[9px] text-primary/40 font-mono">
                        {spec.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-xs text-primary/60 border-b border-primary/20 pb-1 uppercase">
                // CERTIFICATES
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Google Cybersecurity",
                    issuer: "Coursera",
                    date: "2024",
                  },
                  {
                    title: "Penetration Testing and Ethical Hacking",
                    issuer: "Cybrary",
                    date: "2025",
                  },
                ].map((cert, i) => (
                  <div key={i} className="glow-border p-4 bg-primary/5">
                    <p className="text-xs font-bold text-primary uppercase">
                      {cert.title}
                    </p>
                    <p className="text-[9px] text-primary/40 font-mono">
                      {cert.issuer}
                    </p>
                    <p className="text-[9px] text-primary/40 font-mono mt-1">
                      {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Repository Projects */}
        <AnimatedSection id="projects">
          <SectionHeader
            number="05"
            title="REPOSITORY_PROJECTS"
            status="FETCHING_REPOS..."
          />
          <div className="grid md:grid-cols-2 gap-6">
            <ProjectCard
              repo="Network_Scanner"
              icon={WifiIcon}
              description="NetMon is a lightweight Python network traffic monitoring tool that offers a GUI, CLI, and a simple web dashboard. It captures live packets, summarizes protocol usage, and highlights basic anomalies in near real time."
              tags={["NETWORKING", "Protocol_Analysis", "PYTHON"]}
            />
            <ProjectCard
              repo="Word Definition Browser Extension"
              icon={Search}
              description="A browser extension that lets users highlight a single word on any webpage and instantly view its dictionary definition in a tooltip, enhancing reading and comprehension without leaving the page"
              tags={["BROWSER_EXTENSION", "JAVASCRIPT", "API_INTEGRATION"]}
            />
            <ProjectCard
              repo="Personal Portfolio"
              icon={UserCheck}
              description="A personal portfolio website showcasing my projects, skills, and experience."
              tags={["Portfolio", "React", "TailwindCSS"]}
            />
          </div>
        </AnimatedSection>

        {/* Establish Connection */}
        <AnimatedSection id="connect" className="mb-20 pb-20">
          <SectionHeader
            number="06"
            title="ESTABLISH_CONNECTION"
            status="LINK_ESTABLISHED"
          />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <p className="font-mono text-sm text-primary">
                Ready to initiate new collaboration protocols? Send a secure
                packet or reach out through encrypted channels.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "EMAIL_ADDRESS",
                    value: "samarpanaryal7+dev@email.com",
                    href: "mailto:samarpanaryal7+dev@email.com",
                  },
                  {
                    icon: Github,
                    label: "SOURCE_CODE",
                    value: "github.com/Samarpan-77",
                    href: "https://github.com/Samarpan-77",
                  },
                  {
                    icon: Network,
                    label: "PROFESSIONAL_NET",
                    value: "linkedin.com/in/samarpan-aryal",
                    href: "https://linkedin.com/in/samarpan-aryal",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-10 h-10 glow-border flex items-center justify-center bg-primary/5 group-hover:bg-primary/20 transition-all">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-primary/60 uppercase">
                        {item.label}
                      </p>
                      <a
                        href={item.href}
                        className="font-mono text-sm text-primary hover:text-accent-glow transition-colors"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="glow-border bg-primary/5 p-6 rounded-lg">
              <form className="space-y-4" onSubmit={handleBroadcastSignal}>
                <div>
                  <label className="block font-mono text-[10px] text-primary/60 mb-1 uppercase">
                    Identification
                  </label>
                  <input
                    className="w-full bg-background-dark border border-primary/30 rounded px-3 py-2 text-sm font-mono text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 placeholder:text-primary/20"
                    placeholder="USER_NAME"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-primary/60 mb-1 uppercase">
                    Return_Path
                  </label>
                  <input
                    className="w-full bg-background-dark border border-primary/30 rounded px-3 py-2 text-sm font-mono text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 placeholder:text-primary/20"
                    placeholder="EMAIL@PROTOCOL.IO"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-primary/60 mb-1 uppercase">
                    Data_Payload
                  </label>
                  <textarea
                    className="w-full bg-background-dark border border-primary/30 rounded px-3 py-2 text-sm font-mono text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 placeholder:text-primary/20"
                    placeholder="ENTER MESSAGE..."
                    rows={4}
                    name="message"
                    value={formState.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <button
                  className="w-full bg-primary/20 border border-primary text-primary font-mono font-bold py-3 text-sm hover:bg-primary hover:text-background-dark transition-all uppercase tracking-widest shadow-[0_0_10px_rgba(236,91,19,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={submitState === "sending"}
                >
                  {submitState === "sending"
                    ? "Transmitting..."
                    : "Broadcast_Signal"}
                </button>
                {submitState === "success" ? (
                  <p className="text-[10px] font-mono text-primary/70 uppercase">
                    Signal received. Thanks for reaching out.
                  </p>
                ) : null}
                {submitState === "error" && submitError ? (
                  <p className="text-[10px] font-mono text-red-400 uppercase">
                    {submitError}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="border-t border-primary/20 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-primary/40 font-mono text-[10px]">
          <p>© 2026 SYSTEM_ARCHITECT_CORE. ALL PRIVILEGES RESERVED.</p>
          <div className="flex gap-6">
            <span>IP: 192.168.1.001</span>
            <span>LATENCY: 12ms</span>
            <span>ENC: AES-256</span>
          </div>
        </footer>
      </div>

      {/* Decorative UI Elements */}
      <div className="fixed top-20 right-[-100px] w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-20 left-[-100px] w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Side Labels */}
      <div className="fixed left-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none opacity-20">
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase rotate-180">
          Buffer_Overflow_Detected // 0xCCFF21
        </div>
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase rotate-180">
          Encryption_Active // AES_256_GCM
        </div>
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase rotate-180">
          Packet_Loss: 0.002%
        </div>
      </div>

      <div className="fixed right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none opacity-20">
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase">
          Tracing_Route... 127.0.0.1
        </div>
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase">
          Handshake_Protocol: SECURE
        </div>
        <div className="font-mono text-[8px] text-primary tracking-tighter vertical-text uppercase">
          Memory_Usage: 42.8GB/128GB
        </div>
      </div>
    </div>
  );
}
