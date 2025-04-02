import './Profile.scss';
import { useState } from 'react';
import { useAuth } from '../../../../../Services/UserAuth';

export default function Profile() {
  const { user } = useAuth();
  let firstname = '';
  let lastname = '';

  if (user) {
    const name = user?.displayName ?? '';
    const nameArr = name.split(' ');
    firstname = nameArr[0] ?? '';
    lastname = nameArr[1] ?? '';
  }

  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="profile-container">
      <h3 className="profile-title">Edit Your Profile</h3>

      <div className="profile-form">
        <div className="profile-row">
          <div className="profile-field">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              placeholder={firstname}
              disabled={open}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              placeholder={lastname}
              disabled={open}
            />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder={user?.email ?? ' '}
              disabled
            />
          </div>

          <div className="profile-field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              disabled={open}
            />
          </div>
        </div>

        {!open && (
          <div className="profile-password-section">
            <label>Password Changes</label>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
          </div>
        )}

        <div className="profile-actions">
          {open ? (
            <button className="profile-save" onClick={() => setOpen(false)}>
              Edit
            </button>
          ) : (
            <>
              <button className="profile-cancel" onClick={() => setOpen(true)}>
                Cancel
              </button>
              <button className="profile-save" onClick={() => setOpen(true)}>
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
