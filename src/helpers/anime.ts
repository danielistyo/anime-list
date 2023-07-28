import dayjs from "dayjs";
import { Anime } from "../api/anime";

export const getTitle = ({ english, native, romaji, userPreferred }: Anime["title"]): string => {
  return english || native || romaji || userPreferred || "No Title";
};

export const getDate = ({ day, month, year }: Anime["startDate"]): string => {
  return dayjs(`${year}-${month}-${day}-`).format("D MMM YYYY");
};
