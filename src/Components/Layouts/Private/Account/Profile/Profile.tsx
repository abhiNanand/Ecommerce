// import './Profile.scss';
// import { useState } from 'react';
// import { useAuth } from '../../../../../Services/UserAuth';

// export default function Profile() {
//   const { user } = useAuth();
//   let firstname = '';
//   let lastname = '';

//   if (user) {
//     const name = user?.displayName ?? '';
//     const nameArr = name.split(' ');
//     firstname = nameArr[0] ?? '';
//     lastname = nameArr[1] ?? '';
//   }

//   const [open, setOpen] = useState<boolean>(true);

//   return (
//     <div className="profile-container">
//       <h3 className="profile-title">Edit Your Profile</h3>

//       <div className="profile-form">
//         <div className="profile-row">
//           <div className="profile-field">
//             <label htmlFor="first-name">First Name</label>
//             <input
//               id="first-name"
//               type="text"
//               value={firstname}
//               disabled={open}
//             />
//           </div>

//           <div className="profile-field">
//             <label htmlFor="last-name">Last Name</label>
//             <input
//               id="last-name"
//               type="text"
//               value={lastname}
//               disabled={open}
//             />
//           </div>
//         </div>

//         <div className="profile-row">
//           <div className="profile-field">
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={user?.email ?? ' '}
//               disabled
//             />
//           </div>

       
//         </div>

//         {!open && (
//           <div className="profile-password-section">
//             <label htmlFor="password">Password Changes</label>
//             <input type="password" placeholder="Current Password" />
//             <input type="password" placeholder="New Password" />
//             <input type="password" placeholder="Confirm New Password" />
//           </div>
//         )}

//         <div className="profile-actions">
//           {open ? (
//             <button className="profile-save" onClick={() => setOpen(false)}>
//               Edit
//             </button>
//           ) : (
//             <>
//               <button className="profile-cancel" onClick={() => setOpen(true)}>
//                 Cancel
//               </button>
//               <button className="profile-save" onClick={() => setOpen(true)}>
//                 Save Changes
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import './Profile.scss';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../../../Services/UserAuth';
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
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
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
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

        // Update display name
        await updateProfile(currentUser, {
          displayName: `${values.firstName} ${values.lastName}`,
        });

        // Update password if newPassword is provided
        if (values.newPassword) {
          const credential = EmailAuthProvider.credential(
            currentUser.email!,
            values.currentPassword
          );
          await reauthenticateWithCredential(currentUser, credential);
          await updatePassword(currentUser, values.newPassword);
        }

        alert('Profile updated successfully!');
        setEditMode(false);
      } catch (err: any) {
        alert(err.message);
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
              disabled={!editMode}
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <small className="error">{formik.errors.firstName}</small>
            )}
          </div>

          <div className="profile-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              disabled={!editMode}
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <small className="error">{formik.errors.lastName}</small>
            )}
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
            <label>Password Changes</label>
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
              Edit
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
