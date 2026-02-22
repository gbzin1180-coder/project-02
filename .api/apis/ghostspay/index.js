"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'ghostspay/1.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Cria um novo pagamento com suporte a PIX, cartão de crédito ou boleto bancário. Para
     * cartões, você pode usar um token previamente gerado ou enviar os dados completos.
     *
     * @summary Criar Pagamento
     * @throws FetchError<400, types.PostTransactionsResponse400> Requisição inválida - parâmetros malformados
     * @throws FetchError<401, types.PostTransactionsResponse401> Não autorizado - credenciais inválidas
     * @throws FetchError<422, types.PostTransactionsResponse422> Erro de validação - dados não atendem aos requisitos
     * @throws FetchError<500, types.PostTransactionsResponse500> Erro interno do servidor
     */
    SDK.prototype.postTransactions = function (body) {
        return this.core.fetch('/transactions', 'post', body);
    };
    /**
     * Retorna uma lista paginada de transações com filtros opcionais por status, método de
     * pagamento e período.
     *
     * @summary Listar Transações
     * @throws FetchError<400, types.GetTransactionsResponse400> Requisição inválida - parâmetros malformados
     * @throws FetchError<401, types.GetTransactionsResponse401> Não autorizado - credenciais inválidas
     * @throws FetchError<500, types.GetTransactionsResponse500> Erro interno do servidor
     */
    SDK.prototype.getTransactions = function (metadata) {
        return this.core.fetch('/transactions', 'get', metadata);
    };
    /**
     * Obtém os detalhes completos de uma transação específica pelo ID.
     *
     * @summary Consultar Transação
     * @throws FetchError<401, types.GetTransactionsIdResponse401> Não autorizado - credenciais inválidas
     * @throws FetchError<404, types.GetTransactionsIdResponse404> Recurso não encontrado
     * @throws FetchError<500, types.GetTransactionsIdResponse500> Erro interno do servidor
     */
    SDK.prototype.getTransactionsId = function (metadata) {
        return this.core.fetch('/transactions/{id}', 'get', metadata);
    };
    SDK.prototype.deleteTransactionsId = function (body, metadata) {
        return this.core.fetch('/transactions/{id}', 'delete', body, metadata);
    };
    /**
     * Atualiza o status de entrega de uma transação. Importante para controle de chargeback e
     * liberação de fundos.
     *
     * @summary Atualizar Status de Entrega
     * @throws FetchError<400, types.PutTransactionsIdDeliveryResponse400> Requisição inválida - parâmetros malformados
     * @throws FetchError<404, types.PutTransactionsIdDeliveryResponse404> Recurso não encontrado
     * @throws FetchError<422, types.PutTransactionsIdDeliveryResponse422> Erro de validação - dados não atendem aos requisitos
     * @throws FetchError<500, types.PutTransactionsIdDeliveryResponse500> Erro interno do servidor
     */
    SDK.prototype.putTransactionsIdDelivery = function (body, metadata) {
        return this.core.fetch('/transactions/{id}/delivery', 'put', body, metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
