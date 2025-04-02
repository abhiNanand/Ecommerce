import "./Profile.scss";
import { useAuth } from "../../../../../Services/UserAuth";
import {useState} from 'react';

export default function Profile() {
    const {user} = useAuth();
   let  firstname='';
    let lastname='';
     if(user)
     {
        let name=user?.displayName??'';
        let  namearr=name.split(' ');
        firstname=namearr[0]??'';
        lastname=namearr[1]??'';
     }

     const[open,setOpen]=useState<boolean>(true);
      

  return (
    <div className="profile-container">
      <h3 className="profile-title">Edit Your Profile</h3>

      <div className="profile-form">
        <div className="profile-row">
          <div className="profile-field">
            <label>First Name</label>
            <input type="text" placeholder={firstname} disabled={open} />
          </div>

          <div className="profile-field">
            <label>Last Name</label>
            <input type="text" placeholder={lastname} disabled={open} />
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <label>Email</label>
            <input type="email" placeholder={user?.email??' '} disabled />
          </div>

          <div className="profile-field">
            <label>Address</label>
            <input
              type="text"
              placeholder=""
              disabled={open}
            />
          </div>
        </div>
   {open?'':(<div className="profile-password-section">
          <label>Password Changes</label>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <input type="password" placeholder="Confirm New Password" />
        </div>)}
        

        <div className="profile-actions">
        
        {
        open?
        (<button className="profile-save" onClick={()=>setOpen(false)}>Edit</button>)
        :
        ( <>
        <button className="profile-cancel" onClick={()=>setOpen(true)}>Cancel</button>
       <button className="profile-save"    onClick={()=>{setOpen(true)}}>Save Changes</button></>)}
         
        </div>
      </div>
    </div>
  );
}
