import { Flex } from "@chakra-ui/react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Flex
      flexDirection="column"
      minH="100vh"
      w="100%"
      justify="center"
      align="center"
      bg="#1c1b22"
    >
      {children}
    </Flex>
  );
}
