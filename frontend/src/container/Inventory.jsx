import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { AiOutlinePlus } from 'react-icons/ai';


const Inventory = () => {
    return (
        <div>
            {/* Inventory */}
            <InventoryManager />
        </div>
    );
};

export default Inventory;

const InventoryManager = () => {
    const [inventory, setInventory] = useState(inventoryData);
    const [showModal, setShowModal] = useState(false);
    const [currentInventory, setCurrentInventory] = useState({
        id: null,
        name: '',
        quantityOnHand: 0,
        quantityReserved: 0,
        productId: '',
        productName: '',
        warehouseId: '',
        warehouseName: '',
    });

    // Fetch inventory function (dummy implementation)
    useEffect(() => {
        // Replace with real API call
        // setInventory(fetchInventoryFromAPI());
    }, []);

    const openModalToAdd = () => {
        setCurrentInventory({
            id: null,
            name: '',
            quantityOnHand: 0,
            quantityReserved: 0,
            productId: '',
            productName: '',
            warehouseId: '',
            warehouseName: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (item) => {
        setCurrentInventory(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveInventoryItem = () => {
        if (currentInventory.id) {
            // Update inventory item in the list
            setInventory(
                inventory.map((item) =>
                    item.id === currentInventory.id ? currentInventory : item
                )
            );
            toast.success('Inventory item updated successfully');
        } else {
            // Add new inventory item
            const newItemWithId = { ...currentInventory, id: Date.now() };
            setInventory([...inventory, newItemWithId]);
            toast.success('Inventory item added successfully');
        }
        setShowModal(false);
    };

    const deleteInventoryItem = (itemId) => {
        setInventory(inventory.filter((item) => item.id !== itemId));
        toast.info('Inventory item deleted successfully');
    };

    return (
        <div className="inventory-manager mt-3 m-3">
            <div className="d-flex justify-content-between">
                <h3 className='mt-4'>Inventory</h3>
                {/* <Button className="mb-3 btn-secondary btn-sm" onClick={openModalToAdd}>
                </Button> */}
                <caption className='text-black mt-2 fs-4 d-flex justify-content-between'>
                    <button className="btn btn-secondary" onClick={openModalToAdd}>
                        <AiOutlinePlus className="me-2" />
                        Add Inventory
                    </button>
                </caption>
            </div>
            <InventoryTable
                inventory={inventory}
                onEdit={openModalToEdit}
                onDelete={deleteInventoryItem}
            />
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentInventory.id ? 'Edit Inventory Item' : 'Add Inventory Item'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InventoryForm
                        inventoryItem={currentInventory}
                        setInventoryItem={setCurrentInventory}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveInventoryItem}>
                        {currentInventory.id ? 'Save Changes' : 'Add Inventory Item'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export const InventoryTable = ({ inventory, onEdit, onDelete }) => {
    return (
        <table className="table table-hover table-bordered">
            <thead className='table-dark'>
                <tr className='text-center'>
                    <th>Name</th>
                    <th>Quantity On Hand</th>
                    <th>Quantity Reserved</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Warehouse ID</th>
                    <th>Warehouse Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item) => (
                    <tr className='text-center' key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantityOnHand}</td>
                        <td>{item.quantityReserved}</td>
                        <td>{item.productId}</td>
                        <td>{item.productName}</td>
                        <td>{item.warehouseId}</td>
                        <td>{item.warehouseName}</td>
                        <td>
                            <Button variant="light" className='btn-sm' onClick={() => onEdit(item)}>
                                <BsPencilSquare />
                            </Button>
                            <Button
                                variant="light" className='btn-sm'
                                onClick={() => onDelete(item.id)}
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

export const InventoryForm = ({ inventoryItem, setInventoryItem }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={inventoryItem.name}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, name: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Quantity On Hand</Form.Label>
                <Form.Control
                    type="number"
                    value={inventoryItem.quantityOnHand}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, quantityOnHand: parseInt(e.target.value) || 0 })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Quantity Reserved</Form.Label>
                <Form.Control
                    type="number"
                    value={inventoryItem.quantityReserved}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, quantityReserved: parseInt(e.target.value) || 0 })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                    type="text"
                    value={inventoryItem.productId}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, productId: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                    type="text"
                    value={inventoryItem.productName}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, productName: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Warehouse ID</Form.Label>
                <Form.Control
                    type="text"
                    value={inventoryItem.warehouseId}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, warehouseId: e.target.value })}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Warehouse Name</Form.Label>
                <Form.Control
                    type="text"
                    value={inventoryItem.warehouseName}
                    onChange={(e) => setInventoryItem({ ...inventoryItem, warehouseName: e.target.value })}
                    required
                />
            </Form.Group>
        </Form>
    );
};

const inventoryData = [
    {
        id: 1,
        name: 'Item 1',
        quantityOnHand: 100,
        quantityReserved: 20,
        productId: 'P001',
        productName: 'Product A',
        warehouseId: 'W001',
        warehouseName: 'Warehouse 1',
    },
    {
        id: 2,
        name: 'Item 2',
        quantityOnHand: 150,
        quantityReserved: 30,
        productId: 'P002',
        productName: 'Product B',
        warehouseId: 'W002',
        warehouseName: 'Warehouse 2',
    },
    // ... add more inventory data as needed
];
