import { Navbar, Button, Text, Link, Card, Radio, Container, Grid  } from "@nextui-org/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";


/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/companies">
            Companies
          </Navbar.Link>
          <Navbar.Link color="inherit" href="/jobs">
            Jobs
          </Navbar.Link>
          <Navbar.Link color="inherit" href="/profile">
            Profile
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="/" onClick={logout}>
              Log out
            </Button>
          </Navbar.Item>
      </Navbar.Content>
    );
  }

  function loggedOutNav() {
    return (
      
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/login">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="signup">
              Sign Up
            </Button>
          </Navbar.Item>
      </Navbar.Content>
      
    );
  }

  return (
    <Navbar isBordered variant="floating">
    <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">JOBLY</Text>  
    </Navbar.Brand>
      
        
        {currentUser ? loggedInNav() : loggedOutNav()}
      
      </Navbar>
  );
}

export default Navigation;
