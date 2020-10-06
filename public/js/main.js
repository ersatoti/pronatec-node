function validarNomeObrigatorio() {
  var nome = $("#nome").val();

  if (nome == "" || nome == null) {
    alert("Campo Nome não foi preenchido!");
    return;
  }
}

function getAtributos() {
  return {
    nome: $("#nome").val(),
    sobrenome: $("#sobrenome").val(),
    email: $("#email").val(),
    sexo: $("#sexo").val(),
    telefone: $("#telefone").val(),
    img: $("#file").val(),
  };
}

function enviarDados() {
  $.ajax({
    url: "http://localhost:3000/pessoa/cadastro",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(getAtributos()),
    success: function (response) {
      alert("Registro salvo com sucesso!");
      $("#formCadastro").trigger("reset");
    },
  });
}

$(document).ready(function () {
  $("#adicionar").click(function () {
    validarNomeObrigatorio();
    enviarDados();
  });
});
