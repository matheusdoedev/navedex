import React, { useContext } from "react";
// hooks
import useLogin from "../../hooks/user-authentication";
// imgs
import logoImg from "../../assets/logo.svg";
// styles
import { LoginContainer, LoginForm, LoginBody, LoginLoading } from "./styles";
import { Button } from "../../styles/objects/button";
import { Loading } from "../../styles/objects/loading";
// contexts
import { ModalContext } from "../../hooks/modal";
// components
import Input from "../../components/Input";
const Modal = React.lazy(() => import("../../components/Modal"));

const Login = () => {
  // custom hooks
  const {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
    credentialsError,
    authenticationStatus,
  } = useLogin();

  // contexts
  const modalContext = useContext(ModalContext);

  return (
    <>
      <LoginBody data-anime="modal" onClick={modalContext?.handleInactive}>
        <LoginContainer>
          <LoginForm onSubmit={handleLogin}>
            <img src={logoImg} alt="Nave.rs" />
            <Input
              aria-label="E-mail"
              label="E-mail"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="E-mail"
              error={
                credentialsError
                  ? "E-mail ou senha invalida, tente novamente!"
                  : ""
              }
              required
            />
            <Input
              aria-label="Senha"
              label="Senha"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Senha"
              error={
                credentialsError
                  ? "E-mail ou senha invalida, tente novamente!"
                  : ""
              }
              required
            />
            <Button as="button" type="submit">
              Entrar
            </Button>
            {authenticationStatus ? (
              <LoginLoading>
                <Loading loading />
              </LoginLoading>
            ) : (
              ""
            )}
          </LoginForm>
        </LoginContainer>
      </LoginBody>

      {/* modals */}
      <React.Suspense fallback={<Loading loading />}>
        <Modal
          title="Acesso negado"
          content="É necessário estar logado para acessar a aplicação"
          modal="error-access-denied"
        />
      </React.Suspense>
    </>
  );
};

export default Login;
