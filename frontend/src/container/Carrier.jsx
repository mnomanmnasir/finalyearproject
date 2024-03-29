import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';
import { baseUrl } from '../App';
import Axios from 'axios';
import Helmet from './Helmet'

const Carrier = () => {
    return (
        <div>
            {/* Carrier */}
            <CarrierManager />
        </div>
    );
};

export default Carrier;

const CarrierManager = () => {
    const [carriers, setCarriers] = useState(carrierData);
    const [showModal, setShowModal] = useState(false);
    const [currentCarrier, setCurrentCarrier] = useState({
        _id: null,
        name: '',
        contactPerson: '',
        contactNumber: '',
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchCarriersFromAPI = async () => {
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
        fetchCarriersFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentCarrier({
            _id: null,
            name: '',
            contactPerson: '',
            contactNumber: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (carrier) => {
        setCurrentCarrier(carrier);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // const saveCarrier = () => {
    //     if (currentCarrier._id) {
    //         // Update carrier in the list
    //         setCarriers(
    //             carriers.map((c) =>
    //                 c._id === currentCarrier._id ? currentCarrier : c
    //             )
    //         );
    //         toast.success('Carrier updated successfully');
    //     } else {
    //         // Add new carrier
    //         const newCarrierWithId = { ...currentCarrier, _id: Date.now() };
    //         setCarriers([...carriers, newCarrierWithId]);
    //         toast.success('Carrier added successfully');
    //     }
    //     setShowModal(false);
    // };


    const saveCarrier = async () => {
        // const apiUrl = `${baseUrl}/api/v1/carrier`;

        try {
            let response;

            if (currentCarrier._id) {
                // Update carrier - PUT request
                response = await Axios.put(`${baseUrl}/carrier`, currentCarrier);
                setCarriers(
                    carriers.map((c) =>
                        c._id === currentCarrier._id ? response.data : c
                    )
                );
                toast.success('Carrier updated successfully');
            } else {
                // Add new carrier - POST request
                response = await Axios.post(`${baseUrl}/carrier`, currentCarrier);
                const newCarrierWithId = { ...currentCarrier, _id: response.data._id };
                setCarriers([...carriers, newCarrierWithId]);
                toast.success('Carrier added successfully');
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error saving carrier', error);
            toast.error('Error saving carrier');
        }
    };

    // const deleteCarrier = (carrierId) => {
    //     setCarriers(carriers.filter((c) => c._id !== carrierId));
    //     toast.info('Carrier deleted successfully');
    // };

    const deleteCarrier = async (carrierId) => {
        try {
            await Axios.delete(`${baseUrl}/api/v1/carrier`, { carrierId: carrierId });
            setCarriers(carriers.filter((c) => c._id !== carrierId));
            toast.info('Carrier deleted successfully');
        } catch (error) {
            console.error('Error deleting carrier', error);
            toast.error('Error deleting carrier');
        }
    };

    return (
        <div className="carrier-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Carrier</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add Carrier
                    </button>
                </caption>
            </div>
            <CarrierTable
                carriers={carriers}
                onEdit={openModalToEdit}
                onDelete={deleteCarrier}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentCarrier._id ? 'Edit Carrier' : 'Add Carrier'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CarrierForm
                        carrier={currentCarrier}
                        setCarrier={setCurrentCarrier}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCarrier}>
                        {currentCarrier._id ? 'Save Changes' : 'Add Carrier'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const CarrierTable = ({ carriers, onEdit, onDelete }) => {
    return (
        <Helmet title='Add Carrier'>

            <table className="table table-hover table-bordered">
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {carriers.map((carrier) => (
                        <tr className='text-center' key={carrier._id}>
                            <td>{carrier.name}</td>
                            <td>{carrier.contactPerson}</td>
                            <td>{carrier.contactNumber}</td>
                            <td className='text-center'>
                                <Button variant="light" className='btn-sm' onClick={() => onEdit(carrier)}>
                                    <BsPencilSquare />
                                </Button>
                                <Button
                                    variant="light" className='btn-sm'
                                    onClick={() => onDelete(carrier._id)}
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

export const CarrierForm = ({ carrier, setCarrier }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={carrier.name}
                    onChange={(e) =>
                        setCarrier({ ...carrier, name: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                    type="text"
                    value={carrier.contactPerson}
                    onChange={(e) =>
                        setCarrier({ ...carrier, contactPerson: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type="text"
                    value={carrier.contactNumber}
                    onChange={(e) =>
                        setCarrier({ ...carrier, contactNumber: e.target.value })
                    }
                    required
                />
            </Form.Group>
        </Form>
    );
};

const carrierData = [
    {
        _id: 1,
        name: 'Carrier 1',
        contactPerson: 'John Doe',
        contactNumber: '123-456-7890',
    },
    {
        _id: 2,
        name: 'Carrier 2',
        contactPerson: 'Jane Doe',
        contactNumber: '987-654-3210',
    },
    // ... add more carrier data as needed
];
