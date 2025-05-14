document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ================== REGISTRASI ==================
    if (document.getElementById("registerForm")) {
        document.getElementById("registerForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("registerName").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                document.getElementById("registerMessage").innerText = "Email sudah terdaftar!";
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));
            document.getElementById("registerMessage").innerText = "Registrasi berhasil!";
        });
    }

    // ================== LOGIN ==================
    if (document.getElementById("loginForm")) {
        document.getElementById("loginForm").addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                window.location.href = "dashboard.html";
            } else {
                document.getElementById("loginMessage").innerText = "Email atau password salah!";
            }
        });
    }

    // ================== DASHBOARD ==================
    if (document.getElementById("userName")) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("userName").innerText = loggedInUser.name;
        }

        // ================== UBAH NAMA ==================
        document.getElementById("changeName").addEventListener("click", function () {
            const newName = document.getElementById("newName").value;
            if (newName.trim() === "") {
                alert("Nama tidak boleh kosong!");
                return;
            }

            loggedInUser.name = newName;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            const userIndex = users.findIndex(user => user.email === loggedInUser.email);
            if (userIndex !== -1) {
                users[userIndex].name = newName;
                localStorage.setItem("users", JSON.stringify(users));
            }

            document.getElementById("userName").innerText = newName;
            alert("Nama berhasil diubah!");
        });

        // ================== LOGOUT ==================
        document.getElementById("logout").addEventListener("click", function () {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
});
