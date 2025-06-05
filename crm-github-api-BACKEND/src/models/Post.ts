import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  repoUrl: string;
  stars: number;
  forks: number;
  issues: number;
  createdAtUnix: number;
}

const projectSchema = new Schema<IProject>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  repoUrl: { type: String, required: true },
  stars: { type: Number, required: true, default: 0 },
  forks: { type: Number, required: true, default: 0 },
  issues: { type: Number, required: true, default: 0 },
  createdAtUnix: { type: Number, required: true },
});

const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;
