import type { IProject } from "../types/ProjectType";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchProjects(): Promise<IProject[]> {
  const response = await fetch(`${BASE_URL}/api/projects`, {
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function addProject(newRepoPath: string): Promise<IProject> {
  const response = await fetch(`${BASE_URL}/api/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ repoPath: newRepoPath }),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Failed to add project");
  }

  return response.json();
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
}
