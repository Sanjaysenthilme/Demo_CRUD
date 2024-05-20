import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import CreateUser from "./CreateUser";
import UpadateUser from "./UpdateUser";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const [Users, setUsers] = useState([]);
  const [EditUser,setEditUser] = useState(null);

  const [showModel,setShowModel] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:4001/`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(`Error from get frontend : ${error}`));
  }, [Users,EditUser]);


 const handleDelete = (id) =>{
    Axios.delete(`http://localhost:4001/delete/${id}`)
    .then(() => {
        setUsers(Users.filter(user => user._id !== id))
    }).then(()=>{
        setTimeout(()=>{
            DeleteNotify();
        },2000)
    })
    .catch((error) => console.error(`Error from Delete frontend : ${error}`))
 }

 const DeleteNotify = () =>{
    toast.error('Delete data successfully',{position: "top-right"},{autoClose:2000})
 }

 const handleEdit = (userData) =>{
    setEditUser({...userData});
    setShowModel(true);
 }
  return (
    <div className="container">
      <span className="display-4">User Details</span>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Userpassword</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((data, keys) => (
            
            <tr key={keys}>
              <td>{data.username}</td>
              <td>{data.userpassword}</td>
              <td>
                <button className="btn btn-success m-1" onClick={()=> {handleEdit(data)}}>Edit</button>
                <button className="btn btn-danger m-1" onClick={() => {handleDelete(data._id)}}>Delete</button>
              </td>
            </tr>
            
          ))}
        </tbody>
      </Table>

      {/* create form section */}
      <div>
        <CreateUser 
            Users={Users} 
            setUsers={setUsers} />
      </div>

      {/* Update form section */}
      <div>
            <UpadateUser 
                Users = {Users}
                EditUser={EditUser} 
                setEditUser={setEditUser} 
                showModel ={showModel} 
                setShowModel={setShowModel}
            />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
