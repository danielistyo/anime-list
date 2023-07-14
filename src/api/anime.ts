import { gql } from "@apollo/client";

export type Anime = {
  id: string;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  trending: number;
};

export type AnimePages = {
  Page: {
    media: Anime[];
    pageInfo: {
      total: number;
    };
  };
};

export type AnimePage = {
  Media: Anime;
};

const ANIME_FRAGMENT = gql`
  fragment AnimeFields on Media {
    id
    title {
      romaji
      english
      native
      userPreferred
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    trending
  }
`;

export const GET_ANIMES = gql`
  ${ANIME_FRAGMENT}
  query getAnimes($page: Int = 1, $perPage: Int = 20) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        perPage
      }
      media(sort: TRENDING, type: ANIME) {
        ...AnimeFields
      }
    }
  }
`;

export const GET_ANIME = gql`
  ${ANIME_FRAGMENT}
  query getAnime($id: Int) {
    Media(type: ANIME, id: $id) {
      ...AnimeFields
    }
  }
`;
