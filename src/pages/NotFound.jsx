import React from "react";
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="container mt-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Página não encontrada.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Voltar para o início
      </button>
    </main>
  );
}
