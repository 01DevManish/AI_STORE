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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '30px', backgroundColor: '#121212', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', color: '#E0E0E0' }}>
      <h1 style={{ textAlign: 'center', color: '#fff', fontSize: '24px', marginBottom: '30px' }}>Upload AI Tool</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <label style={{ fontSize: '16px' }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s, background-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          >
            <option value="videoai">Video AI</option>
            <option value="audioai">Audio AI</option>
            <option value="textai">Text AI</option>
            <option value="imageai">Image AI</option>
          </select>
        </label>
        <label style={{ fontSize: '16px' }}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              resize: 'vertical',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          File Type:
          <select
            name="file_type"
            value={formData.file_type}
            onChange={handleChange}
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          >
            <option value="Android">Android</option>
            <option value="Windows">Windows</option>
            <option value="iOS">iOS</option>
            <option value="Web">Web</option>
          </select>
        </label>
        <label style={{ fontSize: '16px' }}>
          File Size (in bytes):
          <input
            type="number"
            name="file_size"
            value={formData.file_size}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Developer Name:
          <input
            type="text"
            name="developer_name"
            value={formData.developer_name}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Version:
          <input
            type="text"
            name="version"
            value={formData.version}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Platform:
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
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
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Download Count:
          <input
            type="number"
            name="download_count"
            value={formData.download_count}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          Image URL:
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <label style={{ fontSize: '16px' }}>
          AI URL:
          <input
            type="url"
            name="ai_url"
            value={formData.ai_url}
            onChange={handleChange}
            required
            style={{
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #333',
              backgroundColor: '#212121',
              color: '#fff',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: '#1E88E5',
            color: '#fff',
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#1565C0';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = '#1E88E5';
          }}
        >
          Upload AI
        </button>
      </form>
    </div>
  );
}
