import { User } from '@/graphql/schema.types';

type ProjectCardProps = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User['avatarUrl'];
  }[];
};

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
  return <div>ProjectCard</div>;
};

export default ProjectCard;
