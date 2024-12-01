import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRecentPosts, setPosts, setKey } from "../redux/async/postsSlice";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { Helmet } from "react-helmet";
import Card from "../components/Card";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const TheBlog = () => {
  const API_URL = "https://lumoshive-academy-media-api.vercel.app/api";
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const dispatch = useDispatch();

  const { recentPosts: recentPostsFromStore, posts: postsFromStore } =
    useSelector((state) => state.posts);

  const { data: recentPosts, error: recentPostsError } = useSWR(
    `${API_URL}/games?page=1`,
    fetcher,
    {
      fallbackData: recentPostsFromStore,
      revalidateOnFocus: false,
    }
  );

  const { data: posts, error: postsError } = useSWR(
    `${API_URL}/games/news?page=${currentPage}`,
    fetcher,
    {
      fallbackData: postsFromStore,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (recentPosts && recentPosts !== recentPostsFromStore) {
      dispatch(setRecentPosts(recentPosts));
    }
    if (posts && posts !== postsFromStore) {
      dispatch(setPosts(posts));
    }
  }, [dispatch, recentPosts, posts, recentPostsFromStore, postsFromStore]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const top = useRef(null);

  const scrollToTop = () => {
    if (top.current) {
      top.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>The Blog - LumosBlog</title>
        <meta
          name="description"
          content="This is the main page of LumosBlog. This page contains recent blog posts and all blog posts from LumosBlog. Click on the blog post to read the full blog post."
        />
        <meta
          name="keywords"
          content="The Blog, LumosBlog, LumosBlog blog posts, blog, blog posts"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="container mx-auto my-4 lg:px-16" ref={top}>
        <div className="text-center">
          <h1 className="font-bold text-[20vw] border-y-2 border-base-300 lg:inline-block lg:text-[18.5vw]" cy-data="app-title">
            THE BLOG
          </h1>
        </div>
      </header>

      {/* Recent Posts Section */}
      <main className="container mx-auto mb-4 mt-12 px-4 lg:px-20">
        <h2 className="text-2xl font-semibold mb-8" cy-data="recent-posts">Recent blog posts</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" cy-data="recent-posts-container">
          <div cy-data="posts-1">
            <Link
              to={`/detail/${recentPosts[0]?.key}`}
              onClick={() =>
                dispatch(setKey(recentPosts[0]?.key)) && scrollToTop()
              }
            >
              <Card
                posts={recentPosts[0] || {}}
                arrow={true}
                recent={true}
                tag={true}
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <Link
              to={`/detail/${recentPosts[1]?.key}`}
              onClick={() =>
                dispatch(setKey(recentPosts[1]?.key)) && scrollToTop()
              }
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card posts={recentPosts[1] || {}} arrow={false} tag={true} />
            </Link>

            <Link
              to={`/detail/${recentPosts[2]?.key}`}
              onClick={() =>
                dispatch(setKey(recentPosts[2]?.key)) && scrollToTop()
              }
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <Card posts={recentPosts[2] || {}} arrow={false} tag={true} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-10 gap-8">
          <Link
            to={`/detail/${recentPosts[3]?.key}`}
            onClick={() =>
              dispatch(setKey(recentPosts[3]?.key)) && scrollToTop()
            }
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            <Card
              posts={recentPosts[3] || {}}
              arrow={true}
              recent={true}
              tag={true}
              typeA={true}
            />
          </Link>
        </div>
        {recentPostsError && (
          <div className="text-center text-red-500 mt-4">
            Error loading recent posts: {recentPostsError.message}
          </div>
        )}
      </main>

      {/* All Blog Posts Section */}
      <section className="container mx-auto mt-12 px-4 lg:px-20">
        <h2 className="text-2xl font-semibold mb-8" cy-data="all-posts">All blog posts</h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3" cy-data="all-posts-container">
          {posts.slice(0, postsPerPage).map((post, index) => (
            <div key={index}>
              <Link
                to={`/detail/${post.key}`}
                onClick={() => dispatch(setKey(post.key)) && scrollToTop()}
              >
                <Card posts={post || {}} arrow={true} tag={true} />
              </Link>
            </div>
          ))}
        </div>
        {postsError && (
          <div className="text-center text-red-500 mt-4">
            Error loading posts: {postsError.message}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row lg:justify-between mt-8 px-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="font-medium text-slate-500 "
          >
            <i className="bi bi-arrow-left mr-2"></i>Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={posts && posts.length < postsPerPage}
            className="font-medium text-slate-500 mt-4 lg:mt-0"
          >
            Next<i className="bi bi-arrow-right ml-2"></i>
          </button>
        </div>
      </section>
    </>
  );
};
export default TheBlog;
