import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`
    );

    setUser(result.data);
    console.log("You Select id : ",result.data.data)
  };
  return (
    <div className="container py-4">
      <Link
        className=" fa fa-backward btn btn-warning shadow border border-success "
        to="/"
      />

      <h1 className="display-3">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Phone: {user.phone}</li>
        <li className="list-group-item">Address: {user.address}</li>
        <li className="list-group-item">Password: {user.password}</li>
      </ul>
    </div>
  );
};

export default User;
