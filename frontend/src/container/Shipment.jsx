import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';

const Shipment = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />
            {/* Shipment */}
            <ShipmentManager />
        </div>
    );
};

export default Shipment;

const ShipmentManager = () => {
    const [shipments, setShipments] = useState(shipmentData);
    const [showModal, setShowModal] = useState(false);
    const [currentShipment, setCurrentShipment] = useState({
        id: null,
        name: '',
        date: '',
        arrivalDate: '',
        status: '',
        orderId: '',
        carrierId: '',
    });

    // Fetch shipments function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setShipments(fetchShipmentsFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentShipment({
            id: null,
            name: '',
            date: '',
            arrivalDate: '',
            status: '',
            orderId: '',
            carrierId: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (shipment) => {
        setCurrentShipment(shipment);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveShipment = () => {
        if (currentShipment.id) {
            // Update shipment in the list
            setShipments(
                shipments.map((s) =>
                    s.id === currentShipment.id ? currentShipment : s
                )
            );
            toast.success('Shipment updated successfully');
        } else {
            // Add new shipment
            const newShipmentWithId = { ...currentShipment, id: Date.now() };
            setShipments([...shipments, newShipmentWithId]);
            toast.success('Shipment added successfully');
        }
        setShowModal(false);
    };

    const deleteShipment = (shipmentId) => {
        setShipments(shipments.filter((s) => s.id !== shipmentId));
        toast.info('Shipment deleted successfully');
    };

    return (
        <div className="shipment-manager">
            <div className="d-flex justify-content-between">
                <h3>Shipment</h3>
                <Button className="mb-3" onClick={openModalToAdd}>
                    Add Shipment
                </Button>
            </div>
            <ShipmentTable
                shipments={shipments}
                onEdit={openModalToEdit}
                onDelete={deleteShipment}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentShipment.id ? 'Edit Shipment' : 'Add Shipment'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShipmentForm
                        shipment={currentShipment}
                        setShipment={setCurrentShipment}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveShipment}>
                        {currentShipment.id ? 'Save Changes' : 'Add Shipment'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const ShipmentTable = ({ shipments, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Arrival Date</th>
                    <th>Status</th>
                    <th>Order ID</th>
                    <th>Carrier ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {shipments.map((shipment) => (
                    <tr key={shipment.id}>
                        <td>{shipment.name}</td>
                        <td>{shipment.date}</td>
                        <td>{shipment.arrivalDate}</td>
                        <td>{shipment.status}</td>
                        <td>{shipment.orderId}</td>
                        <td>{shipment.carrierId}</td>
                        <td>
                            <Button variant="light" onClick={() => onEdit(shipment)}>
                                <BsPencilSquare />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onDelete(shipment.id)}
                            >
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const ShipmentForm = ({ shipment, setShipment }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.name}
                    onChange={(e) => setShipment({ ...shipment, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.date}
                    onChange={(e) => setShipment({ ...shipment, date: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Arrival Date</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.arrivalDate}
                    onChange={(e) => setShipment({ ...shipment, arrivalDate: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.status}
                    onChange={(e) => setShipment({ ...shipment, status: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Order ID</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.orderId}
                    onChange={(e) => setShipment({ ...shipment, orderId: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Carrier ID</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.carrierId}
                    onChange={(e) => setShipment({ ...shipment, carrierId: e.target.value })}
                    required
                />
            </Form.Group>
        </Form>
    );
};

const shipmentData = [
    {
        id: 1,
        name: 'Shipment 1',
        date: '2023-01-15',
        arrivalDate: '2023-01-20',
        status: 'Shipped',
        orderId: 'O001',
        carrierId: 'C001',
    },
    {
        id: 2,
        name: 'Shipment 2',
        date: '2023-02-10',
        arrivalDate: '2023-02-15',
        status: 'In Transit',
        orderId: 'O002',
        carrierId: 'C002',
    },
    // ... add more shipment data as needed
];
