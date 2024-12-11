"use client";
import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

const Home = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    setBlogs(storedBlogs);
  }, []);

  const handleDelete = (id: number) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Welcome to Our Blog
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
            <div className="mt-8">
              <Link
                href="/create"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create New Blog
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No blogs available. Create your first blog post!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Post */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-full">
                  <Image
                    src={blogs[0].image}
                    alt={blogs[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 md:hidden" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                        {blogs[0].category}
                      </span>
                      <span className="text-sm text-gray-500">{blogs[0].readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{blogs[0].title}</h2>
                    <p className="text-gray-600 line-clamp-3 mb-6">{blogs[0].content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                        <span className="text-white font-semibold">{blogs[0].author[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{blogs[0].author}</p>
                        <p className="text-sm text-gray-500">{blogs[0].date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/edit/${blogs[0].id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blogs[0].id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.slice(1).map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-[1.02] duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500">{blog.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{blog.author[0]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-900">{blog.author}</p>
                          <p className="text-xs text-gray-500">{blog.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Link
                          href={`/edit/${blog.id}`}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
