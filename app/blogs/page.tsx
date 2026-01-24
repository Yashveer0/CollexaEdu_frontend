"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {API} from "../lib/axios"; // 👈 yahi wo axios instance hoga jo tum use kar rahe ho

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  author?: string;
  readTime?: string;
  createdAt?: string;
  image?: string;
  excerpt?: string;   
  content?: string;   
}


export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);


  // ================= FETCH BLOGS =================
  const fetchBlogs = async () => {
    try {
      setBlogsLoading(true);

      const res = await API.get("/api/blogs");

      const data =
        res.data?.blogs ||
        res.data?.data ||
        res.data ||
        [];
        console.log("Fetched Blogs 👉", data);
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch blogs failed", err);
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (blogsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  const mainBlog = blogs[0];
  const sideBlogs = blogs.slice(1);

 if (selectedBlog) {
  return (
    <div className="min-h-screen bg-[#F7FBFF]">
      <div className="max-w-5xl  mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="mb-6 mt-25 text-sm text-blue-600 hover:underline"
        >
          ← Back to Blogs
        </button>

        {/* White Card */}
        <div className="bg-white rounded-xl p-6">
          {/* Blog Image */}
          <div className="relative w-full h-105 rounded-xl overflow-hidden mb-6">
            <Image
              src={selectedBlog.image || "/blog-placeholder.png"}
              alt={selectedBlog.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Meta */}
          <span className="inline-block mb-3 px-3 py-1 text-xs font-medium border rounded-full text-blue-600 border-blue-200">
            {selectedBlog.category || "Blog"}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            {selectedBlog.title}
          </h1>

          {/* Info */}
          <p className="text-sm text-gray-500 mb-6">
            {selectedBlog.createdAt || "—"} |{" "}
            {selectedBlog.author || "Admin"} |{" "}
            {selectedBlog.readTime || "5 min read"}
          </p>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed space-y-4">
            {selectedBlog.content && (
  <p className="text-lg text-gray-600 mb-6">
    {selectedBlog.content}
  </p>
)}
            
          </div>
        </div>
      </div>
    </div>
  );
}



  return (
    <div className="w-full bg-[#F7FBFF] ">
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
        {/* ================= LEFT BIG BLOG ================= */}
        {mainBlog && (
          <div className="lg:col-span-2 mt-25 m-10 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative w-full h-95">
              <Image
                src={mainBlog.image || "/blog-placeholder.png"}
                alt={mainBlog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6">
              <span className="inline-block mb-3 px-3 py-1 text-xs font-medium border rounded-full text-blue-600 border-blue-200">
                {mainBlog.category || "Internship Tips"}
              </span>

              <h2 className="text-2xl text-gray-800 font-semibold mb-3">
                {mainBlog.title}
              </h2>

                <button
  onClick={() => setSelectedBlog(mainBlog)}
  className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
>
  View Blog →
</button>
  
  {mainBlog.content && (
  <p className="text-gray-600 mt-2 line-clamp-2">
    {mainBlog.content}
  </p>
)}

              <p className="text-sm text-gray-500">
                {mainBlog.createdAt || "—"} |{" "}
                {mainBlog.author || "Admin"} |{" "}
                {mainBlog.readTime || "5 min read"}
              </p>
            </div>
          </div>
        )}

        {/* ================= RIGHT SMALL BLOGS ================= */}
        <div className="grid grid-cols-1 mt-25 m-10 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {sideBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative w-full h-40">
                <Image
                  src={blog.image || "/blog-placeholder.png"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <span className="inline-block mb-2 px-3 py-1 text-xs font-medium border rounded-full text-blue-600 border-blue-200">
                  {blog.category || "Career Advice"}
                </span>

                <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2">
                  {blog.title}
                </h3>
                <button
  onClick={() => setSelectedBlog(blog)}
  className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
>
  View Blog →
</button>

             {blog.excerpt && (
  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
    {blog.excerpt}
  </p>
)}   

                <p className="text-xs text-gray-500">
                  {blog.createdAt || "—"} |{" "}
                  {blog.author || "Admin"} |{" "}
                  {blog.readTime || "5 min read"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
