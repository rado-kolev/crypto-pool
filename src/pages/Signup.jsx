import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  // Handle changes in the input fields
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // Clear the error message
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(''); // Clear the error message
  };

  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {error ? <p className='bg-red-500/70 p-3 my-2'>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='email'
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={handlePasswordChange}
                value={password}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='password'
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Confirm Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type='password'
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <button className='w-full my-3 p-2 bg-button text-btnText rounded-2xl shadow-xl font-bold hover:bg-primary hover:text-accent border border-accent'>
            Sign up
          </button>
        </form>
        <p className='my-4'>
          Already have an account?{' '}
          <Link to='/signin' className='text-accent font-bold hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
