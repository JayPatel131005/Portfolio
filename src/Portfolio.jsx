import { useEffect, useState } from "react";
export default function Port() {
  const [show, setShow] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setShow(true), 300);
//     return () => clearTimeout(t);
//   }, []);

  return (
    <div className="page">
      <div className="bgBlend" />
      <main className={`${styles.hero} ${show ? styles.enter : ""}`}>
        <h1 className={styles.title}>Your Super‑Animated Portfolio</h1>
        <p className={styles.subtitle}>
          Built with <span>React 18</span> + pure CSS magic
        </p>
        <a
          className={styles.cta}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Projects
        </a>
      </main>
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <p>Add your project cards here…</p>
      </section>
    </div>
  );
}
