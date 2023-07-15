import { getTitle } from "./anime";

it("getTitle should return correct title", () => {
  expect(getTitle({ userPreferred: "correct" })).toBe("correct");
});
