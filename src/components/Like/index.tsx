import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStoreDb, userLogged } from "@/services/firebaseConfig";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Game } from "@/models/game";

interface FavoritedProps {
  title: string;
  game: Game;
}

export default function Favorited({ game, title }: FavoritedProps) {
  const [favorited, setFavorited] = useState(false);

  const toast = useToast();

  useEffect(() => {
    fetchFavorited();
  }, []);

  async function fetchFavorited() {
    try {
      const docRef = doc(fireStoreDb, "user", userLogged);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      const gamesInfo = data?.Games || [];

      const foundGame = gamesInfo.find((game: any) => game.title === title);
      if (foundGame) {
        setFavorited(foundGame.favorited);
      } else {
        setFavorited(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFavorite() {
    if (!userLogged) {
      const userNotLogged = toast({
        title: "Você não está logado",
        status: "error",
        isClosable: true,
      });
      return userNotLogged;
    } else {
      const docRef = doc(fireStoreDb, "user", userLogged);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      const gamesInfo = data?.Games || [];

      const gameIndex = gamesInfo.findIndex(
        (game: any) => game.title === title
      );

      if (gameIndex !== -1) {
        const updatedGamesInfo = [...gamesInfo];
        const game = updatedGamesInfo[gameIndex];
        updatedGamesInfo[gameIndex] = {
          ...game,
          id: game.id,
          title: game.title,
          thumbnail: game.thumbnail,
          genre: game.genre,
          platform: game.platform,
          publisher: game.publisher,
          short_description: game.short_description,
          release_date: game.release_date,
          favorited: !game.favorited,
          rate: game.rate !== undefined ? game.rate : 0,
        };

        const newData = {
          Games: updatedGamesInfo,
        };
        setFavorited(!game.favorited);

        await setDoc(docRef, newData);
      } else {
        const newGame = {
          id: game.id,
          title: game.title,
          thumbnail: game.thumbnail,
          genre: game.genre,
          platform: game.platform,
          publisher: game.publisher,
          short_description: game.short_description,
          release_date: game.release_date,
          favorited: true,
          rate: 0,
        };

        const newData = {
          Games: [...gamesInfo, newGame],
        };
        setFavorited(true);

        await setDoc(docRef, newData);
      }
    }
  }

  return (
    <>
      <Button bg="transparent" onClick={handleFavorite}>
        <FontAwesomeIcon
          size="xl"
          icon={faHeart}
          color={favorited ? "red" : "#ccc"}
        />
      </Button>
    </>
  );
}
