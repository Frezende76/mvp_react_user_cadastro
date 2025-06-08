import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Consulta from './pages/Consulta';
import NotFound from './pages/NotFound';
import banner from './assets/img/cad_users.png'; // Importa o banner para passar como props

function App() {
  return (
    <>
      <BrowserRouter>
        <Header bannerImg={banner} />
        <Routes>
          <Route path="/" element={<Home subtitulo="Bem-vindo ao sistema de cadastro!" />} />
          <Route
            path="/cadastro"
            element={
              <Cadastro
                title="Cadastrar Novo Usuário"
                submitLabel="Cadastrar"
                successMessage="cadastrado(a) com sucesso!"
                duplicateMessage="já cadastrado(a) com os mesmos dados."
                errorLoadingMessage="Erro ao carregar dados da API."
                invalidFormMessage="Por favor, preencha todos os campos corretamente."
              />
            }
          />
          <Route
            path="/consulta"
            element={
              <Consulta
                title="Consultar Usuários"
                placeholder=""
                noUsersMessage="Nenhum usuário encontrado"
                deleteSuccessMessage="deletado(a) com sucesso!"
                tooltipMessage="Digite o nome do usuário a pesquisar"
              />
            }
          />
          <Route
            path="*"
            element={<NotFound mensagem="Página não encontrada" voltarPara="/" />}
          />
        </Routes>
      </BrowserRouter>
      <Footer autor="Fabricio Rezende" ano={new Date().getFullYear()} />
    </>
  );
}

export default App;

