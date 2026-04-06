let rodada = 1;
let girando = false;
let rotacaoAtual = 0;

function spin() {
  if (girando) return;

  girando = true;

  let wheel = document.getElementById("wheel");

  let resultado;

  if (rodada === 1) {
    resultado = 170; // tenta novamente
  } else {
    resultado = 220; // prêmio
  }

  // 🔥 CORREÇÃO: acumular rotação
  rotacaoAtual += 360 * 5 + resultado;

  wheel.style.transform = "rotate(" + rotacaoAtual + "deg)";

  setTimeout(() => {
    girando = false;

    if (rodada === 1) {
      mostrarQuaseLa();
    } else {
      mostrarPremio();
    }
  }, 4000);
}

/* 🔥 PRIMEIRA TELA */
function mostrarQuaseLa() {
  criarPopup(`
    <h2>🔥 Quase lá!</h2>
    <p><b>Você ganhou: Tente Novamente</b></p>
    <p>Mas espere... Você desbloqueou uma chance exclusiva!</p>

    <button onclick="abrirFormulario()">🎰 Girar Novamente</button>
  `);
}

/* 📩 FORMULÁRIO */
function abrirFormulario() {
  removerPopup();

  criarPopup(`
    <h2>🎁 Desbloqueie seu prêmio máximo</h2>
    <p>Informe seus dados para liberar a segunda chance</p>

    <input type="text" placeholder="Seu nome">
    <input type="email" placeholder="Seu e-mail">
    <p id="erroEmail" style="color:red; font-size:12px; display:none;">
    Endereço de e-mail inválido
  </p>

    <button onclick="validarEmail()">Desbloquear Chance Máxima</button>
  `);
}

/* 🔁 SEGUNDA RODADA */
function segundaRodada() {
  rodada = 2;

  document.getElementById("tentativas").innerHTML =
    "🍀 <b>Última chance! Gire novamente</b>";

  removerPopup();
}

/* 🎉 PRÊMIO FINAL */
function mostrarPremio() {
  criarPopup(`
    <h2>🏆 PARABÉNS!</h2>
    <p>Você desbloqueou acesso aos produtos promocionais</p>
    <p><small>Pague apenas o frete!</small></p>

    <button onclick="irParaLoja()">Ver Produtos Disponíveis →</button>
  `);
}

function irParaLoja() {
  window.location.href = "shop.html";
}

/* POPUP */
function criarPopup(conteudo) {
  let popup = document.createElement("div");
  popup.className = "popup";

  popup.innerHTML = `
    <div class="popup-content">
      ${conteudo}
    </div>
  `;

  document.body.appendChild(popup);
}

function removerPopup() {
  let popup = document.querySelector(".popup");
  if (popup) popup.remove();
}
function validarEmail() {
  let email = document.getElementById("email").value;
  let erro = document.getElementById("erroEmail");

  if (!email.includes("@gmail.com")) {
    erro.style.display = "block";
    return;
  }

  erro.style.display = "none";
  segundaRodada();
}


