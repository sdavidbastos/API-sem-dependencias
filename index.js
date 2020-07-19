const http = require("http");
const { parse } = require("url");

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

/**
 * Ao encapsular a responsabilidade das rotas
 * no objeto routes fica mais facil gerenciar
 * a chamada dos metodos (POST, GET...)
 */

function getUsers(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json",
    });

    response.write(
        JSON.stringify([
            {
                id: 1,
            },
        ])
    );

    response.end();
}
function createUser(request, response) {
    const body = [];

    request.on("data", (chunck) => {
        body.push(chunck);
    });

    request.on("end", () => {
        const parsedBody = body
            .toString()
            .split("&")
            .map((item) => item.split("="))
            .reduce(
                (memo, current) => ({ ...memo, [current[0]]: current[1] }),
                {}
            );
        response.writeHead(200, {
            "Content-Type": "application/json",
        });

        response.write(JSON.stringify({["deu muito bom"]: parsedBody}))

        response.end();
    });
}

const routes = {
    "/users": {
        GET: getUsers,
        POST: createUser,
    },
};

const server = http.createServer(function (request, response) {
    const url = parse(request.url);
    const { method } = request;
    const { pathname } = url;

    if (routes[pathname] && routes[pathname][method]) {
        routes[pathname][method](request, response);
    }
});

server.listen(3000);
