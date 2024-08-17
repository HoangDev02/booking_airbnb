import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Success({ title }) {
    console.log(title);
  const notify = () => toast.success(title);
  return (
    <div className="bg-red">
      {notify()}
      <ToastContainer />
    </div>
  );
}

export default Success;
