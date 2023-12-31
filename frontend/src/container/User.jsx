import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Axios from 'axios'; // Import Axios
import { AiOutlinePlus } from 'react-icons/ai';
// import React from 'react'
import PopUp from './Modal';
import Navbar from '../components/Navbar';



const User = () => {
    return (
        <div>

            {/* User */}
            < UserManager />
        </div >
    );
}

export default User;

const UserManager = () => {
    const [users, setUsers] = useState(userData);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: null,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        status: '',
        last_login: null,
        role: "",
        created_on: new Date(),
        created_by: '',
        updated_on: null,
        updated_by: ''
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchUsersFromAPI = async () => {
        try {
            const response = await Axios.get('http://localhost:8080/api/v1/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsersFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentUser({
            _id: null,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            status: '',
            last_login: null,
            role: '',
            created_on: new Date(),
            created_by: '',
            updated_on: null,
            updated_by: ''
        });
        setShowModal(true);
    };

    const openModalToEdit = (user) => {
        setCurrentUser(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // const saveUser = () => {

    //     if (currentUser._id) {
    //         // Update user in the list
    //         setUsers(users.map(u => u._id === currentUser._id ? currentUser : u));
    //         toast.success('User updated successfully');
    //     } else {
    //         // Add new user
    //         const newUserWithId = { ...currentUser, id: Date.now() };
    //         setUsers([...users, newUserWithId]);
    //         toast.success('User added successfully');
    //     }
    //     setShowModal(false);
    // };


    const saveUser = () => {
        if (currentUser.id) {
            console.log("in update")
            // Update user in the list
            setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
            toast.success('User updated successfully');
        } else {
            // Add new user
            const { email, password, firstName, lastName } = currentUser;
            console.log(currentUser)
            Axios.post('http://localhost:8080/api/v1/auth/user', { email, password, firstName, lastName, created_by: "tester" })
                .then((response) => {
                    const newUserWithId = { ...currentUser, id: response.id };
                    setUsers([...users, newUserWithId]);
                    toast.success('User added successfully');
                    // Handle a successful response here, if needed
                    console.log(response.data);
                })
                .catch((error) => {
                    // Handle errors here
                    console.error(error);
                    // Show a toast or error message to the user using a library like react-toastify
                    toast.error('Error adding user');
                });

        }
        setShowModal(false);
    };

    const deleteUser = (userId) => {
        setUsers(users.filter(user => user._id !== userId));
        toast.info('User deleted successfully');
    };

    return (
        <div className="user-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Users</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    Add User
                    </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add User
                    </button>
                </caption>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <>
                    {/* <Button className="mb-3" onClick={openModalToAdd}>Add User</Button>
                    Rest of your component code... */}
                    <UserTable users={users} onEdit={openModalToEdit} onDelete={deleteUser} />
                </>
            )}

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser.id ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm user={currentUser} setUser={setCurrentUser} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={saveUser}>
                        {currentUser._id ? 'Save Changes' : 'Add User'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>First Name</th>
                    <th className='text-center'>Last Name</th>
                    <th className='text-center'>Status</th>
                    <th className='text-center'>Last Login</th>
                    <th className='text-center'>Roles</th>
                    {/* <th>Created On</th>
                    <th>Created By</th>
                    <th>Updated On</th>
                    <th>Updated By</th> */}
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr className='text-center' key={index}>
                        <td className='text-center'>{user.email}</td>
                        <td className='text-center'>{user.firstName}</td>
                        <td className='text-center'>{user.lastName}</td>
                        <td className='text-center'>{user.status}</td>
                        <td className='text-center'>{user.last_login ? user.last_login.toISOString() : ''}</td>
                        <td className='text-center'>{user.name || user.roles[0].name}</td>
                        {/* <td>{user.created_on ? user.created_on.toISOString() : ''}</td>
                        <td>{user.created_by}</td>
                        <td>{user.updated_on ? user.updated_on.toISOString() : ''}</td>
                        <td>{user.updated_by}</td> */}
                        <td className='text-center'>
                            <Button variant="light" className='btn-sm' onClick={() => onEdit(user)}>
                                <BsPencilSquare />
                            </Button>
                            <Button variant="light" className='btn-sm' onClick={() => onDelete(user._id)}>
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const UserForm = ({ user, setUser }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />
            </Form.Group>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    value={user.status}
                    onChange={(e) => setUser({ ...user, status: e.target.value })}
                    required
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    {/* <option value="pending">Pending</option> */}
                </Form.Control>
            </Form.Group>
            {/* <Form.Group>
                <Form.Label>Roles</Form.Label>
                <Form.Control
                    as="select"
                    value={user.roles[0].name}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                </Form.Control>
            </Form.Group> */}
        </Form>
    );
};

const userData = [
    {
        _id: 1,
        email: 'user1@example.com',
        password: 'password1',
        firstName: 'John',
        lastName: 'Doe',
        status: 'Active',
        last_login: new Date(),
        role: 'user',
        created_on: new Date(),
        created_by: 'Admin',
        updated_on: null,
        updated_by: ''
    },
    {
        _id: 2,
        email: 'user2@example.com',
        password: 'password2',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'Inactive',
        last_login: new Date(),
        role: 'user',
        created_on: new Date(),
        created_by: 'Admin',
        updated_on: null,
        updated_by: ''
    },
    // ... add more user data as needed
];
