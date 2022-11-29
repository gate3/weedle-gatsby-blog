import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://joinweedle.com';

export default ({ page }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('email');
  const [error, setError] = useState(null);
  const [isMailVisible, setIsMailVisible] = useState(true);

  const joinWaitList = async () => {
    setLoading(true);
    const data = { email };

    await axios
      .post(`${baseUrl}/api/pre-launch/register`, data)
      .then((data) => {
        setLoading(false);
        setEmail(null);
        setIsMailVisible(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  return (
    <>
      {isMailVisible ? (
        <div
          className={page == 'article' ? 'input__on_page' : 'hero-header'}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        >
          <h1>Get notified when we launch</h1>
          <div className={'input__wrapper'}>
            <input type='email' name='email' placeholder='Provide your best email' onChange={handleChange} />
            <button className='input__button' onClick={joinWaitList}>
              {loading ? 'please wait...' : 'Join the waitlist'}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
