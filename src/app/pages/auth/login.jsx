import { useContext, useState } from 'react';
import { AuthContext } from 'app/context/authContext';
import {Link, Redirect} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from '@firebase/auth'

const LoginForm = () => {
  let {setCurrUser} = useContext(AuthContext)
  const [creds, setCreds] = useState({
    email: null,
    password: null
  }) 

  const handleInput = (e) => {
    setCreds({...creds, [e.target.id]: e.target.value})
  }

  const handleLogin = (e) => {  
    e.preventDefault()
    const auth = getAuth()
    signInWithEmailAndPassword(auth, creds.email, creds.password)
    .then(res => {
      setCurrUser(res.user);
    })
    .catch(error => {
      console.log(error)
    })
  }

  return(
    <form onSubmit={handleLogin} className="authform">
      <input type="email" value={creds.email} id="email" placeholder="Email" onChange={handleInput} />
      <input type="password" value={creds.password} id="password" placeholder="Password" onChange={handleInput} />
      <button type="submit" id="submitBtn">Sign In</button>
    </form>
  )
}

const Login = () => {

  let {loggedIn} = useContext(AuthContext)

  return(
    <>
      {loggedIn ? <Redirect to="/" /> : ''}
      <div style={{textAlign:'center', margin: '20px 0px'}}>
        <h1 className="logo">React<b>Fire</b> </h1>
      </div>
      <LoginForm />
      <div className="text-center my-2">
        <span>
          <Link to="/auth/signup">Sign Up Here</Link>
        </span>
      </div>
    </>
  
  )
}

export default Login