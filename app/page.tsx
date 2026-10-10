import Link from "next/link";
import { PortfolioFrame } from "./components/portfolio-frame";
import { AboutSection, ApproachSection, CapabilitiesSection, ContactSection, ExperienceSection, WorkSection } from "./components/portfolio-sections";
import { ScrollButton } from "./components/scroll-button";
import { SystemLab } from "./components/system-lab";
import { metrics, profile } from "./content";

export default function Home() {
  return <PortfolioFrame>
    <section className="hero shell" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Seeking senior product & full-stack engineering opportunities</p>
        <p className="hero-name">Hi, I’m {profile.name}. <span>/ Product Engineer</span></p>
        <h1 id="hero-title">I build things.<br /><span className="gradient-text">I ask questions.</span><br />I keep learning.</h1>
        <p className="hero-description">Building is how I learn. As a Product Engineer, I think through what a feature should do, how someone will use it, and the interface and system behind it. I bring full-stack, cloud, and security experience, and use AI to explore ideas and test theories along the way.</p>
        <p className="hero-proof">Over four years in production engineering · M.Sc. Computer Science (AI)</p>
        <div className="actions">
          <Link className="button primary" href="/work">Explore my work <span aria-hidden="true">↗</span></Link>
          <Link className="button secondary" href="/about">About me <span aria-hidden="true">↗</span></Link>
          <Link className="button secondary" href="/resume">View résumé <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-footnote"><span>React & TypeScript</span><span>.NET & APIs</span><span>Cloud & platform</span></div>
      </div>
      <SystemLab />
      <div className="hero-bottom"><span>{profile.location} / Open to remote roles</span><ScrollButton target="about" className="text-button">A little about me <span aria-hidden="true">↓</span></ScrollButton></div>
    </section>
    <section className="impact shell" id="impact" aria-label="Production impact">
      {metrics.map(metric => <div className="metric" key={metric.value}><p className="metric-value">{metric.value}<span>{metric.unit}</span></p><h2>{metric.label}</h2><p>{metric.context}</p></div>)}
    </section>
    <AboutSection />
    <WorkSection />
    <ExperienceSection />
    <CapabilitiesSection />
    <ApproachSection />
    <ContactSection />
  </PortfolioFrame>;
}
