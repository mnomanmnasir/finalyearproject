import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlinePlus } from 'react-icons/ai';



const PopUp = (props) => {
  const [tableData, setTableData] = useState([
    { id: 1, Order_ID: '12345', personName: 'Nasir', products: '2', quantity: '4', status: 'Dispatched', totalamount: '1000' },
    { id: 2, Order_ID: '12345', personName: 'Ahad', products: '2', quantity: '4', status: 'Pending', totalamount: '1000' },
    { id: 3, Order_ID: '12345', personName: 'Khan', products: '2', quantity: '4', status: 'Cancelled', totalamount: '1000' },
    // Add more initial data as needed
  ]);

  const { title } = props;

  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    id: tableData.length + 1,
    Order_ID: '',
    personName: '',
    products: '',
    quantity: '',
    status: '',
    totalamount: '',
  });
  const [editItemId, setEditItemId] = useState(null);



  const handleAddItem = () => {
    // Find the maximum id in the current tableData
    const maxId = Math.max(...tableData.map(item => item.id));

    // Use the correct id for the new item
    const newId = maxId === -Infinity ? 1 : maxId + 1;

    // Set the state for the new item and showModal
    setNewItem({
      id: newId,
      Order_ID: '',
      personName: '',
      products: '',
      quantity: '',
      status: '',
      totalamount: '',
    });

    setShowModal(true);
    setEditItemId(null);
  };


  const handleEditItem = (id) => {
    console.log('Edit item clicked with id:', id);
    setShowModal(true);
    console.log('Modal state:', showModal);
    setEditItemId(id);
    const selectedItem = tableData.find((item) => item.id === id);
    console.log('Selected item:', selectedItem);
    setNewItem({ ...selectedItem });
  };


  const handleDeleteItem = (id) => {
    const updatedTableData = tableData.filter((item) => item.id !== id);
    setTableData(updatedTableData);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewItem({
      id: null,
      Order_ID: '',
      personName: '',
      products: '',
      quantity: '',
      status: '',
      totalamount: '',
    });
  };

  const handleSaveItem = () => {
    if (editItemId !== null) {
      // Editing an existing item
      const updatedTableData = tableData.map((item) =>
        item.id === editItemId ? { ...newItem, id: editItemId } : item
      );
      setTableData(updatedTableData);

      // Check if any field has been modified
      const isModified = Object.keys(newItem).some(key => newItem[key] !== tableData.find(item => item.id === editItemId)[key]);

      if (isModified) {
        // Show a success toast
        toast.success('Changes saved successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        // Show a message indicating no changes were made
        toast.info('No changes were made', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        // Close the modal after a delay
        setTimeout(() => {
          handleCloseModal();
          setNewItem({
            id: null,
            Order_ID: '',
            personName: '',
            products: '',
            quantity: '',
            status: '',
            totalamount: '',
          });
        }, 2000);

        return; // Exit the function to prevent the additional success toast
      }
    } else {
      // Adding a new item
      const isFormEmpty = Object.values(newItem).every(value => value === '');

      if (isFormEmpty) {
        // Show a message indicating that the form is empty
        toast.error('Please fill out the form before saving', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });

        return; // Exit the function since the form is empty
      }

      // Add the new item to the table
      setTableData([...tableData, { ...newItem }]);

      // Show a success toast for adding a new item
      toast.success('Item added successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    // Close the modal after a delay
    setTimeout(() => {
      handleCloseModal();
      setNewItem({
        id: null,
        Order_ID: '',
        personName: '',
        products: '',
        quantity: '',
        status: '',
        totalamount: '',
      });
    }, 2000);
  };



  const modalTitle = editItemId !== null ? 'Edit Item' : 'Add New Item';

  return (
    <div className='table-container mt-3 m-3'>
      <caption className='text-black mt-4 fs-4 d-flex justify-content-between'>
        {title}
        <button className="btn btn-secondary" onClick={handleAddItem}>
        <AiOutlinePlus className="me-2" />
          Add Sales
        </button>
      </caption>
      <ToastContainer />
      <table className="table table-hover table-bordered">
        <thead className='table-dark'>
          <tr className='text-center'>
            <th scope="col">#</th>
            <th scope="col">Order ID</th>
            <th scope="col">Person Name</th>
            <th scope="col">Products</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col">Total Amount</th>
            <th scope="col" className='text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr className='text-center' key={item.id}>
              <th className='text-center' scope="row">{item.id}</th>
              <td className='text-center'>{item.Order_ID}</td>
              <td className='text-center'>{item.personName}</td>
              <td className='text-center'>{item.products}</td>
              <td className='text-center'>{item.quantity}</td>
              <td className='text-center'>{item.status}</td>
              <td className='text-center'>{item.totalamount}</td>
              <td className='text-center'>
                <Button variant="light" className='btn-sm' onClick={() => handleEditItem(item.id)}>
                  <BsPencilSquare />
                </Button>
                <Button variant="light" className='btn-sm' onClick={() => handleDeleteItem(item.id)}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-title">{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
              <Form>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Order ID"
                    value={newItem.Order_ID}
                    onChange={(e) => setNewItem({ ...newItem, Order_ID: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>Person Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Person name"
                    value={newItem.personName}
                    onChange={(e) => setNewItem({ ...newItem, personName: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProducts">
                  <Form.Label>Products</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Products"
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
                    min="0"
                  />
                  <Form.Group className="mb-3" controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      value={newItem.status}
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                      required
                    >
                      <option value="Pending">Pending</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Cancelled">Cancelled</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTotalAmount">
                  <Form.Label>Total Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Total Amount"
                    value={newItem.totalamount}
                    onChange={(e) => setNewItem({ ...newItem, totalamount: parseInt(e.target.value, 10) || 0 })}
                    required
                    min="0"
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
      )}
    </div>
  );
}

export default PopUp;
