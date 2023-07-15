import React from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { Anime } from "../../api/anime";
import AnimeItem from "../AnimeItem/AnimeItem";
import "./AnimeList.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AnimeList = ({ animes, showLoading }: { animes: Anime[]; showLoading?: boolean }) => {
  return (
    <div className="anime-list">
      {showLoading && <Spin indicator={antIcon} />}
      {animes.map((m) => (
        <Link to={{ pathname: `/anime/${m.id}` }} key={m.id} className="anime-list__link">
          <AnimeItem anime={m} />
        </Link>
      ))}
      {showLoading && <Spin indicator={antIcon} className="anime-list__loading" />}
    </div>
  );
};

AnimeList.propTypes = {
  animes: PropTypes.array.isRequired,
  showLoading: PropTypes.bool,
};

export default AnimeList;
