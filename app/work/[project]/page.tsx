import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioFrame } from "../../components/portfolio-frame";
import { profile, projects } from "../../content";

type Props = { params: Promise<{ project: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ project: project.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: id } = await params;
  const project = projects.find(project => project.id === id);
  if (!project) return {};
  return { title: `${project.title} | ${profile.name}`, description: project.summary, openGraph: { title: `${project.title} | ${profile.name}`, description: project.summary } };
}

export default async function CaseStudyPage({ params }: Props) {
  const { project: id } = await params;
  const project = projects.find(project => project.id === id);
  if (!project) notFound();
  return <PortfolioFrame>
    <article className="case-page shell">
      <nav className="route-breadcrumb" aria-label="Breadcrumb"><Link href="/">Portfolio</Link><span aria-hidden="true">/</span><Link href="/work">Selected work</Link><span aria-hidden="true">/</span><span>Case study</span></nav>
      <header className="case-hero">
        <p className="eyebrow">{project.company} / {project.category}</p><h1>{project.title}</h1>
        <p className="case-introduction">{project.summary}</p><p className="case-outcome">{project.result}</p>
        <ul className="tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </header>
      {project.details.map(detail => <section className="case-details" key={detail.label}><h2>{detail.label}</h2><p>{detail.text}</p></section>)}
      <footer className="case-end"><p>Employer work. Internal source code and systems are private. Descriptions reflect my contributions and the results delivered with my teams.</p><div className="actions"><Link className="button secondary" href="/work">All case studies ↗</Link><Link className="button primary" href="/contact">Talk about your project ↗</Link></div></footer>
    </article>
  </PortfolioFrame>;
}
