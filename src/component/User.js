import React, { useState } from 'react';

const User = (props) => {
  // States to manage editable fields.
  const [firstNameInput, setFirstNameInput] = useState(props.element.first_name);
  const [lastNameInput, setLastNameInput] = useState(props.element.last_name);
  const [emailInput, setEmailInput] = useState(props.element.email);
  // Handlers to manage updating states
  const handleFirstNameInput = (e) => {setFirstNameInput(e.target.value);}
  const handleLastNameInput = (e) => {setLastNameInput(e.target.value);}
  const handleEmailInput = (e) => { setEmailInput(e.target.value);}

  // Function to handle the pass back to App.js with the changes to take to the server.
  const transferBack = () => { props.sendObject(props.element.id, firstNameInput, lastNameInput, emailInput, props.element.avatar); }

  return (
    <div className='box'>
      <div>
      Id: <strong>{`${props.element.id}`}</strong> 
      <h6>First Name: <input value={firstNameInput} onChange={handleFirstNameInput} /> </h6>
        <h6>Last Name: <input value={lastNameInput} onChange={handleLastNameInput} /></h6>
      </div>
      <img src={`${props.element.avatar}`} />
      <div>
        <h6>Email: <input value={emailInput} onChange={handleEmailInput} /></h6>
      </div>
      <button onClick={() =>transferBack()}>Update User</button>
    </div>
  );
}
export default User;