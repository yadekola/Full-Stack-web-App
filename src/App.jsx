import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
// import Navbar from "./pages/Navbar";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
// import { useState } from "react"; 
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { useNavigate } from "react-router-dom";


function App() {

  let navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });


  useEffect(() => {
    axios
      .get("https://full-stack-api-yade-a58a699bb725.herokuapp.com/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
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
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login");
  };


  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <div className="navbar">
          <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page</Link>
                  <Link to="/createpost"> Create A Post</Link>
                </>
              )}
            </div>
              <div className="loggedInContainer">
                <h1>{authState.username} </h1>
                {authState.status && <button onClick={logout}> Logout</button>}
              </div>
          </div>
          {/* <Navbar /> */}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </AuthContext.Provider>
    </div >
    </>
  )
}

export default App
