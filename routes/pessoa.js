var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var jsonParser = bodyParser.json();
var router = express.Router();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "host",
  user: "user",
  password: "password",
  database: "database",
});

function createTable() {
  const sql =
    "CREATE TABLE IF NOT EXISTS Pessoa (" +
    "ID int NOT NULL AUTO_INCREMENT," +
    "Nome varchar(150) NOT NULL," +
    "sobrenome varchar(150) ," +
    "sexo varchar(150) ," +
    "email varchar(150) ," +
    "telefone varchar(150) ," +
    "PRIMARY KEY (ID)" +
    ");";

  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err) {
      connection.release();
      if (err) throw err;

      console.log("criou a tabela Pessoa!");
    });
  });
}

obterSQLInsertPessoa = function (body) {
  return (
    "INSERT INTO Pessoa(nome, sobrenome, sexo, email, telefone) " +
    "VALUES ('" +
    body.nome +
    "','" +
    body.sobrenome +
    "','" +
    body.sexo +
    "', " +
    " '" +
    body.email +
    "', '" +
    body.telefone +
    "')"
  );
};

router.post("/cadastro", jsonParser, function (req, res) {
  console.log(req.body);
  createTable();
  pool.getConnection(function (err, connection) {
    connection.query(obterSQLInsertPessoa(req.body), function (err, rows) {
      connection.release();
      if (err) throw err;

      res.json({ ok: true });
    });
  });

});

module.exports = router;
