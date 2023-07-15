import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { AnimePage, GET_ANIME } from "../api/anime";
import { useDispatch } from "react-redux";
import { addBookmark } from "../actions/anime";
import { useAppSelector } from "../store";
import { CloseOutlined, CalendarOutlined, ClockCircleOutlined, StarFilled } from "@ant-design/icons";
import { getTitle } from "../helpers/anime";
import "./Detail.scss";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const numberId = parseInt(id || "0");
  const isBookmarked = useAppSelector((state) => (id ? state.anime.bookmark.includes(numberId) : false));
  const { loading, error, data } = useQuery<AnimePage>(GET_ANIME, { variables: { id: numberId } });
  if (loading) return <div>"LOADING....."</div>;
  if (error) return <div>Error</div>;
  if (!data || !id) return <div>Empty</div>;

  const {
    coverImage: { extraLarge },
    bannerImage,
    title,
    genres,
    startDate: { day, month, year },
    duration,
    description,
    averageScore,
  } = data.Media;

  const onAddBookmark = () => {
    dispatch(addBookmark(numberId));
  };

  return (
    <div className="anime-detail">
      <CloseOutlined
        className="anime-detail__back"
        onClick={() => {
          window.history.back();
        }}
      />
      <img src={extraLarge} className="anime-detail__poster" alt="poster" />
      <img src={bannerImage} className="anime-detail__backdrop" alt="backdrop" />
      <div className="anime-detail__detail">
        <div className="anime-detail__title">{getTitle(title)}</div>
        <div className="anime-detail__subtitle">
          <div className="anime-detail__genre">{genres.join(" ")}</div>
          <div className="anime-detail__date">
            <CalendarOutlined /> {`${day} ${month} ${year}`}
          </div>
          <div className="anime-detail__duration">
            <ClockCircleOutlined /> {duration} min
          </div>
          <div>
            <StarFilled /> {averageScore}
          </div>
        </div>

        <div className="anime-detail__overview">{description}</div>
        <button className="anime-detail__links" onClick={onAddBookmark} disabled={isBookmarked}>
          {isBookmarked ? "BOOKMARKED" : "BOOKMARK"}
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
