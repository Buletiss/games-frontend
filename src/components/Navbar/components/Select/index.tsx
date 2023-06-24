import { Select as ChakraSelect } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface SelectProps {
  setGenreFilter: Dispatch<SetStateAction<string>>;
}

export function Select({ setGenreFilter }: SelectProps) {
  const genres = [
    "All",
    "Shooter",
    "MMOARPG",
    "ARPG",
    "Fighting",
    "Action RPG",
    "Battle Royale",
    "MMORPG",
    "MOBA",
    "Sports",
    "Racing",
    "Card Game",
    "Strategy",
    "MMO",
    "Social",
    "Fantasy",
  ];

  function handleFilterByGenre(event: ChangeEvent<HTMLSelectElement>) {
    setGenreFilter(event.target.value);
  }

  return (
    <ChakraSelect
      color="white"
      maxW="15rem"
      w="100%"
      onChange={handleFilterByGenre}
    >
      {genres.map((genre) => (
        <option style={{ color: "black" }} value={genre}>
          {genre}
        </option>
      ))}
    </ChakraSelect>
  );
}
