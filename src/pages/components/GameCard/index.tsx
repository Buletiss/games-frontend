import { Game } from "../../../models/game";
import { Flex, Image, Heading, Text, Box } from "@chakra-ui/react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const marginBreakpoints = ["5", "10", "10", "6"];
  const gameCardFlexBreakpoints = ["15rem", "18rem"];

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
      <Image src={game?.thumbnail} maxW="18rem" w="100%" h="auto" />
      <Flex flexDir="column" p="5">
        <Flex flexDir="column" w="100%" padding="0.2rem" color="white">
          <Heading fontWeight="bold" fontSize="3xl">
            {game?.title}
          </Heading>
          <br />
          <Box color="#b1becc" marginTop="5">
            <Text>Género: {game?.genre}</Text>
            <Text>Plataforma: {game?.platform}</Text>
            <Text>Data de lançamento: {game?.release_date}</Text>
            <Text>Publicadora: {game?.publisher}</Text>
            <Text marginTop="2">Descrição: {game?.short_description}</Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
