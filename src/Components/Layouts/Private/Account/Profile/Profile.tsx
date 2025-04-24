
import './Profile.scss';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../../../Services/UserAuth';
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import {toast} from 'react-toastify';
import { auth } from '../../../../../Services/firebase/firebase'; 

export default function Profile() {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const displayName = user?.displayName ?? '';
  const [firstNameDefault, lastNameDefault] = displayName.split(' ');

  const formik = useFormik({
    initialValues: {
      firstName: firstNameDefault || '',
      lastName: lastNameDefault || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      currentPassword: Yup.string().when('newPassword', {
        is: (val: string) => val.length > 0,
        then: () => Yup.string().required('Current password is required'),
      }),
      newPassword: Yup.string().min(6, 'Password too short'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), ''],
        'Passwords must match'
      ),
    }),
    onSubmit: async (values) => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;


        // Update password if newPassword is provided
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
      } catch (err: any) {
       toast.error(" Current password is wrong");
      }
    },
  });

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
            <label>Email</label>
            <input type="email" value={user?.email ?? ''} disabled />
          </div>
        </div>

        {editMode && (
          <div className="profile-password-section">
            
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.currentPassword && formik.errors.currentPassword && (
              <small className="error">{formik.errors.currentPassword}</small>
            )}
              <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <small className="error">{formik.errors.newPassword}</small>
            )}
           <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <small className="error">{formik.errors.confirmPassword}</small>
            )}
          </div>
        )}

        <div className="profile-actions">
          {!editMode ? (
            <button type="button" className="profile-save" onClick={() => setEditMode(true)}>
              Change Password
            </button>
          ) : (
            <>
              <button
                type="button"
                className="profile-cancel"
                onClick={() => {
                  formik.resetForm();
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="profile-save">
                Save Changes
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}