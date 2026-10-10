import Link from "next/link";
import { capabilities, developmentWorkflow, education, engineeringStories, experience, independentWork, personalInterests, profile, projects } from "../content";
import { ContactForm } from "./contact-form";

function SectionHeading({ number, label, title, description, standalone }: { number: string; label: string; title: string; description?: string; standalone: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return <div className="section-heading">
    <p className="eyebrow"><span>{number}</span> / {label}</p>
    <Heading>{title}</Heading>
    {description && <p className="section-description">{description}</p>}
  </div>;
}

export function AboutSection({ standalone = false }: { standalone?: boolean }) {
  const AsideHeading = standalone ? "h2" : "h3";
  const InterestHeading = standalone ? "h3" : "h4";
  return <section className="section shell about-section" id="about">
    <SectionHeading number="00" label="About me" title="A builder who keeps asking why." description="If we were sitting down for a conversation, this is where I’d start." standalone={standalone} />
    <div className="about-layout">
      <div className="about-story">
        <p className="about-lead">I got into programming because I loved solving problems. What kept me interested was being able to try a solution and see it working in real time.</p>
        <p>My bachelor’s degree in Computer Engineering specialized in Network and Telecommunications Engineering. That foundation helps me think about the connections behind an application. I also bring extensive application and cloud security experience: identity and access controls, TLS automation, secrets management, and protecting sensitive data. I enjoy figuring out how to make a system useful and how to protect the people relying on it.</p>
        <p>That curiosity has taken me through a few different parts of tech. At Associated Brands, I worked with databases, reports, and ETL. At CIBC, I got back into full-stack development with React and .NET. I liked how LINQ and XDocument let me work through data, and spent time with the Microsoft Learn docs. Building my first CI/CD pipeline pulled me further into deployments, Docker, and NGINX.</p>
        <p>At TurboVets, I joined as a full-stack developer and moved into DevOps because of logistics during hiring. I ended up enjoying it: AWS, smaller container images, observability, and understanding what a service is doing in production. Working in a regulated environment also made me think more carefully about where sensitive data travels and who can access it.</p>
        <p>I love learning something new and figuring out how the pieces fit together. That’s also what drew me to AI and a master’s degree focused on it. I’m especially interested in computer vision and animal detection. I like using AI to test a theory, explore an approach, or challenge my reasoning. Then I check the results, read the code, and keep asking questions until I can explain what’s happening.</p>
        <p>I enjoy the hands-on side, too: building and repairing PCs and phones, helping teammates learn React and TypeScript, and now volunteering with database and IT support at St. Agnes here in Vermillion. I like work where I can make something useful and understand it a little better along the way.</p>
        <p>In the age of AI tools, I think of myself as a Product Engineer. I care about the product and the feature, how someone will actually use it, and how to design both the system and the interface. That means thinking through user flows, clear feedback, accessibility, and the technical tradeoffs together. AI helps me explore possibilities and test theories; I stay responsible for the decisions and the result.</p>
        <p>For my next role, I’m looking for a senior product or full-stack engineering position where I can own features, collaborate on product decisions, and help a team turn a good idea into something people can use.</p>
        <Link className="about-link" href="/contact">Tell me what your team is building <span aria-hidden="true">↗</span></Link>
      </div>
      <aside className="about-notes" aria-label="What I enjoy about engineering">
        <p className="eyebrow">What keeps me interested</p>
        <div><AsideHeading>Building</AsideHeading><p>Taking an idea from “could this work?” to something I can actually use.</p></div>
        <div><AsideHeading>Learning</AsideHeading><p>Picking up a new tool, reading the docs, and figuring out why it works that way.</p></div>
        <div><AsideHeading>Trying things</AsideHeading><p>Using AI and small experiments to test a theory, then checking what the results really mean.</p></div>
      </aside>
    </div>
    <div className="personal-interests">
      <div className="interests-heading"><p className="eyebrow">What I keep coming back to</p><AsideHeading>Curiosity doesn’t stay in one lane.</AsideHeading></div>
      {personalInterests.map(interest => <article className="interest-card" key={interest.number}><span className="interest-number" aria-hidden="true">{interest.number}</span><p className="eyebrow">{interest.label}</p><InterestHeading>{interest.title}</InterestHeading><p>{interest.description}</p></article>)}
    </div>
  </section>;
}

export function WorkSection({ standalone = false }: { standalone?: boolean }) {
  const ItemHeading = standalone ? "h2" : "h3";
  const DetailHeading = standalone ? "h3" : "h4";
  const visibleProjects = standalone ? projects : projects.slice(0, 4);
  return <section className="section shell" id="work">
    <SectionHeading number="01" label="Selected work" title="Built for the real world." description="AI solutions and production engineering: user problems, deliberate tradeoffs, and measured outcomes from collaborative projects." standalone={standalone} />
    <div className="project-grid">
      {visibleProjects.map((project, index) => <article className={`project-card project-${project.id}`} key={project.id}>
        <div className="project-top"><span className="eyebrow">{project.company}</span><span className="project-number">0{index + 1}</span></div>
        <div className="project-visual" aria-hidden="true">
          <div className="diagram-node">{project.diagram[0]}</div><span className="diagram-line" />
          <div className="diagram-node diagram-center">{project.diagram[1]}</div><span className="diagram-line" />
          <div className="diagram-node">{project.diagram[2]}</div>
        </div>
        <p className="project-category">{project.category}</p>
        <ItemHeading>{project.title}</ItemHeading>
        <p className="project-summary">{project.summary}</p>
        <div className="project-result"><span aria-hidden="true">↗</span> {project.result}</div>
        <ul className="tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        <Link className="case-study-link" href={`/work/${project.id}`}>Read the case study <span aria-hidden="true">↗</span></Link>
        <details className="case-study">
          <summary>Inside the implementation <span aria-hidden="true">+</span></summary>
          <div className="case-study-body">
            {project.details.map(detail => <div key={detail.label}><DetailHeading>{detail.label}</DetailHeading><p>{detail.text}</p></div>)}
            <p className="work-note">{project.attribution ?? "Employer work. Source code and internal systems are private."}</p>
          </div>
        </details>
      </article>)}
    </div>
    {!standalone && <div className="section-action"><Link className="button secondary" href="/work">Explore all {projects.length} case studies <span aria-hidden="true">↗</span></Link><p>Including reporting & ETL, accessibility evaluations, and database delivery decisions.</p></div>}
  </section>;
}

export function ExperienceSection({ standalone = false }: { standalone?: boolean }) {
  const ItemHeading = standalone ? "h2" : "h3";
  return <section className="section shell" id="experience">
    <SectionHeading number="02" label="Experience" title="A wider view of the stack." description="From data engineering to full-stack delivery to operating production systems. Each role added a different lens, alongside volunteering and hands-on repair work." standalone={standalone} />
    <div className="timeline">
      {experience.map((role, index) => <article className="experience-row" key={role.company}>
        <div className="experience-date"><span className="timeline-index">0{index + 1}</span><p>{role.dates}</p>{role.location && <span>{role.location}</span>}</div>
        <div>
          <p className="eyebrow">{role.company}</p><ItemHeading>{role.title}</ItemHeading><p>{role.summary}</p>
          <ul>{role.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
        </div>
      </article>)}
    </div>
    <article className="independent-work">
      <div><p className="eyebrow">{independentWork.company}</p><ItemHeading>{independentWork.title}</ItemHeading></div>
      <div><p>{independentWork.summary}</p><ul>{independentWork.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div>
    </article>
  </section>;
}

export function CapabilitiesSection({ standalone = false }: { standalone?: boolean }) {
  const ItemHeading = standalone ? "h2" : "h3";
  const DegreeHeading = standalone ? "h3" : "h4";
  return <section className="section shell" id="capabilities">
    <SectionHeading number="03" label="Capabilities" title="Depth where it matters. Breadth where it helps." description="Product thinking connects my full-stack work with user experience and system design. Security, accessibility, cloud delivery, and observability inform those decisions." standalone={standalone} />
    <div className="capability-grid">
      {capabilities.map((group, index) => <article className="capability" key={group.title}>
        <span className="capability-icon" aria-hidden="true">{["</>", "{ }", "~>", "◎"][index]}</span>
        <ItemHeading>{group.title}</ItemHeading><p>{group.description}</p>
        <ul className="tags">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      </article>)}
    </div>
    <div className="education">
      <div><ItemHeading className="eyebrow">Education</ItemHeading>{education.map(degree => <div className="degree" key={degree.title}><DegreeHeading>{degree.title}</DegreeHeading><p>{degree.school} · {degree.dates}</p><span>{degree.detail}</span></div>)}</div>
      <div>
        <p className="eyebrow">Continued learning</p><ItemHeading>A foundation in AI.<br />A habit of asking why.</ItemHeading>
        <p>M.Sc. in Computer Science with an AI focus. My interests include computer vision and animal detection.</p>
        <p className="credential-note">Additional training: Microsoft SQL Server querying (70-461, 761), ASP.NET Core MVC, and Azure Data Factory data ingestion.</p>
      </div>
    </div>
  </section>;
}

export function ApproachSection({ standalone = false }: { standalone?: boolean }) {
  const ItemHeading = standalone ? "h2" : "h3";
  const DetailHeading = standalone ? "h3" : "h4";
  return <section className="section shell" id="approach">
    <SectionHeading number="04" label="How I work" title="Good engineering starts before the code." standalone={standalone} />
    <div className="approach-grid">
      <article><span className="eyebrow">01 / Understand</span><ItemHeading>Ask a few more questions.</ItemHeading><p>I like understanding how someone uses a tool before deciding what to build. At ABIL, a report needed more stakeholder input than the timeline allowed. I suggested a filtered dashboard people could use in the meantime, then rescoped the reporting work around their needs.</p></article>
      <article><span className="eyebrow">02 / Build & verify</span><ItemHeading>Try it. Then check it.</ItemHeading><p>I use Claude Code and Codex to explore ideas, test theories, and challenge assumptions. I review the acceptance criteria, tests, and code, and keep changes small enough to explain. When I’m unsure, I go back to the docs or ask an agent to question my reasoning.</p></article>
      <article><span className="eyebrow">03 / Collaborate</span><ItemHeading>Learn together.</ItemHeading><p>I enjoy helping someone get comfortable with a tool or a pattern. At CIBC, I mentored teammates on React, JavaScript, TypeScript, Azure, and Docker. I’ve also learned to share progress sooner, ask for reviews, and talk a problem through instead of overthinking it on my own.</p></article>
    </div>
    <div className="workflow-panel">
      <div className="workflow-intro"><p className="eyebrow">AI-assisted development</p><ItemHeading>How an idea becomes a reviewed change.</ItemHeading><p>This is the process I’ve built around Claude Code and Codex. The interesting part is deciding what should happen, then checking whether the implementation actually does it.</p></div>
      <ol className="workflow-steps">{developmentWorkflow.map(step => <li key={step.title}><strong>{step.title}</strong><p>{step.description}</p></li>)}</ol>
    </div>
    <div className="engineering-stories">
      <div className="stories-intro"><p className="eyebrow">Things experience taught me</p><ItemHeading>The decisions behind the bullet points.</ItemHeading></div>
      {engineeringStories.map(story => <article className="engineering-story" key={story.id}><p className="eyebrow">{story.label} / {story.context}</p><DetailHeading>{story.title}</DetailHeading><p>{story.story}</p><div className="story-takeaway"><span>What I took from it</span><p>{story.takeaway}</p></div></article>)}
    </div>
  </section>;
}

export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return <section className="contact shell" id="contact">
    <div className="contact-copy">
      <p className="eyebrow"><span className="status-dot" /> Let’s build something useful</p>
      <Heading>What are you building?<br /><span className="gradient-text">I’d love to hear about it.</span></Heading>
      <p>If you think I’d be a good fit for your team, or you’d like to talk through an idea, send me a note. I’m looking for a senior product or full-stack engineering role with room to shape features, build, and learn.</p>
      <div className="contact-links"><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link href="/resume">Résumé ↗</Link><span>{profile.location}</span></div>
    </div>
    <ContactForm standalone={standalone} />
  </section>;
}
