import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validateForm';
import InputField from '../components/InputField'; // ✅ Importa componente reutilizável

export default function Cadastro(props) {
  const apiUrl = props.apiUrl || 'https://jsonplaceholder.typicode.com/users';
  const successMessage = props.successMessage || 'cadastrado(a) com sucesso!';
  const duplicateMessage = props.duplicateMessage || 'já cadastrado(a) no sistema.';
  const errorLoadingMessage = props.errorLoadingMessage || 'Erro ao carregar dados da API.';
  const invalidFormMessage = props.invalidFormMessage || 'Por favor, preencha todos os campos corretamente.';

  const [formData, setFormData] = useState({ nome: '', endereco: '', email: '', telefone: '' });
  const [usuariosApi, setUsuariosApi] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data =>
        setUsuariosApi(
          data.map(u => ({
            nome: u.name,
            endereco: `${u.address.street}, ${u.address.city}`,
            email: u.email,
            telefone: u.phone,
          }))
        )
      )
      .catch(() => setFeedback(errorLoadingMessage));
  }, [apiUrl, errorLoadingMessage]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSelect = e => {
    const selecionado = usuariosApi.find(u => u.nome === e.target.value);
    if (selecionado) setFormData(selecionado);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm(formData)) {
      setFeedback(invalidFormMessage);
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const jaExiste = usuarios.some(
      u =>
        u.nome === formData.nome &&
        u.endereco === formData.endereco &&
        u.email === formData.email &&
        u.telefone === formData.telefone
    );

    if (jaExiste) {
      setFeedback(`${formData.nome} ${duplicateMessage} `);
      setTimeout(() => {
        setFeedback('');
        setFormData({ nome: '', endereco: '', email: '', telefone: '' });
      }, 3000);
      return;
    }

    localStorage.setItem('usuarios', JSON.stringify([...usuarios, formData]));
    setFeedback(`${formData.nome} ${successMessage} ` );
    setTimeout(() => {
      setFeedback('');
      setFormData({ nome: '', endereco: '', email: '', telefone: '' });
    }, 3000);
  };

  return (
    <main className="container mt-4">
      <h2>{props.title || 'Cadastro de Usuários'}</h2>
      {feedback && <div className="alert alert-success">{feedback}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <select
            className="form-select"
            value={formData.nome}
            onChange={handleSelect}
            required
            data-bs-toggle="tooltip"
            title="Selecione um nome da lista"
          >
            <option value=""></option>
            {usuariosApi.map((u, i) => (
              <option key={i} value={u.nome}>
                {u.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <InputField
            label="Endereço:"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <InputField
            label="Email:"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <InputField
            label="Telefone:"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          data-bs-toggle="tooltip"
          title="Clique para cadastrar o usuário"
        >
          {props.submitLabel || 'Cadastrar'}
        </button>
      </form>
    </main>
  );
}
