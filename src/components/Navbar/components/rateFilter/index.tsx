import { Select } from "@chakra-ui/react";
import { Dispatch, SetStateAction, ChangeEvent } from "react";

export interface RateFilterProps {
  setShowOrderRate: Dispatch<SetStateAction<string>>;
}

export default function RateFilter({ setShowOrderRate }: RateFilterProps) {
  const ordem = ["Ordenar lista", "Maior", "Menor"];

  function handleFilterByRate(event: ChangeEvent<HTMLSelectElement>) {
    setShowOrderRate(event.target.value);
  }

  return (
    <Select color="white" maxW="10rem" onChange={handleFilterByRate}>
      {ordem.map((orde) => (
        <option key={orde} style={{ color: "black" }} value={orde}>
          {orde}
        </option>
      ))}
    </Select>
  );
}
