import React from 'react';

export default function UserCard({ usuario, onDelete }) {
  return (
    <tr>
      <td>{usuario.nome}</td>
      <td>{usuario.endereco}</td>
      <td>{usuario.email}</td>
      <td>{usuario.telefone}</td>
      <td className="text-center align-middle">
        <button className="btn btn-md" onClick={onDelete} data-bs-toggle="tooltip" data-bs-placement="top"  title="Excluir usuário">
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}