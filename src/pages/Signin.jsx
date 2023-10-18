import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('');
      }, 3000); // 3000 milliseconds = 3 seconds

      // Clear the timeout if the component unmounts
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        {error ? (
          <p className='p-3 mt-4 bg-red-500/40'>
            Wrong credentials, please try again!
          </p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 bg-primary rounded-2xl border ${
                  error ? 'border-red-500' : 'border-input'
                }`}
                type='email'
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 bg-primary rounded-2xl border ${
                  error ? 'border-red-500' : 'border-input'
                }`}
                type='password'
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <button className='w-full my-3 p-2 bg-button text-btnText rounded-2xl shadow-xl font-bold hover:bg-primary hover:text-accent border border-accent'>
            Sign in
          </button>
        </form>
        <p className='my-4'>
          Don&apos;t have an account?{' '}
          <Link to='/signup' className='text-accent font-bold hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
