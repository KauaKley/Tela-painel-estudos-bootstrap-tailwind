const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("hidden") === false;
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");
let slideAtual = 0;
function mostrarSlide(indice) {
  slideAtual = (indice + slides.length) % slides.length;
  slides.forEach((slide, i) =>
    slide.classList.toggle("hidden", i !== slideAtual),
  );
  indicadores.forEach((indicador, i) => {
    indicador.classList.toggle("bg-white", i === slideAtual);
    indicador.classList.toggle("bg-white/40", i !== slideAtual);
    if (i === slideAtual) indicador.setAttribute("aria-current", "true");
    else indicador.removeAttribute("aria-current");
  });
}
document
  .getElementById("anterior")
  .addEventListener("click", () => mostrarSlide(slideAtual - 1));
document
  .getElementById("proximo")
  .addEventListener("click", () => mostrarSlide(slideAtual + 1));
indicadores.forEach((indicador, i) =>
  indicador.addEventListener("click", () => mostrarSlide(i)),
);

const fundoModal = document.getElementById("fundoModal");
const abrirModal = document.getElementById("abrirModal");
const modal = document.getElementById("modal");
function fecharModal() {
  fundoModal.classList.add("hidden");
  fundoModal.classList.remove("flex");
  abrirModal.focus();
}
abrirModal.addEventListener("click", () => {
  fundoModal.classList.remove("hidden");
  fundoModal.classList.add("flex");
  modal.focus();
});
document
  .querySelectorAll("[data-fechar-modal]")
  .forEach((botao) => botao.addEventListener("click", fecharModal));
fundoModal.addEventListener("click", (evento) => {
  if (evento.target === fundoModal) fecharModal();
});
document.addEventListener("keydown", (evento) => {
  if (fundoModal.classList.contains("hidden")) return;
  if (evento.key === "Escape") fecharModal();
  if (evento.key === "Tab") {
    const botoes = [...modal.querySelectorAll("button")];
    if (evento.shiftKey && document.activeElement === botoes[0]) {
      evento.preventDefault();
      botoes.at(-1).focus();
    } else if (!evento.shiftKey && document.activeElement === botoes.at(-1)) {
      evento.preventDefault();
      botoes[0].focus();
    } else if (document.activeElement === modal) {
      evento.preventDefault();
      botoes[0].focus();
    }
  }
});

const formulario = document.getElementById("formInteresse");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!formulario.reportValidity()) return;
  document.getElementById("mensagem").textContent =
    "Formulário enviado com sucesso! (Demonstração: dados não são armazenados.)";
  formulario.reset();
});
