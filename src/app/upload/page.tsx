'use client'
import { useState } from 'react';

export default function UploadAI() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'videoai',
    description: '',
    file_type: 'Android',
    file_size: '',
    developer_name: '',
    version: '',
    platform: '',
    rating: '',
    download_count: '',
    image_url: '',
    ai_url: '',
  });

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the form data to send to the backend
    const response = await fetch('/api/uploadAI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert('AI uploaded successfully!');
    } else {
      alert('Error uploading AI.');
    }
  };

  return (
    <div style={{  maxWidth: '800px', margin: '50px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Upload AI Tool</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          >
            <option value="videoai">Video AI</option>
            <option value="audioai">Audio AI</option>
            <option value="textai">Text AI</option>
            <option value="imageai">Image AI</option>
          </select>
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              resize: 'vertical',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          File Type:
          <select
            name="file_type"
            value={formData.file_type}
            onChange={handleChange}
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          >
            <option value="Android">Android</option>
            <option value="Windows">Windows</option>
            <option value="iOS">iOS</option>
            <option value="Web">Web</option>
          </select>
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          File Size (in bytes):
          <input
            type="number"
            name="file_size"
            value={formData.file_size}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Developer Name:
          <input
            type="text"
            name="developer_name"
            value={formData.developer_name}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Version:
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Platform:
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Download Count:
          <input
            type="number"
            name="download_count"
            value={formData.download_count}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          Image URL:
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '14px', color: '#555' }}>
          AI URL:
          <input
            type="url"
            name="ai_url"
            value={formData.ai_url}
            onChange={handleChange}
            required
            style={{
              padding: '10px',
              fontSize: '14px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              marginTop: '5px',
              outline: 'none',
              transition: 'border 0.3s',
            }}
          />
        </label>
        <button
  type="submit"
  style={{
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  }}
  onMouseEnter={(e) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = '#45a009';
  }}
  onMouseLeave={(e) => {
    const target = e.target as HTMLButtonElement;
    target.style.backgroundColor = '#4CAF50';
  }}
>
  Upload AI
</button>

      </form>
    </div>
  );
}
