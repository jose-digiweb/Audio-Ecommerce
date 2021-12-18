import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LogInForm from './Form';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { logInAction, signupUserAction } from '../../Redux/actions/authAction';
import { AppContext } from '../../Contexts/AppContext';
import { View } from '../../helper';

const Auth = ({ logInAction, signupUserAction }) => {
  const { setIsLogged, setShowMessage } = useContext(AppContext);
  const [isSignUp, setIsSignUp] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const { desktop } = View();
  const navigate = useNavigate();

  const handleSubmit = formData => {
    if (!isSignUp) {
      signupUserAction(formData, setShowMessage, setIsLogged, navigate);
    }
    if (isSignUp) {
      logInAction(formData, navigate, setShowMessage, desktop, setIsLogged);
    }
  };

  return (
    <div className='w-full h-screen fex flex-row bg-black-light bg-pattern-circle'>
      <div className='w-full h-full container-tv flex justify-between mobile:py-10'>
        <LogInForm
          onSubmit={handleSubmit}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          setShowResetPassword={setShowResetPassword}
        />

        <ForgotPassword
          showResetPassword={showResetPassword}
          setShowResetPassword={setShowResetPassword}
        />

        <div className='mobile:hidden grid grid-cols-2 grid-rows-2 gap-4 w-1/2 h-screen p-28 tablet:hidden'>
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
