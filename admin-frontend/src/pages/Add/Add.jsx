import React, { useState, useEffect } from "react";
import "./add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Add = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const { category, description, image, name, price } = item || {};

  const [images, setImages] = useState(null);
  const [existingImage, setExistingImage] = useState(image || "");
  const [formData, setFormData] = useState({
    name: id ? name : "",
    description: id ? description : "",
    category: id ? category : "Salad",
    price: id ? price : "",
  });

  useEffect(() => {
    if (id) {
      setExistingImage(image);
    }
  }, [id, image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
      setExistingImage(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", Number(formData.price));
    if (images) {
      data.append("image", images);
    }

    try {
      const response = id
        ? await axios.put(`${baseUrl}/food/update-food/${id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(`${baseUrl}/food/add`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

      if (response.status === 201 || response.status === 200) {
        setFormData({
          name: "",
          description: "",
          category: "Salad",
          price: "",
        });
        setImages(null);
        toast.success(response.data?.message, {
          position: "top-right",
          autoClose: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        if (id) {
          navigate("/list");
        }
      } else {
        console.error("Form submission error:", response.statusText);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Failed to submit item!", {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="add">
      <form className="flex_col" onSubmit={handleSubmit}>
        <div className="add_img__upload flex_col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {images ? (
              <img
                src={URL.createObjectURL(images)}
                alt="Preview"
                className="image_preview"
              />
            ) : existingImage ? (
              <img
                src={`${imageUrl}/images/${existingImage}`}
                alt="Existing"
                className="image_preview"
              />
            ) : (
              <img
                src={assets.upload_area}
                alt="Upload"
                className="upload_area"
              />
            )}
          </label>
          <input type="file" id="image" hidden onChange={handleImageChange} />
        </div>
        <div className="add_product__name flex_col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add_product__description flex_col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="add_category__price flex_col">
          <div className="add_category flex_col">
            <p>Product category</p>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Cake">Cake</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add_product__price flex_col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="add_btn">
            {id ? "UPDATE ITEM" : "ADD ITEM"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
