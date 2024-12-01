import React from "react";
import PropTypes from "prop-types";

const Card = ({ posts, arrow, recent, tag }) => {
  return (
    <>
      <div>
        <img
          src={posts?.thumb}
          alt={posts?.title}
          className={
            recent ? "object-fill w-full h-64" : "object-fill w-full h-full"
          }
        />
      </div>
      <div>
        <div>
          <p className="text-sm font-semibold text-violet-700 py-2">{`${posts?.author} • ${posts?.time}`}</p>
          <div className="flex justify-between">
            <p className="font-bold text-2xl py-2 w-4/5">{posts?.title}</p>
            {arrow && (
              <i className="bi bi-arrow-up-right justify-self-center self-center text-2xl"></i>
            )}
          </div>
          <p
            className={
              recent
                ? "text-ellipsis overflow-hidden text-slate-500 py-1"
                : "truncate text-slate-500 py-1"
            }
          >
            {posts?.desc}
          </p>
        </div>
        <div className="mt-2">
          {tag && (
            <p className="rounded-2xl bg-violet-50 text-violet-700 py-0.5 px-2.5 inline-block">
              {posts?.tag}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

Card.propTypes = {
  posts: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    time: PropTypes.string,
    desc: PropTypes.string,
    tag: PropTypes.string
  }),
  arrow: PropTypes.bool,
  recent: PropTypes.bool,
  tag: PropTypes.bool
};

export default Card;
