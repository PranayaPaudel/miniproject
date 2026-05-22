import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import '../styles/dashboard.css';

export default function CreatorDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.role !== 'creator') {
        navigate('/');
      } else {
        loadProjects();
      }
    }
  }, [navigate]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getCreatorProjects();
      console.log('Projects loaded:', data);
      if (data.error) {
        setMessage(`Error: ${data.error}`);
        setProjects([]);
      } else if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.warn('Unexpected data format:', data);
        setProjects([]);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
      setMessage('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await api.deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
        setMessage('✓ Project deleted');
      } catch (err) {
        setMessage('Failed to delete project');
      }
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🎨 Creator Dashboard</h1>
        <a href="/upload" className="btn-primary">+ Upload New Project</a>
      </div>

      {message && <div className="info-message">{message}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-value">{projects.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Upvotes</h3>
          <p className="stat-value">{projects.reduce((sum, p) => sum + p.upvotes, 0)}</p>
        </div>
      </div>

      <h2>Your Projects</h2>
      <div className="projects-grid">
        {projects.length === 0 ? (
          <p>You haven't uploaded any projects yet.</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard project={project} showActions={false} />
              <div className="card-actions">
                <button onClick={() => handleDelete(project.id)} className="btn-delete">🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
