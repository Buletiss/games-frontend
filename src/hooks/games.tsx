import api from "@/services/api";
import { defaultErrorHandler } from "@/utils/defaultErrorHandler";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Game } from "@/models/game";
import { useToast } from "@chakra-ui/react";

interface UseGamesProps {
  nameFilter: string;
  genreFilter: string;
}

export function useGames({ nameFilter, genreFilter = "All" }: UseGamesProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isLoading, setIsloading] = useState<Boolean>(true);

  const toast = useToast();

  useEffect(() => {
    async function getGamesInfo() {
      try {
        const response = await api.get("/data");
        setGames(response.data);
        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        const error = err as AxiosError;
        const title = defaultErrorHandler(error);

        toast({
          title,
          status: "error",
          isClosable: true,
        });
      }
    }
    getGamesInfo();
  }, []);

  useEffect(() => {
    if (games)
      setFilteredGames(
        games.filter((game) => {
          const currentGameLowercase = game.title.toLowerCase();
          const nameFilterLowercase = nameFilter?.toLowerCase();

          if (genreFilter === "All") {
            return nameFilterLowercase.length > 0
              ? currentGameLowercase.includes(nameFilterLowercase)
              : games;
          } else {
            return (
              game.genre === genreFilter &&
              currentGameLowercase.includes(nameFilterLowercase)
            );
          }
        })
      );
  }, [nameFilter, genreFilter]);

  return { games, filteredGames, isLoading };
}
