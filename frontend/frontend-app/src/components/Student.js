import axios from "axios";
import { useEffect, useState } from "react";

function Student() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  // async function Load() {
  //   const result = await axios.get("http://localhost:9002/api/student/");
  //   setUsers(result.data.data);
  //   console.log(result.data);
  // }

  async function Load() {
    try {
      const result = await axios.get("http://localhost:9002/api/student/");
      setStudents(result.data.data);
      console.log(result.data.data);
      // alert("Deleting student with ID: " + result.data.data);
    } catch (err) {
      console.error("Error loading students:", err);
      alert("Failed to load students");
    }
  }

  async function DeleteStudent(id) {
    try {
      alert("Deleting student with ID: " + id);
      await axios.delete(`http://localhost:9002/api/student/delete/${id}`);
      // Update the student list state directly
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.studentid !== id)
      );
      alert("Student deleted successfully");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student");
    }
  }

  async function editStudent(student) {
    setName(student.stname);
    setCourse(student.course);
    setFee(student.fee);
    setId(student.studentid);

    // alert(`Editing student with ID: ${student.studentid}`);
    // alert(`Name: ${student.stname}`);
    // alert(`Course: ${student.course}`);
    // alert(`Fee: ${student.fee}`);
  }

  async function update(event) {
    event.preventDefault();

    // alert(`Updating registration with ID: ${id}`);

    try {
      await axios.put(`http://localhost:9002/api/student/update/${id}`, {
        stname: stname,
        course: course,
        fee: fee,
      });

      setStudents((prevStudents) => {
        const updatedStudents = prevStudents.map((student) => {
          if (student.studentid === id) {
            return {
              ...student,
              stname: stname,
              course: course,
              fee: fee,
            };
          }
          return student;
        });

        return updatedStudents;
      });

      // alert("Registration Updated");
    } catch (err) {
      console.error("Error updating registration:", err);
      alert("Registration Failed");
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:9002/api/student/add", {
        stname: stname,
        course: course,
        fee: fee,
      });
      alert("Student Registation Successfully");

      Load();
    } catch (err) {
      alert("User Registation Failed");
      console.log("Error Connecting to DB 2:", err);
    }
  }

  // async function DeleteStudent(id) {
  //   try {
  //     await axios.delete("http://localhost:9002/api/student/delete/" + id);
  //     alert("Student deleted successfully");
  //     Load();
  //   } catch (err) {
  //     console.error("Error deleting student:", err);
  //     alert("Failed to delete student");
  //   }
  // }
  // async function DeleteStudent(id) {
  //   try {
  //     alert("Deleting student with ID: " + id);
  //     await axios.delete(`http://localhost:9002/api/student/delete/${id}`);
  //     // Update the student list state directly
  //     setName((prevStudents) =>
  //       prevStudents.filter((stname) => stname.id !== id)
  //     );
  //     alert("Student deleted successfully");
  //   } catch (err) {
  //     console.error("Error deleting student:", err);
  //     alert("Failed to delete student");
  //   }
  // }

  return (
    <div>
      <h1>Student Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="student_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Student Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Course</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Fee</label>
            <input
              type="text"
              class="form-control"
              id="fee"
              value={fee}
              onChange={(event) => {
                setFee(event.target.value);
              }}
            />
          </div>

          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Fee</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>
                <td>{student.fee}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.studentid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Student;
