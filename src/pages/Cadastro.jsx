import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/validateForm'; // ✅ importação da função de validação

export default function Cadastro() {

    
    const [formData, setFormData] = useState({ nome: '', endereco: '', email: '', telefone: '' });
    const [usuariosApi, setUsuariosApi] = useState([]);
    const [feedback, setFeedback] = useState('');
    // const navigate = useNavigate(); // ⬅️ Hook de navegação

    useEffect(() => {
       fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsuariosApi(data.map(u => ({
        nome: u.name,
        endereco: `${u.address.street}, ${u.address.city}`,
        email: u.email,
        telefone: u.phone
      }))))
      .catch(() => setFeedback('Erro ao carregar dados da API.'));
  }, []);

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSelect = e => {
      const selecionado = usuariosApi.find(u => u.nome === e.target.value);
      if (selecionado) setFormData(selecionado);
    };

    const handleSubmit = e => {
      e.preventDefault();

    
    // ✅ Validação dos campos com função externa
    if (!validateForm(formData)) {
      setFeedback('Por favor, preencha todos os campos corretamente.');
      return;
    }
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // 🔍 Verifica se já existe um usuário com o mesmo e-mail
  const jaExiste = usuarios.some(u => 
    u.nome === formData.nome &&
    u.endereco === formData.endereco &&
    u.email === formData.email &&
    u.telefone === formData.telefone
  );

  if (jaExiste) {
    setFeedback('Usuário já cadastrado com os mesmos dados.');
    setTimeout(() => {
      setFeedback('');
      setFormData({ nome: '', endereco: '', email: '', telefone: '' });
    }, 3000);
    return;
  }

  // ✅ Cadastra novo usuário
  localStorage.setItem('usuarios', JSON.stringify([...usuarios, formData]));
  setFeedback('Usuário cadastrado com sucesso!');
  setTimeout(() => {
      setFeedback('');
      setFormData({ nome: '', endereco: '', email: '', telefone: '' });
    }, 3000);
  };

    return (
        <main className="container mt-4">
        <h2>Cadastro de Usuários</h2>
        {feedback && <div className="alert alert-success">{feedback}</div>}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Nome:</label>
            <select className="form-select" value={formData.nome} onChange={handleSelect} required data-bs-toggle="tooltip" title="Selecione um nome da lista">
                <option value=""></option>
                {usuariosApi.map((u, i) => <option key={i} value={u.nome}>{u.nome}</option>)}
            </select>
            </div>
            <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input className="form-control" name="endereco" value={formData.endereco} onChange={handleChange} required data-bs-toggle="tooltip" title="Digite o endereço completo"/>
            </div>
            <div className="mb-3">
            <label className="form-label">Email:</label>
            <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required data-bs-toggle="tooltip" title="Informe um email válido"/>
            </div>
            <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input className="form-control" name="telefone" value={formData.telefone} onChange={handleChange} required data-bs-toggle="tooltip" title="Digite o número com DDD"/>
            </div>
            <button className="btn btn-primary" type="submit" data-bs-toggle="tooltip" title="Clique para cadastrar o usuário">Cadastrar</button>
        </form>
        </main>
    );
}