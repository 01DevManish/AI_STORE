"use client";

import { useState, FormEvent, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./cms.css";

const CMSForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    image: null as File | null,
    croppedImage: null as Blob | null,
    category: "",
    description: "",
    metaDescription: "",
    features: "",
    link: "",
    developedBy: "",
    producedBy: "",
    supportedLanguage: "",
    info: "",
  });

  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file, croppedImage: null }));
    setFileName(file ? file.name : "No file chosen");
    setImagePreview(file ? URL.createObjectURL(file) : null);
    setCompletedCrop(null);
  };

  const clearFile = () => {
    setFormData((prev) => ({ ...prev, image: null, croppedImage: null }));
    setFileName("No file chosen");
    setImagePreview(null);
    setCompletedCrop(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageRef(img);
    const { width, height } = img;
    console.log("Image dimensions:", { width, height }); // Debug actual dimensions
    const size = Math.min(width, height) * 0.5;
    setCrop({
      unit: "px",
      width: size,
      height: size,
      x: (width - size) / 2,
      y: (height - size) / 2,
    });
  };

  const handleCropChange = (crop: Crop) => {
    if (imageRef) {
      const { width, height } = imageRef;
      console.log("Crop change:", { crop, imageWidth: width, imageHeight: height }); // Debug crop values
      const newCrop: Crop = {
        ...crop,
        x: Math.max(0, Math.min(crop.x, width - crop.width)),
        y: Math.max(0, Math.min(crop.y, height - crop.height)),
        width: Math.max(1, Math.min(crop.width, width - crop.x)),
        height: Math.max(1, Math.min(crop.height, height - crop.y)),
      };
      setCrop(newCrop);
    } else {
      setCrop(crop);
    }
  };

  const confirmCrop = () => {
    if (imageRef && completedCrop?.width && completedCrop?.height) {
      getCroppedImg(imageRef, completedCrop).then((croppedBlob) => {
        setFormData((prev) => ({ ...prev, croppedImage: croppedBlob }));
      });
    }
  };

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d")!;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, "image/jpeg");
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  const categories = [
    "Text&Writing",
    "Image",
    "Video",
    "Code&IT",
    "Voice",
    "Business",
    "Marketing",
    "AI Detector",
    "Chatbot",
    "Design&Art",
    "Life Assistant",
    "3D",
    "Education",
    "Prompt",
    "Productivity",
    "Other",
  ];

  return (
    <div className="cms-form-wrapper">
      <form className="cms-form" onSubmit={handleSubmit}>
        <h2 className="cms-form-title">Add Your AI to AI-Store</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter AI title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter AI name"
            required
          />
        </div>

        <div className="form-group file-group">
          <label htmlFor="image">Logo</label>
          <div className="file-input-wrapper">
            {formData.croppedImage ? (
              <img
                src={URL.createObjectURL(formData.croppedImage)}
                alt="ai-logo"
                className="image-preview"
              />
            ) : imagePreview && (
              <ReactCrop
                crop={crop}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
                aspect={1}
                className="image-cropper"
              >
                <img src={imagePreview} onLoad={onImageLoad} alt="Preview" />
              </ReactCrop>
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
              ref={fileInputRef}
            />
            <label htmlFor="image" className="file-button">Choose File</label>
            <span className="file-name">{fileName}</span>
            {formData.image && (
              <>
                {!formData.croppedImage && (
                  <button
                    type="button"
                    className="confirm-crop-button"
                    onClick={confirmCrop}
                  >
                    Confirm Crop
                  </button>
                )}
                <button
                  type="button"
                  className="clear-file-button"
                  onClick={clearFile}
                  aria-label="Clear selected file"
                >
                  ×
                </button>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="modern-select"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="link">Link/URL</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Enter AI website URL (e.g., https://example.com)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your AI"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="metaDescription">Meta Description</label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description for SEO"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="features">Features</label>
          <textarea
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="List key features (e.g., fast processing, multilingual)"
            rows={3}
          />
        </div>

        <div className="form-group additional-info">
          <h3>Additional Information</h3>
          <div className="form-subgroup">
            <label htmlFor="developedBy">Developed By</label>
            <input
              type="text"
              id="developedBy"
              name="developedBy"
              value={formData.developedBy}
              onChange={handleChange}
              placeholder="Developer name"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="producedBy">Produced By</label>
            <input
              type="text"
              id="producedBy"
              name="producedBy"
              value={formData.producedBy}
              onChange={handleChange}
              placeholder="Producer name"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="supportedLanguage">Supported Language</label>
            <input
              type="text"
              id="supportedLanguage"
              name="supportedLanguage"
              value={formData.supportedLanguage}
              onChange={handleChange}
              placeholder="e.g., English, Spanish"
            />
          </div>
          <div className="form-subgroup">
            <label htmlFor="info">Info</label>
            <input
              type="text"
              id="info"
              name="info"
              value={formData.info}
              onChange={handleChange}
              placeholder="Additional info"
            />
          </div>
        </div>

        <button type="submit" className="cms-form-submit">
          Submit AI
        </button>
      </form>
    </div>
  );
};

export default CMSForm;
