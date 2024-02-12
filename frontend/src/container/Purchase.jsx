import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash, BsDashCircle } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { baseUrl } from '../App';
import Axios from 'axios';
import Helmet from './Helmet'

const Purchase = ({ Toggle }) => {
    return (
        <div>
            {/* <Navbar Toggle={Toggle} /> */}
            <PurchaseManager />
        </div>
    );
};

export default Purchase;

const PurchaseManager = () => {
    const [purchases, setPurchases] = useState(purchaseData);
    const [showModal, setShowModal] = useState(false);
    const [currentPurchase, setCurrentPurchase] = useState({
        _id: null,
        company: '',
        contact: '',
        email: '',
        pay: '',
        advance: '',
        status: '',
        reference: '',
        // user: '',
        products: [],
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const fetchPurchasesFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/purchases');
            setPurchases(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchasesFromAPI();
    }, []);

    const openModalToAdd = () => {
        setCurrentPurchase({
            _id: null,
            company: '',
            contact: '',
            email: '',
            pay: '',
            advance: "",
            warehouseId: "",
            status: '',
            reference: '',
            // user: '',
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

        if (currentPurchase._id) {
            // Update purchase in the list
            console.log("updating purchase", currentPurchase);
            Axios.put(baseUrl + "/purchase", currentPurchase)
                .then(response => {
                    setPurchases(
                        purchases.map(p =>
                            p._id === currentPurchase._id ? response.data : p
                        )
                    );
                    toast.success('Purchase updated successfully');
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('Error updating purchase');
                });
        } else {
            // Add new purchase
            console.log("adding purchase", currentPurchase);
            Axios.post(baseUrl + "/purchase", currentPurchase)
                .then(response => {
                    setPurchases([...purchases, response.data]);
                    toast.success('Purchase added successfully');
                })
                .catch(error => {
                    console.error('Error:', error);
                    toast.error('Error adding purchase');
                });
        }
        setShowModal(false);
    };

    const deletePurchase = (purchaseId) => {
        setPurchases(purchases.filter((p) => p._id !== purchaseId));
        toast.info('Purchase deleted successfully');
    };

    return (
        <Helmet>

            <div className="purchase-manager m-2">
                <div className="d-flex justify-content-between">
                    <h3>Purchase</h3>
                    <Button className="mb-3 btn-sm btn-secondary" onClick={openModalToAdd}>
                        Add Purchase
                    </Button>
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
                            {currentPurchase._id ? 'Save Changes' : 'Add Purchase'}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer position="top-right" autoClose={5000} />
            </div>
        </Helmet>
    );
};


const ProductModal = ({ showProductModal, handleCloseProductModal, data }) => {
    // Example product data
    // const products = [
    //     { id: 1, name: 'Product 1', price: '$20.00' },
    //     { id: 2, name: 'Product 2', price: '$25.00' },
    //     // Add more products as needed
    // ];

    return (
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
            <Modal.Header closeButton>
                <Modal.Title>Product List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Table to display products */}
                {console.log(data)}
                <table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            {/* <th>ID</th> */}
                            <th>Product Name</th>
                            <th>quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <td>{product.product.name}</td>
                                <td>{product.quantity}</td>
                                <td>{product.product.unitPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseProductModal}>
                    Close
                </Button>
                {/* Add additional buttons if needed */}
            </Modal.Footer>
        </Modal>
    );
};

export const PurchaseTable = ({ purchases, onEdit, onDelete }) => {

    const [productModal, setProductModal] = useState(false);
    const [productData, setProductData] = useState([]);

    const handleShowProductModal = (products) => {
        setProductData(products);
        setProductModal(true)
    };
    const handleCloseProductModal = () => setProductModal(false);

    return (
        <Helmet title='Purchase Order'>
            <div>
                <ProductModal showProductModal={productModal} data={productData} handleCloseProductModal={handleCloseProductModal} />

                <table className="table table-hover table-bordered">
                    <thead className='table-dark'>
                        <tr className='text-center'>
                            <th>Company</th>
                            <th className='text-center'>Contact</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Payment</th>
                            <th className='text-center'>Items</th>
                            <th className='text-center'>Advance</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Reference</th>
                            {/* <th>User</th> */}
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index}>
                                <td>{purchase.company}</td>
                                <td className='text-center'>{purchase.contact}</td>
                                <td className='text-center'>{purchase.email}</td>
                                <td className='text-center'>{purchase.pay}</td>
                                <td className='text-center' onClick={() => handleShowProductModal(purchase.products)}>{purchase.products.length}</td>
                                <td className='text-center'>{purchase.advance}</td>
                                <td className='text-center'>{purchase.status}</td>
                                <td className='text-center'>{purchase.reference}</td>
                                {/* <td>{purchase.user}</td> */}
                                <td className='text-center'>
                                    <Button variant="light" className='btn-sm' onClick={() => onEdit(purchase)}>
                                        <BsPencilSquare />
                                    </Button>
                                    <Button
                                        variant="light"
                                        className='btn-sm'
                                        onClick={() => onDelete(purchase.id)}
                                    >
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Helmet>
    );
};

export const PurchaseForm = ({ purchase, setPurchase }) => {
    // const handleProductChange = (index, key, value) => {
    //     const updatedProducts = [...purchase.products];
    //     updatedProducts[index][key] = value;
    //     setPurchase({ ...purchase, products: updatedProducts });
    // };
    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...purchase.products];
        updatedProducts[index][key] = value;

        // If the product name is changed, update the unit price as well
        if (key === 'name') {
            const selectedProduct = products.find(product => product.name === value);
            if (selectedProduct) {
                updatedProducts[index]['_id'] = selectedProduct._id;
                updatedProducts[index]['name'] = selectedProduct.name;
                updatedProducts[index]['unitPrice'] = selectedProduct.unitPrice;
            }
        }

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

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    // const [payment, setPayment] = useState(0); // Error state
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
        // fetchPurchasesFromAPI();
        fetchProductsFromAPI();
    }, []);

    purchase.pay = purchase.products.reduce((acc, product) => {
        return acc + (product.quantity * product.unitPrice);
    }, 0);

    purchase.advance = purchase.pay * 0.25;
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
                                    value={product.product && product.product.name}
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
                                    value={product.product && product.product.unitPrice}
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

            {/* {setPayment(purchase.products.reduce((acc, product) => {
                return acc + (product.quantity * product.unitPrice);
            }, 0))} */}
            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>Payment</Form.Label>
                        <Form.Control
                            type="text"
                            // value={purchase.pay}
                            value={purchase.pay}
                            onChange={(e) => setPurchase({ ...purchase, pay: e.target.value })}
                            required
                            disabled
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
                            disabled
                        />
                    </Form.Group>
                </div>
            </div>

            <Form.Group>
                <Form.Label>Status</Form.Label>
                {/* <Form.Control
                    type="text"
                    value={purchase.status}
                    onChange={(e) => setPurchase({ ...purchase, status: e.target.value })}
                    required
                /> */}
                <Form.Control
                    as="select"
                    value={purchase.status}
                    onChange={(e) => setPurchase({ ...purchase, status: e.target.value })}
                    required
                >
                    <option value="ordered" selected>Ordered</option>
                    <option value="received">Received</option>
                    <option value="cancelled">Cancelled</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Reference</Form.Label>
                <Form.Control
                    type="text"
                    value={purchase.reference}
                    onChange={(e) => setPurchase({ ...purchase, reference: e.target.value })}
                    required
                />
            </Form.Group>

        </Form>
    );
};

const purchaseData = [
    {
        _id: 1,
        company: 'ABC Corp',
        contact: 'John Doe',
        email: 'john@example.com',
        pay: 'Credit Card',
        advance: "5000",
        status: 'Pending',
        reference: 'REF123',
        // user: 'User1',
        warehouseId: 'p1',
        products: [
            { name: 'Product A', quantity: 10, unitPrice: 10 },
            { name: 'Product B', quantity: 20, unitPrice: 20 },
        ],
    },
    {
        _id: 2,
        company: 'XYZ Ltd',
        contact: 'Jane Smith',
        email: 'jane@example.com',
        pay: 'Wire Transfer',
        advance: "7000",
        status: 'Completed',
        reference: 'REF456',
        warehouseId: 'p2',
        // user: 'User2',
        products: [
            { name: 'Product C', quantity: 15, unitPrice: 15 },
            { name: 'Product D', quantity: 25, unitPrice: 25 },
        ],
    },
    // ... add more purchase data as needed
];

