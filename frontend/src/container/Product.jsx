import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const Product = ({ Toggle }) => {
    return (
        <div>
            <Navbar Toggle={Toggle} />
            {/* Product */}
            <ProductManager />
        </div>
    );
}

export default Product;

const ProductManager = () => {
    const [products, setProducts] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        id: null, // Ensure there's an id property
        sku: '',
        name: '',
        description: '',
        unitPrice: 0,
        weight: 0,
        width: 0,
        depth: 0,
        HazardousMaterial: false,
        created_by: ''
    });

    // Fetch products function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setProducts(fetchProductsFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentProduct({
            id: null,
            sku: '',
            name: '',
            description: '',
            unitPrice: 0,
            weight: 0,
            width: 0,
            depth: 0,
            HazardousMaterial: false,
            created_by: ''
        });
        setShowModal(true);
    };

    const openModalToEdit = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveProduct = () => {
        if (currentProduct.id) {
            // Update product in the list
            setProducts(products.map(prod => prod.id === currentProduct.id ? currentProduct : prod));
            toast.success('Product updated successfully');
        } else {
            // Add new product
            const newProductWithId = { ...currentProduct, id: Date.now() }; // Assign a unique ID
            setProducts([...products, newProductWithId]);
            toast.success('Product added successfully');
        }
        setShowModal(false);
    };

    const deleteProduct = (productId) => {
        setProducts(products.filter(product => product.id !== productId));
        toast.info('Product deleted successfully');
    };

    return (
        <div className="product-manager">
            <div className="d-flex justify-content-between">
                <h3>Products</h3>
                <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>Add Product</Button>
            </div>
            <ProductTable products={products} onEdit={openModalToEdit} onDelete={deleteProduct} />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct.id ? 'Edit Product' : 'Add Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm product={currentProduct} setProduct={setCurrentProduct} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={saveProduct}>
                        {currentProduct.id ? 'Save Changes' : 'Add Product'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th className='text-center'>Unit Price</th>
                    <th className='text-center'>Weight</th>
                    <th className='text-center'>width</th>
                    <th className='text-center'>depth</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td >{product.sku}</td>
                        <td >{product.name}</td>
                        <td >{product.description}</td>
                        <td className='text-center'>{product.unitPrice}</td>
                        <td className='text-center'>{product.weight}</td>
                        <td className='text-center'>{product.width}</td>
                        <td className='text-center'>{product.depth}</td>
                        <td className='text-center'>
                            <Button variant="light" onClick={() => onEdit(product)}>
                                <BsPencilSquare />
                            </Button>
                            <Button variant="light" onClick={() => onDelete(product.id)}>
                                <BsTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export const ProductForm = ({ product, setProduct }) => {
    return (
        <Form>

            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    required
                />
            </Form.Group>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group>
                        <Form.Label>SKU</Form.Label>
                        <Form.Control
                            type="text"
                            value={product.sku}
                            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                            required
                        />
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    {/* <Form.Group> */}
                    <Form.Group>
                        <Form.Label>Unit Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={product.unitPrice}
                            onChange={(e) => setProduct({ ...product, unitPrice: parseFloat(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            type="number"
                            value={product.weight}
                            onChange={(e) => setProduct({ ...product, weight: parseFloat(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Width</Form.Label>
                        <Form.Control
                            type="number"
                            value={product.width}
                            onChange={(e) => setProduct({ ...product, width: parseFloat(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Depth</Form.Label>
                        <Form.Control
                            type="number"
                            value={product.depth}
                            onChange={(e) => setProduct({ ...product, depth: parseFloat(e.target.value) || 0 })}
                            required
                        />
                    </Form.Group>
                </div>
            </div>

            <Form.Group>
                <Form.Check
                    type="checkbox"
                    label="Hazardous Material"
                    checked={product.HazardousMaterial}
                    onChange={(e) => setProduct({ ...product, HazardousMaterial: e.target.checked })}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Created By</Form.Label>
                <Form.Control
                    type="text"
                    value={product.created_by}
                    onChange={(e) => setProduct({ ...product, created_by: e.target.value })}
                    required
                />
            </Form.Group>
        </Form>
    );
};


const data = [
    {
        id: 1,
        sku: 'SKU001',
        name: 'Product 1',
        description: 'Description of Product 1',
        unitPrice: 100.00,
        weight: 10,
        width: 5,
        depth: 2,
        HazardousMaterial: false,
        created_by: 'Admin'
    },
    {
        id: 2,
        sku: 'SKU002',
        name: 'Product 2',
        description: 'Description of Product 2',
        unitPrice: 200.00,
        weight: 15,
        width: 6,
        depth: 3,
        HazardousMaterial: true,
        created_by: 'Admin'
    },
    {
        id: 3,
        sku: 'SKU003',
        name: 'Product 3',
        description: 'Description of Product 3',
        unitPrice: 300.00,
        weight: 20,
        width: 7,
        depth: 4,
        HazardousMaterial: false,
        created_by: 'User'
    },
    // ... add more products as needed
]