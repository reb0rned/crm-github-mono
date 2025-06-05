export interface IProject {
  _id: string;
  owner: string;
  name: string;
  repoUrl: string;
  stars: number;
  forks: number;
  issues: number;
  createdAtUnix: number;
}