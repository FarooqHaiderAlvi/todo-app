import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CreateTask() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const Submit = (e) => {
    console.log(title, description);
    e.preventDefault();

    fetch("http://localhost:5500/api/task/createTask/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYyZjYxMWM2MjRjYmNkNGUxMGNkZTdkIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcxNDM4NjE5NX0.3WJQOYttPA_Hk202uI9WeLi8ejqzeHsqevHV_b2kCik",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw { status: res.status, errors: data.errors }; // Throw error with status and errors
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);
        navigate(`/getUser/${id}`);
      })
      .catch((error) => {
         
        if (error.status === 400) {
          console.log("Validation Errors:", setErrors(error.errors));
          // Handle validation errors here
        }
        else{
          console.log("Error",error.message)
        }
      });
  };

  return (
    <div className="container mt-5 py-5">
      <div className="row justify-content-center py-2 border">
        <div className="col-6">
          <form onSubmit={Submit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                {errors.map((error, index) => (
                  <div key={index} className="text-danger">
                    {error.path === "title" && error.msg}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <div>
                {errors.map((error, index) => (
                  <div key={index} className="text-danger">
                    {error.path === "description" && error.msg}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Assign Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
