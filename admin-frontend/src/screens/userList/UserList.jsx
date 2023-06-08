import React, { useState, useEffect, useContext } from "react";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getProducts, getUsers } from "../../redux/apiCalls";
// import { publicRequest, userRequest } from "../../requestMethods";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { publicRequest, userRequest } from "../../requestMethods";

export default function UserList() {
  console.log("inside userList kaka");
  // const dispatch = useDispatch();
  //   const users = useSelector((state) => state.user.users);
  //   const [usersData, setUsersData] = useState(users);

  const [data, setData] = useState(userRows);
  //   console.log(users);
  console.log("inside userList kaka-2");
  console.log(data);

  //   useEffect(() => {
  //     getUsers(dispatch);
  //   }, [dispatch]);

  //
  // useEffect(()=>{
  //     getUsers()
  //   })
  //     const getUsers =  () => {
  //       publicRequest.get("/users")
  //       .then((res)=>{
  //         console.log("inside userList kaka 22222")
  //         console.log(res.data)
  //       })
  //     };
  //

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 400 },
    { field: "id", headerName: "ID", width: 100 },
    // { field: "username", headerName: "USER", width: 400 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    // {
    //   field: "isAdmin",
    //   headerName: "isAdmin",
    //   width: 120,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
