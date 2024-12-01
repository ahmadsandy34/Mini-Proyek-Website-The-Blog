import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRecentPosts, setKey, subscribe } from "../redux/async/postsSlice";
import { Link } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import Card from "../components/Card";
import dompurify from "dompurify";
import { Helmet } from "react-helmet";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const BlogDetail = () => {
  const API_URL = "https://lumoshive-academy-media-api.vercel.app/api";
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const {
    recentPosts: recentPostsFromStore,
    key,
    isSuccess,
    error,
  } = useSelector((state) => state.posts);

  const { data: recentPosts, error: recentPostsError } = useSWR(
    `${API_URL}/games?page=1`,
    fetcher,
    {
      fallbackData: recentPostsFromStore,
      revalidateOnFocus: false,
    }
  );

  const { data: blogDetail, error: blogDetailError } = useSWR(
    `${API_URL}/detail/${key}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (recentPosts && recentPosts !== recentPostsFromStore) {
      dispatch(setRecentPosts(recentPosts));
    }
  }, [dispatch, recentPosts, recentPostsFromStore]);

  const handleChange = (e) => {
    const cleanEmail = dompurify.sanitize(e.target.value);
    setEmail(cleanEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(subscribe(email));
    if (isSuccess) {
      alert(`Successfully subscribed with email: ${email}`);
    } else if (error) {
      alert(`Error: ${error?.message}`);
    }
    setEmail("");
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
        <title>Blog Detail - LumosBlog</title>
        <meta
          name="description"
          content="This is the blog detail page of LumosBlog. Enjoy reading our blog posts! If you enjoy our blog posts, please subscribe to our newsletter to receive the latest news and updates."
        />
        <meta
          name="keywords"
          content="LumosBlog, LumosBlog detail, blog detail, blog detail page"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <section className="container mx-auto my-4 flex flex-col lg:flex-row lg:px-16" ref={top}>
        <aside className="basis-1/4">
          <div className="hidden lg:flex lg:flex-col lg:gap-y-16 lg:mt-12 lg:px-8">
            {recentPostsError && (
              <div className="text-center text-red-500 my-4">
                Error loading recent posts: {recentPostsError.message}
              </div>
            )}
            {recentPosts?.map((recent, index) => (
              <div key={index}>
                <Link
                  to={`/detail/${recent?.key}`}
                  onClick={() => dispatch(setKey(recent?.key)) && scrollToTop()}
                >
                  <Card posts={recent} arrow={false} recent={true} />
                </Link>
              </div>
            ))}
          </div>
        </aside>

        <article className="basis-3/4">
          <div>
            {blogDetailError && (
              <div className="text-center text-red-500 my-4">
                Error loading blog detail: {blogDetailError.message}
              </div>
            )}
            {!blogDetail && (
              <div className="text-center my-4">Loading blog detail...</div>
            )}
            <p className="text-sm font-semibold text-violet-700 py-2">
              {blogDetail?.results?.date}
            </p>
            <h1 className="font-bold text-4xl py-2 mb-4">
              {blogDetail?.results?.title}
            </h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: dompurify.sanitize(blogDetail?.results?.content),
              }}
            />
          </div>

          <div className="text-center mt-12">
            <p className="font-semibold text-violet-700 py-2">Newsletter</p>
            <p className="font-semibold text-5xl py-1 mb-8">
              Stories and interviews
            </p>
            <p className="text-xl text-slate-500 py-1 w-3/4 mx-auto">
              Subscribe to learn about new product features, the latest in
              technology, solutions, and updates.
            </p>
            <div className="mt-8">
              <form
                className="flex flex-col lg:flex-row items-center justify-center space-x-2"
                onSubmit={handleSubmit}
              >
                <label htmlFor="email" className="form-control w-full max-w-xs">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <div className="label">
                    <span className="label-text-alt text-slate-500">
                      We care about your data in our{" "}
                      <span className="underline">privacy policy</span>
                    </span>
                  </div>
                </label>
                <button className="btn bg-violet-700 text-white mt-4 font-medium px-6 tracking-wide lg:justify-self-start lg:self-start lg:mt-0">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </article>

        <aside className="basis-1/4 lg:hidden">
          <div className="flex flex-col gap-y-16 mt-12 lg:hidden">
            {recentPostsError && (
              <div className="text-center text-red-500 my-4">
                Error loading recent posts: {recentPostsError.message}
              </div>
            )}
            {recentPosts?.map((recent, index) => (
              <div key={index}>
                <Link
                  to={`/detail/${recent?.key}`}
                  onClick={() => dispatch(setKey(recent?.key)) && scrollToTop()}
                >
                  <Card posts={recent || {}} arrow={false} recent={true} />
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
};

export default BlogDetail;
