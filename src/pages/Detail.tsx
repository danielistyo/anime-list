import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { AnimePage, GET_ANIME } from "../api/anime";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addBookmark } from "../actions/anime";
import { useAppSelector } from "../store";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isBookmarked = useAppSelector((state) => (id ? state.anime.bookmark.includes(id) : false));
  const { loading, error, data } = useQuery<AnimePage>(GET_ANIME, { variables: { id } });
  if (loading) return <div>"LOADING....."</div>;
  if (error) return <div>Error</div>;
  if (!data || !id) return <div>Empty</div>;

  const onAddBookmark = () => {
    dispatch(addBookmark(id));
  };
  return (
    <>
      <div>{data.Media.title.native}</div>
      <Link to="/">Back</Link>
      <Button onClick={onAddBookmark} disabled={isBookmarked}>
        {isBookmarked ? "Added" : "Add"}
      </Button>
    </>
  );
};

export default DetailPage;
