import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fireStoreDb, userLogged } from "@/services/firebaseConfig";
import { Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Game } from "@/models/game";

interface RateProps {
  title: string;
  game: Game;
}
export default function Rate({ game, title }: RateProps) {
  const [rate, setRate] = useState<number | null>(0);

  const toast = useToast();

  useEffect(() => {
    fetchRate();
  }, []);

  async function fetchRate() {
    try {
      const docRef = doc(fireStoreDb, "user", userLogged);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      const gamesInfo = data?.Games || [];

      const game = gamesInfo.find((game: any) => game.gameTitle === title);

      if (game) {
        setRate(game.rate);
      } else {
        setRate(0);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRate(value: number) {
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

      const gameRateFinder = gamesInfo.find(
        (game: any) => game.gameTitle === title
      );

      if (gameRateFinder) {
        const updatedGamesInfo = gamesInfo.map((game: any) => {
          if (game.gameTitle === title) {
            return {
              ...game,
              rate: game.rate === value ? 0 : value,
            };
          }
          return game;
        });

        const newData = {
          Games: updatedGamesInfo,
        };

        await updateDoc(docRef, newData);
        setRate(gameRateFinder.rate === value ? 0 : value);
      } else {
        const newGame = {
          gameTitle: title,
          rate: value,
          ...game,
        };

        const newData = {
          Games: [...gamesInfo, newGame],
        };

        await setDoc(docRef, newData);
        setRate(value);
      }
    }
  }

  return (
    <Flex>
      {[1, 2, 3, 4, 5].map((starValue: number) => (
        <FontAwesomeIcon
          key={starValue}
          icon={faStar}
          style={{
            color: starValue <= (rate || 0) ? "#ffc107" : "#ccc",
            cursor: "pointer",
          }}
          onClick={() => handleRate(starValue)}
        />
      ))}
    </Flex>
  );
}
