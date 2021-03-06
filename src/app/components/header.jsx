import { useContext } from 'react';
import {AuthContext } from 'app/context/authContext';
import avatar from 'app/assets/img/avatar.png';

const Header = () => {
  let {signout, profile} = useContext(AuthContext);

  return(
    <header className="rb px-5 d-flex align-items-center justify-content-between">
      <div className="">
        <h1 className="logo">React<b>Fire</b> </h1>
        <h3>To do App <i className="bi-heart-fill"></i></h3>
      </div>
      
      <div id="accountDetails">
        <div id="accAvatar">
          <img src={avatar} alt="" />
        </div>
        <div id="accInfo" className="text-center">
          <h3>{profile?.first_name} {profile?.last_name}</h3>
          <div id="accActions">
            <span>
              <i className="bi-gear"></i>
            </span>
            <span onClick={signout}>
              <i className="bi-box-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header