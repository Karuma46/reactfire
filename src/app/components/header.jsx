import avatar from 'app/assets/img/avatar.png';

const Header = () => {
  return(
    <header className="rb px-5 d-flex align-items-center justify-content-between">
      <div className="">
        <h1>React<b>Fire</b> </h1>
        <h3>To do App <i className="bi-heart-fill"></i></h3>
      </div>
      
      <div id="accountDetails">
        <div id="accAvatar">
          <img src={avatar} alt="" />
        </div>
        <div id="accInfo" className="text-center">
          <h3>Steve Karuma</h3>
          <div id="accActions">
            <span>
              <i className="bi-gear"></i>
            </span>
            <span>
              <i className="bi-box-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header