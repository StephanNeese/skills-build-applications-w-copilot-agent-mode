import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
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
      <h1 className="page-header">Activity Log</h1>
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Recent Activities</h5>
          <button className="btn btn-primary btn-sm">
            <i className="bi bi-plus-circle"></i> Add Activity
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No activities found
                  </td>
                </tr>
              ) : (
                activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{activity.id}</td>
                    <td><strong>{activity.user}</strong></td>
                    <td>{activity.activity}</td>
                    <td>
                      <span className="badge bg-info">{activity.duration} min</span>
                    </td>
                    <td>
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

export default Activities;
