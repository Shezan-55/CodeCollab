import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ActualVerify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `https://miniprojectsem6-rtrk.onrender.com/api/user/verify/${token}`
        );
        setMessage("Email verified successfully!");
        // optionally redirect after a delay
        setTimeout(() => navigate('/signin'), 3000);
      } catch (error) {
        console.error(error);
        setMessage("Verification failed or token invalid.");
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default ActualVerify;

