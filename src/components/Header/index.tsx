import logo from '../../assets/svg/logo.svg'
import './style.css'

function Header() {
  return (
    <header className="header">
      <div className="container header__content">
        <img src={logo} alt="" />
      </div>
    </header>
  )
}

export default Header
