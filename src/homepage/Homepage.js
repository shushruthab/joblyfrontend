import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Button, Card, Container, Grid, Row, Text, Col } from "@nextui-org/react";
/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.debug("Homepage", "currentUser=", currentUser);

  function handleClick() {
    navigate('/signup');
  } 
  return (
      <Grid.Container justify="center" css={{"vh": "90%"}}>
      <Grid xs={12} sm={6}alignItems="center">
      <Col css={{"width":"100%"}}>
      <Text weight={"bold"} size={70} css={{"textAlign": "center"}}>All the jobs</Text>
      <Text weight={"bold"} size={70} css={{"textAlign": "center"}}>in one,</Text>
      <Text weight={"bold"} size={70} css={{"textAlign": "center"}}>convenient place.</Text>
      
      <Button onClick={() => handleClick()} size="md" shadow color={"gradient"} css={{"width": "100%", "marginTop": "10px"}}>Sign Up Today!</Button>
      
      
    </Col>
    </Grid>
    </Grid.Container>
    
  );
}

export default Homepage;
