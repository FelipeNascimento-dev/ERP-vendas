// ==== Login ====
const form = document.getElementById("loginForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
      localStorage.setItem("logged", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha incorretos!");
    }
  });
}

// ==== Protege Dashboard ====
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("logged") !== "true") {
    window.location.href = "index.html";
  }
}

// ==== Logout ====
const logout = document.getElementById("logoutBtn");
if (logout) {
  logout.addEventListener("click", () => {
    localStorage.removeItem("logged");
    window.location.href = "index.html";
  });
}

// ==== Gráficos ====
if (document.getElementById("vendasChart")) {
  const clientes = ["Submarino SA", "Loja Renner SA", "Carrefour Comércio e Indústria Ltda", "Netshoes SA", "Havan Lojas de Departamentos SA"];
  const vendas = [12000, 3600, 2000, 900, 700];
  const cores = ["#2563eb", "#4f46e5", "#0ea5e9", "#a855f7", "#f59e0b"];

  new Chart(document.getElementById("vendasChart"), {
    type: "bar",
    data: { labels: clientes, datasets: [{ data: vendas, backgroundColor: cores, borderRadius: 6 }] },
    options: { plugins: { legend: { display: false } } }
  });

  new Chart(document.getElementById("pedidosChart"), {
    type: "pie",
    data: { labels: clientes, datasets: [{ data: [1,1,1,1,1], backgroundColor: cores }] },
    options: { plugins: { legend: { position: "right" } } }
  });

  new Chart(document.getElementById("faturamentoChart"), {
    type: "bar",
    data: { labels: ["10/2025", "11/2025"], datasets: [{ data: [799, 1172.5], backgroundColor: "#2563eb", borderRadius: 6 }] },
    options: { plugins: { legend: { display: false } } }
  });
}
