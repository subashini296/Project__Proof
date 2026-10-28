
import { useState } from "react";
import "./App.css";

const initialProjects = [
  {
    name: "Smart Campus Portal",
    skill: "React.js",
    date: "Oct 24, 2026",
    status: "Verified",
    icon: "🎓",
  },
  {
    name: "E-Commerce Analytics",
    skill: "Python",
    date: "Oct 20, 2026",
    status: "Under Review",
    icon: "📊",
  },
  {
    name: "Community Helper",
    skill: "Node.js",
    date: "Oct 18, 2026",
    status: "Pending",
    icon: "🤝",
  },
];

function App() {
  const [active, setActive] = useState("Overview");
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [skill, setSkill] = useState("React.js");

  const filtered = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  function addProject(event) {
    event.preventDefault();
    if (!projectName.trim()) return;

    setProjects([
      {
        name: projectName.trim(),
        skill,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: "Pending",
        icon: "💻",
      },
      ...projects,
    ]);
    setProjectName("");
    setShowForm(false);
    setActive("My Projects");
  }

  const menu = [
    ["Overview", "⌂"],
    ["My Projects", "▤"],
    ["My Skills", "✳"],
    ["Verification", "✓"],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" onClick={() => setActive("Overview")}>
          <span className="brand-icon">P</span>
          <span>ProjectProof<small>SKILL. BUILD. PROVE.</small></span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="nav-menu">
          {menu.map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "selected" : ""}`}
              onClick={() => setActive(name)}
            >
              <span className="nav-icon">{icon}</span>
              {name}
              {name === "Verification" && (
                <span className="nav-count">2</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-symbol">✦</div>
            <strong>Build your proof</strong>
            <p>Every project is a new opportunity to show what you can do.</p>
            <button onClick={() => setShowForm(true)}>Add a project ↗</button>
          </div>
          <div className="profile-mini">
            <div className="avatar">S</div>
            <div className="profile-text">
              <strong>Student Developer</strong>
              <span>Free workspace</span>
            </div>
            <span className="more">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> {active}</div>
          <div className="top-actions">
            <span className="online-dot"></span>
            <span className="top-status">Your workspace</span>
            <div className="avatar top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span>✳</span> YOUR SKILLS, PROVEN</div>
              <h1>
                {active === "Overview"
                  ? <>Turn your skills into <span>proof.</span></>
                  : active}
              </h1>
              <p className="welcome-description">
                Build your portfolio, track your skills, and showcase what
                you can actually do.
              </p>
            </div>
            <button className="primary-button" onClick={() => setShowForm(true)}>
              <span>＋</span> Add project
            </button>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top"><span>Total projects</span><span className="stat-icon purple">▤</span></div>
              <strong>{projects.length.toString().padStart(2, "0")}</strong>
              <p><span className="stat-highlight">Your portfolio</span> at a glance</p>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>Verified projects</span><span className="stat-icon green">✓</span></div>
              <strong>{projects.filter(p => p.status === "Verified").length.toString().padStart(2, "0")}</strong>
              <p><span className="green-text">Evidence reviewed</span></p>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>Skills showcased</span><span className="stat-icon orange">✳</span></div>
              <strong>{new Set(projects.map(p => p.skill)).size.toString().padStart(2, "0")}</strong>
              <p>Across your projects</p>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>Awaiting review</span><span className="stat-icon blue">◷</span></div>
              <strong>{projects.filter(p => p.status !== "Verified").length.toString().padStart(2, "0")}</strong>
              <p>Evidence to review</p>
            </div>
          </section>

          <section className="projects-section">
            <div className="section-heading">
              <div>
                <h2>{active === "My Skills" ? "Your skill portfolio" : active === "Verification" ? "Verification requests" : "Your projects"}</h2>
                <p>Show the work behind the skills you claim.</p>
              </div>
              <div className="project-tools">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  aria-label="Search projects"
                />
                <button className="secondary-button" onClick={() => setShowForm(true)}>＋ New project</button>
              </div>
            </div>

            {active === "My Skills" ? (
              <div className="skills-grid">
                {[...new Set(projects.map(p => p.skill))].map((item) => (
                  <div className="skill-card" key={item}>
                    <span className="skill-symbol">✳</span>
                    <h3>{item}</h3>
                    <p>{projects.filter(p => p.skill === item).length} linked project(s)</p>
                    <span className="skill-proof">Evidence linked</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>PROJECT</th>
                      <th>SKILL</th>
                      <th>DATE ADDED</th>
                      <th>STATUS</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered
                      .filter(p => active !== "Verification" || p.status !== "Verified")
                      .map((project, index) => (
                        <tr key={`${project.name}-${index}`}>
                          <td>
                            <div className="project-name">
                              <span className="project-emoji">{project.icon}</span>
                              <strong>{project.name}</strong>
                            </div>
                          </td>
                          <td><span className="skill-tag">{project.skill}</span></td>
                          <td className="date-cell">{project.date}</td>
                          <td>
                            <span className={`status status-${project.status.toLowerCase().replace(" ", "-")}`}>
                              <span></span>{project.status}
                            </span>
                          </td>
                          <td><button className="row-action" title="View project">↗</button></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {filtered.length === 0 && <p className="empty-state">No matching projects found.</p>}
              </div>
            )}
            <div className="table-footer">
              <span>Showing {filtered.length} project(s)</span>
              <span>ProjectProof <span className="footer-dot">•</span> Your work, your proof.</span>
            </div>
          </section>

          <section className="tip-banner">
            <div className="tip-icon">✦</div>
            <div>
              <strong>Your next opportunity starts with evidence.</strong>
              <p>Add a project and link your work to the skills you want to showcase.</p>
            </div>
            <button onClick={() => setShowForm(true)}>Get started →</button>
          </section>
        </div>
      </main>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="project-modal" onSubmit={addProject} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setShowForm(false)}>×</button>
            <div className="eyebrow">PORTFOLIO BUILDER</div>
            <h2>Add a project</h2>
            <p>Start documenting your practical skills.</p>
            <label>Project name</label>
            <input
              autoFocus
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Smart Campus Portal"
            />
            <label>Primary skill</label>
            <select value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option>React.js</option>
              <option>JavaScript</option>
              <option>Node.js</option>
              <option>Express.js</option>
              <option>MongoDB</option>
              <option>Python</option>
              <option>Java</option>
              <option>SQL</option>
            </select>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="primary-button">Save project ↗</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
