import React from "react";
import { usePost } from "@/app/context/PostContext";
import { useRouter } from "next/navigation";

const PostItem = ({ post }) => {
  const router = useRouter();
  const { deletePost } = usePost();

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  const handleEdit = () => {
    router.push(`/edit-post/${post.id}`);
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-4">
      <h2 className="text-white text-2xl mb-2">{post.title}</h2>
      <p className="text-gray-400 mb-4">{post.content}</p>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full mb-4 rounded"
        />
      )}
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleEdit}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
