import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { AnimePages, GET_ANIMES, GET_GENRES } from "../../api/anime";
import { useAppDispatch, useAppSelector } from "../../store";
import { nextPage } from "../../actions/anime";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AnimeList from "../../components/AnimeList";
import { Link } from "react-router-dom";
import "./List.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListPage = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.anime.page);
  const [genre, setGenre] = useState("default");
  const { fetchMore, loading, error, data } = useQuery<AnimePages>(GET_ANIMES, {
    variables: { page: 1, genre: genre !== "default" ? genre : null },
  });
  const { data: genres } = useQuery(GET_GENRES);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  useEffect(() => {
    const onWindowScroll = (e: Event) => {
      if (isLoadingMore) return;
      const bodyEl = (e.target as Document)?.body;
      if (window.scrollY + window.innerHeight + 50 >= bodyEl.scrollHeight) {
        setIsLoadingMore(true);
        dispatch(nextPage());
        fetchMore({
          variables: { page: page + 1 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const diffRes = fetchMoreResult.Page.media.filter(
              (m) => !previousResult.Page.media.some((prevMedia) => prevMedia.id === m.id)
            );
            return { Page: { ...previousResult.Page, media: [...previousResult.Page.media, ...diffRes] } };
          },
        });
        setIsLoadingMore(false);
      }
    };
    window.addEventListener("scroll", onWindowScroll);
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    };
  }, [page, isLoadingMore]);

  if (loading)
    return (
      <div className="anime-loading">
        <Spin indicator={antIcon} />
      </div>
    );
  if (error) return <div>`Error! ${JSON.stringify(error)}`</div>;
  if (!data) return <div>"Empty"</div>;
  // prettier-ignore
  const { Page: { media } } = data;

  const onGenreChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setGenre(e.currentTarget.value);
  };
  return (
    <div className="listpage">
      <div className="listpage__header">
        <select className="listpage__genre" onChange={onGenreChange} value={genre}>
          <option value="default">Select Genre</option>
          {genres?.GenreCollection?.map((g: string) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <Link to="bookmark">
          <h4 className="listpage__bookmark">Bookmark</h4>
        </Link>
      </div>
      <AnimeList animes={media} />
    </div>
  );
};

export default ListPage;
