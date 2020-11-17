import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {
    
    render(props) {
        const Component = this.props.component;
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        console.log(props);
        return isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default ProtectedRoute