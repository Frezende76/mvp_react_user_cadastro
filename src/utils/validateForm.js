const validateForm = (data) => {
  return (
    data.nome && 
    data.endereco && 
    data.email.includes('@') && 
    data.telefone.length >= 9
  );
};

export default validateForm;