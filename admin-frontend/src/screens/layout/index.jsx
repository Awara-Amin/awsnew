import React, { useState, useContext } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Store } from "../../Store";
// import Sidebar from "components/Sidebar";
// import { useGetUserQuery } from "state/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //   const userId = useSelector((state) => state.global.userId);
  //   const { data } = useGetUserQuery(userId);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, favorite, cart, userInfo, pos } = state;
  console.log("userInfo kaka");
  console.log(userInfo);
  const [Language, setLanguage] = useState("En");

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={{}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        // Language={Language}
        // setLanguage={setLanguage}
      />
      <Box flexGrow={1} display="block">
        <Navbar
          // user={{}}
          user={{ userInfo }}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          Language={Language}
          setLanguage={setLanguage}
          signoutHandler={signoutHandler}
        />
        <Outlet />
      </Box>
      
    </Box>
  );
};

export default Layout;
