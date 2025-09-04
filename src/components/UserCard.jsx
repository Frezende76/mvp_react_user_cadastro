const UserCard = ({ usuario, onDelete, onUpdate }) => {
  const { id, nome, endereco, email, telefone } = usuario;

  return (
    <tr>
      <td>{nome}</td>
      <td>{endereco}</td>
      <td>{email}</td>
      <td>{telefone}</td>
      <td className="text-center align-middle">
        {/* Botão Editar */}
        <button
          className="btn border-0 btn-sm me-2"
          onClick={() => onUpdate(usuario)}
          title={`Editar ${nome}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <i className="bi bi-pencil-square"></i>
        </button>

        {/* Botão Excluir */}
        <button
          className="btn border-0 btn-sm"
          onClick={() => onDelete(id)}
          title={`Excluir ${nome}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserCard;

