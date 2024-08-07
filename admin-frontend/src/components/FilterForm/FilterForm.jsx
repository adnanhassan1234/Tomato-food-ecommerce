import React from "react";

const FilterForm = ({
  filters,
  handleFilterChange,
  handleFilterClick,
  handleResetClick,
}) => {
  return (
    <div className="filter-form">
      <div className="filter-field">
        <label htmlFor="firstname" className="filter-label">
          <b>Customer Name:</b>
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Customer name"
          value={filters.firstname}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="country" className="filter-label">
          <b>Country:</b>
        </label>
        <input
          type="text"
          name="country"
          id="country"
          placeholder="Filter by Country"
          value={filters.country}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="fromDate" className="filter-label">
          <b>From Date:</b>
        </label>
        <input
          type="date"
          name="fromDate"
          id="fromDate"
          placeholder="From Date"
          value={filters.fromDate}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="toDate" className="filter-label">
          <b>To Date:</b>
        </label>
        <input
          type="date"
          name="toDate"
          id="toDate"
          placeholder="To Date"
          value={filters.toDate}
          onChange={handleFilterChange}
        />
      </div>
      <div className="filter-buttons">
        <button className="filter-btn" onClick={handleFilterClick}>
          Filter
        </button>
        <button className="reset-btn" onClick={handleResetClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
