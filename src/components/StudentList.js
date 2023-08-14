// Create a StudentList component that renders a list of students

import React from "react";
import { useState, useEffect } from "react";
// import axios
import axios from "axios";
import "./StudentList.css";

const StudentList = () => {
    // create a studentData state variable and initialize it to an empty array
    const [studentData, setStudentData] = useState([]);

    // create a filterData state variable and initialize it to an empty array
    const [filterData, setFilterData] = useState([]);

    // use axios to fetch data from http://localhost:3001/studentList
  useEffect(() => {
    axios
      .get("http://localhost:3001/studentList")
      .then((response) => {
        // set the studentData state variable to the response.data
        setStudentData(response.data);
        // set the filterData state variable to the response.data
        noFilter();
      })
        // catch and log any errors
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Create a method named noFilter that sets the filterData state variable to the studentData state variable
    const noFilter = () => {
        setFilterData(studentData);
    }

    // Create a method named ageAbove25 that sets the filterData state variable to the studentData state variable filtered by age above 25
    const ageAbove25 = () => {
        setFilterData(studentData.filter((student) => student.age > 25));
    }

    // Create a method named nameStartsWithA that sets the filterData state variable to the studentData state variable filtered by name starts with A or a
    const nameStartsWithA = () => {
        setFilterData(studentData.filter((student) => {
            return student.name.startsWith("A") || student.name.startsWith("a")
        }));
    }

  return (
    <div>
      {/* h1 with student information title */}
      <h1>STUDENTS INFORMATION</h1>
      {/* declare 3 buttons named no filter, age above 25, and name starts with A with click action*/}
        <button onClick={noFilter}>No Filter</button>
        <button onClick={ageAbove25}>Age Above 25</button>
        <button onClick={nameStartsWithA}>Name Starts With A</button>
       {/* table with header attribute as Id, name, age, email, gender and average_grade */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Avg. Grade</th>
          </tr>
        </thead>
        {/* table body with data from filterData */}
        <tbody>
          {filterData.map((student) => (
            <tr key={student.id}>
                <td>{student.id}</td>
			    <td>{student.name}</td>
			    <td>{student.age}</td>
			    <td>{student.email}</td>
			    <td>{student.gender}</td>
			    <td>{student.average_grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
