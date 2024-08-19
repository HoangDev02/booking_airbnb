import React from "react";
import { Link } from "react-router-dom";

function Lesve({ user }) {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-bold">Hân hạnh chào đón {user?.username} </h1>
      <div className="border border-black rounded-lg p-1">
        <Link to="/host/homes" className=""> Hoàn tất mục cho thuê của bạn </Link>
      </div>
    </div>
  );
}

export default Lesve;
