import { render, screen } from "@testing-library/react";
import AnimeItem from "./AnimeItem";
import { Anime } from "../../api/anime";

const anime: Anime = {
  id: 8,
  title: {
    romaji: "Bouken Ou Beet",
    english: "Beet the Vandel Buster",
    native: "\u5192\u967a\u738b\u30d3\u30a3\u30c8",
    userPreferred: "Bouken Ou Beet",
  },
  coverImage: {
    extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b8-ReS3TwSgrDDi.jpg",
    large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/b8-ReS3TwSgrDDi.jpg",
    medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b8-ReS3TwSgrDDi.jpg",
    color: "#e46b50",
  },
  bannerImage: null,
  trending: 0,
  description:
    "It is the dark century and the people are suffering under the rule of the devil, Vandel, who is able to manipulate monsters. The Vandel Busters are a group of people who hunt these devils, and among them, the Zenon Squad is known to be the strongest busters on the continent. A young boy, Beet, dreams of joining the Zenon Squad. However, one day, as a result of Beet's fault, the Zenon squad was defeated by the devil, Beltose. The five dying busters sacrificed their life power into their five weapons, Saiga. After giving their weapons to Beet, they passed away. Years have passed since then and the young Vandel Buster, Beet, begins his adventure to carry out the Zenon Squad's will to put an end to the dark century. ",
  genres: ["Adventure", "Fantasy", "Supernatural"],
  averageScore: 62,
  startDate: {
    year: 2004,
    month: 9,
    day: 30,
  },
  duration: 23,
};

describe("AnimeItem", () => {
  it("should render correctly", () => {
    render(<AnimeItem anime={anime} />);
    expect(screen.getByTestId("anime-item-date")).toHaveTextContent("30 9 2004")
  });
});
