import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';
import Helmet from './Helmet'
import { baseUrl } from '../App';
import Axios from 'axios';


const Shipment = () => {
    return (
        <div>

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
        _id: null,
        name: '',
        date: '',
        arrivalDate: '',
        status: '',
        orderId: '',
        carrierId: '',
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchShipmentsFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/shipments');
            setShipments(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipmentsFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentShipment({
            _id: null,
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

    // const saveShipment = () => {
    //     if (currentShipment._id) {
    //         // Update shipment in the list
    //         setShipments(
    //             shipments.map((s) =>
    //                 s._id === currentShipment._id ? currentShipment : s
    //             )
    //         );
    //         toast.success('Shipment updated successfully');
    //     } else {
    //         // Add new shipment
    //         const newShipmentWithId = { ...currentShipment, id: Date.now() };
    //         setShipments([...shipments, newShipmentWithId]);
    //         toast.success('Shipment added successfully');
    //     }
    //     setShowModal(false);
    // };

    const saveShipment = async () => {
        // const apiUrl = `${baseUrl}/api/v1/shipment`;

        try {
            let response;

            if (currentShipment._id) {
                // Update shipment - PUT request
                response = await Axios.put(`${baseUrl}/shipment`, currentShipment);
                setShipments(
                    shipments.map((s) =>
                        s._id === currentShipment._id ? response.data : s
                    )
                );
                toast.success('Shipment updated successfully');
            } else {
                // Add new shipment - POST request
                response = await Axios.post(`${baseUrl}/shipment`, currentShipment);
                const newShipmentWithId = { ...currentShipment, _id: response.data._id };
                setShipments([...shipments, newShipmentWithId]);
                toast.success('Shipment added successfully');
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error saving shipment', error);
            toast.error('Error saving shipment');
        }
    };


    // const deleteShipment = (shipmentId) => {
    //     setShipments(shipments.filter((s) => s._id !== shipmentId));
    //     toast.info('Shipment deleted successfully');
    // };

    const deleteShipment = async (shipmentId) => {
        try {
            await Axios.delete(`${baseUrl}/${shipmentId}`);
            setShipments(shipments.filter((s) => s._id !== shipmentId));
            toast.info('Shipment deleted successfully');
        } catch (error) {
            console.error('Error deleting shipment', error);
            toast.error('Error deleting shipment');
        }
    };

    return (
        <div className="shipment-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Shipment</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add Shipment
                    </button>
                </caption>
            </div>
            <ShipmentTable
                shipments={shipments}
                onEdit={openModalToEdit}
                onDelete={deleteShipment}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentShipment._id ? 'Edit Shipment' : 'Add Shipment'}
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
                        {currentShipment._id ? 'Save Changes' : 'Add Shipment'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const ShipmentTable = ({ shipments, onEdit, onDelete }) => {

    return (
        <Helmet title='Shipments System'>

            <table className="table table-hover table-bordered">
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Arrival Date</th>
                        <th>Status</th>
                        <th>Order ID</th>
                        <th>Carrier ID</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr className='text-center' key={shipment._id}>
                            <td>{shipment.name}</td>
                            <td>{shipment.date}</td>
                            <td>{shipment.arrivalDate}</td>
                            <td>{shipment.status}</td>
                            <td>{shipment.order ? shipment.order.name + " " + shipment.order._id : ""}</td>
                            <td>{shipment.carrier ? shipment.carrier.name + " " + shipment.carrier._id : ""}</td>
                            <td className='text-center'>
                                <Button variant="light" className='btn-sm' onClick={() => onEdit(shipment)}>
                                    <BsPencilSquare />
                                </Button>
                                <Button
                                    variant="light" className='btn-sm'
                                    onClick={() => onDelete(shipment._id)}
                                >
                                    <BsTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Helmet>
    );
};

export const ShipmentForm = ({ shipment, setShipment }) => {
    const [orders, setOrders] = useState([]);
    const [carriers, setCarriers] = useState([]);

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchOrdersFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    const fetchCarrierFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/carriers');
            setCarriers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarrierFromAPI();
        fetchOrdersFromAPI();
    }, []);
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

            <div className='row'>
                <div className='col-md-6'>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={shipment.date}
                            onChange={(e) => setShipment({ ...shipment, date: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
                <div className='col-md-6'>
                    <Form.Group>
                        <Form.Label>Arrival Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={shipment.arrivalDate}
                            onChange={(e) => setShipment({ ...shipment, arrivalDate: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>

            </div>


            {/* <Form.Group>
                <Form.Label>Order ID</Form.Label>
                <Form.Control
                    type="text"
                    value={shipment.orderId}
                    onChange={(e) => setShipment({ ...shipment, orderId: e.target.value })}
                    required
                />
            </Form.Group> */}
            <Form.Group>
                <Form.Label>Order ID</Form.Label>
                <Form.Control
                    as="select"
                    value={shipment.order && shipment.order._id}
                    onChange={(e) => setShipment({ ...shipment, order: e.target.value })}
                    required
                >
                    <option value="">Select Order</option>
                    {orders && orders.map((order) => (
                        <option key={order._id} value={order._id}>
                            {order.name} - {order._id}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Carrier ID</Form.Label>
                <Form.Control
                    as="select"
                    value={shipment.carrier && shipment.carrier._id}
                    onChange={(e) => setShipment({ ...shipment, carrier: e.target.value })}
                    required
                >
                    <option value="">Select carrier</option>
                    {carriers && carriers.map((carrier) => (
                        <option key={carrier._id} value={carrier._id}>
                            {carrier.name} - {carrier._id}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    value={shipment.status}
                    onChange={(e) => setShipment({ ...shipment, status: e.target.value })}
                    required
                >
                    <option value="">Select Status</option>
                    {/* Replace these options with your actual shipment statuses */}
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="delayed">Delayed</option>
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

const shipmentData = [
    {
        _id: 1,
        name: 'Shipment 1',
        date: '2023-01-15',
        arrivalDate: '2023-01-20',
        status: 'Shipped',
        orderId: 'O001',
        carrierId: 'C001',
    },
    {
        _id: 2,
        name: 'Shipment 2',
        date: '2023-02-10',
        arrivalDate: '2023-02-15',
        status: 'In Transit',
        orderId: 'O002',
        carrierId: 'C002',
    },
    // ... add more shipment data as needed
];
