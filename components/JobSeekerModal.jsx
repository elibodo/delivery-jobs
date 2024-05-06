import React from "react";

const JobSeekerModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 
backdrop-blur-sm flex justify-center items-center"
    >
      <div className=" w-[600px]">
        <div className="bg-gray-100 p-2 rounded">
          {children}
          <div className="flex flex-row justify-between p-4">
            <button className="black_button">Save</button>
            <button className="black_button" onClick={() => onClose()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerModal;
