"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePost } from "@/app/context/PostContext";
import PostList from "../PostList";

const CreatePost = () => {
  const router = useRouter();
  const { createPost, loading } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      await createPost(title, content, file);

      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="flex w-full items-start justify-center bg-gray-900">
      <div className="w-full bg-gray-800 p-10 rounded-lg shadow-xl">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 h-40 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-700 rounded text-white"
          />
          <button
            type="submit"
            className="w-full p-5 bg-indigo-600 rounded text-white hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
        <PostList />
      </div>
    </div>
  );
};

export default CreatePost;
