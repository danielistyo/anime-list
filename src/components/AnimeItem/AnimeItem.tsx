import React, { useState } from "react";
import { getTitle } from "../../helpers/anime";
import PropTypes from "prop-types";
import { StarFilled } from "@ant-design/icons";
import { Anime } from "../../api/anime";
import "./AnimeItem.scss";

const AnimeItem = ({ anime: { id, title, startDate, coverImage, averageScore } }: { anime: Anime }) => {
  return (
    <div data-id={id} className="anime">
      <div className="anime__detail">
        <div className="anime__title">
          {getTitle(title)}
          <div className="anime__date">{`${startDate.day} ${startDate.month} ${startDate.year}`}</div>
        </div>
        <div className="anime__score">
          <StarFilled /> {averageScore}
        </div>
      </div>

      <img src={coverImage.large} alt="anime cover" className="anime__image" />
    </div>
  );
};

AnimeItem.propTypes = {
  anime: PropTypes.object,
};

export default AnimeItem;
