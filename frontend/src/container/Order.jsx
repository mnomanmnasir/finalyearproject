import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash, BsDashCircle } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus, AiOutlineCheck, AiOutlineCloseCircle } from 'react-icons/ai';
import { baseUrl } from '../App';
import Axios from 'axios';


const Order = () => {
    return (
        <div>
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

    useEffect(() => {
        fetchOrdersFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentOrder({
            _id: null,
            name: '',
            customerId: '',
            customerName: '',
            orderDate: '',
            status: '',
            products: [{ name: '', quantity: 0, unitPrice: 0 }],
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

        // Validate required fields
        //   if (!currentOrder.name || !currentOrder.customer || !currentOrder.status) {
        //     toast.warn('Please fill in all required fields.');
        //     return;
        // }

        const totalPayment = currentOrder.products.reduce((total, product) => {
            return total + (product.quantity || 0) * (product.unitPrice || 0);
        }, 0);

        const updatedOrder = {
            ...currentOrder,
            pay: totalPayment,
        };

        if (currentOrder._id) {
            // Update order in the list
            setOrders(
                orders.map((o) =>
                    o._id === currentOrder._id ? currentOrder : o
                )
            );
            toast.success('Order updated successfully');
        } else {
            // Add new order
            const newOrderWithId = { ...currentOrder, _id: Date.now() };
            setOrders([...orders, newOrderWithId]);
            toast.success('Order added successfully');
        }
        setShowModal(false);
    };

    const deleteOrder = (orderId) => {
        setOrders(orders.filter((o) => o._id !== orderId));
        toast.info('Order deleted successfully');
    };

    return (
        <div className="order-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Orders</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>

                <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add Order
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
                        {currentOrder._id ? 'Edit Order' : 'Add Order'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                    <OrderForm
                        order={currentOrder}
                        setOrder={setCurrentOrder}
                    />
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
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
                <tr className='text-center'>
                    <th>Name</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Products</th>
                    <th>Payment</th>
                    <th>Advance</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr className='text-center' key={order._id}>
                        <td>{order.name}</td>
                        <td>{order.customer ? order.customer.name : ""}</td>
                        <td>{order.customer ? order.customer.contactNumber : ""}</td>
                        <td>{order.customer ? order.customer.email : ""}</td>
                        <td>{order.products ? order.products.length : 0}</td>
                        <td>{order.pay}</td>
                        <td>{order.advance}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status == true ? "true" : "false"}</td>
                        <td>
                            <Button variant="light" className='btn-sm' onClick={() => onEdit(order)}>
                                <BsPencilSquare />
                            </Button>
                            <Button variant="light" className='btn-sm' onClick={() => onDelete(order._id)}>
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

    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...order.products];
        updatedProducts[index][key] = value;

        // If the product name is changed, update the unit price as well
        if (key === 'name') {
            const selectedProduct = products.find(product => product.name === value);
            if (selectedProduct) {
                updatedProducts[index]['_id'] = selectedProduct._id;
                updatedProducts[index]['name'] = selectedProduct.name;
                updatedProducts[index]['unitPrice'] = selectedProduct.unitPrice || 0;
            }
        }

        // Calculate total payment based on quantity and unit price
        const totalPayment = updatedProducts.reduce((total, product) => {
            return total + (product.quantity || 0) * (product.unitPrice || 0);
        }, 0);

        setOrder({ ...order, products: updatedProducts, pay: totalPayment });
    };

    const addProduct = () => {
        setOrder({
            ...order,
            products: [...order.products, { name: '', quantity: 0 }],
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...order.products];
        updatedProducts.splice(index, 1);
        setOrder({ ...order, products: updatedProducts });
    };

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');

    const fetchProductsFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // fetchordersFromAPI();
        fetchProductsFromAPI();
    }, []);
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
                <div className='d-flex justify-content-between'>
                    <p>Products</p>
                    <Button variant="light" className='btn-sm' onClick={addProduct}>
                        Add Product
                    </Button>
                </div>
                {order.products.map((product, index) => (
                    // <div key={index} className="d-flex mb-2">
                    <div className='d-flex justify-content-center'>
                        <div className="row" key={index} >
                            <div className="col-md-6">
                                <Form.Label>Name</Form.Label>
                                {/* <Form.Control
                                    type="text"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    required
                                /> */}
                                <input
                                    list="productNames"
                                    className="form-control"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    required
                                />
                                <datalist id="productNames">
                                    {products.map((prod, idx) => (
                                        <option key={idx} value={prod.name} onSelect={() => setId(prod._id)} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="col-md-3 ">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Quantity"
                                    value={product.quantity}
                                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || '')}
                                    required
                                />
                            </div>
                            <div className="col-md-3 ">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Unit Price"
                                    value={product.unitPrice}
                                    onChange={(e) => handleProductChange(index, 'unitPrice', parseInt(e.target.value) || '')}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-1 ">
                            <Button variant="light" className="ml-2 btn-sm" onClick={() => removeProduct(index)}>
                                <BsDashCircle />
                            </Button>
                        </div>
                    </div>

                ))}

            </Form.Group>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Payment</Form.Label>
                        <Form.Control
                            type="text"
                            value={order.pay}
                            onChange={(e) => setOrder({ ...order, pay: e.target.value })}
                            disabled={order.products.some(product => product.quantity && product.unitPrice)}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Advance</Form.Label>
                        <Form.Control
                            type="number"
                            value={order.advance}
                            onChange={(e) => setOrder({ ...order, advance: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>
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
        _id: 1,
        name: 'Order 1',
        customer: {
            name: 'Customer 1',
            contactNumber: "asdasd",
            email: "asdads"
        },
        orderDate: '2023-01-01',
        status: 'Pending',
        products: [
            { name: 'Product A', quantity: 10, unitPrice: 10 },
            { name: 'Product B', quantity: 20, unitPrice: 20 },
        ],
    },
    {
        _id: 2,
        name: 'Order 2',
        customer: {
            name: 'Customer 1',
            contactNumber: "asdasd",
            email: "asdads"
        },
        orderDate: '2023-02-01',
        status: 'Shipped',
        products: [
            { name: 'Product A', quantity: 10, unitPrice: 10 },
            { name: 'Product B', quantity: 20, unitPrice: 20 },
        ],
    },
    // ... add more order data as needed
];
