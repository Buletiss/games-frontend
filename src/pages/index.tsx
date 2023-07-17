import { DefaultLayout } from "../_layout/defaultLayout";
import { Spinner, SimpleGrid, Box, AbsoluteCenter } from "@chakra-ui/react";
import GameCard from "./components/GameCard";
import { useGames } from "../hooks/games";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

export default function Home() {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [orderFilter, setOrderFilter] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);

  const { games, filteredGames, isLoading, favoritesGames, orderRate } =
    useGames({
      nameFilter,
      genreFilter,
      orderFilter,
    });
  const columnsBreakpoints = [1, 1, 2, 3];

  console.log("orderfilter", orderFilter);

  function handleHasNoResponseFromFilters() {
    return Boolean(
      genreFilter.length && nameFilter.length && !filteredGames.length
    );
  }
  return (
    <DefaultLayout>
      {!isLoading && (filteredGames.length || games.length) && (
        <Navbar
          setNameFilter={setNameFilter}
          setGenreFilter={setGenreFilter}
          setShowFavorites={setShowFavorites}
          setShowOrderRate={setOrderFilter}
        />
      )}
      <SimpleGrid marginTop="10" columns={columnsBreakpoints}>
        {isLoading && <Spinner color="white" />}

        {!isLoading &&
          !filteredGames.length &&
          handleHasNoResponseFromFilters() && (
            <Box position="relative">
              <AbsoluteCenter color="white" textAlign="center">
                Não foi encontrado nenhum resultado na busca
              </AbsoluteCenter>
            </Box>
          )}

        {!isLoading && orderFilter && orderFilter.length > 0
          ? orderRate.map((orderRating) => (
              <GameCard key={orderRating.id} game={orderRating} />
            ))
          : filteredGames.length > 0 || handleHasNoResponseFromFilters()
          ? filteredGames.map((filteredGame) => (
              <GameCard key={filteredGame.id} game={filteredGame} />
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}

        {!isLoading && showFavorites && favoritesGames.length > 0
          ? favoritesGames.map((favoriteGame) => (
              <GameCard key={favoriteGame.id} game={favoriteGame} />
            ))
          : filteredGames.length > 0 || handleHasNoResponseFromFilters()
          ? filteredGames.map((filteredGame) => (
              <GameCard key={filteredGame.id} game={filteredGame} />
            ))
          : games.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
    </DefaultLayout>
  );
}
