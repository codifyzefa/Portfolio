const PROJECTS = [
  
  {
    title: "Ininsico 3D",
    desc: "The Future of 3D Modeling Right in Your Browser",
    tech: ["React", "Node.js", "MongoDB","Express.js","Three.js","REST APIs"],
    link: "#",
    github: "https://ininsico.vercel.app/",
  },
  {
    title: "Petrol Management System in JAVA",
    desc: "A Professional Petrol Management System for Petrol Services",
    tech: ["Java","JDBC"],
    link: "#",
    github: "https://github.com/codifyzefa/Petrol-Management-System-in-java",
  },
  {
    title: "Text Editor",
    desc: "React text editor with formatting tools and live summary.",
    tech: ["JavaScript","HTML","CSS"],
    link: "#",
    github: "https://github.com/codifyzefa/textunits",
  },
];

export default function ProjectsGrid() {
  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-header">
                <h3>{p.title}</h3>
                <div className="pill-row">
                  {p.tech.map((t, idx) => <span key={idx} className="pill">{t}</span>)}
                </div>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-actions">
                <a className="btn-login-custom" href={p.github} target="_blank" rel="noreferrer">github/Live</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
