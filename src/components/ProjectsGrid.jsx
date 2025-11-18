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
  {
    title: "Video Conference Web App Zoom",
    desc: "Full-Featured Zoom-like Video Conferencing Application.",
    tech: ["Next.js 14",
 "TypeScript",
 "Clerk Authentication",
 "Stream (getstream) Video SDK",
 "Tailwind CSS",
 "shadcn/ui","React","Tailwind CSS"],
    link: "https://connect.artbyzefa.today",
    github: "https://github.com/codifyzefa/connectsystem",
  },
  {
    title: "Chat Web App Like Whatsapp",
    desc: "Full-Featured Whatsapp Like Chat Web App",
    tech: ["Next.js 14",
 "TypeScript",
 "Clerk Authentication",
 "Socket.io",

 "React","Tailwind CSS"],
    link: "https://amooniee.artbyzefa.today",
    github: "https://github.com/codifyzefa/ChatApp",
  },
  {
    title: "API Services by artbyzefa",
    desc: "A powerful backend development Studio Designed to Simplify and Accelerate How Developers and Teams Build Backend Systems.",
    tech: ["Next.js 14",
 "TypeScript",
 "Advance MongoDB",
 "Core Backend Logic",
 "CRUD Operation",
 "React","Tailwind CSS"],
    link: "https://apiservices.artbyzefa.today",
    github: "https://github.com/Ininsico/chatapp",
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
                <a className="btn-login-custom" href={p.github} target="_blank" rel="noreferrer">github</a>
                <a className="btn-login-custom" href={p.link} target="_blank" rel="noreferrer">Live</a>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
