import React, { useEffect, useState } from "react";
import "./AddAdmin.css";
import Sidebar from "./Sidebar";

const AddAdmin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnBlur = (e) => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = (e) => {
    const user = { email };
    fetch("https://pomato-restaurant.herokuapp.com/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      });

    e.preventDefault();
  };

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%" }}>
          <div
            style={{
              padding: "20px 5%",
              height: "calc(100% - 64px)",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(200px, 700px))",
              }}
            >
              <div className="mt-5">
                <h4 className="font-weight-bold mb-3">Add Admin</h4>
                <form onSubmit={handleAdminSubmit}>
                  <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">New Admin</label>
                    <input
                      onBlur={handleOnBlur}
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Admin Email"
                      required={true}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-2 ml-3">
                    Submit
                  </button>
                </form>
                {success && (
                  <span className="text-success mt-2">
                    Made Admin successfully!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
