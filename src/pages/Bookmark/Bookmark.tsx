import React from "react";
import { useQuery } from "@apollo/client";
import { AnimePages, GET_ANIME_BY_IDS } from "../../api/anime";
import { useAppSelector } from "../../store";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AnimeList from "../../components/AnimeList";
import { Link } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const BookmarkPage = () => {
  const bookmark = useAppSelector((state) => state.anime.bookmark);
  const { loading, error, data } = useQuery<AnimePages>(GET_ANIME_BY_IDS, { variables: { ids: bookmark } });

  if (loading)
    return (
      <div className="anime-loading">
        <Spin indicator={antIcon} />
      </div>
    );
  if (!data)
    return (
      <div className="anime-empty">
        No bookmark. <Link to="/">Back</Link>
      </div>
    );
  // prettier-ignore
  const { Page: { media } } = data;

  return (
    <div>
      <AnimeList animes={media} showLoading={false} />
    </div>
  );
};

export default BookmarkPage;
