import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';


export default function Consulta() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [feedback, setFeedback] = useState(''); // ✅ novo estado para mensagem

  useEffect(() => {
    const dados = localStorage.getItem('usuarios');
    if (dados) setUsuarios(JSON.parse(dados));
  }, []);

  const handleDelete = index => {
    const novos = usuarios.filter((_, i) => i !== index);
    setUsuarios(novos);
    localStorage.setItem('usuarios', JSON.stringify(novos));
    setFeedback('Usuário deletado com sucesso!'); // ✅ define mensagem
    setTimeout(() => setFeedback(''), 3000); // ✅ limpa após 3 segundos
  };

  const usuariosFiltrados = usuarios.filter(u => u.nome.toLowerCase().includes(filtroNome.toLowerCase()));
  
  return (

   <main className="container mt-4">
      <h2 className="mb-3">Consultar Usuários</h2>

      {/* Mensagem de sucesso */}
      {feedback && <div className="alert alert-success">{feedback}</div>}
      
      <input
        type="text"
        className="form-control mb-3"
        value={filtroNome}
        onChange={e => setFiltroNome(e.target.value)}
        data-bs-toggle="tooltip"
        title="Digite o nome do usuário a pesquisar"
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
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>

  );
}