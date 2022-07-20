import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 character or less";
  }

  if (!values.email) {
    errors.email = "Requires";
  } else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.toString().length != 10) {
    errors.phone = "Invalid Number";
  }

  if (!values.address) {
    errors.address = "Requires";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.toString().length < 4) {
    errors.password = "Password must be more than 4 Characters";
  }

  return errors;
};

const AddUser = () => {
  let history = useHistory();
  const [ User, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await axios.post(
        "https://62affa883bbf46a3522964c7.mockapi.io/crudDemo",
        values
      );
      history.push("/");
    },
    validate,
    
  });

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add User</h2>

        <form onSubmit={formik.handleSubmit}>

       
          <div>
            <label className="input-label" htmlFor="name">
              Name 
            </label>
          </div>

          <div className="form-group">
          
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? (
              <div className="error">{formik.errors.name}</div>
            ) : null} 
          </div>

          <div>
            <label className="input-label" htmlFor="email">
             Email 
            </label>
          </div>


          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="input-label" htmlFor="phone">
              Phone
            </label>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone ? (
              <div className="error">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div>
            <label className="input-label" htmlFor="address">
              Address
            </label>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your address "
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.phone ? (
              <div className="error">{formik.errors.address}</div>
            ) : null}
          </div>

          <div>
            <label className="input-label" htmlFor="password">
              Password
            </label>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="btn btn-primary btn-block">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

