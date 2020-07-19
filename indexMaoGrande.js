const http = require("http");
const { parse } = require("url");

/**
 * Essa forma é mais clara, porém se tivermos um
 * crud para cada methodo começa a ficar
 * muito longo e complexo seu gerenciamento!
 */

/**
 * request são todos os dados de requisição.
 * Cabeçalho, corpo...
 */

/**
 * response são os dados que serão enviados
 * para o client
 */

/**
 * response.writeHead: cabeçalho da requisição
 * response.write: corpo da requisição
 * response.end: finaliza e envia os dados
 */

/**
 * url.parse: quebra a url, assim
 * separando sua query da rota
 */

const server = http.createServer(function (request, response) {
    const url = parse(request.url);

    const { method } = request;
    if (url.pathname === "/abc" && method === "GET") {
        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.write(JSON.stringify({ message: "E ai ABC" }));
        response.end();
    }

    if (url.pathname === "/abc" && method === "POST") {
        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.write(JSON.stringify({ message: "Criei um ABC" }));
        response.end();
    }

    if (url.pathname === "/") {
        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.write(JSON.stringify({ message: "Fala tu jogador!!" }));
        response.end();
    }
});

server.listen(3000);
