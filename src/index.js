const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Carrega lista de usuários do arquivo "users.json"
const data = require("./users.json");

// Rota de autenticação
server.post("/auth", (req, res, next) => {
  const { email, password } = req.body;
  // Tenta achar um usuário que tenha o e-mail enviado pelo cliente
  const userIndex = data.users.findIndex((e) => e.email === email);
  // Caso não ache um e-mail igual, então retorna erro
  if (userIndex === -1)
    return res.status(401).send({ msg: "Falha ao autenticar" });
  // Caso ache um e-mail igual, mas as senhas são diferentes, então retorna erro
  if (data.users[userIndex].password !== password)
    return res.status(401).send({ msg: "Falha ao autenticar" });
  return res.status(200).send({ type: "bearer", token: "token-super-legal" });
});

server.use(router);

server.listen(3030, () => {
  console.log("JSON server rodando na porta 3030");
});
