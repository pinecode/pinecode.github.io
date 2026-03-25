/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Mail, MapPin, Terminal, Database, Cpu, Globe, ArrowRight } from 'lucide-react';

const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;
const PINE_DECO_URL = `${import.meta.env.BASE_URL}pine-deco.png`;

export default function App() {
  const { scrollY, scrollYProgress } = useScroll();
  const heroPineY = useTransform(scrollY, [0, 1000], [0, 100]);
  const smoothHeroPineY = useSpring(heroPineY, { damping: 20, stiffness: 100 });

  const [formData, setFormData] = useState({ name: '', company: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name} (${formData.company})`);
    const body = encodeURIComponent(`Name: ${formData.name}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:dev@pine-code.com?subject=${subject}&body=${body}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; title: string; content: string }>({ isOpen: false, title: '', content: '' });

  const privacyPolicy = `
    Privacy Policy for PINeCODe (PineCode Kft.)
    
    1. Data Collection: We collect information provided via our contact form (name, email, company, message).
    2. Purpose: This data is used solely to respond to your inquiries and establish business contact.
    3. Protection: We implement industry-standard security measures to protect your data.
    4. GDPR: As a Hungarian entity, we comply with GDPR. You have the right to access, rectify, or delete your data.
    5. Contact: For data inquiries, contact dev@pine-code.com.
  `;

  const termsOfService = `
    Terms of Service for PINeCODe
    
    1. Services: PINeCODe provides engineering and software development consulting services.
    2. Intellectual Property: All content on this site is the property of PineCode Kft.
    3. Liability: We strive for precision but are not liable for damages arising from the use of this website.
    4. Jurisdiction: These terms are governed by the laws of Hungary.
  `;

  const openLegal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setLegalModal({ isOpen: true, title: 'Privacy Policy', content: privacyPolicy });
    } else {
      setLegalModal({ isOpen: true, title: 'Terms of Service', content: termsOfService });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
      {/* Legal Modal */}
      {legalModal.isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-high border border-outline-variant/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
          >
            <button 
              onClick={() => setLegalModal({ ...legalModal, isOpen: false })}
              className="absolute top-4 right-4 text-outline-variant hover:text-primary transition-colors"
            >
              <Terminal size={20} />
            </button>
            <h2 className="font-headline text-2xl mb-6 text-primary uppercase tracking-widest">{legalModal.title}</h2>
            <div className="text-on-surface-variant whitespace-pre-line font-body leading-relaxed">
              {legalModal.content}
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/10">
              <button 
                onClick={() => setLegalModal({ ...legalModal, isOpen: false })}
                className="bg-primary text-on-primary px-6 py-2 font-label text-[10px] uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Close_Terminal
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Global Visual Effects */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-noise animate-noise"></div>
      <div className="fixed inset-0 pointer-events-none z-[101] opacity-[0.05] bg-scanline"></div>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[200] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 h-16 bg-neutral-900/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_0_20px_rgba(160,224,78,0.05)] flex justify-between items-center px-6 max-w-full">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <img alt="PINeCODe Hexagonal Logo" className="w-full h-full object-contain" src={LOGO_URL} referrerPolicy="no-referrer" />
          </div>
          <div className="text-xl font-bold tracking-tighter text-primary font-headline group-hover:tracking-normal transition-all duration-300">PINeCODe</div>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          {['about', 'services', 'tech', 'approach', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="font-label text-[12px] uppercase tracking-widest text-neutral-400 hover:text-primary transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-primary text-on-primary px-6 py-2 font-label text-[12px] uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all active:scale-95 duration-75"
        >
          Start Project
        </button>
      </nav>

      {/* Hero Section */}
      <header className="sticky top-0 min-h-screen flex items-center pt-16 overflow-hidden bg-background z-0">
        <div className="absolute inset-0 grid-overlay"></div>
        <div className="absolute inset-0 scanline opacity-30"></div>
        
        <motion.div 
          style={{ y: smoothHeroPineY, translateY: '-50%' }}
          className="absolute right-[-10%] top-1/2 w-[60%] max-w-[1200px] pointer-events-none opacity-10 blur-[4px]"
        >
          <img alt="Pine Decoration" className="w-full h-full object-contain" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="w-4 h-4 hex-accent bg-primary/40"></div>
              <span className="font-label text-primary text-xs tracking-widest flex items-center gap-1">
                001 // SYSTEM_INIT
                <span className="w-[6px] h-[12px] bg-primary animate-blink"></span>
              </span>
              <div className="h-[1px] w-24 bg-outline-variant/30"></div>
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Pragmatic software,<br />built with <span className="text-primary italic">taste.</span>
              </motion.span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
              We design and build custom software, internal tools, and high-performance backend architectures with a focus on clarity, speed, and long-term maintainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-on-primary px-10 py-4 font-label font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-all active:translate-y-0 text-center hover:shadow-[0_0_20px_rgba(160,224,78,0.3)]"
              >
                START PROJECT
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="border border-outline-variant text-primary px-10 py-4 font-label font-bold uppercase tracking-widest hover:bg-primary/5 transition-all text-center hover:border-primary"
              >
                VIEW OUR APPROACH
              </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-6 font-label text-[10px] text-outline-variant uppercase flex items-center gap-3">
          <div className="w-2 h-2 hex-accent bg-primary/20"></div>
          X: 104.2 / Y: 88.0 / SIBERIA_UNIT_04
        </div>
      </header>

      {/* About Section */}
      <section className="relative bg-surface py-24 md:py-32 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]" id="about">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Left Column: Sticky Title + Intro Block */}
            <div className="w-full md:w-1/2 md:sticky md:top-32 z-0 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 hex-accent bg-primary"></div>
                  <span className="font-label text-primary text-xs block">IDENT_SEC_01 // CORE_ROOTS</span>
                </div>
                <h2 className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-surface mb-8">
                  Engineering <br />
                  <span className="text-primary italic">Resilience.</span>
                </h2>
                
                <div className="space-y-8 text-on-surface-variant text-lg leading-relaxed max-w-md">
                  <p>Rooted in the technical resilience of a digital Siberia, PINeCODe was founded on the principle that backend systems should be as robust as a vault and as precise as an architectural blueprint.</p>
                  <p>We operate from Budapest, bridging hyper-refined design aesthetics with high-end backend logic. Our studio focuses on secure, high-integrity builds for clients who prioritize long-term technical debt reduction over short-term hacks.</p>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column: Card Overlays on scroll (Mobile) */}
            <div className="w-full md:w-1/2 relative z-10 bg-surface pt-12 md:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-surface-container-low border-l-4 border-primary p-8 md:p-12 relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute -right-12 -top-12 w-48 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <img alt="Decoration" className="w-full" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-12">
                  {[
                    { title: "Siberian Ethics", desc: "Cold logic, warm delivery. We build systems that survive the harshest scaling requirements." },
                    { title: "Secure Vault Architecture", desc: "Privacy and security aren't features; they are the foundation. Every line of code is audited for integrity." },
                    { title: "Backend Mastery", desc: "Specializing in heavy-lift processing where milliseconds determine success." },
                    { title: "Architectural Precision", desc: "Every system is mapped and documented with the precision of a blueprint before a single line of code is written." }
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <h3 className="font-headline text-2xl mb-2 text-on-surface group-hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 hex-accent bg-primary/40 group-hover:bg-primary transition-colors"></span>
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant text-base">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface py-12 border-t border-outline-variant/10 relative z-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Uptime_Target", val: "99.99%" },
              { label: "Security_Audits", val: "Weekly" },
              { label: "Code_Coverage", val: ">92%" },
              { label: "Response_Time", val: "<120ms" }
            ].map((stat, i) => (
              <div key={i} className="border-l border-primary/30 pl-6">
                <div className="font-label text-[10px] text-primary uppercase mb-2 tracking-widest">{stat.label}</div>
                <div className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">{stat.val}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-32 bg-background relative overflow-hidden sticky top-0 md:relative z-0" id="services">
        <div className="absolute -left-32 bottom-0 w-[500px] opacity-[0.05] pointer-events-none">
          <img alt="Decoration" className="w-full" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 hex-accent bg-primary/60"></div>
              <span className="font-label text-primary text-xs block">NODE_SRV // CAPABILITIES</span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-bold">Systems We Architect.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <ServiceCard 
              className="md:col-span-8"
              icon={<Globe className="text-primary mb-6 w-10 h-10" />}
              title="Custom Web Applications"
              desc="Full-stack solutions built from the ground up. We leverage Rails and modern frontend toolkits to deliver seamless, secure user experiences."
              label="01 / WEB_STACK"
            />
            <ServiceCard 
              className="md:col-span-4"
              icon={<Cpu className="text-primary mb-6 w-10 h-10" />}
              title="Internal Tools"
              desc="Proprietary systems designed to optimize internal workflows and manage complex data sets."
              hasDeco
            />
            <ServiceCard 
              className="md:col-span-4"
              icon={<Database className="text-primary mb-6 w-10 h-10" />}
              title="High-Performance Backend"
              desc="Architecting data pipelines and API architectures that scale without friction."
            />
            <ServiceCard 
              className="md:col-span-8"
              icon={<Terminal className="text-primary mb-6 w-10 h-10" />}
              title="Rails-based Platforms"
              desc="Our weapon of choice for speed and reliability. Robust platforms that evolve with your business."
              hasDeco
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 border-y border-outline-variant/10 bg-surface-container-lowest" id="tech">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between mb-12 gap-6 items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 hex-accent bg-primary"></div>
                <span className="font-label text-primary text-xs block">TECH_STACK // LOADED</span>
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold uppercase tracking-tight">The Engine Room.</h2>
            </div>
            <div className="font-label text-[10px] text-outline opacity-60 uppercase">Optimized for Performance and Security</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-px bg-outline-variant/20">
            {['Ruby on Rails', 'Hotwire', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'ClickHouse'].map((tech, idx) => (
              <div key={idx} className="bg-surface-container-lowest p-8 flex flex-col items-center justify-center group hover:bg-surface-container-low transition-colors">
                <span className={`font-label text-sm mb-2 whitespace-nowrap ${tech === 'ClickHouse' ? 'text-primary' : 'text-on-surface'}`}>{tech}</span>
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-32 relative overflow-hidden bg-surface z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]" id="approach">
        <div className="absolute right-[-15%] bottom-[-10%] w-[50%] opacity-[0.05] pointer-events-none">
          <img alt="Decoration" className="w-full" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 hex-accent bg-primary/30"></div>
              <span className="font-label text-primary text-xs block">PROC_LOG // METHODOLOGY</span>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-bold">Pragmatic by default.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01.", title: "Pragmatic by default", desc: "We choose the most reliable tools for the job, avoiding hype in favor of stable, proven engineering." },
              { num: "02.", title: "Built to evolve", desc: "Systems that accommodate growth. We write modular code that welcomes new features without breaking old ones." },
              { num: "03.", title: "Speed without chaos", desc: "Rapid development cycles maintained by rigorous automated testing and CI/CD pipelines." },
              { num: "04.", title: "Security through structure", desc: "Information security is baked into the architecture, not slapped on as a firewall rule." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border-l border-primary/20 hover:border-primary transition-colors bg-surface-container-lowest/50 backdrop-blur-sm flex flex-col h-full"
              >
                <div className="font-label text-primary mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 hex-accent bg-primary"></span>
                  {item.num}
                </div>
                <h4 className="font-headline text-xl font-bold mb-4 text-on-surface tracking-tight leading-tight">{item.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-surface-container-lowest relative overflow-hidden" id="contact">
        <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none"></div>
        <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[30%] opacity-10 pointer-events-none">
          <img alt="Decoration" className="w-full" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-background p-1 border border-outline-variant/20"
          >
            <div className="bg-surface-container-low p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 hex-accent bg-primary/50"></div>
                    <span className="font-label text-primary text-xs block">COMMS_LINK // UPLINK</span>
                  </div>
                  <h2 className="font-headline text-5xl md:text-6xl font-bold mb-8">Start the Build.</h2>
                  <p className="text-on-surface-variant mb-12">Submit your project parameters. Our architects will review the requirements and establish a communication bridge within 24 hours.</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="text-primary w-4 h-4" />
                      <span className="font-label text-sm">dev@pine-code.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="text-primary w-4 h-4" />
                      <span className="font-label text-sm uppercase">Budapest, Hungary</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="font-label text-[10px] text-primary uppercase block mb-2">Subject_Identity</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none focus:ring-0 text-on-surface font-body p-4 border-l-2 border-primary/20 focus:border-primary transition-all placeholder:text-outline-variant" 
                      placeholder="Your Name" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="font-label text-[10px] text-primary uppercase block mb-2">Entity_Affiliation</label>
                    <input 
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none focus:ring-0 text-on-surface font-body p-4 border-l-2 border-primary/20 focus:border-primary transition-all placeholder:text-outline-variant" 
                      placeholder="Company Name" 
                      type="text" 
                    />
                  </div>
                  <div>
                    <label className="font-label text-[10px] text-primary uppercase block mb-2">Mission_Parameters</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-surface-container-lowest border-none focus:ring-0 text-on-surface font-body p-4 border-l-2 border-primary/20 focus:border-primary transition-all placeholder:text-outline-variant" 
                      placeholder="Brief project overview..." 
                      rows={4}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-on-primary py-4 font-label font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3">
                    <div className="w-3 h-3 hex-accent bg-on-primary"></div>
                    ESTABLISH CONTACT
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-16 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-outline-variant font-label text-[11px] uppercase tracking-wider">
            <div>
              <h5 className="text-on-surface-variant mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 hex-accent bg-primary/60"></div>
                Direct Uplink
              </h5>
              <p className="mb-2"><span className="text-primary">Email:</span> <a className="hover:text-primary transition-colors" href="mailto:dev@pine-code.com">dev@pine-code.com</a></p>
              <p><span className="text-primary">Comms:</span> +36 30 359 5924</p>
            </div>
            <div>
              <h5 className="text-on-surface-variant mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 hex-accent bg-primary/60"></div>
                Base of Operations
              </h5>
              <p>PineCode Kft.</p>
              <p>Belgrád rakpart 13-15. 2. em. 22. ajtó</p>
              <p>1056 Budapest, Hungary</p>
            </div>
            <div>
              <h5 className="text-on-surface-variant mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 hex-accent bg-primary/60"></div>
                Registry_Data
              </h5>
              <p>Tax ID: 32921214-2-41</p>
              <p>Reg ID: 01-09-449575</p>
              <p>System Status: <span className="text-primary">Active</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 bg-[#0E0E0E] bg-[linear-gradient(to_right,#1c1b1b_1px,transparent_1px),linear-gradient(to_bottom,#1c1b1b_1px,transparent_1px)] bg-[size:40px_40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img alt="PINeCODe Logo" className="w-6 h-6 object-contain" src={LOGO_URL} referrerPolicy="no-referrer" />
              <div className="text-lg font-bold text-neutral-200 font-headline">PINeCODe</div>
            </div>
            <p className="font-label text-[10px] opacity-60 text-primary max-w-sm">© 2024 PineCode Kft. Belgrád rakpart 13-15, Budapest. Engineering with Structural Precision.</p>
          </div>
          <div className="flex flex-wrap gap-8 justify-start md:justify-end">
            <button onClick={() => openLegal('privacy')} className="font-label text-[10px] opacity-60 text-neutral-500 hover:text-neutral-200 transition-transform duration-200 hover:translate-x-1">Privacy Policy</button>
            <button onClick={() => openLegal('terms')} className="font-label text-[10px] opacity-60 text-neutral-500 hover:text-neutral-200 transition-transform duration-200 hover:translate-x-1">Terms of Service</button>
            <a className="font-label text-[10px] opacity-60 text-neutral-500 hover:text-neutral-200 transition-transform duration-200 hover:translate-x-1" href="https://www.linkedin.com/in/grishkov" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="font-label text-[10px] opacity-60 text-neutral-500 hover:text-neutral-200 transition-transform duration-200 hover:translate-x-1" href="https://github.com/pinecode" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ className, icon, title, desc, label, hasDeco }: { className?: string, icon: React.ReactNode, title: string, desc: string, label?: string, hasDeco?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`${className} bg-surface-container-low p-10 hover:bg-surface-container transition-colors relative group overflow-hidden`}
    >
      {hasDeco && (
        <div className="absolute -right-4 -top-4 w-24 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
          <img alt="Deco" className="w-full" src={PINE_DECO_URL} referrerPolicy="no-referrer" />
        </div>
      )}
      {icon}
      <h3 className="font-headline text-3xl font-bold mb-4">{title}</h3>
      <p className="text-on-surface-variant max-w-lg">{desc}</p>
      {label && (
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-label text-[10px] text-primary">{label}</span>
        </div>
      )}
    </motion.div>
  );
}
