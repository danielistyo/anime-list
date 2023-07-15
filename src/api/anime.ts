import { gql } from "@apollo/client";

export type Anime = {
  id: number;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
    userPreferred?: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  bannerImage: string | null;
  trending: number;
  description: string;
  genres: string[];
  averageScore: number;
  startDate: { year: number; month: number; day: number };
  duration: number;
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
    bannerImage
    trending
    description
    genres
    averageScore
    startDate {
      year
      month
      day
    }
    duration
  }
`;

export const GET_ANIMES = gql`
  ${ANIME_FRAGMENT}
  query getAnimes($page: Int = 1, $perPage: Int = 30, $genre: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        perPage
      }
      media(sort: TRENDING, type: ANIME, genre: $genre) {
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

export const GET_ANIME_BY_IDS = gql`
  ${ANIME_FRAGMENT}
  query getAnime($ids: [Int]) {
    Page {
      pageInfo {
        perPage
      }
      media(sort: TRENDING, type: ANIME, id_in: $ids) {
        ...AnimeFields
      }
    }
  }
`;

export const GET_GENRES = gql`
  query getGenres {
    GenreCollection
  }
`;
