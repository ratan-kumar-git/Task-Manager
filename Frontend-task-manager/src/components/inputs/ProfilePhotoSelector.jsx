import React, { useRef } from "react";
import { useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handalImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // update the image state
      setImage(file);

      // generate preview url from the file
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveimage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handalImageChange}
          className="hidden"
        />

        {!image ? (
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative">
            <LuUser className="text-4xl text-blue-600" />
            <button type="button" onClick={onChooseFile} className="w-8 h-8 flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer">
              <LuUpload />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative">
            <img src={previewUrl} alt="profilr photo" className="w-20 h-20 object-cover rounded-full" />
            <button type="button" onClick={handleRemoveimage} className="w-8 h-8 flex items-center justify-center bg-red-700 hover:bg-red-800 text-white rounded-full absolute -bottom-1 -right-1 border-none cursor-pointer">
                <LuTrash />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePhotoSelector;
