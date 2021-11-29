import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Authorized from "./Pages/Login/Authorized";
import Login from "./Pages/Login/Login";
import Prisoners from "./Pages/Prisoners/Prisoners";
import ReleaseRequests from "./Pages/ReleaseRequests/ReleaseRequests";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authorized>
            <Home />
          </Authorized>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/Prisoners"
        element={
          <Authorized adminRequired>
            <Prisoners />
          </Authorized>
        }
      />
      <Route
        path="/ReleaseRequests"
        element={
          <Authorized adminRequired>
            <ReleaseRequests />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
