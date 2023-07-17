import React, { useState } from "react";
import Login from "../components/login";
import Cadastro from "../components/register";
import { Flex, Text } from "@chakra-ui/react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {
    console.log("Login bem-sucedido!");
  };

  const handleCadastroSuccess = () => {
    console.log("Cadastro bem-sucedido!");
  };

  return (
    <Flex>
      {isLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Cadastro onCadastroSuccess={handleCadastroSuccess} />
      )}
      <button onClick={() => setIsLogin(!isLogin)}>
        {!isLogin ? <Text>Fazer Login</Text> : <Text>Cadastrar</Text>}
      </button>
    </Flex>
  );
}
