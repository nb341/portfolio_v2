import type { Metadata } from "next";
import Link from "next/link";
import { capabilities, education, experience, independentWork, profile } from "../content";
import { PrintButton } from "../components/print-button";

export const metadata: Metadata = {
  title: "Résumé | Narindra Balkissoon",
  description: "Full-stack, cloud, platform, accessibility, volunteering, and technical support experience.",
  openGraph: { title: "Résumé | Narindra Balkissoon", description: "Full-stack, cloud, platform, accessibility, volunteering, and technical support experience." },
};

export default function ResumePage() {
  return <main className="resume-page">
    <div className="resume-toolbar"><Link href="/">← Back to portfolio</Link><PrintButton /></div>
    <article className="resume-document">
      <header>
        <p className="eyebrow">Résumé</p><h1>{profile.resumeName}</h1>
        <p className="resume-role">Software Engineer · Full Stack, Cloud & Platform</p>
        <div className="resume-contact">
          <span>{profile.location}</span>
          <Link href="/contact">Contact through portfolio</Link>
          <a href={profile.linkedin}>linkedin.com/in/narindra-balkissoon</a>
          <a href={profile.github}>github.com/nb341</a>
        </div>
      </header>
      <section><h2>Summary</h2><p>{profile.summary}</p></section>
      <section><h2>Technical skills</h2>{capabilities.map(group => <p key={group.title}><strong>{group.title}:</strong> {group.skills.join(", ")}</p>)}</section>
      <section>
        <h2>Experience & volunteering</h2>
        {experience.map(role => <div className="resume-job" key={role.company}>
          <div className="resume-job-heading"><h3>{role.title}</h3><span>{role.dates}</span></div>
          <p className="resume-company">{role.company}{role.location ? ` · ${role.location}` : ""}</p>
          <p>{role.summary}</p><ul>{role.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
        </div>)}
      </section>
      <section><h2>Independent technical experience</h2><h3>{independentWork.title}</h3><p>{independentWork.summary} Apple experience is software support only.</p></section>
      <section>
        <h2>Education</h2>
        {education.map(degree => <div className="resume-degree" key={degree.title}><h3>{degree.title}</h3><p>{degree.school} · {degree.dates}</p><p>{degree.detail}</p></div>)}
      </section>
      <section><h2>Certifications & additional training</h2><p>Microsoft SQL Server querying with T-SQL (70-461, 761); ASP.NET Core MVC; Azure Data Factory data ingestion.</p></section>
    </article>
  </main>;
}
