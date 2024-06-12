import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [formData, setFormData] = useState({
    country: '',
    year_of_release: '',
    model: '',
    price: '',
    photo: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({
        ...formData,
        photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('country', formData.country);
    data.append('year_of_release', formData.year_of_release);
    data.append('model', formData.model);
    data.append('price', formData.price);
    data.append('photo', formData.photo);

    axios.post('http://localhost:3000/api/catalog', data)
      .then(response => {
        alert('Product added successfully');
        navigate('/catalog');
      })
      .catch(error => {
        console.error('There was an error uploading the product!', error);
      });
  };

  return (
    <div className="add-product-form">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year_of_release"
          placeholder="Year of Release"
          value={formData.year_of_release}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
