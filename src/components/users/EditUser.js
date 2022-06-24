import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Formik, useFormik } from "formik";

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

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({});

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: user.password,
    },
    onSubmit: async (values) => {
      await axios.put(
        `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`,
        values
      );
      history.push("/");
    },
    validate,
    
  });

  useEffect(() => {
    loadUser();
    
  }, []);

  const loadUser = async () => {
    var result = await axios.get(
      `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`
    );

    setUser(result.data);

    console.log("clicked",result.data.data);
  };
  return (
    <div className="modalcontainer">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Update User</h2>

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
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <button className="btn btn-outline-success btn-block">
            {" "}
            UPDATE{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory, useParams } from "react-router-dom";

// const EditUser = () => {
//   let history = useHistory();
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     password: "",
//   });

//   const { name, email, phone, address, password } = user;
//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.put(
//       `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`,
//       user
//     );
//     history.push("/");
//   };

//   const loadUser = async () => {
//     const result = await axios.get(
//       `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`
//     );

//     console.log(result.data.data);

//     setUser(result);
//   };

//   console.log(id);
//   return (
//     <div className="container">
//       <div className="w-36 mn-auto shadow mt-25 ">
//         <h2 className="text-center mb-4">Edit User</h2>
//         <form onSubmit={(e) => onSubmit(e)}>
//           <div className="form-group">
//             <label className="input-label">Enter name :</label>

//             <input
//               type="text"
//               required
//               min="1"
//               max="10"
//               className="form-control form-control-lg"
//               name="name"
//               value={name}
//               onChange={(e) => onInputChange(e)}
//             />
//           </div>

//           <label className="input-label">Enter Email Address :</label>

//           <div className="form-group">
//             <input
//               type="email"
//               className="form-control form-control-lg"
//               name="email"
//               required
//               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
//               value={email}
//               onChange={(e) => onInputChange(e)}
//             />
//           </div>

//           <label className="input-label">Enter phone number :</label>

//           <div className="form-group">
//             <input
//               type="tel"
//               className="form-control form-control-lg"
//               name="phone"
//               required
//               min="10"
//               max="10"
//               value={phone}
//               onChange={(e) => onInputChange(e)}
//             />
//           </div>

//           <label className="input-label">Enter address :</label>

//           <div className="form-group">
//             <textarea
//               className="form-control"
//               name="address"
//               value={address}
//               required
//               min="10"
//               max="10"
//               onChange={(e) => onInputChange(e)}
//               rows="3"
//             ></textarea>
//           </div>

//           <label className="input-label">Enter password :</label>

//           <div className="form-group">
//             <input
//               type="password"
//               className="form-control form-control-lg"
//               name="password"
//               value={password}
//               required
//               min="4"
//               max="8"
//               onChange={(e) => onInputChange(e)}
//             />
//           </div>

//           <button className="btn btn-outline-success btn-block">
//             {" "}
//             UPDATE{" "}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUser;
