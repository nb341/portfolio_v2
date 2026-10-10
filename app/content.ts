export const profile = {
  name: "Narin Balkissoon", resumeName: "Narindra Balkissoon", location: "Vermillion, SD",
  github: "https://github.com/nb341", linkedin: "https://linkedin.com/in/narindra-balkissoon",
  summary: "Software engineer with over 4 years building and running production systems in banking, a HIPAA-regulated startup, and manufacturing. Experience across C#, .NET, TypeScript, React, Angular, SQL Server, and PostgreSQL. Cut deployment time 97%, reduced production container images 34%, and presented architecture evaluations to a CTO. M.Sc. in Computer Science with an AI focus.",
};
export const metrics = [
  { value: "97", unit: "%", label: "Faster build & deployment", context: "15 minutes to under 30 seconds · CIBC" },
  { value: "34", unit: "%", label: "Smaller production images", context: "Dependency pruning & Docker optimization · TurboVets" },
  { value: "29", unit: "", label: "Alert rules across 6 AWS services", context: "Observability informed by SRE practices · TurboVets" },
];
export interface CaseStudy {
  id: string; company: string; category: string; title: string; summary: string;
  result: string; tags: string[]; diagram: [string, string, string]; details: { label: string; text: string }[];
}
export const projects: CaseStudy[] = [
  { id: "master-data", company: "CIBC Caribbean", category: "Full-stack / Data integrity", title: "Modern interfaces. Legacy systems. One reliable workflow.", summary: "React interfaces and .NET REST APIs connecting banking workflows to legacy IBM MDM SOAP services.", result: "Delivered the bank’s first synchronous master-data updates", tags: ["React", ".NET", "REST / SOAP", "SQL Server"], diagram: ["React UI", ".NET API", "IBM MDM"], details: [
    { label: "The problem", text: "Banking applications needed reliable master-data updates while continuing to use legacy IBM MDM SOAP services." },
    { label: "My contribution", text: "Built React front ends from Figma prototypes in a six-person team and delivered two .NET REST APIs with Entity Framework over IBM MDM SOAP services. Took on full-stack development when the lead developer was reassigned." },
    { label: "The engineering decision", text: "Sequenced synchronous updates to prevent duplicate records, and used unit and integration tests to check the API contract. The REST layer connected modern clients to the existing MDM service." },
    { label: "The outcome", text: "Delivered the bank’s first synchronous master-data updates. Within a six-person team, helped standardize data quality by over 40%." },
  ] },
  { id: "delivery", company: "CIBC Caribbean", category: "Cloud / Developer experience", title: "From a coffee break to a deploy in seconds.", summary: "Re-architected Azure DevOps YAML pipelines onto self-hosted Linux build agents for faster delivery.", result: "Build and deployment: 15 minutes → under 30 seconds", tags: ["Azure DevOps", "Docker", "Linux", "NGINX"], diagram: ["Commit", "Pipeline", "Deploy"], details: [
    { label: "The problem", text: "Build and deployment took around 15 minutes, creating a long feedback loop for application changes." },
    { label: "My contribution", text: "Re-architected the Azure DevOps YAML pipelines using self-hosted Linux build agents. Deployed containerized microservices behind NGINX and mentored teammates on Azure deployment and containerization." },
    { label: "The engineering decision", text: "Moved pipeline execution onto self-hosted Linux agents. Alongside delivery work, automated TLS renewal for six domains through Azure Key Vault and secured applications with Entra ID, MSAL, and RBAC." },
    { label: "The outcome", text: "Cut build and deployment time by 97%, from 15 minutes to under 30 seconds." },
  ] },
  { id: "observability", company: "TurboVets", category: "Platform / Regulated production", title: "Visibility into production. Care with sensitive data.", summary: "Evaluated observability platforms and deployed a Grafana-centered stack on ECS Fargate for a HIPAA-regulated platform.", result: "5 observability components · 29 alert rules · 2-layer PHI redaction", tags: ["AWS", "Grafana", "OpenTelemetry", "Terraform"], diagram: ["Services", "Telemetry", "Signals"], details: [
    { label: "The problem", text: "The team needed production visibility across services and AI workflows, with attention to protected health information and deployment reliability." },
    { label: "My contribution", text: "Compared Datadog, Amazon Managed Grafana, and Grafana OSS. Found Amazon Managed Grafana was not HIPAA-eligible during the evaluation and presented a SWOT analysis and decision brief to the CTO. Deployed Loki, Tempo, Faro real user monitoring, Pyroscope, and Arize Phoenix for LLM and agent tracing on ECS Fargate. Liaised with vendors including Datadog." },
    { label: "The engineering decision", text: "Designed two-layer PHI redaction across logs, traces, and browser telemetry. Managed ECS Fargate, EC2, RDS, RDS Proxy, secrets, and cost management in Terraform CDKTN. Kept dashboards and alerts as files deployed to EFS through GitHub Actions. Used the existing TypeORM migration process to provision a read-only Grafana database role." },
    { label: "The outcome", text: "Built 29 alert rules across six AWS services, audited against Google SRE Workbook practices. Delivered Grafana deployments without dashboard or alert loss, and reduced production Docker image size by 34% using nx prune and knip." },
  ] },
  { id: "analytics", company: "TurboVets", category: "Full-stack / Product insight", title: "Make product usage easier to understand.", summary: "Built a user engagement analytics service to visualize feature adoption and workflow drop-off.", result: "Feature adoption & workflow drop-off visualizations", tags: ["NestJS", "PostgreSQL", "Angular", "D3.js"], diagram: ["Activity", "Analytics", "Product UI"], details: [
    { label: "The problem", text: "The team needed a view of feature adoption and where users dropped out of application workflows." },
    { label: "My contribution", text: "Built a user engagement analytics service with NestJS and PostgreSQL, with Angular and D3.js visualizations." },
    { label: "The engineering decision", text: "Combined backend analytics with frontend visualizations so application usage could be examined as a product workflow." },
    { label: "The outcome", text: "Delivered visualizations of feature adoption and workflow drop-off for the team." },
  ] },
  {
    id: "reporting", company: "Associated Brands Industries", category: "Data engineering / Stakeholder collaboration",
    title: "Start with how people actually use the report.",
    summary: "Automated financial reporting, built sales dashboards, and worked through the data behind manufacturing workflows.",
    result: "Automated weekly reports and delivered a filtered dashboard as an interim solution",
    tags: ["React", "Django", "PostgreSQL", "Pentaho", "IBM DB2", "T-SQL"],
    diagram: ["IBM DB2", "ETL", "Reports"],
    details: [
      { label: "The problem", text: "Weekly financial reports were maintained in Excel. The initial automation timeline did not account for missing report requirements or the time needed to understand how stakeholders used the data." },
      { label: "My contribution", text: "Automated weekly financial reports and built sales dashboards using React, Django, and PostgreSQL. Migrated data from IBM DB2 on AS/400 using Java, ran Pentaho and Python ETL, and wrote T-SQL for SQL Server tables and cubes over fact tables. Also built a CSV discrepancy application." },
      { label: "The engineering decision", text: "Asked stakeholders how they used the reports and what information was missing. Proposed a dashboard showing the same metrics with filtering while researching and rescoping the Pentaho report design for Excel exports." },
      { label: "The outcome", text: "Delivered reporting automation and dashboards. The interim dashboard addressed the immediate need while making the revised report scope and timeline explicit." },
      { label: "What I learned", text: "The shape of a report is part of its requirements. Asking how someone makes decisions with it can change what is useful to build first." },
    ],
  },
  {
    id: "accessibility", company: "USD Office of Accessibility", category: "Accessibility / Practical evaluation",
    title: "An interface has to work beyond the mouse.",
    summary: "Evaluated web, desktop, and mobile software with screen readers, and remediated PDFs for accessible use.",
    result: "Several hundred VPAT evaluations and Section 508 PDF remediation",
    tags: ["WCAG 2.1", "JAWS", "NVDA", "VoiceOver", "Section 508"],
    diagram: ["Software", "Evaluate", "Remediate"],
    details: [
      { label: "The problem", text: "The Office of Accessibility needed software evaluations and accessible documents across different platforms and assistive technologies." },
      { label: "My contribution", text: "Tested web, desktop, and mobile applications for WCAG 2.1 using JAWS, NVDA, and VoiceOver. Conducted several hundred VPAT evaluations and remediated PDFs to Section 508 standards." },
      { label: "The engineering decision", text: "Applied my frontend experience to practical testing across three screen readers and to document remediation. The focus was how someone could actually navigate, read, and use the material." },
      { label: "The outcome", text: "Completed software evaluations and PDF remediation for the university’s Office of Accessibility. This portfolio targets WCAG 2.2 AA; that target is separate from the WCAG 2.1 work performed in this role." },
      { label: "What I bring to development", text: "Experience examining software with assistive technology informs how I approach labels, keyboard navigation, focus, and readable interfaces." },
    ],
  },
  {
    id: "database-delivery", company: "TurboVets", category: "Database / Delivery decisions",
    title: "Use the deployment path the team already trusts.",
    summary: "Provisioned a read-only PostgreSQL role for Grafana through the application’s existing TypeORM migration process.",
    result: "Role changes and metrics queries shipped through the established migration workflow",
    tags: ["PostgreSQL", "TypeORM", "Grafana", "GitHub Actions"],
    diagram: ["Migration", "Read-only role", "Grafana"],
    details: [
      { label: "The problem", text: "Grafana needed read-only database access. An infrastructure proposal used a Lambda approach requiring two Terraform applications, while the team already had a mature continuous-delivery process for database roles and migrations." },
      { label: "My contribution", text: "Proposed and implemented the read-only PostgreSQL role in TypeORM migrations. Also worked on moving metrics access from the primary database to a dedicated metrics database." },
      { label: "The engineering decision", text: "Kept database roles and query changes in the application’s established migration process rather than introducing another infrastructure deployment path. Discussed the alternative with a senior DevOps engineer whose infrastructure judgment I trusted." },
      { label: "The outcome", text: "Made the role easier to deploy across environments, roll back, and extend alongside metrics queries. TypeORM migrations were automated through GitHub Actions." },
      { label: "What I learned", text: "An engineering disagreement is easier to resolve when the proposal is grounded in the team’s existing workflow and the operational work it simplifies." },
    ],
  },
];

export const engineeringStories = [
  {
    id: "requirements", label: "Scoping & communication", title: "A useful first step beats an unclear deadline.", context: "Associated Brands",
    story: "A report took longer than expected because I hadn’t been given enough detail about its structure or how it was used. I went back to the stakeholders, explained what was missing, and proposed a filtered dashboard while I researched and redesigned the Pentaho report.",
    takeaway: "I learned to make uncertainty visible early and offer a practical next step when the original scope needs to change.",
  },
  {
    id: "feedback", label: "Learning from feedback", title: "Make the progress visible, not just the effort.", context: "TurboVets",
    story: "My platform director pointed out that a ticket was taking too long. I had already done a cost analysis and shared findings in a Slack thread, but I hadn’t broken the work into smaller issues or made its progress clear. He also reminded me that taking on too much would burn me out.",
    takeaway: "I started using smaller tasks, frequent reviewable PRs, and clearer review follow-up. It helped me stop overthinking and made it easier for the team to see and review the work.",
  },
  {
    id: "mentoring", label: "Mentoring", title: "Work through the pattern together.", context: "CIBC Caribbean",
    story: "When a teammate was struggling with React element creation, I walked through JSX examples, introduced Chakra UI, and showed the patterns we used in the application. I also mentored teammates on JavaScript, TypeScript, Azure, Docker, and deployments.",
    takeaway: "I like making the reasoning visible so someone can apply the pattern again, rather than only fixing the immediate code.",
  },
  {
    id: "remote", label: "Remote collaboration", title: "Write it down. Then talk it through.", context: "Across my teams",
    story: "Most of my professional development work has been remote. Notes, focused Slack threads, quick calls, and office hours helped us discuss blockers, compare approaches, and sometimes just get a problem out of our heads. Reviewing each other’s PRs kept the work connected.",
    takeaway: "I value a team where asking questions and sharing unfinished thinking are normal parts of getting to a good solution.",
  },
];

export const developmentWorkflow = [
  { title: "Understand the change", description: "Work through the problem, users, constraints, and acceptance criteria. Use an agent to challenge unclear requirements before coding." },
  { title: "Plan the interfaces", description: "Review the architecture and define API contracts, database changes, and the frontend flow. Break the feature into changes that can be reviewed independently." },
  { title: "Describe what should happen", description: "Use Gherkin acceptance criteria and a mix of BDD and TDD. Review the proposed tests before treating them as evidence that the feature works." },
  { title: "Build in small pieces", description: "Use Claude Code and Codex for focused implementation work, with role-specific agents where useful. Keep the code matched to the reviewed plan." },
  { title: "Challenge the result", description: "Inspect the diff, run the checks, and ask an agent to question the implementation. Revisit the docs when I cannot explain a choice confidently." },
  { title: "Make it reviewable", description: "Keep PRs small enough to follow, document the reasoning, and follow up on reviews. An AI-generated implementation still needs an engineer accountable for it." },
];
export const personalInterests = [
  { number: "01", title: "The question behind the result", label: "AI & computer vision", description: "I’m interested in the foundations of AI, especially computer vision and animal detection. I like using AI to test a theory, explore a possibility, and challenge my own reasoning. The learning happens when I check what actually worked and why." },
  { number: "02", title: "Something I can take apart", label: "Building & troubleshooting", description: "Building and repairing PCs and phones gave me another way to follow my curiosity. I enjoy working through the pieces of a problem, whether that’s hardware, an application, or a deployment that isn’t behaving as expected." },
  { number: "03", title: "Something useful to someone else", label: "Teaching & community", description: "I like walking a teammate through React or TypeScript until a pattern clicks. I also volunteer at St. Agnes here in Vermillion, cataloging books into databases, managing records, and helping with IT support." },
];

export interface Experience {
  company: string;
  title: string;
  dates: string;
  location?: string;
  summary: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: "St. Agnes Church",
    title: "Volunteer · Database & IT Support",
    dates: "Sep 2026 — Present",
    location: "Vermillion, SD",
    summary: "Contributing database, records management, and practical IT support skills.",
    highlights: ["Catalog books into databases and maintain records.", "Provide IT support alongside records management work."],
  },
  {
    company: "TurboVets", title: "Full Stack & DevOps Engineer II", dates: "Mar 2026 — Sep 2026", location: "Remote",
    summary: "Full-stack and platform engineering for a HIPAA-regulated veteran services platform.",
    highlights: [
      "Evaluated three observability options; found Amazon Managed Grafana was not HIPAA-eligible at the time and presented a SWOT analysis and decision brief to the CTO.",
      "Deployed Loki, Tempo, Faro real user monitoring, Pyroscope, and Arize Phoenix for LLM and agent tracing on ECS Fargate.",
      "Built 29 alert rules across six AWS services, audited against Google SRE Workbook practices.",
      "Designed two-layer PHI redaction across logs, traces, and browser telemetry.",
      "Managed infrastructure with Terraform CDKTN: ECS Fargate, EC2, RDS, RDS Proxy, secrets management, and cost management.",
      "File-provisioned Grafana dashboards and alerts to EFS through GitHub Actions.",
      "Cut production Docker images 34% with nx prune and knip.",
      "Built engagement analytics with NestJS, PostgreSQL, Angular, and D3.js; automated TypeORM migrations in GitHub Actions.",
      "Liaised with vendors including Datadog. Configured Claude skills and used Claude Code and Codex daily, reviewing output before shipping.",
    ],
  },
  {
    company: "University of South Dakota · Office of Accessibility", title: "Digital Accessibility Assistant", dates: "Jan 2025 — May 2025", location: "Vermillion, SD",
    summary: "Accessibility evaluations and remediation across software and documents.",
    highlights: [
      "Tested web, desktop, and mobile applications for WCAG 2.1 using JAWS, NVDA, and VoiceOver.",
      "Conducted several hundred VPAT evaluations and remediated PDFs to Section 508 standards.",
    ],
  },
  {
    company: "CIBC Caribbean", title: "Software Engineer", dates: "Jan 2022 — Aug 2024", location: "Remote",
    summary: "Full-stack delivery and data operations supporting FATCA compliance.",
    highlights: [
      "Built two .NET REST APIs with Entity Framework over IBM MDM SOAP services, delivering the bank’s first synchronous master-data updates.",
      "Built React front ends from Figma prototypes in a six-person team, then moved to full-stack development; helped standardize data quality by over 40%.",
      "Cut build and deployment time 97%, from 15 minutes to under 30 seconds, on Azure DevOps with self-hosted Linux agents.",
      "Built SSIS jobs tracking cardholder spending against US limits. Reconciled credit card totals across migrations using sums, checksums, and row hashing.",
      "Implemented Entra ID and MSAL SSO and RBAC; automated SSL/TLS renewal for six domains through Key Vault; deployed Dockerized microservices behind NGINX.",
      "Instrumented services with OpenTelemetry into Azure Monitor and wrote unit and integration tests.",
      "Mentored teammates on React, JavaScript, TypeScript, Azure, Docker, and containerization.",
    ],
  },
  {
    company: "Associated Brands Industries Ltd.", title: "Programmer Analyst", dates: "Jun 2021 — Nov 2021", location: "Trinidad & Tobago",
    summary: "Reporting automation, data engineering, web development, and IT support for manufacturing.",
    highlights: [
      "Migrated data out of IBM DB2 on AS/400 with Java and ran Pentaho and Python ETL.",
      "Wrote T-SQL for SQL Server tables and cubes over fact tables.",
      "Built an ecommerce prototype, sales dashboards, and a CSV discrepancy application; automated weekly financial reports.",
      "Assisted the networking team with printers, server errors, and application installations.",
    ],
  },
];

export const independentWork = {
  company: "Independent hands-on experience",
  title: "PC & phone building and repair",
  summary: "Built and repaired PCs and phones independently, developing practical hardware troubleshooting and software support skills.",
  highlights: ["Built and repaired PCs and phones.", "Apple experience is software support only."],
};
export const capabilities = [
  { title: "Interfaces & accessibility", description: "Usable applications, clear data visualizations, and accessibility informed by hands-on evaluation.", skills: ["React", "TypeScript", "Next.js", "Angular", "D3.js", "WCAG 2.1"] },
  { title: "APIs & data", description: "Application services and data workflows across modern APIs and existing enterprise systems.", skills: ["C# / .NET", "Entity Framework", "NestJS", "Python", "REST / SOAP", "PostgreSQL", "SQL Server", "TypeORM", "SSIS", "Pentaho", "IBM DB2", "T-SQL"] },
  { title: "Cloud & delivery", description: "Repeatable deployments, leaner containers, and infrastructure that supports the application.", skills: ["AWS", "ECS Fargate", "EC2", "RDS / RDS Proxy", "Azure", "Terraform CDKTN", "Docker", "GitHub Actions", "Azure DevOps", "NGINX"] },
  { title: "Reliability & verification", description: "Production visibility and deliberate testing, with an engineer accountable for AI-assisted changes.", skills: ["Grafana", "OpenTelemetry", "Prometheus", "xUnit", "Jest", "Cypress", "Claude Code", "Codex"] },
];
export const education = [
  { title: "M.Sc. Computer Science · Artificial Intelligence", school: "University of South Dakota", dates: "Aug 2024 — Dec 2025", detail: "GPA 4.0 / 4.0" },
  { title: "B.A.Sc. Computer Engineering", school: "University of Trinidad and Tobago", dates: "Sep 2017 — Jul 2020", detail: "Magna Cum Laude · GPA 3.55 / 4.0" },
];
