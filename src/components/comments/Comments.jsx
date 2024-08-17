import React, { useEffect, useState } from "react";
import { getCommentByHotelId } from "../../redux/API/apiComment";
import { getUsersById } from "../../redux/API/apiUser";

function Comments({ hotelId }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);

  const fetchDataUser = async (id) => {
    const response = await getUsersById(id);
    setUsers((prevUsers) => ({ ...prevUsers, [id]: response }));
  };

  useEffect(() => {
    const fetchDataComment = async () => {
      const response = await getCommentByHotelId(hotelId);
      setComments(response);

      // Fetch user data for each comment
      response.forEach((comment) => {
        fetchDataUser(comment.userId);
      });
    };
    fetchDataComment();
  }, [hotelId]);

  const displayedComments = showAllComments ? comments : comments.slice(0, 6);

  return (
    <div>
      <div className="flex flex-wrap">
        {displayedComments?.map((comment) => (
          <div key={comment.id} className="w-1/2 p-3">
            {/* user */}
            <div className="flex items-center text-start">
              <img
                src="https://i.pravatar.cc/300"
                alt="user"
                className="rounded-full h-[4rem] object-cover"
              />
              <div>
                <p className="font-bold ml-5">{users[comment.userId]?.username}</p>
                <p className="ml-5 font-normal">5/5</p>
              </div>
            </div>
            {/* content */}
            <div className="pt-2">
              <p>{comment?.content}</p>
            </div>
          </div>
        ))}
      </div>
      {comments.length > 6 && (
        <div className="text-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Comments;