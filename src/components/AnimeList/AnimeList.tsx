import React from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { Anime } from "../../api/anime";
import AnimeItem from "../AnimeItem/AnimeItem";
import "./AnimeList.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AnimeList = ({ animes, isLoading }: { animes: Anime[]; isLoading: boolean }) => {
  return (
    <div className="anime-list">
      {isLoading && <Spin indicator={antIcon} />}
      {animes.map((m) => (
        <Link to={`anime/${m.id}`} key={m.id} className="anime-list__link">
          <AnimeItem anime={m} />
        </Link>
      ))}
      <Spin indicator={antIcon} className="anime-list__loading"/>
    </div>
  );
};

AnimeList.propTypes = {
  animes: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default AnimeList;
