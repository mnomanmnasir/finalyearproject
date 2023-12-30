import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash, BsDashCircle } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';


const Purchase = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />

            <PurchaseManager />
        </div>
    );
};

export default Purchase;

const PurchaseManager = () => {
    const [purchases, setPurchases] = useState(purchaseData);
    const [showModal, setShowModal] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState({
        id: null,
        company: '',
        contact: '',
        email: '',
        payment: '',
        advance: 0,
        status: '',
        reference: '',
        user: '',
        products: [],
    });

    // Fetch purchases function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setPurchases(fetchPurchasesFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentPurchase({
            id: null,
            company: '',
            contact: '',
            email: '',
            payment: '',
            advance: 0,
            status: '',
            reference: '',
            user: '',
            products: [],
        });
        setShowModal(true);
    };

    const openModalToEdit = (purchase) => {
        setCurrentPurchase(purchase);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const savePurchase = () => {
        if (currentPurchase.id) {
            // Update purchase in the list
            setPurchases(
                purchases.map((p) =>
                    p.id === currentPurchase.id ? currentPurchase : p
                )
            );
            toast.success('Purchase updated successfully');
        } else {
            // Add new purchase
            console.log("adding purchase", currentPurchase);
            const newPurchaseWithId = { ...currentPurchase, id: Date.now() };
            setPurchases([...purchases, newPurchaseWithId]);
            toast.success('Purchase added successfully');
        }
        setShowModal(false);
    };

    const deletePurchase = (purchaseId) => {
        setPurchases(purchases.filter((p) => p.id !== purchaseId));
        toast.info('Purchase deleted successfully');
    };

    return (
        <div className="purchase-manager mt-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Purchase</h3>
                {/* <Button className="mb-3" onClick={openModalToAdd}>
                    Add Purchase
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                    </button>
                </caption>
            </div>
            <PurchaseTable
                purchases={purchases}
                onEdit={openModalToEdit}
                onDelete={deletePurchase}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentPurchase.id ? 'Edit Purchase' : 'Add Purchase'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PurchaseForm
                        purchase={currentPurchase}
                        setPurchase={setCurrentPurchase}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={savePurchase}>
                        {currentPurchase.id ? 'Save Changes' : 'Add Purchase'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const PurchaseTable = ({ purchases, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Payment</th>
                    <th>Advance</th>
                    <th>Status</th>
                    <th>Reference</th>
                    <th>User</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                        <td>{purchase.company}</td>
                        <td>{purchase.contact}</td>
                        <td>{purchase.email}</td>
                        <td>{purchase.payment}</td>
                        <td>{purchase.advance}</td>
                        <td>{purchase.status}</td>
                        <td>{purchase.reference}</td>
                        <td>{purchase.user}</td>
                        <td className='text-center'>
                            <Button variant="light" onClick={() => onEdit(purchase)}>
                                <BsPencilSquare />
                            </Button>
                            <Button
                                variant="light"
                                onClick={() => onDelete(purchase.id)}
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

export const PurchaseForm = ({ purchase, setPurchase }) => {
    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...purchase.products];
        updatedProducts[index][key] = value;
        setPurchase({ ...purchase, products: updatedProducts });
    };

    const addProduct = () => {
        setPurchase({
            ...purchase,
            products: [...purchase.products, { name: '', quantity: 0 }],
        });
    };

    const removeProduct = (index) => {
        const updatedProducts = [...purchase.products];
        updatedProducts.splice(index, 1);
        setPurchase({ ...purchase, products: updatedProducts });
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control
                    type="text"
                    value={purchase.company}
                    onChange={(e) => setPurchase({ ...purchase, company: e.target.value })}
                    required
                />
            </Form.Group>

            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={purchase.email}
                            onChange={(e) => setPurchase({ ...purchase, email: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            value={purchase.contact}
                            onChange={(e) => setPurchase({ ...purchase, contact: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>
            <Form.Group>
                <div className='d-flex justify-content-between'>
                    <p>Products</p>
                    <Button variant="light" className='btn-sm' onClick={addProduct}>
                        Add Product
                    </Button>
                </div>
                {purchase.products.map((product, index) => (
                    // <div key={index} className="d-flex mb-2">
                    <div className='d-flex justify-content-center'>
                        <div className="row" key={index} >
                            <div className="col-md-6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Product Name"
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-3 ">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Quantity"
                                    value={product.quantity}
                                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                    required
                                />
                            </div>
                            <div className="col-md-3 ">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Unit Price"
                                    value={product.unitPrice}
                                    onChange={(e) => handleProductChange(index, 'unitPrice', parseInt(e.target.value) || 0)}
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
                            value={purchase.payment}
                            onChange={(e) => setPurchase({ ...purchase, payment: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Advance</Form.Label>
                        <Form.Control
                            type="number"
                            value={purchase.advance}
                            onChange={(e) => setPurchase({ ...purchase, advance: parseInt(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>

            {/* <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    type="text"
                    value={purchase.status}
                    onChange={(e) => setPurchase({ ...purchase, status: e.target.value })}
                    required
            />
            </Form.Group> */}
            <Form.Group>
                <Form.Label>Reference</Form.Label>
                <Form.Control
                    type="text"
                    value={purchase.reference}
                    onChange={(e) => setPurchase({ ...purchase, reference: e.target.value })}
                    required
                />
            </Form.Group>
            {/* <Form.Group>
                <Form.Label>User</Form.Label>
                <Form.Control
                    type="text"
                    value={purchase.user}
                    onChange={(e) => setPurchase({ ...purchase, user: e.target.value })}
                    required
                />
            </Form.Group> */}

        </Form>
    );
};

const purchaseData = [
    {
        id: 1,
        company: 'ABC Corp',
        contact: 'John Doe',
        email: 'john@example.com',
        payment: 'Credit Card',
        advance: 5000,
        status: 'Pending',
        reference: 'REF123',
        user: 'User1',
        products: [
            { name: 'Product A', quantity: 10, unitPrice: 10 },
            { name: 'Product B', quantity: 20, unitPrice: 20 },
        ],
    },
    {
        id: 2,
        company: 'XYZ Ltd',
        contact: 'Jane Smith',
        email: 'jane@example.com',
        payment: 'Wire Transfer',
        advance: 7000,
        status: 'Completed',
        reference: 'REF456',
        user: 'User2',
        products: [
            { name: 'Product C', quantity: 15, unitPrice: 15 },
            { name: 'Product D', quantity: 25, unitPrice: 25 },
        ],
    },
    // ... add more purchase data as needed
];
