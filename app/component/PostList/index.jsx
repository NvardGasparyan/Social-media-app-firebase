"use client";
import React, { useEffect, useRef } from "react";
import { usePost } from "@/app/context/PostContext";
import { useRouter } from "next/navigation";

const PostList = () => {
  const { posts, deletePost, loading } = usePost();
  const router = useRouter();
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {posts.length === 0 ? (
        <div className="text-center text-white">No posts available.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post bg-gray-800 p-5 rounded-lg shadow-md mb-4"
            >
              <h2 className="post-title text-white text-2xl mb-2">
                {post.title}
              </h2>
              <p className="post-content text-gray-400 mb-4">{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="post-image w-full h-40 object-cover rounded mb-4"
                />
              )}
              <div className="post-actions flex justify-end space-x-2">
                <button
                  className="edit-button bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
                  onClick={() => router.push(`/edit-post/${post.id}`)}
                >
                  Edit
                </button>
                <button
                  className="delete-button bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div ref={endRef}></div>
        </div>
      )}
    </div>
  );
};

export default PostList;
