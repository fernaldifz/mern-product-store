import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "../Icon/SearchIcon";

function ProductsList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [categories, setCategories] = useState(["All Categories"]);
  const [searchCategory, setSearchCategory] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    if (filterName === "" && filterCategory === "All Categories") {
      axios
        .get("http://localhost:5000/api/products?page=" + page)
        .then((res) => {
          setIsLoaded(true);
          setProducts(res.data.products);

          page > 0 ? setPreviousPage(true) : setPreviousPage(false);

          Math.ceil(res.data.total_results / res.data.entries_per_page) >
            page + 1
            ? setNextPage(true)
            : setNextPage(false);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        });
    } else if (filterCategory !== "All Categories") {
      axios
        .get(
          "http://localhost:5000/api/products?page=" +
          page +
          "&category=" +
          filterCategory
        )
        .then((res) => {
          setIsLoaded(true);
          setProducts(res.data.products);

          page > 0 ? setPreviousPage(true) : setPreviousPage(false);

          Math.ceil(res.data.total_results / res.data.entries_per_page) >
            page + 1
            ? setNextPage(true)
            : setNextPage(false);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        });
    } else if (filterName !== "") {
      axios
        .get(
          "http://localhost:5000/api/products?page=" +
          page +
          "&name=" +
          filterName
        )
        .then((res) => {
          setIsLoaded(true);
          setProducts(res.data.products);

          page > 0 ? setPreviousPage(true) : setPreviousPage(false);

          Math.ceil(res.data.total_results / res.data.entries_per_page) >
            page + 1
            ? setNextPage(true)
            : setNextPage(false);
        })
        .catch((error) => {
          setIsLoaded(true);
          setError(error);
        });
    }
  }, [page, filterCategory, filterName]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/category")
      .then((res) => {
        setIsLoaded(true);
        setCategories(["All Categories"].concat(res.data));
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchCategory = (e) => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const filterByCategory = () => {
    setPage(0);
    setFilterName("");
    setFilterCategory(searchCategory);
  };

  const filterByName = () => {
    setPage(0);
    setFilterCategory("All Categories");
    setFilterName(searchName);
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="row">
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <div className="btn btn-primary" onClick={filterByName}>
                <SearchIcon />
              </div>
            </div>
          </div>
          <div className="input-group mb-4">
            <select onChange={onChangeSearchCategory}>
              {categories.map((category, idx) => {
                return (
                  <option key={idx} value={category}>{category.substring(0, 20)}</option>
                );
              })}
            </select>
            <div className="input-group-append">
              <div className="btn btn-primary" onClick={filterByCategory}>
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3 pb-1 mb-5" key={product._id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={"http://localhost:5000/" + product.image}
                    style={{ objectFit: "cover" }}
                    height="300px"
                    alt="product"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={{ pathname: "/product_detail/" + product._id }}>
                        {product.name}
                      </Link>
                    </h5>
                    <p className="card-text">
                      <strong>Category: </strong>
                      {product.category}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {products.length !== 0 ?
          <div className="d-flex justify-content-between mb-4">
            {previousPage ? (
              <button
                className="btn btn-primary active"
                onClick={goToPreviousPage}
              >
                Previous
              </button>
            ) : (
              <button className="btn btn-primary disabled">Previous</button>
            )}
            {nextPage ? (
              <button className="btn btn-primary active" onClick={goToNextPage}>
                Next
              </button>
            ) : (
              <button className="btn btn-primary disabled">Next</button>
            )}
          </div>
          :
          <h5 className="mt-2">Product List is empty</h5>
        }
      </div>
    );
  }
}

export default ProductsList;
