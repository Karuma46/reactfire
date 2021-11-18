import { useContext, useState } from 'react';
import { AuthContext } from 'app/context/authContext';
import {Link, Redirect} from 'react-router-dom'

const RegisterForm = () => {
  const [creds, setCreds] = useState({
    email: null,
    password: null
  }) 

  const handleInput = (e) => {
    setCreds({...creds, [e.target.id]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
  }

  return(
    <form onSubmit={handleLogin}>
      <input type="text" value={creds.first_name} id="first_name" placeholder="First Name" onChange={handleInput} />
      <input type="text" value={creds.last_name} id="last_name" placeholder="Last Name" onChange={handleInput} />
      <input type="email" value={creds.email} id="email" placeholder="Email" onChange={handleInput} />
      <input type="password" value={creds.password} id="password" placeholder="Password" onChange={handleInput} />
      <input type="password" value={creds.cpassword} id="cpassword" placeholder="Confirm Password" onChange={handleInput} />
      <button type="submit">Sign Up</button>
    </form>
  )
}


const Register = () => {

  let {loggedIn} = useContext(AuthContext)

  return(
    <>
      {loggedIn ? <Redirect to="/" /> : ''}
      <div style={{textAlign:'center', margin: '20px 0px'}}>
        <h1 className="logo">React<b>Fire</b> </h1>
      </div>
      <RegisterForm />
      <div className="text-center my-2">
        <span>
          <Link to="/auth/signin">Sign In Here</Link>
        </span>
      </div>
    </>
  
  )
}

export default Register