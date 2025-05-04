// src/components/UserAvatar.jsx
import React from "react";

const UserAvatar = ({ user, className = "" }) => {
  return (
    <img
      className={`rounded-full object-cover ${className}`}
      src={
        user?.avatar?.startsWith("http") ? user.avatar : "/default-avatar.png"
      }
      alt={user?.name || "User"}
      onError={(e) => {
        e.target.src = "/default-avatar.png";
      }}
    />
  );
};

export default UserAvatar;
