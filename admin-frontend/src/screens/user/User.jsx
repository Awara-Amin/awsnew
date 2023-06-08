import { Link, useLocation } from "react-router-dom";
import "./user.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
// import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
// import { userRequest } from "../../requestMethods";

export default function User() {
  console.log("user Edite screen in admin side inside User.jsx");
  const location = useLocation();
  console.log(location);
  const usertId = location.pathname.split("/")[2];
  // const [pStats, setPStats] = useState([]);
  //   const user = useSelector((state) =>
  //     state.user.users.find((user) => user._id === usertId)
  //   );
  //   console.log("user inside User.jsx");
  //   console.log(user);
  //   console.log(user.username);

  // const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  console.log("user inside User.jsx what is email----1");
  //   console.log(email);

  //   const couponDetails = useSelector((state) => state.couponDetails);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              {/* <span className="userShowUsername">Anna Becker</span> */}
              {/* <span className="userShowUsername">{user.username}</span> */}
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              {/* <span className="userShowInfoTitle">10.12.1999</span> */}
              <span className="userShowInfoTitle">{"user.createdAt"}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              {/* <span className="userShowInfoTitle">annabeck99@gmail.com</span> */}
              <span className="userShowInfoTitle">{"user.email"}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  // placeholder="annabeck99"
                  placeholder={"user.username"}
                  name="username"
                  id="username"
                  value={username}
                  // onChangeText={(text) => setName(text)}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  placeholder="Full Name Kaka"
                  // placeholder={user.username}
                  name="fullname"
                  id="fullname"
                  // value={fullname}
                  // onChangeText={(text) => setFullname(text)}
                  // onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  className="userUpdateInput"
                  type="text"
                  // placeholder="annabeck99@gmail.com"
                  placeholder={"user.email"}
                  name="email"
                  id="email"
                  value={email}
                  // onChangeText={(text) => setEmail(text)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="New York | USA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
