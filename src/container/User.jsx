import React, { useState } from 'react';
import '../styles/user.css'

const Product = () => {
    // Dummy product data
    const [newProduct, setNewProduct] = useState({
        id: '',
        firstname: '',
        lastname: '',
        product: '',
        quantity: '',
        totalAmount: '',
    });
    const [products, setProducts] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleAddProduct = () => {
        // Validate input before adding the product
        if (
            newProduct.firstname &&
            newProduct.lastname &&
            newProduct.product &&
            newProduct.quantity &&
            newProduct.totalAmount
        ) {
            setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: prevProducts.length + 1 }]);
            setNewProduct({
                id: '',
                firstname: '',
                lastname: '',
                product: '',
                quantity: '',
                totalAmount: '',
            });
        }
    };

    return (
        <>
            <div>
                <table className="table">
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.firstname}</td>
                                <td>{product.lastname}</td>
                                <td>{product.product}</td>
                                <td>{product.quantity}</td>
                                <td>${product.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Create a User</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            value={newProduct.firstname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastname" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            value={newProduct.lastname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="product" className="form-label">
                            Product
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="product"
                            name="product"
                            value={newProduct.product}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">
                            Quantity
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalAmount" className="form-label">
                            Total Amount
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="totalAmount"
                            name="totalAmount"
                            value={newProduct.totalAmount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                        Add User
                    </button>
                </form>
            </div>
        </>
    );
};

export default Product;
