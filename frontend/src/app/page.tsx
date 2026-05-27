"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const hiringSteps = [
    {
      icon: "📋",
      label: "Step 1 of 6",
      duration: "⏱ 2–3 Days",
      title: "Application Review",
      desc: "Our senior HR team personally reviews every application. We evaluate your resume, portfolio, GitHub profile, and cover letter holistically. You will receive a response within 3 business days — no ghosting, ever.",
      checks: [
        "Updated Resume / CV",
        "GitHub or Portfolio Link",
        "Cover Letter (optional but valued)",
        "LinkedIn Profile",
        "Expected CTC & Notice Period",
      ],
    },
    {
      icon: "📞",
      label: "Step 2 of 6",
      duration: "⏱ 30 Minutes",
      title: "HR Screening Call",
      desc: "A friendly 30-minute video or phone call with our HR team. We introduce you to Vjay Software, discuss your background, career goals, salary expectations, and answer any questions you have about the role and culture.",
      checks: [
        "Role & Team Introduction",
        "Career Goals Discussion",
        "Salary & Notice Period",
        "Remote / Hybrid Preferences",
        "Company Culture Overview",
      ],
    },
    {
      icon: "💻",
      label: "Step 3 of 6",
      duration: "⏱ 2–3 Hours",
      title: "Technical Assessment",
      desc: "A take-home or live coding assessment tailored to the role. We focus on real-world problem solving, code quality, and architectural thinking — not trick questions or obscure puzzles. You have 48 hours for take-home tasks.",
      checks: [
        "Real-world Problem Scenarios",
        "Code Quality & Readability",
        "System Design (Senior Roles)",
        "Algorithms & Data Structures",
        "Language / Framework Proficiency",
      ],
    },
    {
      icon: "🧑💼",
      label: "Step 4 of 6",
      duration: "⏱ 60–90 Minutes",
      title: "Technical Interview",
      desc: "A deep-dive technical interview with two of our senior engineers. We review your assessment submission, explore your architecture decisions, and have an open technical discussion. This is a two-way conversation — you can ask us anything.",
      checks: [
        "Assessment Code Walkthrough",
        "Architecture & Design Decisions",
        "Past Project Deep Dive",
        "Technology Philosophy Discussion",
        "Live Debugging (optional)",
      ],
    },
    {
      icon: "🤝",
      label: "Step 5 of 6",
      duration: "⏱ 45 Minutes",
      title: "Culture & Leadership Round",
      desc: "A conversation with our Engineering Lead or CTO. We explore how you collaborate, handle challenges, mentor others, and align with our values. This is also your opportunity to meet leadership and ask strategic questions about the company.",
      checks: [
        "Leadership & Collaboration Style",
        "Conflict Resolution Approach",
        "Mentoring & Knowledge Sharing",
        "Alignment with Company Values",
        "Strategic Vision Discussion",
      ],
    },
    {
      icon: "🎉",
      label: "Step 6 of 6",
      duration: "⏱ 3–5 Days",
      title: "Offer & Onboarding",
      desc: "Congratulations! We send a detailed offer letter with compensation, benefits, start date, and all documentation. Our onboarding program spans your first 30 days — including equipment setup, team introductions, project ramp-up, and a dedicated buddy.",
      checks: [
        "Offer Letter & CTC Breakdown",
        "Background Verification",
        "Equipment & Access Setup",
        "30-Day Onboarding Plan",
        "Buddy / Mentor Assignment",
      ],
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const [projectDescription, setProjectDescription] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiEstimate, setAiEstimate] = useState<any>(null);

  // For Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".service-card, .portfolio-card, .blog-card, .job-card")
      .forEach((el) => {
        (el as HTMLElement).style.opacity = "0";
        (el as HTMLElement).style.transform = "translateY(20px)";
        (el as HTMLElement).style.transition =
          "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (index: number) => {
    setPanelVisible(false);
    setTimeout(() => {
      setActiveStep(index);
      setPanelVisible(true);
    }, 50);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDescription.trim()) {
      alert("Please describe your project first!");
      return;
    }
    
    setIsAiLoading(true);
    setAiEstimate(null);
    
    try {
      const response = await fetch("http://localhost:8001/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: projectDescription }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch estimate");
      }
      
      const data = await response.json();
      setAiEstimate(data);
    } catch (error) {
      alert("Error connecting to AI backend. Ensure the FastAPI server is running on port 8001.");
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const currentStepData = hiringSteps[activeStep];

  return (
    <>
      <nav>
        <a href="#home" className="nav-logo">
          <div className="nav-logo-text">
            VJAY <span>SOFTWARE</span>
          </div>
        </a>
        <ul className="nav-links">
          <li><a href="#about">Who we are</a></li>
          <li><a href="#services">What we do</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Case studies</a></li>
          <li><a href="#careers">Careers</a></li>
          <li><a href="#contact" className="nav-cta">Contact us</a></li>
        </ul>
        <button className="menu-toggle" aria-label="Menu">
          ☰
        </button>
      </nav>

      {/* HOME */}
      <section id="home">
        <div className="hero-grid-bg"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-driven migrations: faster delivery, reduced workloads
            </h1>
            <p className="hero-sub">
              Combine multi-agent AI and experienced engineers to accelerate migrations and boost software delivery.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="section-tag">Who We Are</div>
          <h2 className="section-title">
            BUILT ON<br />
            EXPERTISE
          </h2>
          <p className="section-desc">
            Vjay Software PVT Ltd is a premier Indian IT company delivering
            innovative software solutions since over a decade. We combine
            technical rigor with business insight.
          </p>
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-card about-card-main">
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(245,243,238,0.4)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Our Foundation
                </div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "32px",
                    color: "var(--paper)",
                    lineHeight: "1.1",
                  }}
                >
                  Senior-Led, Quality-First Development
                </div>
              </div>
              <div className="about-card about-card-accent">
                <div className="about-big-num">10</div>
                <div className="about-big-label">Years of Excellence</div>
              </div>
            </div>
            <div>
              <ul className="about-list">
                <li>
                  Senior engineers with 10+ years average experience drive every
                  project from architecture to deployment
                </li>
                <li>
                  End-to-end development capabilities spanning web, mobile,
                  cloud, and enterprise systems
                </li>
                <li>
                  Agile, transparent delivery methodology with regular client
                  touchpoints and milestone reviews
                </li>
                <li>
                  Headquartered in India with global clientele across USA, UK,
                  Middle East, and APAC
                </li>
                <li>
                  ISO-aligned development practices ensuring security,
                  scalability, and maintainability
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="results-section">
        <div className="container">
          <div className="section-tag">Measurable Impact</div>
          <h2 className="section-title">RESULTS WE'VE DELIVERED</h2>
          <div className="results-grid">
            {[
              { val: "5x", label: "Increase in revenue", link: "FinPay Case Study" },
              { val: "80%", label: "Increased test coverage", link: "HealthX QA Audit" },
              { val: "34x", label: "Increased data capacity", link: "Logiq Big Data" },
              { val: "6x", label: "Faster time to market", link: "RetailFlow MVP" },
              { val: "50%", label: "Savings in cloud costs", link: "SaaS Modernization" },
            ].map((res, i) => (
              <div key={i} className="result-item">
                <div className="result-val">{res.val}</div>
                <div className="result-label">{res.label}</div>
                <a href="#portfolio" className="result-link">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (REFINED) */}
      <section id="why">
        <div className="container">
          <div className="why-layout">
            <div className="why-content">
              <div className="section-tag">Engineering Excellence</div>
              <h2 className="section-title">
                ENGINEERING THAT<br />
                REIMAGINES TOMORROW
              </h2>
              <p className="section-desc">
                Scale-ups, unicorns and modern enterprises around the globe trust 
                our development teams to manage software from ideation to release 
                and beyond. We enrich organizations with talent that boosts 
                scalability, drives growth and brings disruptive ideas to life.
              </p>
              <div className="why-stats">
                <div className="why-stat-item">
                  <span className="why-stat-num">150+</span>
                  <span className="why-stat-text">Talented experts</span>
                </div>
                <div className="why-stat-item">
                  <span className="why-stat-num">12+</span>
                  <span className="why-stat-text">Years of innovation</span>
                </div>
                <div className="why-stat-item">
                  <span className="why-stat-num">50+</span>
                  <span className="why-stat-text">Global clients</span>
                </div>
              </div>
            </div>
            <div className="why-visual">
              <div className="why-card">
                <ul className="why-list">
                  <li>
                    <strong>Strategic Partnership</strong>: We don't just write code; we align with your business goals to ensure long-term ROI.
                  </li>
                  <li>
                    <strong>Cross-Border Expertise</strong>: Experience working with teams across North America, Europe, and APAC.
                  </li>
                  <li>
                    <strong>ISO-Aligned Standards</strong>: Development practices ensuring security, scalability, and maintainability.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="services-layout">
            <div className="services-sidebar">
              <div className="sidebar-accent"></div>
              <h2 className="services-headline">
                AI expertise tailored to<br />
                <span>business goals</span>
              </h2>
              <a href="#contact" className="btn-primary">
                Let's work together
              </a>
            </div>
            <div className="services-categories">
              <div className="service-col">
                <div className="category-group">
                  <h3 className="category-title">Ideate</h3>
                  <ul className="category-list">
                    <li>UX & UI Design Services</li>
                    <li>Custom Software Development</li>
                    <li>Cloud Consulting & Services</li>
                  </ul>
                </div>
                <div className="category-group">
                  <h3 className="category-title">Improve</h3>
                  <ul className="category-list">
                    <li>Digital Transformation Solutions and Services</li>
                    <li>Generative AI Development Services</li>
                    <li>AI & ML Development Services</li>
                    <li>Data Engineering and Data Science Services</li>
                    <li>Enterprise AI Platform</li>
                  </ul>
                </div>
                <div className="category-group">
                  <h3 className="category-title">Scale</h3>
                  <ul className="category-list">
                    <li>US Nearshore Software Development Services</li>
                    <li>Software Development Outsourcing Services</li>
                    <li>Software Development for Startups</li>
                  </ul>
                </div>
              </div>
              <div className="service-col">
                <div className="category-group">
                  <h3 className="category-title">Build</h3>
                  <ul className="category-list">
                    <li>Dedicated Development Teams</li>
                    <li>Embedded Software Services</li>
                    <li>Mobile Apps Development Services</li>
                    <li>Python & Django Development Services</li>
                  </ul>
                </div>
                <div className="category-group">
                  <h3 className="category-title">Operate</h3>
                  <ul className="category-list">
                    <li>Identity and Access Management Services</li>
                    <li>Automation Testing Services</li>
                    <li>DevOps Consulting Services & Solutions</li>
                    <li>Software Auditing Services</li>
                    <li>Security Audit and Governance Services</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <div className="container">
          <div className="section-tag">Our Work</div>
          <h2 className="section-title">
            SELECTED<br />
            PROJECTS
          </h2>
          <p className="section-desc">
            A curated selection of projects that demonstrate our technical depth
            and design thinking across industries.
          </p>
          <div className="portfolio-grid">
            {[
              {
                bg: "#7c3aed",
                label: "AURA.AI",
                tag: "AI · Agentic Platform",
                title: "Aura AI — Multi-Agent Autopilot",
                desc: "An enterprise-grade orchestration framework running autonomous AI agents that handle customer workflow automation, auto-debugging, and predictive analytics.",
              },
              {
                bg: "#0057ff",
                label: "FINPAY",
                tag: "Fintech · Web App",
                title: "FinPay — Payment Gateway Platform",
                desc: "A high-throughput payment processing platform handling 2M+ transactions/day with real-time fraud detection and multi-currency support.",
              },
              {
                bg: "#0d9488",
                label: "MEDISENSE",
                tag: "Healthcare · ML Diagnostics",
                title: "MediSense — AI Diagnostics Suite",
                desc: "Computer vision and neural networks analyzing MRI and X-ray images with 98.7% diagnostic accuracy, integrated into EHR systems.",
              },
              {
                bg: "#4f46e5",
                label: "HEALTHX",
                tag: "Healthcare · Mobile",
                title: "HealthX — Telemedicine App",
                desc: "End-to-end telemedicine platform with video consultations, AI symptom checker, and EHR integration for 50+ hospitals.",
              },
              {
                bg: "#ea580c",
                label: "NEURATRADE",
                tag: "Quantitative Finance · Deep Learning",
                title: "NeuraTrade — Algorithmic Trade Bot",
                desc: "Reinforcement learning bot processing terabytes of real-time market data to execute predictive trades with zero latency.",
              },
              {
                bg: "#e84c1e",
                label: "LOGIQ",
                tag: "Logistics · ML Forecasting",
                title: "LogiQ — Intelligent Supply Chain",
                desc: "Real-time supply chain visibility platform with ML-powered demand forecasting and IoT sensor integration for FMCG clients.",
              },
            ].map((port) => (
              <div key={port.label} className="portfolio-card">
                <div className="portfolio-thumb" style={{ background: port.bg }}>
                  <div className="portfolio-thumb-pattern"></div>
                  <div className="thumb-label">{port.label}</div>
                </div>
                <div className="portfolio-body">
                  <div className="portfolio-tag">{port.tag}</div>
                  <div className="portfolio-title">{port.title}</div>
                  <div className="portfolio-desc">{port.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers">
        <div className="container">
          <div className="section-tag">Join Our Team</div>
          <h2 className="section-title">CAREERS</h2>
          <p className="section-desc">
            We're always looking for passionate engineers, designers, and
            problem-solvers to join our growing team.
          </p>
          <div className="careers-layout">
            <div className="job-list">
              {[
                {
                  title: "Senior Full Stack Engineer",
                  meta: "React · Node.js · 5+ yrs · Full-time · Remote",
                },
                {
                  title: "Cloud Solutions Architect",
                  meta: "AWS · Kubernetes · 7+ yrs · Full-time · Hybrid",
                },
                {
                  title: "AI/ML Engineer",
                  meta: "Python · TensorFlow · 4+ yrs · Full-time · Remote",
                },
                {
                  title: "Lead UI/UX Designer",
                  meta: "Figma · Design Systems · 5+ yrs · Full-time",
                },
                {
                  title: "DevOps Engineer",
                  meta: "Docker · CI/CD · 3+ yrs · Full-time · Remote",
                },
                {
                  title: "Backend Engineer",
                  meta: "Python · Django · 4+ yrs · Full-time · Hybrid",
                },
              ].map((job) => (
                <div
                  key={job.title}
                  className="job-card"
                  onClick={() =>
                    alert(
                      `To apply for "${job.title}", please send your resume to:\nsupport@vjaysoftware.com`
                    )
                  }
                >
                  <div>
                    <div className="job-title">{job.title}</div>
                    <div className="job-meta">{job.meta}</div>
                  </div>
                  <div className="job-arrow">→</div>
                </div>
              ))}
            </div>
            <div className="careers-cta-box">
              <h3>WHY VJAY SOFTWARE?</h3>
              <p>
                We invest in our people just as much as our products. Here, you
                work alongside senior engineers on real-world scale problems.
              </p>
              <ul className="perks">
                <li>Competitive salary + performance bonuses</li>
                <li>Flexible remote & hybrid work options</li>
                <li>Annual learning & certification budget</li>
                <li>Health insurance for you & family</li>
                <li>Work on global-scale, high-impact products</li>
                <li>Mentorship from 10+ year experienced leads</li>
              </ul>
              <a href="mailto:support@vjaysoftware.com" className="btn-primary">
                Send Your Resume
              </a>
            </div>
          </div>

          {/* HIRING PROCESS */}
          <div className="hiring-process">
            <div className="hiring-process-header">
              <div>
                <div className="section-tag">How We Hire</div>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: "clamp(36px,4vw,52px)",
                    color: "var(--ink)",
                    lineHeight: "1",
                    letterSpacing: "1px",
                  }}
                >
                  OUR HIRING PROCESS
                </h3>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  maxWidth: "320px",
                  lineHeight: "1.7",
                  fontWeight: "300",
                }}
              >
                Transparent, respectful, and efficient. We value your time as
                much as we value talent. Click any step to learn more.
              </p>
            </div>

            <div className="hiring-timeline" id="hiringTimeline">
              {hiringSteps.map((step, index) => (
                <div
                  key={index}
                  className={`hiring-step ${
                    activeStep === index ? "active" : ""
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="hiring-step-icon">
                    {step.icon}
                    <span className="hiring-step-num">{index + 1}</span>
                  </div>
                  <div className="hiring-step-name">
                    {step.title.split(" ")[0] === "Culture"
                      ? "Culture & Leadership"
                      : step.title}
                  </div>
                  <div className="hiring-step-duration">
                    {step.duration.replace("⏱ ", "")}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`hiring-detail-panel ${
                panelVisible ? "visible" : ""
              }`}
              id="hiringPanel"
            >
              <div className="hiring-detail-icon-big">
                {currentStepData.icon}
              </div>
              <div>
                <div className="hiring-detail-step-label">
                  {currentStepData.label}
                </div>
                <div className="hiring-duration-badge">
                  {currentStepData.duration}
                </div>
                <div className="hiring-detail-title">
                  {currentStepData.title}
                </div>
                <div className="hiring-detail-desc">{currentStepData.desc}</div>
                <ul className="hiring-detail-checklist">
                  {currentStepData.checks.map((check, i) => (
                    <li key={i}>{check}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog">
        <div className="container">
          <div className="section-tag">Insights</div>
          <h2 className="section-title">
            FROM OUR<br />
            ENGINEERS
          </h2>
          <p className="section-desc">
            Technical articles, case studies, and engineering insights written by
            our senior team.
          </p>
          <div className="blog-grid">
            {[
              {
                date: "MAY 2025",
                cat: "Architecture",
                title: "Scaling Microservices to 10M Requests/Day on AWS",
                excerpt:
                  "A deep-dive into the architectural decisions we made to handle massive scale for a fintech client — from service mesh to observability.",
              },
              {
                date: "APR 2025",
                cat: "AI Engineering",
                title: "Integrating LLMs into Production Apps: Lessons Learned",
                excerpt:
                  "What we learned after deploying AI features across 8 client products — from prompt engineering to latency management and cost control.",
              },
              {
                date: "MAR 2025",
                cat: "DevOps",
                title:
                  "Zero-Downtime Deployments with Kubernetes Blue/Green Strategy",
                excerpt:
                  "Step-by-step guide to implementing blue/green deployments in Kubernetes with automated rollback on failure detection.",
              },
            ].map((post) => (
              <div
                key={post.title}
                className="blog-card"
                onClick={() =>
                  alert(
                    "Full blog posts coming soon! Subscribe to our newsletter for updates."
                  )
                }
              >
                <div className="blog-date">{post.date}</div>
                <span className="blog-cat">{post.cat}</span>
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
                <span className="blog-read">Read Article →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>
                LET'S BUILD <span>SOMETHING</span> GREAT
              </h2>
              <p>
                Have a project in mind, a problem to solve, or just want to
                explore how we can help? Reach out — our team responds within 24
                hours.
              </p>
              <div className="contact-detail">
                <div className="contact-detail-icon">✉</div>
                <div>
                  <div className="contact-detail-label">Email Us</div>
                  <div className="contact-detail-val">
                    support@vjaysoftware.com
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">📍</div>
                <div>
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-val">
                    India (Serving Globally)
                  </div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon">⏱</div>
                <div>
                  <div className="contact-detail-label">Response Time</div>
                  <div className="contact-detail-val">
                    Within 24 Business Hours
                  </div>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ramesh Kumar"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@company.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Service Interested In</label>
                <select
                  className="form-input"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service...
                  </option>
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>Cloud & DevOps</option>
                  <option>AI / ML Solutions</option>
                  <option>API & Integrations</option>
                  <option>Security & QA</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">
                  Tell Us About Your Project
                </label>
                <textarea
                  className="form-input"
                  placeholder="Describe your project, goals, timeline, and budget..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {aiEstimate && (
                <div style={{ background: 'var(--ink2)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginTop: '1rem' }}>
                  <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: 'var(--ink)', marginBottom: '10px' }}>AI Project Estimate</h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '15px' }}>{aiEstimate.ai_analysis}</p>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <span className="contact-detail-label">Complexity</span>
                      <div className="contact-detail-val">{aiEstimate.complexity_score} / 10</div>
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <span className="contact-detail-label">Timeline</span>
                      <div className="contact-detail-val">{aiEstimate.estimated_timeline}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <span className="contact-detail-label">Budget</span>
                      <div className="contact-detail-val">{aiEstimate.estimated_budget_range}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <span className="contact-detail-label">Tech Stack</span>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '5px', flexWrap: 'wrap' }}>
                      {aiEstimate.suggested_tech_stack.map((tech: string, i: number) => (
                        <span key={i} style={{ background: 'rgba(0,0,0,0.05)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: "'DM Mono', monospace" }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" className="form-submit" disabled={isAiLoading} style={{ opacity: isAiLoading ? 0.7 : 1 }}>
                {isAiLoading ? "Analyzing with AI..." : "Get AI Estimate →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">
                VJAY<span>.</span>SOFTWARE
              </div>
              <p className="footer-brand-desc">
                Engineering excellence for the world's most ambitious companies.<br />
                Based in India, serving global innovators since 2013.
              </p>
            </div>
            <div className="footer-nav-group">
              <div className="footer-nav-col">
                <h4>Platform</h4>
                <a href="#home">Home</a>
                <a href="#about">Who We Are</a>
                <a href="#services">Services</a>
                <a href="#portfolio">Case Studies</a>
              </div>
              <div className="footer-nav-col">
                <h4>Company</h4>
                <a href="#careers">Careers</a>
                <a href="#blog">Insights</a>
                <a href="#contact">Contact</a>
                <a href="/login">Portal</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 Vjay Software PVT Ltd. All rights reserved.
            </div>
            <div className="footer-social">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
