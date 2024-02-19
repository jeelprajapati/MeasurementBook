import React from 'react'
import './changePassword.css'

const ChangePassword = () => {
  return (
    <div className="changePasswordContainer">
        <div className="changePasswordTitle">
            Change Password
        </div>
        <div className="changePasswordForm">
            <div className="changePasswordWrapper">
                <label htmlFor="oldPassword">Old Password <span className="required">*</span></label>
                <input type="text" name="oldPassword"/>
            </div>
            <div className="changePasswordWrapper">
                <label htmlFor="newPassword">New Password <span className="required">*</span></label>
                <input type="text" name="newPassword"/>
            </div>
            <div className="changePasswordWrapper">
                <label htmlFor="cNewPassword">Confirm New Password <span className="required">*</span></label>
                <input type="text" name="cNewPassword"/>
            </div>
            <button>Update</button>
        </div>
    </div>
  )
}

export default ChangePassword
