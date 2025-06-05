import { Request, Response } from 'express';
import Project from '../models/Post';
import { AuthRequest } from '../middlewares/authMiddleware';
import axios from 'axios';

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const projects = await Project.find({ owner: userId });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { repoPath } = req.body;

    if (!repoPath) {
      res.status(400).json({ message: 'repoPath is required' });
      return
    }

    const githubApiUrl = `https://api.github.com/repos/${repoPath}`;
    const response = await axios.get(githubApiUrl);
    const data = response.data;

    const existing = await Project.findOne({ owner: userId, repoUrl: data.html_url });
    if (existing) {
      res.status(409).json({ message: 'Project already exists' });
      return
    }

    const newProject = new Project({
      owner: userId,
      name: data.name,
      repoUrl: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      createdAtUnix: new Date(data.created_at).getTime(),
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Add project error:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      res.status(404).json({ message: 'GitHub repository not found' });
      return
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.id;

    const project = await Project.findOne({ _id: projectId, owner: userId });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return
    }

    const repoPath = project.repoUrl.replace('https://github.com/', '');
    const githubApiUrl = `https://api.github.com/repos/${repoPath}`;
    const response = await axios.get(githubApiUrl);
    const data = response.data;

    project.stars = data.stargazers_count;
    project.forks = data.forks_count;
    project.issues = data.open_issues_count;
    project.createdAtUnix = new Date(data.created_at).getTime();

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const projectId = req.params.id;

    const project = await Project.findOneAndDelete({ _id: projectId, owner: userId });
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return
    }

    res.json({ message: 'Project deleted' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};