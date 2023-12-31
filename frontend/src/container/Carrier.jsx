import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';


const Carrier = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />
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
        id: null,
        name: '',
        contactPerson: '',
        contactNumber: '',
    });

    // Fetch carriers function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setCarriers(fetchCarriersFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentCarrier({
            id: null,
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

    const saveCarrier = () => {
        if (currentCarrier.id) {
            // Update carrier in the list
            setCarriers(
                carriers.map((c) =>
                    c.id === currentCarrier.id ? currentCarrier : c
                )
            );
            toast.success('Carrier updated successfully');
        } else {
            // Add new carrier
            const newCarrierWithId = { ...currentCarrier, id: Date.now() };
            setCarriers([...carriers, newCarrierWithId]);
            toast.success('Carrier added successfully');
        }
        setShowModal(false);
    };

    const deleteCarrier = (carrierId) => {
        setCarriers(carriers.filter((c) => c.id !== carrierId));
        toast.info('Carrier deleted successfully');
    };

    return (
        <div className="carrier-manager mt-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Carrier</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    Add Carrier
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
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
                        {currentCarrier.id ? 'Edit Carrier' : 'Add Carrier'}
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
                        {currentCarrier.id ? 'Save Changes' : 'Add Carrier'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const CarrierTable = ({ carriers, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Contact Number</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {carriers.map((carrier) => (
                    <tr key={carrier.id}>
                        <td>{carrier.name}</td>
                        <td>{carrier.contactPerson}</td>
                        <td>{carrier.contactNumber}</td>
                        <td className='text-center'>
                            <Button variant="light" onClick={() => onEdit(carrier)}>
                                <BsPencilSquare />
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => onDelete(carrier.id)}
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
        id: 1,
        name: 'Carrier 1',
        contactPerson: 'John Doe',
        contactNumber: '123-456-7890',
    },
    {
        id: 2,
        name: 'Carrier 2',
        contactPerson: 'Jane Doe',
        contactNumber: '987-654-3210',
    },
    // ... add more carrier data as needed
];
