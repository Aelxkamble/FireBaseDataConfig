import React, { useEffect, useState } from "react";
import { db } from "../fibrebaseConfig";
import { ref, get } from "firebase/database";
import "./EmployeeList.css";
import { Col, Container, Dropdown, Form, Row, Table } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const employeesRef = ref(db, "employees");

      try {
        const snapshot = await get(employeesRef);
        const employeesArray = Object.values(snapshot.val());
        setEmployees(employeesArray);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (eventKey) => {
    setSortOption(eventKey);
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTermLower) ||
      employee.position.toLowerCase().includes(searchTermLower) ||
      employee.department.toLowerCase().includes(searchTermLower) ||
      employee.location.toLowerCase().includes(searchTermLower)
    );
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const valueA = sortOption === "name" ? a.name.toLowerCase() : a.empId;
    const valueB = sortOption === "name" ? b.name.toLowerCase() : b.empId;
    return sortOrder === "asc"
      ? valueA < valueB
        ? -1
        : 1
      : valueB < valueA
      ? -1
      : 1;
  });

  return (
    <Container>
      <div className="employee-list-container">
        <h2 className="mb-5">Employee Data List</h2>
        <Row className="mb-4 align-items-center">
          <Col md={3} xs={12} className="mb-md-0 mb-2 ">
            <Form.Group
              className="d-flex align-items-center"
              controlId="validationCustom01"
            >
              <Form.Label>Search:</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </Form.Group>
          </Col>
          <Col md={3} xs={12} className="mb-md-0 mb-2 ">
            <Dropdown onSelect={handleRowsPerPageChange}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Rows per page{rowsPerPage &&  rowsPerPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[5, 10, 15, 20].map((option) => (
                  <Dropdown.Item eventKey={option} value={option}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} xs={6} className="mb-md-0 mb-2 ">
            <Dropdown onSelect={handleSortChange}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort by{sortOption && sortOption}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                <Dropdown.Item eventKey="id">ID</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} xs={6} className="mb-md-0 mb-2 ">
            <Dropdown>
              <Dropdown.Toggle id="order-dropdown">
                Order: {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOrder("asc")}>
                  Ascending
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder("desc")}>
                  Descending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {sortedEmployees.length === 0 ? (
          <p className="no-results">No results found</p>
        ) : (
          <Table striped bordered hover className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Department</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.slice(0, rowsPerPage).map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};

export default EmployeeList;
