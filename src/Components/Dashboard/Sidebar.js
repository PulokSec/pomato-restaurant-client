import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useAuth } from "../SignUp/useAuth";

const Sidebar = () => {
  const auth = useAuth();
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="blueviolet">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Dashboard
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content active">
          <CDBSidebarMenu>
            <NavLink exact to="/admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add-admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Add Admin</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <NavLink
            to="/"
            onClick={() => {
              auth.signOut();
            }}
            style={{ textDecoration: "none", color: "whiteSmoke" }}
          >
            <CDBSidebarMenuItem icon="arrow-left">Sign Out</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
