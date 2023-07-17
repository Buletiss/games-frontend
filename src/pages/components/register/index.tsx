import React, { useState } from "react";
import { auth } from "@/services/firebaseConfig";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface CadastroProps {
  onCadastroSuccess: () => void;
}

export default function Cadastro({ onCadastroSuccess }: CadastroProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => onCadastroSuccess())
      .catch((error) => console.log("Erro ao cadastrar: ", error));
  };

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
      <Button onClick={handleCadastro}>Cadastrar</Button>
    </Flex>
  );
}
