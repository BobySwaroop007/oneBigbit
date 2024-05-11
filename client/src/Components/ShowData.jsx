import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/actions/actions';

const ShowData = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [updateData, setUpdateData] = useState({
    emp_id: '',
    name: '',
    email: '',
    designation: '',
    city: '',
    state: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useSelector(state => state.userReducer);
  console.log(data);

  useEffect(() => {
    // dispatch(fetchUserData())
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data-show');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (user) => {
    setUpdateData(user);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/users/${updateData.emp_id}`, updateData);
      console.log('User data updated successfully:', response.data);
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

    const handleDelete = async (userId) => {
      try {
        const response = await axios.delete(`http://localhost:8080/userDelete`, { data: { userId } });
        console.log('User data deleted successfully:', response.data);
        window.location.reload();
        
      } catch (error) {
        console.error('Error deleting user data:', error);
      }
    };

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <table className="table mx-4">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Designation</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.designation}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.emp_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
     
        <div className="modal modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Update User Data</h2>
            <form onSubmit={handleSubmit}>
              <label>
                User Name:
                <input
                  type="text"
                  name="name"
                  value={updateData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
               Email:
                <input
                  type="text"
                  name="email"
                  value={updateData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                city:
                <input
                  type="text"
                  name="city"
                  value={updateData.city}
                  onChange={handleChange}
                />
              </label>
              <label>
                state:
                <input
                  type="text"
                  name="state"
                  value={updateData.state}
                  onChange={handleChange}
                />
              </label>
              <label>
                User Name:
                <input
                  type="text"
                  name="designation"
                  value={updateData.designation}
                  onChange={handleChange}
                />
              </label>
              <button type="submit btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowData;
