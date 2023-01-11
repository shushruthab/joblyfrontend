import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import { Spacer, Text, Grid, Input, Button } from "@nextui-org/react";

/** Profile editing form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 *
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `useTimedMessage`, but switching the lines below.
 *
 * Routed as /profile
 * Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "currentUser=", currentUser,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
  );

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */

  async function handleSubmit(evt) {
    // evt.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <Spacer y={1} />
          <Text h3 css={{"textAlign": "center"}}>Profile</Text>
        <div className="card">
          <div className="card-body">
          <form>
            <Grid.Container gap={3.5}>
            
            <Grid xs={12} justify="center">
                  
                  <Input
                  disabled
                  labelPlaceholder="Username"
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
              <Input
                  width="320px"
                  size="md"
                  labelPlaceholder="First Name"
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
                  labelPlaceholder="Last Name"
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
                  labelPlaceholder="Email"
                  bordered
                  placeholder='Email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  />
                </Grid>
                <Grid xs={12} justify="center">
                  
                    <Input.Password
                    width="320px"
                    clearable
                    labelPlaceholder="Confirm Password to make changes"
                    bordered
                    placeholder='Password'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                  </Grid>
                  <Grid xs={12} justify="center">
                  <Text h3 css={{"textAlign": "center"}}>{formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}</Text>
                  
                    
                    <Button borderWeight={"bold"} rounded bordered color={"gradient"} onClick={handleSubmit} css={{width:"320px"}}>Save Changes</Button>
                    </Grid>
            
            </Grid.Container>
            </form>
          </div>
        </div>
      </div>
  );
}

export default ProfileForm;
