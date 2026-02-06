"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { API } from "../lib/axios";

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

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/api/blogs");
      const data =
        res.data?.blogs ||
        res.data?.data ||
        res.data ||
        [];
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

  // Sort latest first
  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.createdAt || "").getTime() -
      new Date(a.createdAt || "").getTime()
  );

  const featuredBlog = sortedBlogs[0];
  const remainingBlogs = sortedBlogs.slice(1);

  // ================= SINGLE BLOG VIEW =================
  if (selectedBlog) {
    return (
      <div className="min-h-screen  bg-gray-50">
        <div className="max-w-4xl  mx-auto px-4 py-10">
          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-6 text-sm  text-blue-600 hover:underline"
          >
            ← Back to Blogs
          </button>

          <div className="bg-white  rounded-2xl shadow-md p-8">
            <div className="relative w-full h-72 mb-6 rounded-xl overflow-hidden">
              <Image
                src={selectedBlog.image || "/blog-placeholder.png"}
                alt={selectedBlog.title}
                fill
                className="object-cover"
              />
            </div>

            <span className="inline-block mb-3 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
              {selectedBlog.category || "Blog"}
            </span>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedBlog.title}
            </h1>

            <p className="text-sm text-gray-500 mb-6">
              {new Date(selectedBlog.createdAt || "").toLocaleDateString()} |{" "}
              {selectedBlog.author || "Admin"} |{" "}
              {selectedBlog.readTime || "5 min read"}
            </p>

            <div className="prose max-w-none text-gray-700">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= BLOG LIST VIEW =================
  return (
    <div className="bg-gray-50 min-h-screen  px-6 py-10">
      <div className="max-w-6xl mt-25 mx-auto">

        {/* FEATURED BLOG */}
        {featuredBlog && (
          <div className="mb-12">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden">
              <Image
                src={featuredBlog.image || "/blog-placeholder.png"}
                alt={featuredBlog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6">
              <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                {featuredBlog.category || "Featured"}
              </span>

              <h2 className="text-3xl font-bold mt-3 text-gray-800">
                {featuredBlog.title}
              </h2>

              <p className="text-gray-600 mt-3 line-clamp-2">
                {featuredBlog.excerpt || featuredBlog.content}
              </p>

              <button
                onClick={() => setSelectedBlog(featuredBlog)}
                className="mt-4 text-blue-600 font-medium hover:underline"
              >
                Read Full Article →
              </button>
            </div>
          </div>
        )}

        {/* ALL BLOGS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={blog.image || "/blog-placeholder.png"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <span className="inline-block mb-2 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                  {blog.category || "Blog"}
                </span>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.excerpt || blog.content}
                </p>

                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  Read More →
                </button>

                <p className="text-xs text-gray-400 mt-3">
                  {new Date(blog.createdAt || "").toLocaleDateString()} |{" "}
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
