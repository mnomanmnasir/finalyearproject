import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';



const Order = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />
            {/* Order */}
            <OrderManager />
        </div>
    );
};

export default Order;

const OrderManager = () => {
    const [orders, setOrders] = useState(orderData);
    const [showModal, setShowModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({
        id: null,
        name: '',
        customerId: '',
        customerName: '',
        orderDate: '',
        status: '',
    });

    // Fetch orders function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setOrders(fetchOrdersFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentOrder({
            id: null,
            name: '',
            customerId: '',
            customerName: '',
            orderDate: '',
            status: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (order) => {
        setCurrentOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveOrder = () => {
        if (currentOrder.id) {
            // Update order in the list
            setOrders(
                orders.map((o) =>
                    o.id === currentOrder.id ? currentOrder : o
                )
            );
            toast.success('Order updated successfully');
        } else {
            // Add new order
            const newOrderWithId = { ...currentOrder, id: Date.now() };
            setOrders([...orders, newOrderWithId]);
            toast.success('Order added successfully');
        }
        setShowModal(false);
    };

    const deleteOrder = (orderId) => {
        setOrders(orders.filter((o) => o.id !== orderId));
        toast.info('Order deleted successfully');
    };

    return (
        <div className="order-manager mt-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Orders</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                    Add Order
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                    </button>
                </caption>
            </div>
            <OrderTable
                orders={orders}
                onEdit={openModalToEdit}
                onDelete={deleteOrder}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentOrder.id ? 'Edit Order' : 'Add Order'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderForm
                        order={currentOrder}
                        setOrder={setCurrentOrder}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveOrder}>
                        {currentOrder.id ? 'Save Changes' : 'Add Order'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const OrderTable = ({ orders, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th>Name</th>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.name}</td>
                        <td>{order.customerId}</td>
                        <td>{order.customerName}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>
                            <Button variant="light" className='btn-sm' onClick={() => onEdit(order)}>
                                <BsPencilSquare />
                            </Button>
                            <Button variant="light" className='btn-sm' onClick={() => onDelete(order.id)}>
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const OrderForm = ({ order, setOrder }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={order.name}
                    onChange={(e) => setOrder({ ...order, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Customer ID</Form.Label>
                <Form.Control
                    type="text"
                    value={order.customerId}
                    onChange={(e) => setOrder({ ...order, customerId: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                    type="text"
                    value={order.customerName}
                    onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Order Date</Form.Label>
                <Form.Control
                    type="text"
                    value={order.orderDate}
                    onChange={(e) => setOrder({ ...order, orderDate: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    value={order.status}
                    onChange={(e) => setOrder({ ...order, status: e.target.value })}
                    required
                />
            </Form.Group>
        </Form>
    );
};

const orderData = [
    {
        id: 1,
        name: 'Order 1',
        customerId: 'C001',
        customerName: 'Customer 1',
        orderDate: '2023-01-01',
        status: 'Pending',
    },
    {
        id: 2,
        name: 'Order 2',
        customerId: 'C002',
        customerName: 'Customer 2',
        orderDate: '2023-02-01',
        status: 'Shipped',
    },
    // ... add more order data as needed
];
