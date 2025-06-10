import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

const Consulta = ({
  title = "Consultar Usuários",
  placeholder = "",
  noUsersMessage = "Nenhum usuário encontrado",
  deleteSuccessMessage = "deletado(a) com sucesso!",
  tooltipMessage = "Digite o nome do usuário a pesquisar"
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const dados = localStorage.getItem('usuarios');
    if (dados) setUsuarios(JSON.parse(dados));
  }, []);

  const handleDelete = index => {
    const usuarioExcluido = usuarios[index];
    const novos = usuarios.filter((_, i) => i !== index);
    setUsuarios(novos);
    localStorage.setItem('usuarios', JSON.stringify(novos));
    setFeedback(`${usuarioExcluido.nome} ${deleteSuccessMessage}`);
    setTimeout(() => setFeedback(''), 3000);
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <main className="container mt-4">
      <h2 className="mb-3">{title}</h2>

      {feedback && <div className="alert alert-success">{feedback}</div>}

      <input
        type="text"
        className="form-control mb-3"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        placeholder={placeholder}
        data-bs-toggle="tooltip"
        title={tooltipMessage}
      />

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario, i) => (
                <UserCard key={i} usuario={usuario} onDelete={() => handleDelete(i)} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  {noUsersMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Consulta;


