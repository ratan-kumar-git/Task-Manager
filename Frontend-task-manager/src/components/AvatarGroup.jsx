import React from "react";

const AvatarGroup = ({ avatar, maxVisible = 3 }) => {
  return (
    <div className="flex items-center">
      {avatar.slice(0, maxVisible).map((avatar, index) => (
        <img key={index} src={avatar || null} alt={`Avatar_${index}`} className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0" />
      ))}
      {avatar.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3 ">
            +{avatar.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
