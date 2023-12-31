import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';


const Warehouse = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />
            {/* Warehouse  */}
            <WarehouseManager />
        </div>
    );
}

export default Warehouse;

const WarehouseManager = () => {
    const [warehouses, setWarehouses] = useState(warehouseData);
    const [showModal, setShowModal] = useState(false);
    const [currentWarehouse, setCurrentWarehouse] = useState({
        id: null,
        name: '',
        address: '',
        capacity: 0,
        supervisor: '',
        temperatureControlled: false,
        status: '',
    });

    // Fetch warehouses function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setWarehouses(fetchWarehousesFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentWarehouse({
            id: null,
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

    const saveWarehouse = () => {
        if (currentWarehouse.id) {
            // Update warehouse in the list
            setWarehouses(warehouses.map(wh => wh.id === currentWarehouse.id ? currentWarehouse : wh));
            toast.success('Warehouse updated successfully');
        } else {
            // Add new warehouse
            const newWarehouseWithId = { ...currentWarehouse, id: Date.now() };
            setWarehouses([...warehouses, newWarehouseWithId]);
            toast.success('Warehouse added successfully');
        }
        setShowModal(false);
    };

    const deleteWarehouse = (warehouseId) => {
        setWarehouses(warehouses.filter(wh => wh.id !== warehouseId));
        toast.info('Warehouse deleted successfully');
    };

    return (
        <div className="warehouse-manager mt-3">
            <div className="d-flex justify-content-between">
                <h4 className='mt-4'>Warehouses</h4>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    <AiOutlinePlus className="me-2" />
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        {/* Add Warehouse */}
                    </button>
                </caption>
            </div>

            <WarehouseTable warehouses={warehouses} onEdit={openModalToEdit} onDelete={deleteWarehouse} />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentWarehouse.id ? 'Edit Warehouse' : 'Add Warehouse'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WarehouseForm warehouse={currentWarehouse} setWarehouse={setCurrentWarehouse} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={saveWarehouse}>
                        {currentWarehouse.id ? 'Save Changes' : 'Add Warehouse'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const WarehouseTable = ({ warehouses, onEdit, onDelete }) => {
    // const row = [{ id: "name", title: "Name" }, { id: "address", title: "Address" }, { id: "capacity", title: "Capacity" }, { id: "supervisor", title: "Supervisor" }, { id: "temperatureControlled", title: "Temperature" }, { id: "status", title: "Status" }, { id: "actions", title: "Actions" }];
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    {/* {row.map((column, index) => <th key={index}>{column.title}</th>)} */}
                    <th>Name</th>
                    <th>Address</th>
                    <th>Capacity</th>
                    <th>Supervisor</th>
                    <th>Temperature Controlled</th>
                    <th>Status</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {warehouses.map((warehouse) => (
                    <tr key={warehouse.id} className='justify-content-center'>
                        <td>{warehouse.name}</td>
                        <td>{warehouse.address}</td>
                        <td>{warehouse.capacity}</td>
                        <td>{warehouse.supervisor}</td>
                        <td>{warehouse.temperatureControlled ? 'Yes' : 'No'}</td>
                        <td>{warehouse.status}</td>
                        <td className='text-center'>
                            <Button variant="light" onClick={() => onEdit(warehouse)}>
                                <BsPencilSquare className="bi my-1 me-2 fs-0" />
                            </Button>
                            <Button variant="light" onClick={() => onDelete(warehouse.id)}>
                                <BsTrash className="bi my-0 me-1 fs-0" />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const WarehouseForm = ({ warehouse, setWarehouse }) => {
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
                <Form.Control
                    type="text"
                    value={warehouse.supervisor}
                    onChange={(e) => setWarehouse({ ...warehouse, supervisor: e.target.value })}
                    required
                />
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
        id: 1,
        name: 'Warehouse 1',
        address: 'Address 1',
        capacity: 1000,
        supervisor: 'Supervisor 1',
        temperatureControlled: true,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Warehouse 2',
        address: 'Address 2',
        capacity: 2000,
        supervisor: 'Supervisor 2',
        temperatureControlled: false,
        status: 'Inactive',
    },
    // ... add more warehouse data as needed
];
