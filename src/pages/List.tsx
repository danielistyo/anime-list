import { useQuery } from "@apollo/client";
import React from "react";
import { AnimePages, GET_ANIMES } from "../api/anime";
import { getTitle } from "../helpers/anime";
import { Link } from "react-router-dom";

const ListPage = () => {
  const { loading, error, data } = useQuery<AnimePages>(GET_ANIMES, { variables: { page: 2 } });

  if (loading) return <div>"LOADING....."</div>;
  if (error) return <div>`Error! ${JSON.stringify(error)}`</div>;
  if (!data) return <div>"Empty"</div>;
  // prettier-ignore
  const { Page: { media } } = data;

  return (
    <div>
      {media.map((m) => (
        <Link to={{ pathname: `anime/${m.id}` }} key={m.id}>
          <div>
            {getTitle(m.title)}
            <img src={m.coverImage.large} alt="anime cover" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListPage;
