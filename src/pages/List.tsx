import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { AnimePages, GET_ANIMES } from "../api/anime";
import { getTitle } from "../helpers/anime";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { nextPage } from "../actions/anime";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ListPage = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.anime.page);
  const { fetchMore, loading, error, data } = useQuery<AnimePages>(GET_ANIMES, { variables: { page: 1 } });

  // go to last scroll position if exist
  useEffect(() => {
    if (state?.scrollY) {
      window.scrollTo(0, state.scrollY);
      // remove scroll position when already scrolled
      window.history.replaceState({}, document.title);
    }
  });

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
  }, [page]);

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <div>`Error! ${JSON.stringify(error)}`</div>;
  if (!data) return <div>"Empty"</div>;
  // prettier-ignore
  const { Page: { media } } = data;

  return (
    <div>
      {media.map((m) => (
        <Link to={`anime/${m.id}`}>
          <div key={m.id} data-id={m.id}>
            {getTitle(m.title)}
            <img src={m.coverImage.large} alt="anime cover" />
          </div>
        </Link>
      ))}
      {isLoadingMore && <Spin indicator={antIcon} />}
    </div>
  );
};

export default ListPage;
