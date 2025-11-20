document.getElementById("quizForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let acertos = 0;
  let erros = 0;
  let feedback = "";

  const respostas = {
    q1: "elias",
    q2: "antioquia",
    q3: "lucas",
    q4: "pedro",
    q5: "saul",
    q6: "jonas",
    q7: "matias",
    q8: "belem",
    q9: "apocalipse",
    q10: "daniel",
    q11: ["isaias", "ezequiel"],
    q12: ["pedro", "joao"],
    q13: ["romanos", "apocalipse"],
    q14: ["amor", "mansidao"],
    q15: ["jeroboao", "acabe"],
    q16: "salmos",
    q17: "paulo",
    q18: "abraa",
    q19: "miqueias",
    q20: "moises"
  };

  // ----------------- FUNÇÃO PARA VALIDAR -----------------
  function validarTexto(id) {
    let valor = document.getElementById(id).value.trim().toLowerCase();
    return valor === respostas[id];
  }

  function validarRadio(name) {
    let marcado = document.querySelector(`input[name="${name}"]:checked`);
    return marcado && marcado.value === respostas[name];
  }

  function validarCheckbox(ids, corretas) {
    let valores = ids
      .map(id => document.getElementById(id).checked ? document.getElementById(id).value : "")
      .filter(v => v !== "");

    valores.sort();
    corretas.sort();

    return JSON.stringify(valores) === JSON.stringify(corretas);
  }

  function validarSelect(id) {
    let valor = document.getElementById(id).value;
    return valor === respostas[id];
  }

  // ----------------- VALIDAÇÃO -----------------

  const validacoes = [
    validarTexto("q1"),
    validarTexto("q2"),
    validarTexto("q3"),
    validarTexto("q4"),
    validarTexto("q5"),
    validarRadio("q6"),
    validarRadio("q7"),
    validarRadio("q8"),
    validarRadio("q9"),
    validarRadio("q10"),
    validarCheckbox(["q11a", "q11b", "q11c"], respostas.q11),
    validarCheckbox(["q12a", "q12b", "q12c"], respostas.q12),
    validarCheckbox(["q13a", "q13b", "q13c"], respostas.q13),
    validarCheckbox(["q14a", "q14b", "q14c"], respostas.q14),
    validarCheckbox(["q15a", "q15b", "q15c"], respostas.q15),
    validarSelect("q16"),
    validarSelect("q17"),
    validarSelect("q18"),
    validarSelect("q19"),
    validarSelect("q20")
  ];

  validacoes.forEach((ok, i) => {
    if (ok) {
      acertos++;
      feedback += `<p class="text-success">✔ Questão ${i + 1} correta</p>`;
    } else {
      erros++;
      feedback += `<p class="text-danger">✘ Questão ${i + 1} errada</p>`;
    }
  });

  document.getElementById("resultado").innerHTML = `
    <div class="card p-4 radius">
      <h3 class="text-center">Resultado Final</h3>
      <p><strong>Acertos:</strong> ${acertos}</p>
      <p><strong>Erros:</strong> ${erros}</p>
      <hr>
      ${feedback}
      <button class="btn btn-primary w-100 mt-3 radius" onclick="location.reload()">Recomeçar</button>
    </div>
  `;
});
