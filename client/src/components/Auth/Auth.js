import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import LogInForm from './form';
import { logInAction } from '../../Redux/actions/actions';
import ShowMessage from '../reusables/ShowMessage';

const Auth = props => {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState({});

  const handleMessage = (text, color) => {
    setMessage({ text, color });

    setTimeout(() => {
      setShowMessage(prev => !prev);

      setTimeout(() => {
        setShowMessage(prev => !prev);
      }, 5000);
    }, 1000);
  };

  const desktopViewport = useMediaQuery({ minWidth: 1280 });

  const handleSubmit = formData => {
    props.logInAction(formData, history, handleMessage, desktopViewport);
  };

  return (
    <div className='w-full fex flex-row bg-black-light bg-pattern-circle'>
      {showMessage ? (
        <ShowMessage message={message?.text} color={message?.color} />
      ) : null}
      <div className='w-full container-tv h-screen flex justify-between'>
        <LogInForm onSubmit={handleSubmit} />

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

export default connect(mapStateToProps, { logInAction })(Auth);
