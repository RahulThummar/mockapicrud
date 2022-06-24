import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ViewData from "../users/ViewData";
import EditModal from "../users/EditModal";
import { useParams } from "react-router-dom";
import AddUser11 from "../users/AddUser11";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { id } = useParams();
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [dataForModel, setDataForModel] = useState({});
  const [viewdata, setViewData] = useState(false);
  const [addData, setAddData] = useState(false);

  //----handleview

  const handleView = (viewdata) => {
    setViewData(true);
    console.log(viewdata);
    setDataForModel(viewdata);
  };

  const handleViewClose = () => {
    setViewData(false);
  };

  //--------handleshowAdd
  const handleShowAdd = (addData) => {
    setAdd(true);
    setAddData(addData);
  };

  const handleCloseAdd = () => {
    setAdd(false);
    axios
      .get(`https://62affa883bbf46a3522964c7.mockapi.io/crudDemo`)
      .then((respone) => {
        setUser(respone.data);
      });
  };

  //---handleshow edit

  const handleShow = (dataForModel) => {
    setShow(true);
    axios.put(
      `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`,
      users
    );
    setDataForModel(dataForModel);
  };

  console.log(dataForModel, "Data for modal ");

  const handleClose = () => {
    setShow(false);
    axios
      .get(`https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/`)
      .then((respone) => {
        setUser(respone.data);
      });
  };

  //-------------------------------------------------------------
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (id) => {
    const result = await axios.get(
      "https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/"
    );
    setUser(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(
      `https://62affa883bbf46a3522964c7.mockapi.io/crudDemo/${id}`
    );
    loadUsers();

    if (deleteUser(id)) {
      alert(`id : ${id} data is deleted !!`);
    }

    // if (deleteUser(id)) {
    //   toast.error(` id : ${id} data is deleted !!!`, {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }

  };

  return (
    <>
      <nav>
        <div> -</div>
        <div>
          {/* ------ addbutton ------- */}
          <Link
            className="fa fa-plus btn btn-success shadow border border-warning "
            onClick={() => handleShowAdd()}
            // to="/users/add"
          />
        </div>
      </nav>

      <div>-</div>

      <div className="table-striped table-hover table table-sm ">
        <div className="py-2 ">
          <table className="table border shadow">
            <thead className="table-info shadow">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                   <td>
                    <Link
                      className=" fa fa-eye  btn btn-outline-success mr-2"
                      onClick={() => handleView(user)}
                      // to={`/users/${user.id}`}
                    />
                  </td>

                  <td>
                    <Link
                      className="fa fa-edit  btn btn-outline-primary mr-2"
                      onClick={() => handleShow(user)}
                      // to={`/users/edit/${user.id}`}
                    />
                  </td>
                  {console.log(user.id, "hihijojop-=-=-=-=-=-")}

                  <td>
                    <Link
                      className=" fa fa-trash btn btn-outline-danger "
                      onClick={() => deleteUser(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {add ? <AddUser11 show={true} onHide={handleCloseAdd} /> : null}

      {show ? (
        <EditModal show={show} onHide={handleClose} data={dataForModel} />
      ) : null}

      {viewdata ? (
        <ViewData show={true} onHide={handleViewClose} data={dataForModel} />
      ) : null}

      {/* <ToastContainer limit={2} autoClose={2000} /> */}
    </>
  );
};

export default Home;
