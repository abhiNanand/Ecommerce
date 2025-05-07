import { useState } from 'react';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ROUTES, VALIDATION_CONSTANTS } from '../../../Shared/Constants';
import { auth, db } from '../../../Services/firebase/firebase';
import assets from '../../../assets';
import Google from '../Google';
import { ReusableForm } from '../ReusableForm';
import '../Login/Login.scss';

export default function Signup() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState<boolean>(false);

  const formFields = [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      validation: Yup.string().required(VALIDATION_CONSTANTS.NAME_REQUIRED),
    },
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email address',
      validation: Yup.string()
        .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED)
        .matches(
          VALIDATION_CONSTANTS.Email_REGEX,
          VALIDATION_CONSTANTS.EMAIL_INVALID
        ),
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: Yup.string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED)
        .matches(
          VALIDATION_CONSTANTS.PASSWORD_REGEX,
          VALIDATION_CONSTANTS.PASSWORD_WEAK
        ),
      showPasswordToggle: true,
    },
  ];

  const handleSubmit = async (values: { name: string; email: string; password: string }, { resetForm }: any) => {
    setCreating(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const { user } = userCredential;

      await updateProfile(user, { displayName: values.name });
      toast.success(
        'A verification link has been sent to your email. Please verify your account before logging in.',
        { autoClose: 4500 }
      );

      await sendEmailVerification(user);
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: values.name,
      });

      setTimeout(() => navigate(ROUTES.LOGIN), 2000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('User already exist');
      } else {
        toast.error('Sign-up failed. Please try again.');
      }
    } finally {
      setCreating(false);
      resetForm();
    }
  };

  return (
    <div className="login-signup-container">
      <div className="shop-img-container">
        <img src={assets.images.shopping} alt="shoppingImage" />
      </div>
      <div className="login-container">
        <h1>Create an account</h1>
        <p>Enter your details below</p>
        
        <ReusableForm
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required(VALIDATION_CONSTANTS.NAME_REQUIRED),
            email: Yup.string()
              .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED)
              .matches(
                VALIDATION_CONSTANTS.Email_REGEX,
                VALIDATION_CONSTANTS.EMAIL_INVALID
              ),
            password: Yup.string()
              .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH)
              .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED)
              .matches(
                VALIDATION_CONSTANTS.PASSWORD_REGEX,
                VALIDATION_CONSTANTS.PASSWORD_WEAK
              ),
          })}
          onSubmit={handleSubmit}
          fields={formFields}
          submitButtonText="Create Account"
          isSubmitting={creating}
        >
          <Google />
        </ReusableForm>

        <p id="go-to-login">
          Already have an account?{' '}
          <NavLink to={ROUTES.LOGIN}>
            <u>Log in</u>
          </NavLink>
        </p>
      </div>
    </div>
  );
}