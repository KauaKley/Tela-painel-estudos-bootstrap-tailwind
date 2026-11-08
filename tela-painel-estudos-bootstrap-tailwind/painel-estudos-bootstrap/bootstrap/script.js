document
  .getElementById("formInteresse")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!this.reportValidity()) return;
    document.getElementById("mensagem").textContent =
      "Formulário enviado com sucesso! (Demonstração: dados não são armazenados.)";
    this.reset();
  });
