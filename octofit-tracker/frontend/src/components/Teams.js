import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
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
      <h1 className="page-header">Teams</h1>
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">All Teams</h5>
          <button className="btn btn-success btn-sm">
            <i className="bi bi-plus-circle"></i> Create Team
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No teams found
                  </td>
                </tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{team.id}</td>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-1">View</button>
                      <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
