import { Navigate, useNavigate } from 'react-router-dom';
import FavouriteCoin from '../components/FavouriteCoin';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  if (user) {
    return (
      <div className='max-w-[1140px] mx-auto'>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
          <div>
            <h1 className='text-2xl font-bold'>Account</h1>
            <div>
              <p>Welcome to your account!</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className='bg-button text-btnText font-bold px-5 py-2 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-primary hover:text-accent border border-accent block md:hidden'
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
          <div className='w-full min-h-[300px]'>
            <h1 className='text-2xl font-bold py-4'>Favourite Coins</h1>
            <FavouriteCoin />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to='/signin' />
  }
};

export default Account;
