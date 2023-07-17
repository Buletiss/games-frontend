import React, { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInUserWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInUserWithEmailAndPassword(email, password)
      .then(() => onLoginSuccess())
      .catch((error) => console.log("Erro ao fazer login: ", error));
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Flex>
      <Input
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        name="password"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSignIn}>Login</Button>
    </Flex>
  );
}
