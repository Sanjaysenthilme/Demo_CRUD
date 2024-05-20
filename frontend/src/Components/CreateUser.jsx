import React,{useState} from 'react';
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const CreateUser = (Props) => {
    const {Users,setUsers} = Props;

    const [newUsername,setNewUserName] = useState({username:''}); 
    const [newUserpass,setNewUserPass] = useState({password:''}); 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const addUserData = ()=>{
        // console.log(...Users);
        Axios.post(`http://localhost:4001/add`,
        {
            username:newUsername.username,
            password:newUserpass.password
        })
        .then((response) =>{
            setUsers([...Users,response.data])
            setShow(false);
        } )
        .catch((error) => console.error(`Error from post frontend : ${error}`))
        
    }

    const handleUsernameChange =(e)=>{
        setNewUserName({...newUsername,username:e.target.value})
    }
    const handlePasswordChange = (e)=>{
        setNewUserPass({...newUserpass,password:e.target.value})
    }
  
  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
          Create User
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <input type="text" placeholder="Enter Username" value={newUsername.username} onChange={handleUsernameChange}/>
              <br />
              <input type="text" placeholder="Enter Userpassword" value={newUserpass.password} onChange={handlePasswordChange}/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addUserData}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CreateUser