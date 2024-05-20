import React, { useEffect } from "react";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpadateUser = (Props) => {
  const { Users, EditUser, setEditUser, showModel, setShowModel } = Props;

  useEffect(() => {}, [EditUser]);

  const handleClose = () => setShowModel(false);

  const updateUserData = () => {
    // console.log(EditUser);
    Axios.put(`http://localhost:4001/update/${EditUser._id}`, {
      username: EditUser.username,
      password: EditUser.userpassword,
    })
      .then((response) => {
        Users.filter((data) =>
          data._id === EditUser._id ? response.data : data
        );
        setEditUser(null);
        setShowModel(false);
      })
      .catch((error) => console.error(`Error from Update frontend : ${error}`));
  };

  const handleUsernameChange = (e) => {
    setEditUser((pre) => ({ ...pre, username: e.target.value }));
  };
  const handlePasswordChange = (e) => {
    setEditUser((pre) => ({ ...pre, userpassword: e.target.value }));
  };
  return (
    <div>
      {showModel && (
        <Modal show={showModel} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <input
                type="text"
                placeholder="Enter Username"
                value={EditUser.username}
                onChange={handleUsernameChange}
              />
              <br />
              <input
                type="text"
                placeholder="Enter Userpassword"
                value={EditUser.userpassword}
                onChange={handlePasswordChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={updateUserData}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UpadateUser;
