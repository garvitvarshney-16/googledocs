import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase.js";
import { IconButton, Button } from "@material-tailwind/react";
import { useUserContext } from '../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { SidebarWithBurgerMenu } from './SidebarWithBurgerMenu.jsx';

const Header = () => {
  const navigate = useNavigate();
  const { user, login } = useUserContext();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const inputs = {
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        _id: user.uid,
      };

      await login(inputs);
    } catch (error) {
      console.error('Sign In Error:', error);
    }
  }

  return (
    <header className='sticky top-0 z-50 flex items-center px-5 py-2 shadow-md bg-white'>
      <SidebarWithBurgerMenu />

      <IconButton color='blue' variant='text' size='lg'>
        <img src="/google-docs.png" alt="" srcSet='' />
      </IconButton>
      <h1 className='ml-2 text-gray-700 text-xl' style={{ fontFamily: '"Product Sans", Arial, sans-serif', color: 'gray', fontWeight: 'normal' }}>Docs</h1>

      <div className='mx-5 md:mx-5 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md' style={{ maxWidth: '1000px' }}>
        <IconButton color='gray' variant='text' size='sm'>
          <i className="fa-solid fa-magnifying-glass"></i>
        </IconButton>
        <input type="text" placeholder='Search' className='flex-grow px-5 text-base bg-transparent outline-none' />
      </div>

      <IconButton color='gray' variant='text' size='md'>
        <img src="/apps.png" alt="" />
      </IconButton>

      <Button color='gray' variant='text' size='md' onClick={handleSignIn}>
        <img
          src={user?.photo || "https://docs.material-tailwind.com/icons/google.svg"}
          alt={user ? "User Photo" : "Google Logo"}
          style={{ height: '20px', width: '20px', borderRadius: '10px' }}
        />
      </Button>
    </header>
  );
};

export default Header;
