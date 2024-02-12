import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { baseUrl } from '../App';

const Putaway = () => {
    const [putawayItems, setPutawayItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState({
        _id: null,
        name: '',
        date: '',
        status: '',
        purchaseId: '',
    });
    const [purchaseIds, setPurchaseIds] = useState([]);

    useEffect(() => {
        fetchPutawayItemsFromAPI();
        fetchPurchaseIdsFromAPI();
    }, []);

    const fetchPutawayItemsFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/putaway');
            setPutawayItems(response.data);
        } catch (error) {
            console.error('Error fetching putaway items', error);
            toast.error('Error fetching putaway items');
        }
    };

    const fetchPurchaseIdsFromAPI = async () => {
        try {
            const response = await Axios.get(baseUrl + '/purchases');
            setPurchaseIds(response.data);
        } catch (error) {
            console.error('Error fetching purchase IDs', error);
            toast.error('Error fetching purchase IDs');
        }
    };

    const openModalToAdd = () => {
        setCurrentItem({
            _id: null,
            name: '',
            date: '',
            status: '',
            purchaseId: '',
        });
        setShowModal(true);
    };

    const openModalToEdit = (item) => {
        setCurrentItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const savePutawayItem = async () => {
        try {
            let response;

            if (currentItem._id) {
                // Update putaway item
                response = await Axios.put(`${baseUrl}/putaway`, currentItem);
                setPutawayItems(
                    putawayItems.map((item) =>
                        item._id === currentItem._id ? response.data : item
                    )
                );
                toast.success('Putaway item updated successfully');
            } else {
                // Add new putaway item
                response = await Axios.post(`${baseUrl}/putaway`, currentItem);
                const newPutawayItemWithId = { ...currentItem, _id: response.data._id };
                setPutawayItems([...putawayItems, newPutawayItemWithId]);
                toast.success('Putaway item added successfully');
            }

            setShowModal(false);
        } catch (error) {
            console.error('Error saving putaway item', error);
            toast.error('Error saving putaway item');
        }
    };

    const deletePutawayItem = async (itemId) => {
        try {
            await Axios.delete(`${baseUrl}/putaway/${itemId}`);
            setPutawayItems(putawayItems.filter((item) => item._id !== itemId));
            toast.info('Putaway item deleted successfully');
        } catch (error) {
            console.error('Error deleting putaway item', error);
            toast.error('Error deleting putaway item');
        }
    };

    return (
        <div>
            <h3>Putaway Items</h3>
            <Button onClick={openModalToAdd}>Add Putaway Item</Button>

            {/* Putaway items table */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Purchase ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {putawayItems.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.date}</td>
                            <td>{item.status}</td>
                            <td>{item.purchaseId}</td>
                            <td>
                                <Button onClick={() => openModalToEdit(item)}>Edit</Button>
                                <Button onClick={() => deletePutawayItem(item._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for adding/editing putaway items */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentItem._id ? 'Edit' : 'Add'} Putaway Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentItem.name}
                                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={currentItem.date}
                                onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentItem.status}
                                onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Purchase ID</Form.Label>
                            <Form.Control
                                as="select"
                                value={currentItem.purchaseId}
                                onChange={(e) => setCurrentItem({ ...currentItem, purchaseId: e.target.value })}
                            >
                                <option value="">Select Purchase ID</option>
                                {purchaseIds.map((purchaseId) => (
                                    <option key={purchaseId._id} value={purchaseId._id}>
                                        {purchaseId._id}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {currentItem.purchaseId && purchaseIds.map((purchaseId) => {
                            if (purchaseId._id === currentItem.purchaseId) {
                                return purchaseId.products.map((product, index) => (
                                    // console.log(product)
                                    <div key={product._id} className='my-3'>
                                        <b>{"P" + ++index + ") " + product.product.name + " | " + product.quantity}</b>
                                        <div className="row g-1">
                                            <div className="col">
                                                <Form.Control type="text" placeholder="Quantity" value={product.quantity}/>
                                            </div>
                                            <div className="col">
                                                <Form.Control type="text" placeholder="Pallet Number" />
                                            </div>
                                            <div className="col">
                                                <Form.Control as="select" placeholder="Rack">
                                                    <option value="1">Rack 1</option>
                                                    <option value="2">Rack 2</option>
                                                    <option value="3">Rack 3</option>
                                                    <option value="4">Rack 4</option>
                                                </Form.Control>
                                            </div>
                                            <div className="col">
                                                <Form.Control type="date" placeholder="Expiration Date" />
                                            </div>
                                        </div>
                                    </div>
                                ));
                            }
                        })}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={savePutawayItem}>Save</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default Putaway;
