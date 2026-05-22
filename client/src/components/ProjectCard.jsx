import React from 'react';
import '../styles/cards.css';

export default function ProjectCard({ project, onUpvote, showActions }) {
  if (!project) {
    return <div className="project-card">Project data not available</div>;
  }

  const title = project.title || 'Untitled';
  const description = project.description || 'No description';
  const tech_stack = project.tech_stack || 'N/A';
  const priceNum = parseFloat(project.price);
  const price = isNaN(priceNum) ? 0 : priceNum;
  const upvotes = project.upvotes || 0;
  const github_link = project.github_link || '#';

  return (
    <div className="project-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="upvote-badge">⬆️ {upvotes}</span>
      </div>

      <p className="card-description">{description}</p>

      <div className="card-meta">
        <span className="tech-stack">
          <strong>Tech:</strong> {tech_stack}
        </span>
        <span className="price">
          <strong>${price.toFixed(2)}</strong>
        </span>
      </div>

      <div className="card-link">
        <a href={github_link} target="_blank" rel="noopener noreferrer" className="github-link">
          View on GitHub →
        </a>
      </div>

      {showActions && (
        <div className="card-actions">
          <button onClick={(e) => onUpvote(project.id, e)} className="btn-upvote">
            👍 Upvote
          </button>
          <button className="btn-buy">💳 Buy</button>
        </div>
      )}
    </div>
  );
}
