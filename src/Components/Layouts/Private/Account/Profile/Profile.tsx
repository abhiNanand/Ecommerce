/* eslint-disable jsx-a11y/label-has-associated-control */
import './Profile.scss';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  onAuthStateChanged,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../../Shared/CustomHooks/userAuth';
import { auth } from '../../../../../Services/firebase/firebase';

export default function Profile() {
  const { user } = useAuth();
  const [isPasswordProvider, setIsPasswordProvider] = useState<boolean>(false);
  const [editMode, setEditMode] = useState(false);

  const displayName = user?.displayName ?? '';
  const [firstNameDefault, lastNameDefault] = displayName.split(' ');
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [showPassword3, setShowPassword3] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const hasPassword = currentUser.providerData.some(
          (p) => p.providerId === 'password'
        );
        setIsPasswordProvider(hasPassword);
      }
    });
    return () => unsubscribe();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: firstNameDefault || '',
      lastName: lastNameDefault || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
          'Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
        )
        .notOneOf(
          [Yup.ref('currentPassword'), null],
          'New password cannot be the same as current password'
        ),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf(
          [Yup.ref('newPassword')],
          'Confirm Passwords must match with new password'
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { currentUser } = auth;
        if (!currentUser) return;

        setChangePassword(true);
        if (values.newPassword) {
          const credential = EmailAuthProvider.credential(
            currentUser.email!,
            values.currentPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, values.newPassword);
        }

        toast.success('Password changed successfully!');
        setEditMode(false);
        resetForm();
      } catch {
        toast.error(' Current password is wrong');
      }
      setChangePassword(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    let processedValue = e.target.value;
    processedValue = processedValue.replace(/\s/g, '');
    formik.setFieldValue(fieldName, processedValue);
  };

  return (
    <div className="profile-container">
      <h3 className="profile-title">Edit Your Profile</h3>

      <form className="profile-form" onSubmit={formik.handleSubmit}>
        <div className="profile-row">
          <div className="profile-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              disabled
              value={formik.values.firstName}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formik.values.lastName}
              disabled
            />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <label htmlFor="email">Email</label>
            <input type="email" value={user?.email ?? ''} disabled />
          </div>
        </div>

        {editMode && (
          <div className="profile-password-section">
            <label htmlFor="currentPassoword">Current Password</label>

            <div className="input-wrapper">
              <input
                type={showPassword1 ? 'text' : 'password'}
                name="currentPassword"
                placeholder="Current Password"
                value={formik.values.currentPassword}
                onChange={handleChange}
              />
              {formik.values.currentPassword &&
                (showPassword1 ? (
                  <EyeOff
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword1(!showPassword1)}
                  />
                ) : (
                  <Eye
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword1(!showPassword1)}
                  />
                ))}
            </div>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <small className="error">{formik.errors.currentPassword}</small>
              )}
            <label htmlFor="newPassword">New Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword2 ? 'text' : 'password'}
                name="newPassword"
                placeholder="New Password"
                value={formik.values.newPassword}
                onChange={handleChange}
              />
              {formik.values.newPassword &&
                (showPassword2 ? (
                  <EyeOff
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword2(!showPassword2)}
                  />
                ) : (
                  <Eye
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword2(!showPassword2)}
                  />
                ))}
            </div>

            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="error">{formik.errors.newPassword}</small>
            )}
            <label htmlFor="confirmPassoword">Confirm New Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword3 ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formik.values.confirmPassword}
                onChange={handleChange}
              />
              {formik.values.confirmPassword &&
                (showPassword3 ? (
                  <EyeOff
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword3(!showPassword3)}
                  />
                ) : (
                  <Eye
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword3(!showPassword3)}
                  />
                ))}
            </div>

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <small className="error">{formik.errors.confirmPassword}</small>
              )}
          </div>
        )}

        {isPasswordProvider && (
          <div className="profile-actions">
            {!editMode ? (
              <button
                type="button"
                className="profile-save"
                onClick={() => setEditMode(true)}
              >
                Change Password
              </button>
            ) : (
              <>
                <button
                  disabled={changePassword}
                  type="button"
                  className="profile-save "
                  onClick={() => {
                    formik.resetForm();
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={changePassword}
                  type="submit"
                  className="profile-save"
                >
                  {changePassword ? 'Changing...' : 'Save Changes'}
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
