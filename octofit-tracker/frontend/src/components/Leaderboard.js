import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        // Sort by points in descending order
        const sortedResults = results.sort((a, b) => b.points - a.points);
        setLeaderboard(sortedResults);
        console.log('Leaderboard data:', sortedResults);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-header">🏆 Leaderboard</h1>
      <div className="table-container">
        <h5 className="mb-3">Top Performers</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-center">Rank</th>
                <th>User</th>
                <th className="text-end">Points</th>
                <th className="text-center">Badge</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No leaderboard entries found
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, idx) => {
                  let rankBadge = '';
                  let rankEmoji = '';
                  if (idx === 0) {
                    rankBadge = 'bg-warning';
                    rankEmoji = '🥇';
                  } else if (idx === 1) {
                    rankBadge = 'bg-secondary';
                    rankEmoji = '🥈';
                  } else if (idx === 2) {
                    rankBadge = 'bg-danger';
                    rankEmoji = '🥉';
                  }
                  
                  return (
                    <tr key={entry.id || idx} className={idx < 3 ? 'table-active' : ''}>
                      <td className="text-center">
                        <span className={`badge ${rankBadge || 'bg-light text-dark'}`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.user}</strong>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-primary badge-points">{entry.points}</span>
                      </td>
                      <td className="text-center fs-4">{rankEmoji}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
