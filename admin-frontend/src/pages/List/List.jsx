import React, { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const List = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/food/get-all-food`);
      setList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}/food/delete-food/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data?.message, {
          position: "top-right",
          autoClose: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        fetchListData();
      }
    } catch (error) {
      console.error("Item deletion failed:", error);
      toast.error("Failed to delete item!", {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    fetchListData();
  }, [currentPage]);

  // Logic to paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="list-container">
      <h2>All Foods List</h2>
      <div className="list_length">
        <p>List Length: {list.length}</p>
      </div>

      {isLoading ? (
        <div className="loader">
          <h4>Loading...</h4>
        </div>
      ) : (
        <div className="list-table">
          <div className="list-table__row title">
            <div className="list-table__cell">
              <b>Image</b>
            </div>
            <div className="list-table__cell">
              <b>Name</b>
            </div>
            <div className="list-table__cell">
              <b>Category</b>
            </div>
            <div className="list-table__cell">
              <b>Price</b>
            </div>
            <div className="list-table__cell">
              <b>Action</b>
            </div>
          </div>
          {currentItems.map((item, index) => (
            <div key={index} className="list-table__row">
              <div className="list-table__cell">
                <img src={`${imageUrl}/images/${item.image}`} alt={item.name} />
              </div>
              <div className="list-table__cell">{item.name}</div>
              <div className="list-table__cell">{item.category}</div>
              <div className="list-table__cell">{item.price}</div>
              <div className="list-table__cell">
                <Link to={`/add/${item._id}`} state={{ item }}>
                  <button className="action-button">Edit</button>
                </Link>
                <button
                  className="action-button"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="page-button current">{currentPage}</button>
        <button
          className="page-button"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= list.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;
