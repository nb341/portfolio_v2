import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortfolioFrame } from "../components/portfolio-frame";
import { AboutSection, ApproachSection, CapabilitiesSection, ContactSection, ExperienceSection, WorkSection } from "../components/portfolio-sections";

const sections = {
  about: { title: "About me", description: "Meet Narin: a Product Engineer who loves building, learning, figuring things out, and using AI to test ideas.", Component: AboutSection },
  work: { title: "Selected work", description: "Production case studies in full-stack engineering, cloud delivery, and observability.", Component: WorkSection },
  experience: { title: "Experience", description: "Full-stack, DevOps, data engineering, accessibility, volunteering, and independent repair experience.", Component: ExperienceSection },
  capabilities: { title: "Capabilities", description: "Technical capabilities across interfaces, APIs, data, cloud delivery, reliability, and accessibility.", Component: CapabilitiesSection },
  approach: { title: "How I work", description: "Requirements, AI-assisted engineering, verification, mentoring, and remote collaboration.", Component: ApproachSection },
  contact: { title: "Contact", description: "Get in touch with Narin Balkissoon about senior product and full-stack engineering opportunities.", Component: ContactSection },
};
type Section = keyof typeof sections;
type Props = { params: Promise<{ section: string }> };
export const dynamicParams = false;

function isSection(section: string): section is Section { return Object.hasOwn(sections, section); }
export function generateStaticParams() { return Object.keys(sections).map(section => ({ section })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  return { title: `${sections[section].title} | Narin Balkissoon`, description: sections[section].description, openGraph: { title: `${sections[section].title} | Narin Balkissoon`, description: sections[section].description } };
}

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  const { Component } = sections[section];
  return <PortfolioFrame><div className="route-content"><div className="route-breadcrumb shell"><Link href="/">← Portfolio</Link><span>/ {sections[section].title}</span></div><Component standalone /></div></PortfolioFrame>;
}
