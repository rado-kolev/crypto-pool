import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const location = useLocation();

  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const refreshPage = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const isHomePage = location.pathname === '/';
  const isAccountPage = location.pathname === '/account';

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold'>
      <Link className='flex items-center' to='/'>
        <h1 className='text-3xl text-accent'>CryptoPool</h1>
      </Link>
      <div className='hidden md:block'>
        <ThemeToggle />
      </div>

      {user?.email ? (
        <div className='hidden md:block'>
          {!isHomePage && (
            <Link to='/' className='p-4 hover:text-accent'>
              Home
            </Link>
          )}
          {!isAccountPage && (
            <Link to='/account' className='p-4 hover:text-accent'>
              Account
            </Link>
          )}
          <button
            onClick={() => {
              handleSignOut(), refreshPage();
            }}
            className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-primary hover:text-accent border border-accent'
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className='hidden md:block'>
          {!isHomePage && (
            <Link to='/' className='p-4 hover:text-accent'>
              Home
            </Link>
          )}
          <Link
            to='/signin'
            className='text-primary px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl hover:text-accent border border-input hover:border-accent'
          >
            Sign In
          </Link>
          <Link
            to='/signup'
            className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-primary hover:text-accent border border-accent'
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Menu Icon */}
      <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      {/* Mobile Menu */}
      <div
        className={
          nav
            ? 'md:hidden fixed left-0 top-0 flex flex-col items-center justify-between w-full h-screen p-4 bg-primary ease-in duration-300 z-10'
            : 'fixed left-[-100%] top-0 h-screen flex flex-col items-center justify-between ease-in duration-200 z-10'
        }
      >
        <div className='rounded-div flex items-center justify-between h-20 font-bold'>
          <Link className='flex items-center' to='/'>
            <h1 className='text-3xl text-accent'>CryptoPool</h1>
          </Link>
          <div
            onClick={handleNav}
            className='block md:hidden cursor-pointer z-10'
          >
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </div>
        </div>
        <div className='rounded-div flex flex-col items-center justify-between w-full h-full mt-4'>
          <ul className='w-full p-4'>
            {!isHomePage && (
              <li onClick={handleNav} className='border-b py-6'>
                <Link to='/' className='hover:text-accent'>
                  Home
                </Link>
              </li>
            )}
            {user?.email && !isAccountPage && (
              <li onClick={handleNav} className='border-b py-6'>
                <Link to='/account' className='hover:text-accent'>
                  Account
                </Link>
              </li>
            )}
            <li className='py-6'>
              <ThemeToggle />
            </li>
          </ul>
          {user?.email ? (
            <div className='flex flex-col w-full p-4'>
              <Link to='/'>
                <button
                  onClick={() => {
                    handleSignOut();
                    handleNav();
                    refreshPage();
                  }}
                  className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:bg-primary hover:text-accent border border-accent'
                >
                  Sign Out
                </button>
              </Link>
            </div>
          ) : (
            <div className='flex flex-col w-full p-4'>
              <Link to='/signin'>
                <button
                  onClick={handleNav}
                  className='w-full my-2 p-3 bg-primary text-primary rounded-2xl shadow-xl hover:text-accent border border-input hover:border-accent'
                >
                  Sign In
                </button>
              </Link>
              <Link to='/signup'>
                <button
                  onClick={handleNav}
                  className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:bg-primary hover:text-accent border border-accent font-bold'
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
