import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [likes, setLikes] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/id/" + id)
      .then((res) => {
        setIsLoaded(true);
        setName(res.data.name);
        setCategory(res.data.category);
        setPrice(res.data.price);
        setRating(res.data.rating);
        setLikes(res.data.likes);
        setDescription(res.data.description);
        setImage(res.data.image);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [id]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const updateProduct = () => {
    const product = new FormData();
    const productDate = new Date();

    product.append("_id", id);
    product.append("name", name);
    product.append("category", category);
    product.append("price", price);
    product.append("rating", rating);
    product.append("likes", likes);
    product.append("description", description);
    product.append("image", image);
    product.append("date", productDate);

    axios
      .put("http://localhost:5000/api/products", product)
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4 className="mb-4">Product edited!</h4>
            <Link to={"/product_detail/" + id} className="btn btn-success">
              Back to Products Detail
            </Link>
          </div>
        ) : (
          <div>
            <h4 className="mb-4">Edit Product</h4>
            <form action="#" method="post" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="description" className="mb-2">Name</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="name"
                  required
                  value={name}
                  onChange={handleNameChange}
                />
                <label htmlFor="description" className="mb-2">Category</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="category"
                  required
                  value={category}
                  onChange={handleCategoryChange}
                />
                <label htmlFor="description" className="mb-2">Price</label>
                <input
                  type="number"
                  className="form-control mb-4"
                  id="price"
                  required
                  value={price}
                  onChange={handlePriceChange}
                />
                <label htmlFor="description" className="mb-2">Rating</label>
                <input
                  type="number"
                  className="form-control mb-4"
                  id="rating"
                  required
                  value={rating}
                  onChange={handleRatingChange}
                />
                <label htmlFor="description" className="mb-2">Likes</label>
                <input
                  type="number"
                  className="form-control mb-4"
                  id="likes"
                  required
                  value={likes}
                  onChange={handleLikesChange}
                />
                <label htmlFor="description" className="mb-2">Description</label>
                <input
                  type="text"
                  className="form-control mb-4"
                  id="description"
                  required
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <label htmlFor="formFile" className="form-label mb-2">
                  Image
                </label>
                <div className="form-group">
                  <input
                    className="form-control-file mb-4"
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={handleImageChange}
                  ></input>
                </div>
              </div>
            </form>
            <div className="mt-4">
              <Link
                to={{ pathname: "/product_detail/" + id }}
                className="btn btn-outline-secondary"
              >
                Cancel
              </Link>
              <button onClick={updateProduct} className="btn btn-success mx-4">
                Submit
              </button>
            </div>
          </div>
        )}
        <br />
      </div>
    );
  }
}

export default EditProduct;
