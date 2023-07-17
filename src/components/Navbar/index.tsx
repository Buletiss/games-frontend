import { Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Search } from "./components/Search";
import { Select } from "./components/Select";
import FavoriteItems from "./components/Favorites";
import RateFilter from "./components/rateFilter";

export interface NavbarProps {
  setNameFilter: Dispatch<SetStateAction<string>>;
  setGenreFilter: Dispatch<SetStateAction<string>>;
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
  setShowOrderRate: Dispatch<SetStateAction<string>>;
}

export function Navbar({
  setNameFilter,
  setGenreFilter,
  setShowFavorites,
  setShowOrderRate,
}: NavbarProps) {
  return (
    <Flex
      position="fixed"
      top="0"
      zIndex="1"
      alignItems="center"
      justifyContent="space-around"
      h="50px"
      background="#333544"
      w="100%"
    >
      <Search setNameFilter={setNameFilter} />
      <Select setGenreFilter={setGenreFilter} />
      <FavoriteItems setShowFavorites={setShowFavorites} />
      <RateFilter setShowOrderRate={setShowOrderRate} />
    </Flex>
  );
}
