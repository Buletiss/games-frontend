import { Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Search } from "./components/Search";
import { Select } from "./components/Select";

export interface NavbarProps {
  setNameFilter: Dispatch<SetStateAction<string>>;
  setGenreFilter: Dispatch<SetStateAction<string>>;
}

export function Navbar({ setNameFilter, setGenreFilter }: NavbarProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-around"
      h="50px"
      background="#333544"
      w="100%"
    >
      <Search setNameFilter={setNameFilter} />
      <Select setGenreFilter={setGenreFilter} />
    </Flex>
  );
}
