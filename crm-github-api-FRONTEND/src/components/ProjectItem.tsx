import React from "react";

interface Project {
  _id: string;
  owner: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: number;
}

interface Props {
  project: Project;
  onDelete: (_id: string) => void;
  onUpdate: (_id: string) => void;
}

const ProjectItem: React.FC<Props> = ({ project, onDelete, onUpdate }) => {
  return (
    <div className="border p-4 rounded mb-4 bg-white dark:bg-gray-800 shadow">
      <h3 className="text-xl font-semibold">{project.name}</h3>
      <p>Owner: {project.owner}</p>
      <p>
        URL:{" "}
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          {project.url}
        </a>
      </p>
      <p>Stars: {project.stars}</p>
      <p>Forks: {project.forks}</p>
      <p>Open Issues: {project.issues}</p>
      <p>Created At: {new Date(project.createdAt * 1000).toLocaleString()}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onUpdate(project._id)}
          className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;
