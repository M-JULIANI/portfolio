import React from 'react';

interface ProjectCardProps {
  title: string;
  tags: string[];
  imageUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, tags, imageUrl }: ProjectCardProps) => {
  return (
    <>
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="card-tag">{tag}</span>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
