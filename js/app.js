/* ═══════════════════════════════════════════
   RehabPro · app.js
   Lógica partilhada: AMPnoPRO, K-Level, relatório
═══════════════════════════════════════════ */

const ITENS = [
  {id:"i1", label:"1. Equilíbrio sentado", opcoes:[{v:0,d:"0 — Incapaz de manter equilíbrio sentado sem apoio"},{v:1,d:"1 — Capaz de manter equilíbrio sentado sem apoio"}]},
  {id:"i2", label:"2. Alcançar objeto sentado", opcoes:[{v:0,d:"0 — Incapaz de alcançar objeto à frente sem perder equilíbrio"},{v:1,d:"1 — Alcança objeto à frente sem perder equilíbrio"}]},
  {id:"i3", label:"3. Transferência cadeira-cadeira", opcoes:[{v:0,d:"0 — Incapaz ou necessita de grande assistência"},{v:1,d:"1 — Realiza com assistência mínima"},{v:2,d:"2 — Realiza de forma independente"}]},
  {id:"i4", label:"4. Levantar da cadeira", opcoes:[{v:0,d:"0 — Incapaz sem assistência"},{v:1,d:"1 — Necessita de assistência mínima ou dispositivo"},{v:2,d:"2 — Levanta-se de forma independente"}]},
  {id:"i5", label:"5. Equilíbrio imediato após levantar", opcoes:[{v:0,d:"0 — Instável mesmo com assistência"},{v:1,d:"1 — Estável com assistência ou dispositivo"},{v:2,d:"2 — Estável sem qualquer apoio nos primeiros 5 segundos"}]},
  {id:"i6", label:"6. Equilíbrio em pé", opcoes:[{v:0,d:"0 — Incapaz de manter equilíbrio em pé"},{v:1,d:"1 — Estável com base alargada ou dispositivo auxiliar"},{v:2,d:"2 — Estável com base estreita, sem dispositivo"}]},
  {id:"i7", label:"7. Equilíbrio em pé com olhos fechados", opcoes:[{v:0,d:"0 — Instável com olhos fechados"},{v:1,d:"1 — Estável com olhos fechados ≥ 3 segundos"}]},
  {id:"i8", label:"8. Alcançar objeto em pé", opcoes:[{v:0,d:"0 — Incapaz ou muito instável"},{v:1,d:"1 — Alcança com ligeira instabilidade"},{v:2,d:"2 — Alcança sem instabilidade"}]},
  {id:"i9", label:"9. Teste de empurrão", opcoes:[{v:0,d:"0 — Cai ou necessita de grande assistência"},{v:1,d:"1 — Mantém equilíbrio com dificuldade"},{v:2,d:"2 — Mantém equilíbrio facilmente"}]},
  {id:"i10",label:"10. Apoio unipodal", opcoes:[{v:0,d:"0 — Incapaz de realizar"},{v:1,d:"1 — Realiza com apoio manual ou por < 5 segundos"},{v:2,d:"2 — Realiza sem apoio ≥ 5 segundos"}]},
  {id:"i11",label:"11. Apanhar objeto do chão", opcoes:[{v:0,d:"0 — Incapaz sem assistência"},{v:1,d:"1 — Apanha com dificuldade ou apoio"},{v:2,d:"2 — Apanha de forma independente e segura"}]},
  {id:"i12",label:"12. Rodar 360°", opcoes:[{v:0,d:"0 — Incapaz ou necessita de assistência"},{v:1,d:"1 — Realiza de forma insegura (passos irregulares)"},{v:2,d:"2 — Realiza de forma segura e contínua"}]},
  {id:"i13",label:"13. Rodar durante a marcha", opcoes:[{v:0,d:"0 — Incapaz de rodar durante a marcha"},{v:1,d:"1 — Roda com instabilidade marcada"},{v:2,d:"2 — Roda de forma suave e segura"}]},
  {id:"i14",label:"14. Iniciar marcha", opcoes:[{v:0,d:"0 — Hesitação marcada ou várias tentativas"},{v:1,d:"1 — Inicia com ligeira hesitação"},{v:2,d:"2 — Inicia sem hesitação"}]},
  {id:"i15",label:"15. Comprimento do passo", opcoes:[{v:0,d:"0 — Passos assimétricos ou muito curtos"},{v:1,d:"1 — Passos ligeiramente assimétricos"},{v:2,d:"2 — Comprimento de passo simétrico e adequado"}]},
  {id:"i16",label:"16. Altura do passo", opcoes:[{v:0,d:"0 — Pé não despega do chão (arrasta)"},{v:1,d:"1 — Altura do passo ligeiramente reduzida"},{v:2,d:"2 — Altura do passo adequada e simétrica"}]},
  {id:"i17",label:"17. Continuidade dos passos", opcoes:[{v:0,d:"0 — Paragens frequentes durante a marcha"},{v:1,d:"1 — Paragens ocasionais"},{v:2,d:"2 — Marcha contínua sem paragens"}]},
  {id:"i18",label:"18. Desvio da trajetória", opcoes:[{v:0,d:"0 — Desvio marcado da linha reta"},{v:1,d:"1 — Desvio ligeiro"},{v:2,d:"2 — Percurso em linha reta"}]},
  {id:"i19",label:"19. Ultrapassar obstáculo", opcoes:[{v:0,d:"0 — Incapaz ou perde equilíbrio ao tentar"},{v:1,d:"1 — Ultrapassa com dificuldade ou lentidão excessiva"},{v:2,d:"2 — Ultrapassa de forma segura e fluida"}]},
  {id:"i20",label:"20. Subir/descer degrau", opcoes:[{v:0,d:"0 — Incapaz sem assistência"},{v:1,d:"1 — Necessita de corrimão ou assistência"},{v:2,d:"2 — Sobe e desce de forma independente"}]},
  {id:"i21",label:"21. Uso de dispositivo auxiliar", opcoes:[{v:0,d:"0 — Incapaz de marcha mesmo com dispositivo"},{v:1,d:"1 — Necessita de dispositivo auxiliar para marcha"},{v:2,d:"2 — Marcha sem necessidade de dispositivo auxiliar"}]}
];

const KLASSES = [
  {nivel:"K0", min:0,  max:7,  desc:"Sem potencial de marcha"},
  {nivel:"K1", min:8,  max:18, desc:"Marcha doméstica"},
  {nivel:"K2", min:19, max:25, desc:"Marcha comunitária limitada"},
  {nivel:"K3", min:26, max:32, desc:"Marcha comunitária"},
  {nivel:"K4", min:33, max:39, desc:"Alta atividade"}
];

function getK(v) {
  return KLASSES.find(c => v >= c.min && v <= c.max) || KLASSES[0];
}

function pill(text, cls) {
  return `<span class="pill ${cls}">${text}</span>`;
}

/* ── Renderizar itens AMPnoPRO ── */
function renderAMP() {
  const container = document.getElementById("amp-items");
  if (!container) return;
  container.innerHTML = "";
  ITENS.forEach(item => {
    const div = document.createElement("div");
    div.className = "amp-item";
    div.innerHTML = `
      <div class="amp-item-label">${item.label}</div>
      ${item.opcoes.map(op => `
        <label class="amp-option" id="opt-${item.id}-${op.v}" onclick="selOp('${item.id}',${op.v})">
          <input type="radio" name="${item.id}" value="${op.v}"/>
          <span>${op.d}</span>
        </label>
      `).join("")}
    `;
    container.appendChild(div);
  });
}

function selOp(id, val) {
  const item = ITENS.find(i => i.id === id);
  item.opcoes.forEach(op => {
    const el = document.getElementById(`opt-${id}-${op.v}`);
    if (el) el.classList.toggle("selected", op.v === val);
  });
  const radio = document.querySelector(`input[name="${id}"][value="${val}"]`);
  if (radio) radio.checked = true;
  updateLive();
}

function updateLive() {
  let total = 0;
  ITENS.forEach(item => {
    const checked = document.querySelector(`input[name="${item.id}"]:checked`);
    if (checked) total += parseInt(checked.value);
  });
  const scoreEl = document.getElementById("live-score");
  const barEl   = document.getElementById("score-bar");
  const kLive   = document.getElementById("k-live");
  const capBody = document.getElementById("cap-body");

  if (scoreEl) scoreEl.innerHTML = `${total}<span style="font-size:1.1rem;color:var(--muted)">/39</span>`;
  if (barEl)   barEl.style.width = Math.round(total / 39 * 100) + "%";

  const kl = getK(total);
  if (kLive)   kLive.textContent = kl.nivel;
  if (capBody) capBody.innerHTML = `
    <div class="cap-display">
      <div class="cap-score">${total}</div>
      <div>
        <div class="cap-klevel">${kl.nivel} — ${kl.desc}</div>
        <div class="cap-pts">pontuação AMPnoPRO / 39</div>
      </div>
    </div>`;

  // Guardar no sessionStorage para a página de resultado
  sessionStorage.setItem("ampScore", total);
  sessionStorage.setItem("kNivel", kl.nivel);
  sessionStorage.setItem("kDesc", kl.desc);
}

/* ── Submeter avaliação ── */
function gerarAvaliacao() {
  const missing = ITENS.filter(item => !document.querySelector(`input[name="${item.id}"]:checked`));
  const erroEl = document.getElementById("amp-erro");

  if (missing.length > 0) {
    erroEl.textContent = `Por favor, preencha todos os itens AMPnoPRO. Faltam ${missing.length} por responder.`;
    erroEl.classList.add("visible");
    document.getElementById("amp-card").scrollIntoView({ behavior: "smooth" });
    return;
  }
  erroEl.classList.remove("visible");

  let ampScore = 0;
  ITENS.forEach(item => {
    ampScore += parseInt(document.querySelector(`input[name="${item.id}"]:checked`).value);
  });

  const kl      = getK(ampScore);
  const k       = kl.nivel;
  const nivel   = document.getElementById("nivel").value;

  const progScore = +document.getElementById("saude").value +
                    +document.getElementById("comorb").value +
                    +document.getElementById("mental").value +
                    +document.getElementById("social").value;

  const riscoScore = +document.getElementById("quedas").value +
                     +document.getElementById("terreno").value +
                     +document.getElementById("cognitiva").value;

  let componente;
  if (nivel === "TT") {
    if (k === "K0" || k === "K1") componente = "Pé SACH ou básico";
    else if (k === "K2")           componente = "Pé multi-axial";
    else if (k === "K3")           componente = "Pé dinâmico com retorno de energia";
    else                           componente = "Pé de alta performance";
  } else {
    if (k === "K3" || k === "K4")          componente = "Joelho hidráulico / pneumático ou MPK";
    else if (k === "K2" && riscoScore >= 2) componente = "Joelho microprocessado recomendado";
    else                                    componente = "Joelho mecânico ou policêntrico";
  }

  const nivelLabel = nivel === "TT" ? "Transtibial" : nivel === "TF" ? "Transfemoral" : "Proximal / Bilateral";
  const progTxt    = progScore  <= 1 ? "Favorável"  : progScore  <= 3 ? "Moderado"  : "Desfavorável";
  const riscoTxt   = riscoScore <= 1 ? "Baixo"      : riscoScore <= 3 ? "Moderado"  : "Elevado";
  const progCls    = progScore  <= 1 ? "pill-green" : progScore  <= 3 ? "pill-amber": "pill-red";
  const riscoCls   = riscoScore <= 1 ? "pill-green" : riscoScore <= 3 ? "pill-amber": "pill-red";

  // Guardar todos os dados no sessionStorage
  const dados = {
    nome:       document.getElementById("nome")?.value || "—",
    idade:      document.getElementById("idade")?.value || "—",
    sexo:       document.getElementById("sexo")?.value || "—",
    peso:       document.getElementById("peso")?.value || "—",
    altura:     document.getElementById("altura")?.value || "—",
    nivel, nivelLabel, ampScore,
    k, kDesc: kl.desc,
    componente, progTxt, riscoTxt,
    progCls, riscoCls, progScore, riscoScore,
    data: new Date().toLocaleDateString("pt-PT", {day:"2-digit",month:"long",year:"numeric"})
  };

  sessionStorage.setItem("rehabDados", JSON.stringify(dados));

  // Navegar para a página de resultado
  window.location.href = "resultado.html";
}

/* ── Inicializar ── */
document.addEventListener("DOMContentLoaded", () => {
  renderAMP();
  updateLive();
});
