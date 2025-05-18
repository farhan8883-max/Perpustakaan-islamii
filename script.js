// Register Form
const regForm = document.getElementById('registerForm');
if (regForm) {
  regForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    if (localStorage.getItem(username)) {
      alert('Username sudah terdaftar!');
    } else {
      localStorage.setItem(username, password);
      alert('Registrasi berhasil!');
      window.location.href = 'login.html';
    }
  });
}

// Login Form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
      localStorage.setItem('loggedInUser', username); // Simpan status login
      alert('Login berhasil!');
      window.location.href = 'dashboard.html'; // Redirect ke dashboard
    } else {
      alert('Username atau password salah!');
    }
  });
}

