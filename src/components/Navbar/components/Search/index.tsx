import { Input } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface SearchProps {
  setNameFilter: Dispatch<SetStateAction<string>>;
}

export function Search({ setNameFilter }: SearchProps) {
  function handleFilterByName(event: ChangeEvent<HTMLInputElement>) {
    setNameFilter(event.target.value);
  }

  return (
    <Input
      maxW="15rem"
      w="100%"
      placeholder="Filtre pelo nome"
      onChange={handleFilterByName}
    />
  );
}
