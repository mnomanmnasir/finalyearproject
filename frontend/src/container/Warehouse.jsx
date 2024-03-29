import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { baseUrl } from "../App"
import { AiOutlinePlus } from 'react-icons/ai';
import Helmet from './Helmet'


const Warehouse = ({ Toggle }) => {
    return (
        <div>

            {/* Warehouse  */}
            <WarehouseManager />
        </div>
    );
}

export default Warehouse;

const WarehouseManager = () => {
    const [warehouses, setWarehouses] = useState(warehouseData);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [currentWarehouse, setCurrentWarehouse] = useState({
        _id: null,
        name: '',
        address: '',
        capacity: 0,
        supervisor: '',
        temperatureControlled: false,
        status: '',
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchWarehousesFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/warehouse');
            setWarehouses(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };


    // Fetch users when the component mounts
    useEffect(() => {
        fetchWarehousesFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentWarehouse({
            _id: null,
            name: '',
            address: '',
            capacity: 0,
            supervisor: '',
            temperatureControlled: false,
            status: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (warehouse) => {
        setCurrentWarehouse(warehouse);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // const saveWarehouse = () => {
    //     if (currentWarehouse._id) {
    //         // Update warehouse in the list
    //         setWarehouses(warehouses.map(wh => wh._id === currentWarehouse._id ? currentWarehouse : wh));
    //         toast.success('Warehouse updated successfully');
    //     } else {
    //         // Add new warehouse
    //         const newWarehouseWithId = { ...currentWarehouse, _id: Date.now() };
    //         setWarehouses([...warehouses, newWarehouseWithId]);
    //         toast.success('Warehouse added successfully');
    //     }
    //     setShowModal(false);
    // };

    const saveWarehouse = async () => {
        try {
            let response;

            if (currentWarehouse._id) {
                // Update warehouse - PUT request
                response = await Axios.put(`${baseUrl}/warehouse`, currentWarehouse);

                setWarehouses(warehouses.map(wh =>
                    wh._id === currentWarehouse._id ? response.data : wh
                ));
                toast.success('Warehouse updated successfully');
            } else {
                // Add new warehouse - POST request
                response = await Axios.post(`${baseUrl}/warehouse`, currentWarehouse);

                const newWarehouseWithId = { ...currentWarehouse, _id: response.data._id }; // Assuming the response contains the new ID
                setWarehouses([...warehouses, newWarehouseWithId]);
                toast.success('Warehouse added successfully');
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error saving warehouse', error);
            toast.error('Error saving warehouse');
        }
    };


    const deleteWarehouse = (warehouseId) => {
        setWarehouses(warehouses.filter(wh => wh._id !== warehouseId));
        toast.info('Warehouse deleted successfully');
    };



    const filteredWarehouses = warehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log('Search term:', e.target.value);
    };

    return (
        <div className="warehouse-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h4 className='mt-4'>Warehouses</h4>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    Add Warehouse</Button> */}
                {/* <div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-primary" type="button" onClick={openModalToAdd}>
                            <AiOutlinePlus className="me-2" />
                            Add Warehouse
                        </button>
                    </div>
                </div> */}
                <caption className='d-flex justify-content-between'>
                    <input
                        type="text"
                        className="rounded-pill"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-dark rounded-pill" onClick={openModalToAdd}>
                        <AiOutlinePlus className="" />
                        Add Warehouse
                    </button>

                </caption>
            </div>

            <WarehouseTable warehouses={filteredWarehouses} onEdit={openModalToEdit} onDelete={deleteWarehouse} />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentWarehouse._id ? 'Edit Warehouse' : 'Add Warehouse'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WarehouseForm warehouse={currentWarehouse} setWarehouse={setCurrentWarehouse} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="dark" onClick={saveWarehouse}>
                        {currentWarehouse._id ? 'Save Changes' : 'Add Warehouse'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const WarehouseTable = ({ warehouses, onEdit, onDelete }) => {
    // const row = [{ _id: "name", title: "Name" }, { _id: "address", title: "Address" }, { _id: "capacity", title: "Capacity" }, { _id: "supervisor", title: "Supervisor" }, { _id: "temperatureControlled", title: "Temperature" }, { _id: "status", title: "Status" }, { _id: "actions", title: "Actions" }];
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    
    const filteredWarehouses = warehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <Helmet title='Warehouse System'>
            {/* <div className=''>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div> */}

            {filteredWarehouses.length === 0 ? (
                <p>No warehouses found.</p>
            ) : (

                <table className="table table-hover table-bordered">
                    <thead className='table-dark'>
                        <tr>
                            {/* {row.map((column, index) => <th key={index}>{column.title}</th>)} */}
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Address</th>
                            <th className='text-center'>Capacity</th>
                            <th className='text-center'>Supervisor</th>
                            <th className='text-center'>Temperature Controlled</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWarehouses.map((warehouse) => (
                            <tr key={warehouse._id} className='justify-content-center text-center'>
                                <td className='text-center'>{warehouse.name}</td>
                                <td className='text-center'>{warehouse.address}</td>
                                <td className='text-center'>{warehouse.capacity}</td>
                                <td className='text-center'>{warehouse.supervisor ? warehouse.supervisor.firstName + " " + warehouse.supervisor.lastName : ""}</td>
                                <td className='text-center'>{warehouse.temperatureControlled ? 'Yes' : 'No'}</td>
                                <td className='text-center'>{warehouse.status}</td>
                                <td className='text-center'>
                                    <Button variant="light" className='btn-sm' onClick={() => onEdit(warehouse)}>
                                        <BsPencilSquare />
                                    </Button>
                                    <Button variant="light" className='btn-sm' onClick={() => onDelete(warehouse._id)}>
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Helmet>
    );
};

export const WarehouseForm = ({ warehouse, setWarehouse }) => {

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [users, setUsers] = useState([]);
    const fetchUsersFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/users');
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
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={warehouse.name}
                    onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    value={warehouse.address}
                    onChange={(e) => setWarehouse({ ...warehouse, address: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                    type="number"
                    value={warehouse.capacity}
                    onChange={(e) => setWarehouse({ ...warehouse, capacity: parseInt(e.target.value) || 0 })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Supervisor</Form.Label>
                {/* <Form.Control
                    type="text"
                    value={warehouse.supervisor}
                    onChange={(e) => setWarehouse({ ...warehouse, supervisor: e.target.value })}
                    required
                /> */}
                <input
                    list="supervisorNames"
                    className="form-control"
                    placeholder="Supervisor Name"
                    value={warehouse.supervisor}
                    onChange={(e) => setWarehouse({ ...warehouse, supervisor: (e.target.value).split(" ")[1] })}
                    required
                />
                <datalist id="supervisorNames">
                    {users.map((prod, idx) => (
                        <option key={idx} value={prod.firstName + " " + prod._id} />
                    ))}
                </datalist>
            </Form.Group>
            <Form.Group>
                <Form.Label>Temperature Controlled</Form.Label>
                <Form.Check
                    type="checkbox"
                    checked={warehouse.temperatureControlled}
                    onChange={(e) => setWarehouse({ ...warehouse, temperatureControlled: e.target.checked })}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    value={warehouse.status}
                    onChange={(e) => setWarehouse({ ...warehouse, status: e.target.value })}
                    required
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    {/* Add more status options as needed */}
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

const warehouseData = [
    {
        _id: 1,
        name: 'Warehouse 1',
        address: 'Address 1',
        capacity: 1000,
        supervisor: 'Supervisor 1',
        temperatureControlled: true,
        status: 'Active',
    },
    {
        _id: 2,
        name: 'Warehouse 2',
        address: 'Address 2',
        capacity: 2000,
        supervisor: 'Supervisor 2',
        temperatureControlled: false,
        status: 'Inactive',
    },
    // ... add more warehouse data as needed
];

