import ThemeToggle from './ThemeToggle';
import { FaFacebookF, FaGithub, FaTiktok, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='rounded-div mt-8 pt-8 text-primary'>
      <div className='grid md:grid-cols-2'>
        <div className='flex justify-evenly md:justify-between w-full md:max-w-[300px] uppercase'>
          <div>
            <h2 className='font-bold'>Support</h2>
            <ul>
              <li className='text-sm py-2'>Help Center</li>
              <li className='text-sm py-2'>Contact Us</li>
              <li className='text-sm py-2'>API Status</li>
              <li className='text-sm py-2'>Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold'>Info</h2>
            <ul>
              <li className='text-sm py-2'>About Us</li>
              <li className='text-sm py-2'>Careers</li>
              <li className='text-sm py-2'>Invest</li>
              <li className='text-sm py-2'>Legal</li>
            </ul>
          </div>
        </div>
        <div className='text-right'>
          <div className='w-full flex justify-end'>
            <div className='w-full md:w-[300px] py-4 relative'>
              <div className='flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]'>
                <ThemeToggle />
              </div>
              <p className='text-center font-bold md:text-right'>
                Sign up for crypto news
              </p>
              <div className='py-4'>
                <form>
                  <input
                    className='bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto'
                    type='email'
                    placeholder='Enter your email'
                  />
                  <button className='bg-button text-btnText px-4 py-2 w-full rounded-2xl shadow-xl hover:shadow-2xl md:w-auto my-2 hover:bg-primary hover:text-accent border border-accent font-bold'>
                    Sign up
                  </button>
                </form>
              </div>
              <div className='flex py-4 justify-between text-accent'>
                <FaInstagram className='cursor-pointer hover:scale-150 ease-in-out duration-300' />
                <FaFacebookF className='cursor-pointer hover:scale-150 ease-in-out duration-300' />
                <FaTwitter className='cursor-pointer hover:scale-150 ease-in-out duration-300' />
                <FaTiktok className='cursor-pointer hover:scale-150 ease-in-out duration-300' />
                <FaGithub className='cursor-pointer hover:scale-150 ease-in-out duration-300' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='py-4 text-center'>
        Powered by <span className='text-[#4bcc00] font-bold'>CoinGecko</span>
      </p>
    </div>
  );
};

export default Footer;
