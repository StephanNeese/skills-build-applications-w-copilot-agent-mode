import React, { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
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
      <h1 className="page-header">Users</h1>
      <div className="table-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">All Users</h5>
          <button className="btn btn-success btn-sm">
            <i className="bi bi-plus-circle"></i> Add User
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{user.id}</td>
                    <td><strong>{user.name}</strong></td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-info">{user.team}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-info me-1">Profile</button>
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

export default Users;
