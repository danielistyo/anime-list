import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { AnimePage, GET_ANIME } from "../api/anime";

const DetailPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<AnimePage>(GET_ANIME, { variables: { id } });
  if (loading) return <div>"LOADING....."</div>;
  if (error) return <div>Error</div>;
  if (!data) return <div>Empty</div>;
  return <div>{data.Media.title.native}</div>;
};

export default DetailPage;
