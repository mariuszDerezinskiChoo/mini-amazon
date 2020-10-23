import React from 'react'; 
import { Navbar, Nav,NavDropdown } from 'react-bootstrap';
import {FormControl, Form, Button} from 'react-bootstrap';


class NavBar extends React.Component {

  constructor(props, context){
    super(props,context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    }
  }


  componentDidMount() {
   this.textInput = React.createRef(); 
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }



  render() {
    const signInStyle = {
        position: 'absolute',
        right: 90,
      };


    const handleClick = (e) => {
      e.preventDefault();
      console.log(this.state.value);
    }
    return (
      <div>

<Navbar bg="light" expand="lg">
  <Navbar.Brand href="/home">Mini-Amazon</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/seller">Seller</Nav.Link>
      <Nav.Link href="/cart">Cart</Nav.Link>
      <Nav.Link href="/addReview">Review</Nav.Link>
      <Nav.Link href="/results">Results</Nav.Link>
      <Form inline>
      <FormControl onChange={this.handleChange} value={this.state.value} type="text" placeholder="Search" className="mr-sm-2" />
      <Button href={"/results/" + this.state.value}>Search</Button>
    </Form>
      <NavDropdown title="Actions" id="basic-nav-dropdown" style={signInStyle} >
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        <NavDropdown.Item href="/signup">create an account</NavDropdown.Item>
        <NavDropdown.Item href="/test-api">Test-api</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">log out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
   
  </Navbar.Collapse>
</Navbar>




      </div>
    );
  }
}
export default NavBar;