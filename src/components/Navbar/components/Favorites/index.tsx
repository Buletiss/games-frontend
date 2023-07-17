import { Dispatch, SetStateAction } from "react";
import { Button } from "@chakra-ui/react";

export interface FavoritesProps {
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
}

export default function FavoriteItems({ setShowFavorites }: FavoritesProps) {
  return (
    <Button
      background="#333544"
      border="1px"
      borderColor="white"
      color="white"
      onClick={() => setShowFavorites((value) => !value)}
    >
      favoritos
    </Button>
  );
}
