import React from 'react';
import '../styles/cards.css';

export default function UpvoteButton({ projectId, upvotes, onUpvote, disabled }) {
  return (
    <button
      onClick={() => onUpvote(projectId)}
      className="btn-upvote"
      disabled={disabled}
    >
      👍 Upvote ({upvotes})
    </button>
  );
}
