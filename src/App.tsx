import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import {
  allProjectTags,
  contactLinks,
  cvBlocks,
  education,
  experience,
  heroCopy,
  infoPanels,
  modeLabels,
  proofStrip,
  projects,
  secondaryProjects,
  skillGroups,
} from "./content/siteData";
import { useIsMobileLayout } from "./hooks/useIsMobileLayout";
import { usePortfolioState } from "./hooks/usePortfolioState";
import type {
  Artifact,
  AudienceMode,
  ModeCopy,
  Project,
  ProjectTab,
  ProjectTag,
} from "./types";

const HeroScene = lazy(() => import("./components/HeroScene"));
const ImmersiveBackground = lazy(() => import("./components/ImmersiveBackground"));

const projectTabs: Array<{ value: ProjectTab; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "impact", label: "Why It Matters" },
  { value: "technical", label: "Technical Detail" },
  { value: "tradeoffs", label: "Tradeoffs" },
  { value: "artifacts", label: "Artifacts" },
  { value: "links", label: "Links" },
];

const resumeTabs = [
  { value: "experience", label: "Experience" },
  { value: "skills", label: "Skills" },
  { value: "education", label: "Education" },
  { value: "more-work", label: "More Work" },
  { value: "contact", label: "CV + Contact" },
] as const;

type ResumeTab = (typeof resumeTabs)[number]["value"];

function readCopy(copy: ModeCopy, mode: AudienceMode) {
  return copy[mode];
}

function readSummary(project: Project, mode: AudienceMode) {
  if (mode === "plain") {
    return project.recruiterSummary;
  }

  if (mode === "balanced") {
    return project.balancedSummary;
  }

  return project.technicalSummary;
}

function ModeSwitcher({
  mode,
  setMode,
}: {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
}) {
  return (
    <div className="segmented-control" aria-label="Audience mode">
      {Object.entries(modeLabels).map(([value, label]) => (
        <button
          key={value}
          type="button"
          className={mode === value ? "is-active" : undefined}
          onClick={() => setMode(value as AudienceMode)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TagFilters({
  tag,
  setTag,
}: {
  tag: ProjectTag | "all";
  setTag: (tag: ProjectTag | "all") => void;
}) {
  return (
    <div className="tag-filter-row" aria-label="Project domain filters">
      {allProjectTags.map((item) => (
        <button
          key={item.value}
          type="button"
          className={tag === item.value ? "is-active" : undefined}
          onClick={() => setTag(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const content = (
    <>
      <span className="artifact-kind">{artifact.kind.replace("-", " ")}</span>
      <h4>{artifact.title}</h4>
      <p>{artifact.summary}</p>
      {artifact.preview ? <code>{artifact.preview}</code> : null}
    </>
  );

  if (artifact.href) {
    return (
      <a className="artifact-card is-link" href={artifact.href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <article className="artifact-card">{content}</article>;
}

function ProjectListItem({
  project,
  mode,
  isActive,
  onOpen,
}: {
  project: Project;
  mode: AudienceMode;
  isActive: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      className={`project-list-item ${isActive ? "is-active" : ""}`}
      onClick={onOpen}
      aria-pressed={isActive}
    >
      <div className="project-list-item__top">
        <span className="eyebrow">{project.heroLabel}</span>
        <span className={`accent accent-${project.accent}`}></span>
      </div>
      <div className="project-list-item__main">
        <div>
          <h3>{project.title}</h3>
          <p>{readSummary(project, mode)}</p>
        </div>
        <span className="project-list-item__hint">{isActive ? "Selected" : "View"}</span>
      </div>
      <div className="project-list-item__chips">
        {project.tags.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </button>
  );
}

function CaseStudyPanel({
  project,
  mode,
}: {
  project: Project;
  mode: AudienceMode;
}) {
  const [tab, setTab] = useState<ProjectTab>("overview");

  useEffect(() => {
    setTab("overview");
  }, [project.slug]);

  return (
    <section className="case-study" id="case-study" aria-labelledby="case-study-title">
      <div className="case-study__topline">
        <span className="eyebrow">Selected case study</span>
        <div className="case-study__identity">
          <h3 id="case-study-title">{project.title}</h3>
          <p>{project.role}</p>
        </div>
        <div className="project-links-inline">
          {project.links.slice(0, 2).map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="case-study__summary-band">
        <p>{readSummary(project, mode)}</p>
        <ul className="stack-list">
          {project.stack.slice(0, 6).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="case-study__evidence">
        {project.embed ? (
          <div className="case-study__embed">
            <div className="case-study__embed-top">
              <span className="eyebrow">{project.embed.title}</span>
              <a href={project.embed.href} target="_blank" rel="noreferrer">
                Open live
              </a>
            </div>
            <iframe
              title={`${project.title} preview`}
              src={project.embed.href}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            <p>{project.embed.caption}</p>
          </div>
        ) : (
          <div className="case-study__evidence-list">
            <span className="eyebrow">Why this project is credible</span>
            <ul className="bullet-list">
              {project.evidencePoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="tab-row" role="tablist" aria-label={`${project.title} details`}>
        {projectTabs.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={tab === item.value}
            className={tab === item.value ? "is-active" : undefined}
            onClick={() => setTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="case-study__body">
        {tab === "overview" ? (
          <div className="case-study__overview">
            <div className="case-study__overview-block">
              <span className="eyebrow">Role</span>
              <p>{project.role}</p>
            </div>
            <div className="case-study__overview-block">
              <span className="eyebrow">Outcomes</span>
              <ul className="bullet-list">
                {project.outcomeBullets.map((item, index) => (
                  <li key={`${project.slug}-outcome-${index}`}>{readCopy(item, mode)}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        {tab === "impact" ? (
          <ul className="bullet-list">
            {project.whyItMatters.map((item, index) => (
              <li key={`${project.slug}-impact-${index}`}>{readCopy(item, mode)}</li>
            ))}
          </ul>
        ) : null}

        {tab === "technical" ? (
          <ul className="bullet-list">
            {project.technicalDetail.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {tab === "tradeoffs" ? (
          <ul className="bullet-list">
            {project.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {tab === "artifacts" ? (
          <div className="artifact-grid">
            {project.artifacts.map((artifact) => (
              <ArtifactCard key={`${project.slug}-${artifact.title}`} artifact={artifact} />
            ))}
          </div>
        ) : null}

        {tab === "links" ? (
          <div className="link-grid">
            {project.links.map((link) => (
              <a key={link.href} className="link-card" href={link.href} target="_blank" rel="noreferrer">
                <span className="eyebrow">External</span>
                <strong>{link.label}</strong>
                <span>{link.href.replace(/^https?:\/\//, "")}</span>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DesktopHeader({
  onProjectsNavigate,
  onResumeNavigate,
  onContactNavigate,
}: {
  onProjectsNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onResumeNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <header className="site-header">
      <a className="brandmark" href="#top">
        <span>UZAYR</span>
        <span>QURESHI</span>
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href="#projects" onClick={onProjectsNavigate}>
          Projects
        </a>
        <a href="#resume-deck" onClick={onResumeNavigate}>
          Resume
        </a>
        <a href="#contact-strip" onClick={onContactNavigate}>
          Contact
        </a>
      </nav>
      <a className="nav-cta" href="/Uzayr-Qureshi-CV.txt" download>
        Download CV
      </a>
    </header>
  );
}

function MobileHeader({
  isOpen,
  onToggle,
  onClose,
  onProjectsNavigate,
  onResumeNavigate,
  onContactNavigate,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onProjectsNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onResumeNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onContactNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <header className="site-header site-header--mobile">
      <div className="mobile-topbar">
        <a className="brandmark" href="#top">
          <span>UZAYR</span>
          <span>QURESHI</span>
        </a>
        <button
          type="button"
          className={`mobile-nav-toggle ${isOpen ? "is-open" : ""}`}
          aria-expanded={isOpen}
          aria-controls="mobile-site-nav"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={onToggle}
        >
          <span className="mobile-nav-toggle__label">Menu</span>
          <span className="mobile-nav-toggle__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div className="mobile-nav-panel" id="mobile-site-nav">
          <nav className="mobile-nav" aria-label="Mobile primary">
            <a href="#projects" onClick={onProjectsNavigate}>
              Projects
            </a>
            <a href="#resume-deck" onClick={onResumeNavigate}>
              Resume
            </a>
            <a href="#contact-strip" onClick={onContactNavigate}>
              Contact
            </a>
            <a href="/Uzayr-Qureshi-CV.txt" download onClick={onClose}>
              Download CV
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function HeroSection({
  mode,
  setMode,
  setProject,
}: {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  setProject: (project: string | null) => void;
}) {
  return (
    <section className="hero">
      <div className="hero__copy">
        <div className="hero__intro">
          <p className="eyebrow">Uzayr Qureshi | Cardiff | Year in Industry search</p>
          <h1>{heroCopy.headline[mode]}</h1>
          <p className="hero__subline">{heroCopy.subline[mode]}</p>
          <p className="hero__summary">{heroCopy.summary[mode]}</p>
        </div>

        <div className="hero__quickbar" aria-label="Quick proof points">
          {proofStrip.map((item) => (
            <article key={item.label} className="hero-proof">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="hero__highlights" aria-label="Quick portfolio routes">
          <button
            type="button"
            className="hero-highlight"
            onClick={() => setProject("relay-flow")}
          >
            <span className="eyebrow">Start here</span>
            <strong>Relay-Flow</strong>
            <p>Reliability tooling, workflows, retries, dead letters, replay.</p>
          </button>
          <button
            type="button"
            className="hero-highlight"
            onClick={() => setProject("slatedb")}
          >
            <span className="eyebrow">Systems depth</span>
            <strong>SlateDB</strong>
            <p>Storage engine internals, parser, indexing, transactions, WAL.</p>
          </button>
          <button
            type="button"
            className="hero-highlight"
            onClick={() => setProject("fraudshield")}
          >
            <span className="eyebrow">AI + product</span>
            <strong>FraudShield</strong>
            <p>ML-backed scoring, analyst review, API design, ops metrics.</p>
          </button>
        </div>

        <div className="hero__actions">
          <a href="#projects">Open projects</a>
          <a href="mailto:[redacted-email]">Email me</a>
          <a
            href="https://www.linkedin.com/in/uzayr-qureshi-b2a8ba245/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <aside className="hero__panel">
        <Suspense fallback={<div className="hero-scene hero-scene--fallback" aria-hidden="true" />}>
          <HeroScene />
        </Suspense>
        <div className="hero__panel-content">
          <div className="hero__panel-top">
            <span className="eyebrow">Audience control</span>
            <p>I let you switch between recruiter-friendly and engineering-depth explanations.</p>
          </div>
          <ModeSwitcher mode={mode} setMode={setMode} />
          <div className="hero__focus-list">
            <div>
              <span className="eyebrow">Best for recruiters</span>
              <p>I recommend Plain English first, then Relay-Flow or DEADLINE.</p>
            </div>
            <div>
              <span className="eyebrow">Best for engineers</span>
              <p>I recommend Deep Dive, then SlateDB or Relay-Flow.</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}

function ProjectsSection({
  mode,
  setMode,
  tag,
  setTag,
  filteredProjects,
  selectedProject,
  selectedProjectPosition,
  setProject,
  isMobileLayout,
}: {
  mode: AudienceMode;
  setMode: (mode: AudienceMode) => void;
  tag: ProjectTag | "all";
  setTag: (tag: ProjectTag | "all") => void;
  filteredProjects: Project[];
  selectedProject: Project;
  selectedProjectPosition: number;
  setProject: (project: string | null) => void;
  isMobileLayout: boolean;
}) {
  return (
    <section
      className={`section projects-section ${isMobileLayout ? "projects-section--mobile" : ""}`}
      id="projects"
    >
      {isMobileLayout ? (
        <div className="section-heading section-heading--mobile">
          <div>
            <p className="eyebrow">Featured case studies</p>
            <h2>Projects</h2>
            <p>Start here. Pick a project, then inspect the active case study below.</p>
          </div>
          <div className="selection-pill selection-pill--mobile">
            <div>
              <span className="eyebrow">Current selection</span>
              <strong>
                {selectedProjectPosition + 1}. {selectedProject.title}
              </strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">Featured case studies</p>
            <h2>Choose a project, then inspect the details beside it.</h2>
          </div>
          <div className="section-heading__meta">
            <p>
              I designed this section to be the fastest route through my work: a compact project
              list on the left and a focused case study on the right.
            </p>
            <div className="selection-pill">
              <div>
                <span className="eyebrow">Current selection</span>
                <strong>
                  {selectedProjectPosition + 1}. {selectedProject.title}
                </strong>
              </div>
              <Suspense
                fallback={
                  <div
                    className="hero-scene hero-scene--mini hero-scene--fallback"
                    aria-hidden="true"
                  />
                }
              >
                <HeroScene variant="mini" />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      <div className="filter-stack">
        <ModeSwitcher mode={mode} setMode={setMode} />
        <TagFilters tag={tag} setTag={setTag} />
      </div>

      <div className="projects-workspace">
        <div className="project-list" aria-label="Project chooser">
          {filteredProjects.map((project) => (
            <ProjectListItem
              key={project.slug}
              project={project}
              mode={mode}
              isActive={selectedProject.slug === project.slug}
              onOpen={() => setProject(project.slug)}
            />
          ))}
        </div>
        <div className="case-study-stage">
          {!isMobileLayout ? (
            <div className="case-study-stage__top">
              <span className="eyebrow">Focused view</span>
              <p>
                I keep one case study open at a time here so the details stay readable and fast to
                scan.
              </p>
            </div>
          ) : null}
          <CaseStudyPanel project={selectedProject} mode={mode} />
        </div>
      </div>
    </section>
  );
}

function InfoSection({ mode }: { mode: AudienceMode }) {
  return (
    <section className="section info-section">
      <div className="section-heading section-heading--compact">
        <div>
          <p className="eyebrow">Profile context</p>
          <h2>The supporting context that recruiters usually ask for.</h2>
        </div>
        <p>
          This fills in the background around my project work: objective, modules, training, and
          the non-technical discipline behind the portfolio.
        </p>
      </div>
      <div className="info-grid">
        {infoPanels.map((panel) => (
          <article key={panel.title} className="info-card">
            <span className="eyebrow">{panel.eyebrow}</span>
            <h3>{panel.title}</h3>
            <p>{readCopy(panel.body, mode)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResumeSection({
  mode,
  resumeTab,
  setResumeTab,
  isMobileLayout,
}: {
  mode: AudienceMode;
  resumeTab: ResumeTab;
  setResumeTab: (tab: ResumeTab) => void;
  isMobileLayout: boolean;
}) {
  return (
    <section className="section resume-deck" id="resume-deck">
      <div className="section-heading section-heading--compact">
        <div>
          <p className="eyebrow">Resume deck</p>
          <h2>Everything else is grouped here to keep the portfolio quick to use.</h2>
        </div>
        <p>
          I grouped the supporting material here so you can open only the section you need instead
          of scrolling through everything every time.
        </p>
      </div>

      <div className="tab-row tab-row--light" role="tablist" aria-label="Resume sections">
        {resumeTabs.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={resumeTab === item.value}
            className={resumeTab === item.value ? "is-active" : undefined}
            onClick={() => setResumeTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="resume-panel">
        {resumeTab === "experience" ? (
          <div className="timeline">
            {experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="timeline-item">
                <div className="timeline-item__meta">
                  <span className="eyebrow">{item.date}</span>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <ul className="bullet-list">
                  {item.bullets.map((bullet, index) => (
                    <li key={`${item.company}-${index}`}>{readCopy(bullet, mode)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : null}

        {resumeTab === "skills" ? (
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.title} className="skill-card">
                <p className="eyebrow">{group.eyebrow}</p>
                <h3>{group.title}</h3>
                <ul className="stack-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : null}

        {resumeTab === "education" ? (
          <div className="education-grid">
            {education.map((item) => (
              <article key={item.institution} className="education-card">
                <span className="eyebrow">{item.date}</span>
                <h3>{item.institution}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        ) : null}

        {resumeTab === "more-work" ? (
          <div className="secondary-grid">
            {secondaryProjects.map((item) => (
              <article key={item.title} className="secondary-card">
                <span className="eyebrow">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{readCopy(item.summary, mode)}</p>
              </article>
            ))}
          </div>
        ) : null}

        {resumeTab === "contact" ? (
          <div className="resume-contact-grid" id="contact-strip">
            <div className="brand-grid">
              <article className="brand-card">
                <span className="eyebrow">Personal brand</span>
                <h3>Uzayr Qureshi</h3>
                <p>
                  I present myself first as a software engineering student looking for a placement,
                  backed by concrete project evidence and direct contact paths.
                </p>
              </article>
              <article className="brand-card">
                <span className="eyebrow">Studio lane</span>
                <h3>Lureon</h3>
                <p>
                  I use Lureon as a parallel identity for self-directed builds and software
                  delivery without distracting from my primary hiring goal.
                </p>
                <a href="https://www.lureon.dev" target="_blank" rel="noreferrer">
                  Visit lureon.dev
                </a>
              </article>
            </div>
            <div className="contact-grid">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  className="contact-card"
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="eyebrow">{item.label}</span>
                  <strong>{item.value}</strong>
                </a>
              ))}
              <a className="contact-card" href="/Uzayr-Qureshi-CV.txt" download>
                <span className="eyebrow">CV</span>
                <strong>Download resume</strong>
              </a>
            </div>
            <section className="cv-sheet" aria-labelledby="cv-sheet-title">
              <div className="cv-sheet__header">
                <div>
                  <span className="eyebrow">CV snapshot</span>
                  <h3 id="cv-sheet-title">Resume content, embedded directly into the portfolio.</h3>
                </div>
                <div className="cv-sheet__header-side">
                  {!isMobileLayout ? (
                    <Suspense
                      fallback={
                        <div
                          className="hero-scene hero-scene--mini hero-scene--fallback"
                          aria-hidden="true"
                        />
                      }
                    >
                      <HeroScene variant="mini" />
                    </Suspense>
                  ) : null}
                  <a className="cv-sheet__action" href="/Uzayr-Qureshi-CV.txt" download>
                    Download CV
                  </a>
                </div>
              </div>
              <p className="cv-sheet__summary">
                I am a second-year Computer Science student with hands-on experience building
                production-style software systems across AI, embedded, backend, and full stack
                environments. I am seeking a year-in-industry placement where I can contribute to
                technically demanding software and grow as a systems-focused engineer.
              </p>
              <div className="cv-sheet__grid">
                {cvBlocks.map((block) => (
                  <article key={block.title} className="cv-block">
                    <span className="eyebrow">{block.eyebrow}</span>
                    <h4>{block.title}</h4>
                    <ul className="bullet-list">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <div className="cv-sheet__footer">
                <span className="eyebrow">References</span>
                <p>Available upon request.</p>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function App() {
  const { mode, tag, project: selectedProjectSlug, setMode, setTag, setProject } =
    usePortfolioState();
  const isMobileLayout = useIsMobileLayout(900);
  const [resumeTab, setResumeTab] = useState<ResumeTab>("experience");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [pendingScrollTarget, setPendingScrollTarget] = useState<string | null>(null);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        tag === "all" ? true : project.tags.includes(tag),
      ),
    [tag],
  );

  const selectedProject =
    filteredProjects.find((item) => item.slug === selectedProjectSlug) ??
    filteredProjects[0] ??
    projects[0];

  useEffect(() => {
    if (!filteredProjects.some((item) => item.slug === selectedProject.slug)) {
      setProject(filteredProjects[0]?.slug ?? projects[0].slug);
    }
  }, [filteredProjects, selectedProject.slug, setProject]);

  useEffect(() => {
    document.title = `Uzayr Qureshi | ${modeLabels[mode]}`;
  }, [mode]);

  useEffect(() => {
    if (!isMobileLayout) {
      setIsMobileNavOpen(false);
    }
  }, [isMobileLayout]);

  useEffect(() => {
    if (!isMobileLayout || !isMobileNavOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileLayout, isMobileNavOpen]);

  useEffect(() => {
    if (!pendingScrollTarget) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(pendingScrollTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setPendingScrollTarget(null);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pendingScrollTarget, resumeTab]);

  const selectedProjectPosition = filteredProjects.findIndex(
    (project) => project.slug === selectedProject.slug,
  );

  const jumpToSection = (targetId: string, nextResumeTab?: ResumeTab, closeMobileNav = false) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      if (nextResumeTab) {
        setResumeTab(nextResumeTab);
      }

      setPendingScrollTarget(targetId);

      if (closeMobileNav) {
        setIsMobileNavOpen(false);
      }
    };

  return (
    <div className={`page-shell ${isMobileLayout ? "page-shell--mobile" : ""}`}>
      <Suspense fallback={null}>
        <ImmersiveBackground />
      </Suspense>
      {!isMobileLayout ? <div className="ambient ambient-left" /> : null}
      {!isMobileLayout ? <div className="ambient ambient-right" /> : null}

      {isMobileLayout ? (
        <MobileHeader
          isOpen={isMobileNavOpen}
          onToggle={() => setIsMobileNavOpen((current) => !current)}
          onClose={() => setIsMobileNavOpen(false)}
          onProjectsNavigate={jumpToSection("projects", undefined, true)}
          onResumeNavigate={jumpToSection("resume-deck", undefined, true)}
          onContactNavigate={jumpToSection("contact-strip", "contact", true)}
        />
      ) : (
        <>
          <DesktopHeader
            onProjectsNavigate={jumpToSection("projects")}
            onResumeNavigate={jumpToSection("resume-deck")}
            onContactNavigate={jumpToSection("contact-strip", "contact")}
          />
          <div className="quick-nav" aria-label="Quick navigation">
            <a href="#projects" onClick={jumpToSection("projects")}>
              Go to projects
            </a>
            <a href="#resume-deck" onClick={jumpToSection("resume-deck")}>
              Go to resume
            </a>
            <a href="#contact-strip" onClick={jumpToSection("contact-strip", "contact")}>
              Go to CV + contact
            </a>
            <button type="button" onClick={() => setProject("relay-flow")}>
              Start with Relay-Flow
            </button>
          </div>
        </>
      )}

      <main id="top" className={`main-shell ${isMobileLayout ? "main-shell--mobile" : ""}`}>
        {!isMobileLayout ? (
          <HeroSection mode={mode} setMode={setMode} setProject={setProject} />
        ) : null}
        <ProjectsSection
          mode={mode}
          setMode={setMode}
          tag={tag}
          setTag={setTag}
          filteredProjects={filteredProjects}
          selectedProject={selectedProject}
          selectedProjectPosition={selectedProjectPosition}
          setProject={setProject}
          isMobileLayout={isMobileLayout}
        />
        <InfoSection mode={mode} />
        <ResumeSection
          mode={mode}
          resumeTab={resumeTab}
          setResumeTab={setResumeTab}
          isMobileLayout={isMobileLayout}
        />
      </main>
    </div>
  );
}

export default App;
