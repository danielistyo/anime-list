import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { AnimePages, GET_ANIMES, GET_GENRES } from "../../api/anime";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AnimeList from "../../components/AnimeList";
import { Link } from "react-router-dom";
import "./List.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

window.timeoutScroll = null;

const ListPage = () => {
  const [page, setPage] = useState(1);
  const { fetchMore, loading, error, data, refetch } = useQuery<AnimePages>(GET_ANIMES, {
    variables: { page: 1 },
  });
  const { data: genres } = useQuery(GET_GENRES);

  const loadMoreData = useCallback(() => {
    if (window.timeoutScroll !== undefined) clearTimeout(window.timeoutScroll);

    const bodyEl = document.body;
    if (window.scrollY + window.innerHeight + 50 >= bodyEl.scrollHeight) {
      window.timeoutScroll = setTimeout(() => {
        setPage(page + 1);
        fetchMore({
          variables: { page: page + 1 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const diffRes = fetchMoreResult.Page.media.filter(
              (m) => !previousResult.Page.media.some((prevMedia) => prevMedia.id === m.id)
            );
            return { Page: { ...previousResult.Page, media: [...previousResult.Page.media, ...diffRes] } };
          },
        });
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", loadMoreData);
    return () => {
      window.removeEventListener("scroll", loadMoreData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
    refetch({ genre: e.currentTarget.value });
  };
  return (
    <div className="listpage">
      <div className="listpage__header">
        <select className="listpage__genre" onChange={onGenreChange}>
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
      <AnimeList animes={media} showLoading />
    </div>
  );
};

export default ListPage;
