import { useEffect, useState } from "react";
import type { IProject } from "../types/ProjectType";
import { fetchProjects, addProject, deleteProject } from "../api/projects";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        if (err.message === "Unauthorized") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoUrl.trim()) return;

    try {
      const project = await addProject(newRepoUrl.trim());
      setProjects((prev) => [...prev, project]);
      setNewRepoUrl("");
      setError(null);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.message);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setError(null);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(err.message);
      }
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">CRM Dashboard</h2>

      <input
        type="text"
        placeholder="Search projects..."
        className="w-full p-3 mb-6 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form
        onSubmit={handleAddProject}
        className="mb-6 max-w-md flex space-x-3"
      >
        <input
          type="text"
          placeholder="Repository path (owner/repo)"
          className="flex-grow p-3 border rounded"
          value={newRepoUrl}
          onChange={(e) => setNewRepoUrl(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Add
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p>Loading projects...</p>}

      <ul className="space-y-4">
        {filteredProjects.length === 0 && !loading && (
          <li>No projects found.</li>
        )}
        {filteredProjects.map((project) => (
          <li
            key={project._id}
            className="border p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between gap-4"
          >
            <div className="flex-1 space-y-1">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600">👤 Owner: {project.owner}</p>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-words"
              >
                🔗 {project.repoUrl}
              </a>
              <p>⭐ Stars: {project.stars}</p>
              <p>🍴 Forks: {project.forks}</p>
              <p>🐞 Issues: {project.issues}</p>
              <p>
                🕒 Created at:{" "}
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                }).format(new Date(project.createdAtUnix * 1000))}{" "}
                UTC
              </p>
            </div>
            <div className="self-start sm:self-center">
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
