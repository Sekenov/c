import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {
  const [formData, setFormData] = useState({
    country: '',
    year_of_release: '',
    model: '',
    price: '',
    photo: null,
  });
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const { id } = useParams();
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
    <div className="edit-product-form">
      <h1>Edit Product</h1>
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
        {currentPhoto && (
          <div>
            <img src={`data:image/jpeg;base64,${currentPhoto}`} alt="Current Product" style={{ maxWidth: '200px', marginBottom: '10px' }} />
          </div>
        )}
        <input
          type="file"
          name="photo"
          onChange={handleChange}
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
