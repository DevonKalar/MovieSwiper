import { useState } from 'react';
import { SignInIcon, GoNextIcon, GoPrevIcon } from "@icons";
import { useUser } from "../../providers/UserProvider";
import AuthService from '../../services/AuthService';

const SignUpForm = ({props}) => {
  const { setIsLoggedIn, setFirstName, setLastName } = useUser();
  const [stage, setStage] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNext = () => {
    if (stage === 1 && validateStageOne()) {
      setStage(2);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please fill in all fields correctly.");
    }
  }

  const handlePrev = () => {
    if (stage > 1) {
      setStage(stage - 1);
      setErrorMessage(null);
    }
  }

  const validateStageOne = () => {
    return formData.email !== '';
  }

  const validateStageTwo = () => {
    return formData.firstName !== '' 
    && formData.lastName !== '' 
    && formData.password !== '' 
    && formData.confirmPassword !== '' 
    && formData.password === formData.confirmPassword;
  }

  const handleSignUp = async () => {
    if (!validateStageTwo()) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }
    try {
      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      };
      const response = await AuthService.register(userData);
      setIsLoggedIn(true);
      setFirstName(response.firstName);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
    }
  };

  return (
    <>
    <div>
      <h2>Sign Up</h2>
    </div>

    <div>
      <p>Step {stage} of 2</p>
      <div className="progress-track bg-secondary-100 w-full h-2 rounded-full mt-2">
        <div className="progress-indicator bg-secondary-500 h-2 rounded-full" 
          style={{ width: `${(stage) * 50}%` }}>
        </div>
      </div>
    </div>

    {stage === 1 && (

      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} 
      className="flex flex-col gap-2"
      >
        <label htmlFor="email">Email</label>
        <input type="email" id="email" 
          placeholder="Email" value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-0 border-b-2 border-primary-200 rounded-none" 
        />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button type="submit" className="mt-4">
          Continue <GoNextIcon className="inline-block ml-2" height={20} width={20} />
        </button>
      </form>
      
    )}
    {stage === 2 && (
      <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} 
        className="flex flex-col gap-4"
      >
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" placeholder="Enter your first name" 
            value={formData.firstName} 
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="border-0 border-b-2 border-primary-200 rounded-none"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" placeholder="Enter your last name" 
            value={formData.lastName} 
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="border-0 border-b-2 border-primary-200 rounded-none" 
          />
        </div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" 
          value={formData.password} 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border-0 border-b-2 border-primary-200 rounded-none"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="border-0 border-b-2 border-primary-200 rounded-none"
        />
        <div className="flex flex-col gap-2">
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button type="submit" className="mt-4">
          Sign Up <SignInIcon className="inline-block ml-2" height={20} width={20} />
        </button>
        <button onClick={handlePrev} 
          className="mt-2 border-2 border-secondary-400 text-secondary-400 bg-transparent"
        >
          Previous <GoPrevIcon className="inline-block ml-2" height={20} width={20} />
        </button>
        </div>
      </form> 
    )}
    </>
  )

};

export default SignUpForm;