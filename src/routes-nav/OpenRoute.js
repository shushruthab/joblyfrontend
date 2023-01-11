import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function OpenRoute({ login, signup }) {
  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/login" element={<LoginForm login={login} />}></Route>
          <Route exact path="/signup" element={<SignupForm signup={signup} />}></Route>
          
          <Route exact path="/companies" 
          element={<PrivateRoute><CompanyList /></PrivateRoute>}>
          </Route>
          <Route exact path="/jobs" 
          element={<PrivateRoute><JobList /></PrivateRoute>}>
          </Route>
          <Route exact path="/companies/:handle" 
          element={<PrivateRoute><CompanyDetail /></PrivateRoute>}>
          </Route>
          <Route exact path="/profile" 
          element={<PrivateRoute><ProfileForm /></PrivateRoute>}>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>    
        </Routes>

       
      </div>
  );
}

export default OpenRoute;
