import React from 'react'; 
import { Navbar, Nav,NavDropdown } from 'react-bootstrap';
import {FormControl, Form, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';



class NavBar extends React.Component {

  constructor(props, context){
    super(props,context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    }

  this.state = {
    redirectToReferrer: false,
  };
  
  this.onChange = this.onChange.bind(this);
  this.logout = this.logout.bind(this);
  }
  onChange(e){
    this.setState({userFeed:e.target.value});
  }
  


  logout(){
    sessionStorage.setItem("userData",'');
    sessionStorage.clear();
    this.setState(() => ({
        redirectToReferrer: true
      }));
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

      if (this.state.redirectToReferrer) {
        return (<Redirect to={'/login'}/>)
      }

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
      <Form inline>
      <FormControl onChange={this.handleChange} value={this.state.value} type="text" placeholder="Search" className="mr-sm-2" />
      <Button href={"/results/" + this.state.value}>Search</Button>
    </Form>
      <NavDropdown title="Actions" id="basic-nav-dropdown" style={signInStyle} >
        <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
        <NavDropdown.Item href="#">Add Balance</NavDropdown.Item>
        <NavDropdown.Item href="#">Purchase History</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/login" onClick={this.logout} className="logout">Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
   
  </Navbar.Collapse>
</Navbar>




      </div>
    );
  }
}
export default NavBar;




