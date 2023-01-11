import { Grid, Spacer, Text, Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
      <div className="SignupForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        
        <Spacer y={2} />
          <Text h3 css={{"textAlign": "center"}}>Sign Up</Text>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <Grid.Container gap={2}>  
              <Grid xs={12} justify="center">
                  
                  <Input
                  width="320px"
                  size="md"
                  clearable
                  bordered
                  placeholder='Username'
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  />
                </Grid>
                <Grid xs={12} justify="center">
                  
                    <Input.Password
                    width="320px"
                    clearable
                    bordered
                    placeholder='Password'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                  </Grid>
                  <Grid xs={12} justify="center">
                  
                  <Input
                  width="320px"
                  size="md"
                  clearable
                  bordered
                  placeholder='First Name'
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  />
                </Grid>
                <Grid xs={12} justify="center">
                  
                  <Input
                  width="320px"
                  size="md"
                  clearable
                  bordered
                  placeholder='Last Name'
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  />
                </Grid>
                <Grid xs={12} justify="center">
                  
                  <Input
                  width="320px"
                  size="md"
                  clearable
                  bordered
                  placeholder='Email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  />
                </Grid>
                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }
                <Grid xs={12} justify="center">
                    
                    <Button borderWeight={"bold"} rounded bordered color={"gradient"} type='submit'  css={{width:"320px"}}>Submit</Button>
                    </Grid>
                </Grid.Container>
                
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;