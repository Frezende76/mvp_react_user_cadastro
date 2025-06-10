import { useNavigate, useLocation } from 'react-router-dom';

export default function NotFound(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="container mt-5 text-center">
      <h1 className="display-4">{props.statusCode || "404"}</h1>
      <p className="lead">
        Página "{location.pathname}" não encontrada.
      </p>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate('/', { replace: true })}
      >
        Voltar para o início
      </button>
    </main>
  );
}


