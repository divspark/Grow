import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);

      // Send image data to backend for recognition
      const response = await axios.post('http://localhost:3000/api/v1/recognize/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update state with annotations received from the backend
      setAnnotations(response.data.annotations);

      // Display the uploaded image
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to recognize image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '20px' }} />}
      {annotations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Annotations</h3>
          <ul>
            {annotations.map((annotation, index) => (
              <li key={index}>{annotation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
