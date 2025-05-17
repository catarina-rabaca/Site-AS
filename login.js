function login() {
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const loader = document.getElementById('loader');

  loader.style.display = 'flex';

  setTimeout(() => {
    if (email === 'fornecedor' || email === 'fornecedor@gmail.com') {
      window.location.href = 'fornecedores.html';
    }else if(email === 'administrador' || email === 'administrador@gmail.com' || email === 'admin' || email === 'admin@gmail.com'){
      window.location.href = 'administradores.html';
    } else {
      window.location.href = 'main.html';
    }
  }, 1000); // Simula carregamento
}
