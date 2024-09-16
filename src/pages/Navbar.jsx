import React from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";


function Navbar() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  
  useEffect(() => {
    axios
      .get("http://localhost:3301/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ 
      username: "", 
      id: 0, 
      status: false });
  };

  
  return (
    <div>
        <div className="navbar">
          <AuthContext.Provider value={{ authState, setAuthState }}>
            <Link to="/"> Home Page</Link>
            <Link to="/createpost"> CreatePost</Link>
            {!authState.status ? (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </>

            ) : (
              <button onClick={logout}> Logout</button>
            )}

            <h1>{authState.username}</h1>
          </AuthContext.Provider>
        </div>
    </div>
  )
}

export default Navbar