import { Anime } from "../api/anime";

export const getTitle = ({ english, native, romaji, userPreferred }: Anime["title"]): string => {
  return english || native || romaji || userPreferred;
};
