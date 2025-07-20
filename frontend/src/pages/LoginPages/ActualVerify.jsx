import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react'; // Make sure to install `lucide-react`

const ActualVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `https://miniprojectsem6-rtrk.onrender.com/api/user/verify/${token}`
        );
        setMessage("✅ Email verified successfully!");
        setSuccess(true);

        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              navigate('/signin');
            }
            return prev - 1;
          });
        }, 1000);
      } catch (error) {
        console.error(error);
        setMessage("❌ Verification failed or token is invalid.");
        setSuccess(false);
      }
    };
    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-md text-center w-full">
        {success ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4">Email Verified!</h2>
            <p className="mt-2 text-gray-300">You will be redirected in <span className="font-semibold">{countdown}</span> seconds...</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-red-500">{message}</h2>
            {!success && (
              <p className="mt-2 text-gray-400">Please try verifying again or contact support.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ActualVerify;
