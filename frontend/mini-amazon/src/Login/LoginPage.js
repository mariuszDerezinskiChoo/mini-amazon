import React from "react"
import LoginPortal from './LoginPortal'
import {withRouter} from 'react-router';

function LoginPage() {
    return (
    <div>
      <LoginPortal />
    </div>
    )
  }

  export default withRouter(LoginPage)