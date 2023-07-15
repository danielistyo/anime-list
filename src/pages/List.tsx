import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { AnimePages, GET_ANIMES } from "../api/anime";
import { useAppDispatch, useAppSelector } from "../store";
import { nextPage } from "../actions/anime";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import AnimeList from "../components/AnimeList";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListPage = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.anime.page);
  const { fetchMore, loading, error, data } = useQuery<AnimePages>(GET_ANIMES, { variables: { page: 1 } });

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
            return {
              Page: {
                ...fetchMoreResult.Page,
                media: [...previousResult.Page.media, ...fetchMoreResult.Page.media],
              },
            };
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

  return (
    <div>
      <AnimeList animes={media} isLoading={loading || isLoadingMore} />
    </div>
  );
};

export default ListPage;
