"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title, content, file) => {
    setLoading(true);
    try {
      let imageUrl = "";

      // Загрузка изображения, если оно есть
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const newPost = {
        title,
        content,
        imageUrl,
        userId: user.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);

      setPosts((prevPosts) => [{ id: docRef.id, ...newPost }, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedData) => {
    setLoading(true);
    try {
      const postDocRef = doc(db, "posts", id);
      await updateDoc(postDocRef, updatedData);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      const postDocRef = doc(db, "posts", id);
      await deleteDoc(postDocRef);

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, createPost, updatePost, deletePost, loading }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
