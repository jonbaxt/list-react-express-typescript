import React, {useEffect, useState} from "react";
import axios from 'axios';
import {toast} from 'react-toastify';

import User from './component/User.js';
import './App.css';
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const App = () => {
  // States
  const [userArray, setArray] = useState([]);
  const [newFirst, setFirst] = useState('');
  const [newLast, setLast] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newAvatar, setAvatar] = useState('');

  const [idSelect, setIdSelect] = useState(0);

// Axios calls
const getNewUsers = async () => {
  await axios.get('http://localhost:3001/api/getusers').then( (response)=>{ 
    console.log(response.data);
    setArray(response.data);
  });
}
const createNewUser = async () => {
  const newUser = {
    id: userArray.length + 1,
    email: newEmail,
    first_name: newFirst,
    last_name: newLast,
    avatar: newAvatar
  }
  try { 
    const res = await axios.post('http://localhost:3001/api/createnewuser', newUser);
    console.log(res.data);
    setArray(res.data);
    setFirst('');
    setLast('');
    setEmail('');
    setAvatar('');
    toast('New User Created');
} catch (e) {
  toast('Failed to create new User');
  console.log(e);
  }
}

const deleteUser = async () => {
  try {
    const res = await axios.delete(`http://localhost:3001/api/deleteuser/${idSelect}`);
    setIdSelect(0);
    console.log(res.data);
    setArray(res.data);
    toast('User Deleted');  
  } catch (e) {
    console.log(e);
    toast('Failed to Delete User');
  }
}

const updateUser = async (newObject) => {
  try {
    const res = await axios.put(`http://localhost:3001/api/updateuser/${newObject.id}`, newObject);
    setArray(res.data);
    console.log(res.data);
    toast(`User id: ${newObject.id} was updated.`);
  } catch (e) {
    console.log(e);
    toast(`User id: ${newObject.id} failed to update.`);
  }
}

// Function used to pass a hook back up from the child components.
const sendObject = (idSend, first, last, email, avatar) => {
  let newObj = {
      id: idSend,
      email: email,
      first_name: first,
      last_name: last,
      avatar: avatar
  }
  console.log(newObj);
  updateUser(newObj);
}

useEffect(() => {getNewUsers();},[]);

// Functions used to manage states.
const firstNameChange = (e) => { setFirst(e.target.value); }
const lastNameChange = (e) => { setLast(e.target.value); }
const emailChange = (e) => { setEmail(e.target.value); }
const avatarChange = (e) => { setAvatar(e.target.value); }
const idSelectChange = (e) => {setIdSelect(e.target.value);}

// Using map to make a list of child components for the page.
var list = userArray.map((element,index)=>{ return (<User key={index} element={element} setArray={setArray} updateUser={updateUser} sendObject={sendObject} />)});

  return (
    <div className='main'>
      <h1>List with TypeScript Express Server</h1>
      <p>Edit a user, delete a user at the bottom by selecting user's number, or create a new user.</p>
      <div className='listborderbox'>
        {list}
      </div>
      <div className='newUserDiv'>
        <div className='newUserBox'>
          <h3>Create a New User</h3>
          <h6>First Name: <input value={newFirst} onChange={firstNameChange} /> </h6>
          <h6>Last Name: <input value={newLast} onChange={lastNameChange} /></h6>
          <h6>Email Address: <input value={newEmail} onChange={emailChange} /></h6>
          <h6>Avatar URL: <input value={newAvatar} onChange={avatarChange} /></h6>
          <button onClick={()=>createNewUser()}>Create New User</button>
        </div>
      </div>
      <div>
        <div className='newUserDiv'>
          <div className='deleteUserBox'>
            <h5>Delete a User by Id:<input type='number' value={idSelect} onChange={idSelectChange} /></h5>
            <button onClick={()=> deleteUser()}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
