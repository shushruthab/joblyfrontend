import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Grid,
} from '@nextui-org/react';
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      navigate("/companies");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
  
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <Spacer y={2} />
          <Text h3 css={{"textAlign": "center"}}>Sign In</Text>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <Grid.Container gap={3}>
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
                  
                  {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}
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

export default LoginForm;
