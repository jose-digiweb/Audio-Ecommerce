import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import LogInForm from './form';
import { logInAction, signupUserAction } from '../../Redux/actions/authAction';

const Auth = ({ logInAction, signupUserAction, setIsLogged, setShowMessage }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  const navigate = useNavigate();

  const handleSubmit = formData => {
    if (!isSignUp) {
      signupUserAction(formData, setShowMessage, setIsLogged, navigate);
    }
    if (isSignUp) {
      logInAction(formData, navigate, setShowMessage, desktopViewport, setIsLogged);
    }
  };

  return (
    <div className='w-full fex flex-row bg-black-light bg-pattern-circle'>
      <div className='w-full container-tv h-screen flex justify-between'>
        <LogInForm
          onSubmit={handleSubmit}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />

        <div className='grid grid-cols-2 grid-rows-2 gap-4 w-1/2 h-screen p-28 tablet:hidden'>
          <div className='col-span-2 bg-auth-img3 bg-cover bg-no-repeat rounded'></div>
          <div className='bg-auth-img2 bg-cover bg-no-repeat rounded'></div>
          <div className='bg-auth-img1 bg-cover bg-no-repeat rounded'></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { user: state.authReducer };
};

export default connect(mapStateToProps, { logInAction, signupUserAction })(Auth);
