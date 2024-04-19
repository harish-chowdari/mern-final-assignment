import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from "./EmpList.module.css";
import { Link } from 'react-router-dom';

const EmpList = () => {
  const [empDetails, setEmpDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value for the number of items per page

  const currentDate = new Date().toLocaleDateString();

  const fetchEmpDetails = async () => {
    try {
      const response = await axios.get('http://localhost:4005/empdetails');
      setEmpDetails(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  useEffect(() => {
    fetchEmpDetails();
  }, []);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:4005/remove?id=${empId}`);
      fetchEmpDetails();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset current page when search query changes
  };

  // Filtered and paginated employee details
  const filteredEmpDetails = empDetails.filter(emp =>
    (emp.name && emp.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (emp.gender && emp.gender.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (emp.designation && emp.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (emp.courses && emp.courses.some(course => course.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmpDetails.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={Styles.container}>
      <h1>Employee List</h1>
      <div className={Styles.box}>
        <div className={Styles.countdiv}>
          <p>Total Count: {filteredEmpDetails.length}</p>
          <Link to="/create-employee" className={Styles.createemp}>Create Employee</Link>
        </div>
        <div className={Styles.search}>
          <p>Search</p>
          <input type='text' placeholder='Enter Search Keyword' value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className={Styles.table}>
          <table>
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>MobileNo</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp, index) => (
                <tr key={index}>
                  <td className={Styles.sno}>{index + indexOfFirstItem + 1}</td>
                  <td><img src={emp.image} alt={emp.name} style={{ maxWidth: '50px' }} /></td>
                  <td className={Styles.empDetails}>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>{emp.designation}</td>
                  <td className={Styles.empDetails}>{emp.gender}</td>
                  <td>{emp.courses.join(', ')}</td>
                  <td>{emp.createdAt ? emp.createdAt.slice(0, 10) : ""}</td>
                  <td>
                    <Link to={`/edit/${emp._id}`}>
                      <button>Edit</button>
                    </Link> - <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredEmpDetails.length}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpList;
