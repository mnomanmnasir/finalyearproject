import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';
import Helmet from './Helmet';

const Supplier = () => {
    return (
        <div>
            {/* Supplier */}
            <SupplierManager />
        </div>
    );
};

export default Supplier;

const SupplierManager = () => {
    const [suppliers, setSuppliers] = useState(supplierData);
    const [showModal, setShowModal] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState({
        id: null,
        supplierName: '',
        contactPerson: '',
        contactNumber: '',
        email: '',
    });

    // Fetch suppliers function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setSuppliers(fetchSuppliersFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentSupplier({
            id: null,
            supplierName: '',
            contactPerson: '',
            contactNumber: '',
            email: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (supplier) => {
        setCurrentSupplier(supplier);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveSupplier = () => {
        if (currentSupplier.id) {
            // Update supplier in the list
            setSuppliers(
                suppliers.map((s) =>
                    s.id === currentSupplier.id ? currentSupplier : s
                )
            );
            toast.success('Supplier updated successfully');
        } else {
            // Add new supplier
            const newSupplierWithId = { ...currentSupplier, id: Date.now() };
            setSuppliers([...suppliers, newSupplierWithId]);
            toast.success('Supplier added successfully');
        }
        setShowModal(false);
    };

    const deleteSupplier = (supplierId) => {
        setSuppliers(suppliers.filter((s) => s.id !== supplierId));
        toast.info('Supplier deleted successfully');
    };

    return (
        <div className="supplier-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Suppliers</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    Add Supplier
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add Supplier
                    </button>
                </caption>
            </div>
            <SupplierTable
                suppliers={suppliers}
                onEdit={openModalToEdit}
                onDelete={deleteSupplier}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentSupplier.id ? 'Edit Supplier' : 'Add Supplier'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SupplierForm
                        supplier={currentSupplier}
                        setSupplier={setCurrentSupplier}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveSupplier}>
                        {currentSupplier.id ? 'Save Changes' : 'Add Supplier'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const SupplierTable = ({ suppliers, onEdit, onDelete }) => {
    return (
        <Helmet title='Add Supplier'>

            <table className="table table-hover table-bordered">
                <thead className='table-dark'>
                    <tr className='text-center'>
                        <th>Supplier Name</th>
                        <th>Contact Person</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((supplier) => (
                        <tr className='text-center' key={supplier.id}>
                            <td>{supplier.supplierName}</td>
                            <td>{supplier.contactPerson}</td>
                            <td>{supplier.contactNumber}</td>
                            <td>{supplier.email}</td>
                            <td>
                                <Button variant="light" className='btn-sm' onClick={() => onEdit(supplier)}>
                                    <BsPencilSquare />
                                </Button>
                                <Button
                                    variant="light" className='btn-sm'
                                    onClick={() => onDelete(supplier.id)}
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

export const SupplierForm = ({ supplier, setSupplier }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                    type="text"
                    value={supplier.supplierName}
                    onChange={(e) =>
                        setSupplier({ ...supplier, supplierName: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Person</Form.Label>
                <Form.Control
                    type="text"
                    value={supplier.contactPerson}
                    onChange={(e) =>
                        setSupplier({ ...supplier, contactPerson: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type="text"
                    value={supplier.contactNumber}
                    onChange={(e) =>
                        setSupplier({ ...supplier, contactNumber: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={supplier.email}
                    onChange={(e) =>
                        setSupplier({ ...supplier, email: e.target.value })
                    }
                    required
                />
            </Form.Group>
        </Form>
    );
};

const supplierData = [
    {
        id: 1,
        supplierName: 'Supplier 1',
        contactPerson: 'John Doe',
        contactNumber: '123-456-7890',
        email: 'supplier1@example.com',
    },
    {
        id: 2,
        supplierName: 'Supplier 2',
        contactPerson: 'Jane Doe',
        contactNumber: '987-654-3210',
        email: 'supplier2@example.com',
    },
    // ... add more supplier data as needed
];
