import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';


const Customer = () => {
    return (
        <div>
            {/* Customer */}
            <CustomerManager />
        </div>
    );
};

export default Customer;

const CustomerManager = () => {
    const [customers, setCustomers] = useState(customerData);
    const [showModal, setShowModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({
        id: null,
        name: '',
        contactNumber: '',
        email: '',
    });

    // Fetch customers function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setCustomers(fetchCustomersFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentCustomer({
            id: null,
            name: '',
            contactNumber: '',
            email: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (customer) => {
        setCurrentCustomer(customer);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveCustomer = () => {
        if (currentCustomer.id) {
            // Update customer in the list
            setCustomers(
                customers.map((c) =>
                    c.id === currentCustomer.id ? currentCustomer : c
                )
            );
            toast.success('Customer updated successfully');
        } else {
            // Add new customer
            const newCustomerWithId = { ...currentCustomer, id: Date.now() };
            setCustomers([...customers, newCustomerWithId]);
            toast.success('Customer added successfully');
        }
        setShowModal(false);
    };

    const deleteCustomer = (customerId) => {
        setCustomers(customers.filter((c) => c.id !== customerId));
        toast.info('Customer deleted successfully');
    };

    return (
        <div className="customer-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Customer</h3>
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" /> customer
                        {/* Add Customer */}
                    </button>
                </caption>
            </div>
            <CustomerTable
                customers={customers}
                onEdit={openModalToEdit}
                onDelete={deleteCustomer}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentCustomer.id ? 'Edit Customer' : 'Add Customer'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomerForm
                        customer={currentCustomer}
                        setCustomer={setCurrentCustomer}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveCustomer}>
                        {currentCustomer.id ? 'Save Changes' : 'Add Customer'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const CustomerTable = ({ customers, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Contact Number</th>
                    <th className='text-center'>Email</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer) => (
                    <tr className='text-center' key={customer.id}>
                        <td className='text-center'>{customer.name}</td>
                        <td className='text-center'>{customer.contactNumber}</td>
                        <td className='text-center'>{customer.email}</td>
                        <td className='text-center'>
                            <Button variant="light" className='btn-sm' onClick={() => onEdit(customer)}>
                                <BsPencilSquare />
                            </Button>
                            <Button
                                variant="light" className='btn-sm'
                                onClick={() => onDelete(customer.id)}>
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const CustomerForm = ({ customer, setCustomer }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type="text"
                    value={customer.contactNumber}
                    onChange={(e) =>
                        setCustomer({ ...customer, contactNumber: e.target.value })
                    }
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    required
                />
            </Form.Group>
        </Form>
    );
};

const customerData = [
    {
        id: 1,
        name: 'Customer 1',
        contactNumber: '123-456-7890',
        email: 'customer1@example.com',
    },
    {
        id: 2,
        name: 'Customer 2',
        contactNumber: '987-654-3210',
        email: 'customer2@example.com',
    },
    // ... add more customer data as needed
];
