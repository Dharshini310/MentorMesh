import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MentorContext } from '../../App';
import './UserData.css';
import { useNavigate } from 'react-router-dom';

function UserData() {
  const [edit, setEdit] = useState(false);
  const { email } = useContext(MentorContext);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    about: '',
    url: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('/default-avatar.png');
  const navigate = useNavigate();

  const handleEdit = () => {
    setEdit(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async() => {
  const updatedUser = { ...user, ...formData };

    
  if (preview && preview !== '/default-avatar.png') {
    updatedUser.image = preview;
  }
 
    try {
    const res = await axios.put('http://localhost:3000/mentormesh/addUserData',updatedUser);
    console.log('User Updated', res.data);
    setUser(res.data);
    setEdit(false);
    
    } catch (error) {
      console.log(error);
      
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/mentormesh/getUser?email=${email}`);
        setUser(res.data);
        setFormData({
          name: res.data.name || '',
          role: res.data.role || '',
          phone: res.data.phone || '',
          about: res.data.about || '',
          url: res.data.url || ''
        });
        if(res.data.image) {
          setPreview(res.data.image);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className='profileWrapper'>
      <span id='backToHome' onClick={() => navigate('/user-homepage')}>⬅️Back to home</span>
      <div className="userData">
        <p id='edit' onClick={handleEdit}>🖋️</p>
        <div className="userDataLeft">
          <img id="image" src={preview} alt="Profile" />
          {edit && <input type="file" accept="image/*" onChange={handleImageChange} />}
        </div>
        <div className="userDataRight">
          <h2 id="name">
            {edit ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                 className="input-editable"
                style={{ all: 'unset', borderBottom: '1px solid #ccc' }}
              />
            ) : (
              user.name || 'Enter Your Name'
            )}
          </h2>

          <h3 id="role">
            {edit ? (
              <input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role"
                 className="input-editable"
                style={{ all: 'unset', borderBottom: '1px solid #ccc' }}
              />
            ) : (
              user.role || 'Role not provided'
            )}
          </h3>

          <div className="contactDetails">
            <p id="userEmail">email: {user.email}</p>

            <p id="phone">
              contact: {edit ? (
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                   className="input-editable"
                  style={{ all: 'unset', borderBottom: '1px solid #ccc' }}
                />
              ) : (
                user.phone || 'No phone number'
              )}
            </p>
          </div>

          <p id="about">
            {edit ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="About you"
                style={{ all: 'unset', borderBottom: '1px solid #ccc' }}
                className="input-editable"
              />
            ) : (
              user.about || 'No about info available'
            )}
          </p>

          <p id="url">
            {edit ? (
              <input
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="LinkedIn URL"
                 className="input-editable"
                style={{ all: 'unset', borderBottom: '1px solid #ccc' }}
              />
            ) : (
              user.linkedin || 'LinkedIn URL'
            )}
          </p>

          {!edit ? (
            <button id="button" onClick={() => navigate('/posts')}>Posts</button>
          ) : (
            <button id="button" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserData;