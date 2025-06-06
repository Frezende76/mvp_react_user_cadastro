import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../assets/img/cad_users.png'; // ✅ importa a imagem
import * as bootstrap from 'bootstrap';

export default function Header() {

  // Função que fecha o menu hamburguer se estiver aberto
  const handleNavClick = () => {
    const navbar = document.getElementById('navbarNav');
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  };

  return (
    <header>
      <div className="container">
        <div className="banner">
          <img className="banner_cadastro" src={banner} alt="Banner do Sistema" /> {/* ✅ exibe o banner */}
        </div>


        <nav className="navbar navbar-expand-lg mt-3">
          <div className="container-fluid">
            {/* Botão hamburguer para telas pequenas */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>


            {/* Menu colapsável */}
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Página Inicial"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/cadastro"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Cadastrar Novo Usuário"
                  >
                    Cadastro
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/consulta"
                    className="nav-link"
                    onClick={handleNavClick}
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Consultar Usuários"
                  >
                    Consulta
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
