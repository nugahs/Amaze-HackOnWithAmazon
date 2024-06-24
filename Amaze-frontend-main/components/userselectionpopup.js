// components/UserSelectionPopup.js
import React from 'react';
import styles from './userselection.module.css';

const UserSelectionPopup = ({ onSelectUser }) => {
    const users = [
        'mastercheif.workplace@gmail.com',
        'sukesssss1254a@gmail.com'
    ];

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.logo}>
                    <img src="/amazon-logo-amazon-icon-transparent-free-png.png" alt="Amazon Logo" />
                </div>
                <h2>Choose an account</h2>
                {users.map(user => (
                    <button
                        key={user}
                        className={styles.userButton}
                        onClick={() => onSelectUser(user)}
                    >
                        <span className={styles.userIcon}>👤</span>
                        {user}
                    </button>
                ))}
                <button className={styles.addAccountButton}>
                    Add account
                </button>
            </div>
        </div>
    );
};

export default UserSelectionPopup;