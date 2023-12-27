import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';


const PopUp = () => {
    const [tableData, setTableData] = useState([
        { id: 1, firstName: 'Noman', lastName: 'Nasir', products: '2', quantity: '4', totalamount: '1000' },
        { id: 2, firstName: 'Abdul', lastName: 'Ahad', products: '2', quantity: '4', totalamount: '1000' },
        { id: 3, firstName: 'Salman', lastName: 'Khan', products: '2', quantity: '4', totalamount: '1000' },
        // Add more initial data as needed
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ firstName: '', lastName: '', products: '', quantity: '', totalamount: '' });
    const [editItemId, setEditItemId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle adding a new item to the table
    const handleAddItem = () => {
        // Open the modal
        setShowModal(true);
    };


    // Function to handle editing an existing item in the table
    const handleEditItem = (id) => {
        // Open the modal for editing an item
        setShowModal(true);
        setEditItemId(id);
        // Fetch the item data for editing and set it in the form
        const selectedItem = tableData.find((item) => item.id === id);
        setNewItem({ ...selectedItem });
    };

    // Function to handle deleting an item from the table
    const handleDeleteItem = (id) => {
        // Remove the item from the tableData
        const updatedTableData = tableData.filter((item) => item.id !== id);
        setTableData(updatedTableData);
    };


    const handleCloseModal = () => {
        // Close the modal
        setShowModal(false);
        setSuccessMessage('');
    };

    const handleSaveItem = () => {
        // Save the new/edited item and close the modal
        if (editItemId !== null) {
            // Editing an existing item
            const updatedTableData = tableData.map((item) =>
                item.id === editItemId ? { ...newItem, id: editItemId } : item
            );
            setTableData(updatedTableData);
        } else {
            // Adding a new item
            setTableData([...tableData, { id: tableData.length + 1, ...newItem }]);
        }
        handleCloseModal();
    };

    // const renderTableRows = () => {
    //     return tableData.map((item) => (
    //         <tr key={item.id}>
    //             <th scope="row">{item.id}</th>
    //             <td>{item.firstName}</td>
    //             <td>{item.lastName}</td>
    //             <td>{item.handle}</td>
    //         </tr>
    //     ));
    // };
    
    const modalTitle = editItemId !== null ? 'Edit Item' : 'Add New Item';


    return (

        <div>

            <caption className='text-white fs-4 d-flex justify-content-between'>Recent Orders
                <button className="btn btn-primary" onClick={handleAddItem}>
                    Add Item
                </button>
            </caption>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <table className="table caption-top bg-white-rounded mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Products</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.products}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalamount}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEditItem(item.id)}>
                                    <BsPencilSquare /> {/* Edit Icon */}
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
                                    <BsTrash /> {/* Delete Icon */}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={newItem.firstName}
                                onChange={(e) => setNewItem({ ...newItem, firstName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={newItem.lastName}
                                onChange={(e) => setNewItem({ ...newItem, lastName: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProducts">
                            <Form.Label>Products</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter products"
                                value={newItem.products}
                                onChange={(e) => setNewItem({ ...newItem, products: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity"
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 0 })}
                                required
                                min='0'
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTotalAmount">
                            <Form.Label>Total Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Total Amount"
                                value={newItem.totalamount}
                                onChange={(e) => setNewItem({ ...newItem, totalamount: parseInt(e.target.value, 10) || 0 })}
                                required
                                min='0'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveItem}>
                        {editItemId !== null ? 'Save Changes' : 'Save Item'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PopUp;