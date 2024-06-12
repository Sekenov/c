import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

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
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    axios.post('http://localhost:3000/api/catalog', data)
      .then(response => {
        alert('Product added successfully');
        navigate('/catalog');
      })
      .catch(error => {
        console.error('There was an error adding the product!', error);
      });
  };

  return (
    <div className="add-product-container">
      <h1>Добавить продукт</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label>Страна</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Год выпуска</label>
          <input
            type="number"
            name="year_of_release"
            value={formData.year_of_release}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Модель</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Цена</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Фото</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            required
          />
        </div>
        <button className="add-product-button" type="submit">Добавить продукт</button>
      </form>
    </div>
  );
}

export default AddProduct;
