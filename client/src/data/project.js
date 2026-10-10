const projectExtras = {
  "React Student Dashboard": {
    technologies: [
      "React",
      "JavaScript",
      "React Router",
      "CSS Modules",
      "Git",
      "GitHub",
    ],
    features: [
      "Student and teacher dashboards with separate navigation",
      "Project submission with image upload",
      "Teacher review and mark-as-complete workflow",
    ],
    learned: [
      "Structuring a multi-page React app with React Router",
      "Connecting a React frontend to an Express and MySQL backend",
      "Working in a team using Git and GitHub",
    ],
  },
  "JavaScript Portfolio": {
    technologies: ["HTML", "CSS", "JavaScript"],
    features: ["Responsive layout", "Interactive page sections"],
    learned: [
      "DOM manipulation basics",
      "Writing clean, semantic HTML and CSS",
    ],
  },
  "Responsive Web Project": {
    technologies: ["HTML", "CSS"],
    features: ["Mobile-first layout", "Flexbox and Grid"],
    learned: ["Media queries", "Designing for multiple screen sizes"],
  },
  "Full Stack Portfolio": {
    technologies: ["React", "Express", "Node.js", "MySQL"],
    features: [
      "REST API with full CRUD for projects",
      "Contact form saved to MySQL",
      "Image uploads using Multer",
    ],
    learned: [
      "Designing routes, controllers and middleware",
      "Environment variables and CORS configuration",
      "Deploying a frontend, backend and database separately",
    ],
  },
};
// This function takes a project object and returns a new object that includes the extra details (technologies, features, learned) if they exist in the projectExtras mapping. If not, it defaults to empty arrays.
export function withExtras(project) {
  const extras = projectExtras[project.title] || {};
  return {
    ...project,
    technologies: extras.technologies || [],
    features: extras.features || [],
    learned: extras.learned || [],
  };
}
