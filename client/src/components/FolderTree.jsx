import React, { useState } from 'react';
import '../styles/cards.css';

export default function FolderTree({ structure }) {
  const [expanded, setExpanded] = useState({});

  const toggleFolder = (path) => {
    setExpanded(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderTree = (items, depth = 0) => {
    if (!items || items.length === 0) return null;

    return (
      <ul className="folder-list" style={{ marginLeft: `${depth * 20}px` }}>
        {items.map(item => (
          <li key={item.path} className="folder-item">
            {item.type === 'dir' ? (
              <>
                <span
                  className="folder-toggle"
                  onClick={() => toggleFolder(item.path)}
                >
                  {expanded[item.path] ? '📂' : '📁'} {item.name}
                </span>
                {expanded[item.path] && renderTree(item.children, depth + 1)}
              </>
            ) : (
              <span className="file-item">📄 {item.name}</span>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="folder-tree">
      <h4>📁 Project Structure</h4>
      {renderTree(structure)}
    </div>
  );
}
