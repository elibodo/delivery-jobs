import React, { useState } from "react";

const ApplyModal = ({ isOpen, onClose, onConfirm, job }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true); // Start submitting
    const success = await onConfirm(); // Call the passed-in function for applying
    if (success) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true); // Switch to success modal
      }, 500); // Slight delay for smoother transition
      setTimeout(() => {
        setIsSuccess(false); // Reset success state
        onClose(); // Close modal after 3 seconds
      }, 3000);
    } else {
      setIsSubmitting(false); // Stop submitting if the application fails
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 md:max-w-md lg:max-w-lg">
        <div className="mb-2 border-b-2 border-gray-500 pb-2">
          <h2 className="text-center text-2xl font-semibold">
            {isSuccess ? "Successfully Applied" : "Confirm Application"}
          </h2>
        </div>

        {/* Content container: Maintains consistent size */}
        <div className="space-y-4">
          {isSuccess ? (
            <div className="flex h-24 items-center justify-center">
              <p className="text-center text-lg font-semibold text-orange-600">
                You have successfully applied to {job.title}!
              </p>
            </div>
          ) : (
            <>
              <p className="my-4 text-center text-lg font-semibold">
                {job.title}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {job.dispatchlocation}
                </p>
                <p>
                  <strong>Job Type:</strong> {job.jobtype}
                </p>
                <p>
                  <strong>Salary Range: </strong>${job.payrange[0]} - $
                  {job.payrange[1]} a {job.payrange[2]}
                </p>
                {job.additionalpay && job.additionalpay[0] !== "" && (
                  <p>
                    <strong>Additional Pay:</strong> ${job.additionalpay[0]} a{" "}
                    {job.additionalpay[1]}
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-center space-x-8">
                <button
                  onClick={onClose}
                  className="outline_button"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="black_button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Applying..." : "Apply"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
