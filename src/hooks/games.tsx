import api from "@/services/api";
import { defaultErrorHandler } from "@/utils/defaultErrorHandler";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Game } from "@/models/game";
import { useToast } from "@chakra-ui/react";
import { fireStoreDb, userLogged } from "@/services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface UseGamesProps {
  nameFilter: string;
  genreFilter: string;
  orderFilter: string;
}

export function useGames({
  nameFilter,
  genreFilter = "All",
  orderFilter = "All",
}: UseGamesProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isLoading, setIsloading] = useState<Boolean>(true);
  const [favoritesGames, setFavoritesGames] = useState<Game[]>([]);
  const [orderRate, setOrderRate] = useState<Game[]>([]);

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

  useEffect(() => {
    async function fetchFavoriteItems() {
      try {
        const docRef = doc(fireStoreDb, "user", userLogged);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        const gamesInfo = data?.Games || [];
        const games = gamesInfo?.filter((game: any) => game.favorited === true);
        setFavoritesGames(games);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFavoriteItems();
  }, [fireStoreDb, userLogged, games]);

  useEffect(() => {
    async function rateFilter() {
      try {
        const docRef = doc(fireStoreDb, "user", userLogged);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        const gamesInfo = data?.Games || [];
        const gamesRated = gamesInfo?.filter((game: any) => game.rate > 0);
        console.log("orderfiltro", orderFilter);
        if (orderFilter === "Ordenar lista") {
          setOrderRate(games);
        } else if (orderFilter === "Menor") {
          const rateDecreasing = gamesRated.sort(
            (highValue: any, lowerValue: any) =>
              lowerValue.rate - highValue.rate
          );
          console.log("rateDecreasing", rateDecreasing);
          setOrderRate(rateDecreasing);
        } else if (orderFilter === "Maior") {
          const rateIncreasing = gamesRated.sort(
            (highValue: any, lowerValue: any) =>
              highValue.rate - lowerValue.rate
          );
          console.log("rateIncreasing", rateIncreasing);
          setOrderRate(rateIncreasing);
        }
      } catch (err) {
        console.log(err);
      }
    }
    rateFilter();
  }, [orderFilter]);

  return { games, filteredGames, isLoading, favoritesGames, orderRate };
}
