import { Game } from "../../../models/game";
import { Flex, Image, Heading, Text, Box } from "@chakra-ui/react";
import { dateFormatter } from "../../../utils/dateFormat/";
import Favorited from "@/components/Like";
import Rate from "@/components/Rate";
import { title } from "process";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const marginBreakpoints = ["5", "10", "10", "6"];
  const gameCardFlexBreakpoints = ["15rem", "18rem"];
  const formatDate = new Date(game?.release_date || "0000-00-00");

  return (
    <Flex
      m={marginBreakpoints}
      maxW={gameCardFlexBreakpoints}
      w="100%"
      justify="flex-start"
      flexDir="column"
      align="center"
      bg="#333544"
      borderRadius="10px"
      _hover={{
        background: "#333644",
        transform: "scale(1.01)",
      }}
    >
      <Image
        src={game?.thumbnail}
        maxW="18rem"
        w="100%"
        h="auto"
        borderRadius="10px 10px 0 0"
      />
      <Flex flexDir="column" p="5">
        <Flex flexDir="column" w="100%" padding="0.2rem" color="white">
          <Heading fontWeight="bold" fontSize="3xl">
            {game?.title!}
          </Heading>
          <br />
          <Box color="#b1becc" marginTop="5">
            <Text>Género: {game?.genre}</Text>
            <Text>Plataforma: {game?.platform}</Text>
            <Text>Data de lançamento: {game?.release_date}</Text>
            <Text>Publicadora: {game?.publisher}</Text>
            <Text marginTop="2">Descrição: {game?.short_description}</Text>
          </Box>
          <Flex
            marginTop="10"
            alignItems="center"
            justifyContent="space-between"
          >
            <Favorited title={game?.title} game={game} />
            <Rate title={game?.title} game={game} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
