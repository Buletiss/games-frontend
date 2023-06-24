import { DefaultLayout } from "@/_layout/defaultLayout";
import { Spinner, SimpleGrid } from "@chakra-ui/react";
import { GameCard } from "./components/GameCard";
import { useGames } from "@/hooks/games";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const { games, filteredGames, isLoading } = useGames({
    nameFilter,
    genreFilter,
  });
  const columnsBreakpoints = [1, 1, 2, 3];

  function handleHasNoResponseFromFilters() {
    return Boolean(
      genreFilter.length && nameFilter.length && !filteredGames.length
    );
  }

  return (
    <DefaultLayout>
      {!isLoading && (filteredGames.length || games.length) && (
        <Navbar setNameFilter={setNameFilter} setGenreFilter={setGenreFilter} />
      )}
      <SimpleGrid columns={columnsBreakpoints}>
        {isLoading && <Spinner color="white" />}

        {!isLoading &&
          !filteredGames.length &&
          handleHasNoResponseFromFilters() &&
          "Não foi encontrado nenhum resultado na busca"}

        {!isLoading &&
        (filteredGames.length > 0 || handleHasNoResponseFromFilters())
          ? filteredGames.map((filteredGame) => (
              <GameCard key={filteredGame.id} game={filteredGame} />
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
    </DefaultLayout>
  );
}
