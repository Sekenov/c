import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProduct.css';

function EditProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    country: '',
    year_of_release: '',
    model: '',
    price: '',
    photo: null,
  });
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/catalog/${id}`)
      .then(response => {
        const product = response.data;
        setFormData({
          country: product.country,
          year_of_release: product.year_of_release,
          model: product.model,
          price: product.price,
          photo: null, // Не будем предзаполнять поле фото, т.к. это невозможно для input type="file"
        });
        setCurrentPhoto(product.photo); // Установим текущее фото
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

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

    axios.put(`http://localhost:3000/api/catalog/${id}`, data)
      .then(response => {
        alert('Product updated successfully');
        navigate('/catalog');
      })
      .catch(error => {
        console.error('There was an error updating the product!', error);
      });
  };

  return (
    <div className="edit-product-container">
      <h1>Редактировать товар</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
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
        {currentPhoto && (
          <div className="form-group">
            <label>Текущее фото</label>
            <img src={`data:image/jpeg;base64,${currentPhoto}`} alt="Current Product" className="current-photo" />
          </div>
        )}
        <div className="form-group">
          <label>Новое фото</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
          />
        </div>
        <button className="submit-button" type="submit">Обновить</button>
      </form>
    </div>
  );
}

export default EditProduct;
