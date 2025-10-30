/* =======================================================
   DATEXTRACT PLATFORM - SCRIPT PRINCIPAL
   ======================================================= */

// ===== LOGIN =====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();

      if (user === "admin" && pass === "adminteste") {
        localStorage.setItem("logged", "true");
        window.location.href = "dashboard.html";
      } else {
        alert("Usuário ou senha incorretos!");
      }
    });
  }
});

// ===== PROTEGE PÁGINAS RESTRITAS =====
const restrictedPages = ["dashboard.html", "clientes.html", "fornecedores.html"];
const currentPage = window.location.pathname.split("/").pop();

if (restrictedPages.includes(currentPage) && localStorage.getItem("logged") !== "true") {
  window.location.href = "index.html";
}

// ===== LOGOUT GLOBAL =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("logged");
    window.location.href = "index.html";
  });
}

// ===== SIDEBAR ACTIVE AUTOMÁTICO =====
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar-nav a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ===== GRÁFICOS DASHBOARD =====
if (document.getElementById("vendasChart")) {
  const clientes = [
    "Submarino SA",
    "Loja Renner SA",
    "Carrefour Comércio e Indústria Ltda",
    "Netshoes SA",
    "Havan Lojas de Departamentos SA"
  ];
  const vendas = [12000, 3600, 2000, 900, 700];
  const cores = ["#2563eb", "#4f46e5", "#0ea5e9", "#a855f7", "#f59e0b"];

  new Chart(document.getElementById("vendasChart"), {
    type: "bar",
    data: {
      labels: clientes,
      datasets: [{
        data: vendas,
        backgroundColor: cores,
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  new Chart(document.getElementById("pedidosChart"), {
    type: "pie",
    data: {
      labels: clientes,
      datasets: [{
        data: [1, 1, 1, 1, 1],
        backgroundColor: cores
      }]
    },
    options: { plugins: { legend: { position: "right" } } }
  });

  new Chart(document.getElementById("faturamentoChart"), {
    type: "bar",
    data: {
      labels: ["10/2025", "11/2025"],
      datasets: [{
        data: [799, 1172.5],
        backgroundColor: "#2563eb",
        borderRadius: 6
      }]
    },
    options: { plugins: { legend: { display: false } } }
  });
}

// ===== MODAL DE FORNECEDOR =====
const modalFornecedor = document.getElementById("modalFornecedor");
const btnAddFornecedor = document.getElementById("btnAddFornecedor");
const closeModal = document.querySelector(".close");

if (btnAddFornecedor) {
  btnAddFornecedor.addEventListener("click", () => {
    modalFornecedor.style.display = "flex";
  });
}
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modalFornecedor.style.display = "none";
  });
}
window.addEventListener("click", (e) => {
  if (e.target === modalFornecedor) {
    modalFornecedor.style.display = "none";
  }
});

// ===== CADASTRO DE FORNECEDOR FUNCIONAL =====
const formFornecedor = document.getElementById("formFornecedor");
if (formFornecedor) {
  formFornecedor.addEventListener("submit", (e) => {
    e.preventDefault();

    const razaoSocial = document.getElementById("razaoSocial").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();

    if (!razaoSocial || !tipo || !cnpj) {
      alert("Preencha todos os campos!");
      return;
    }

    const grid = document.querySelector(".clientes-grid");
    if (!grid) {
      alert("Não foi possível encontrar a lista de fornecedores!");
      return;
    }

    // Define classe de estilo pelo tipo
    const classeTipo = tipo.toLowerCase().includes("jur") ? "juridico" : "revendedor";

    // Cria o card novo com as mesmas classes dos demais
    const novoCard = document.createElement("div");
    novoCard.classList.add("cliente-card", classeTipo, "fade-in-up");

    // Primeira letra do nome
    const letra = razaoSocial.charAt(0).toUpperCase();

    novoCard.innerHTML = `
      <div class="avatar">${letra}</div>
      <div class="info">
        <h4>${razaoSocial}</h4>
        <p>${tipo}</p>
      </div>
    `;

    // Adiciona à grid
    grid.appendChild(novoCard);

    // Feedback visual e reset
    modalFornecedor.style.display = "none";
    formFornecedor.reset();

    // Efeito visual suave
    novoCard.style.boxShadow = "0 0 15px rgba(0, 180, 216, 0.7)";
    setTimeout(() => novoCard.style.boxShadow = "", 1000);
  });
}

// ===== TABS DE PEDIDOS =====
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});
