import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import NavItem, {
  NavItemDropDown,
} from '../../components/737AC/NavItem/NavItem'
import 'bootstrap/dist/css/bootstrap.min.css'
const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-light'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand' href='/'>
          <img src={logo} alt='' />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <NavItem>
              <Link to='/' className='nav-link active'>
                Owing Status
              </Link>
            </NavItem>
            <NavItem>
              <Link to='/UnInstalled' className='nav-link active'>
                UnInstalled
              </Link>
            </NavItem>
            <NavItem>
              <a className='nav-link' href='/#'>
                {/* Pricing */}
              </a>
            </NavItem>
            <NavItemDropDown>
              <a
                className='nav-link dropdown-toggle'
                href='/#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown link
              </a>
              <ul className='dropdown-menu'>
                <li>
                  <a className='dropdown-item' href='/#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/#'>
                    Another action
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </NavItemDropDown>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
