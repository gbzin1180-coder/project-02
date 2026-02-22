import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
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
    postTransactions(body: types.PostTransactionsBodyParam): Promise<FetchResponse<201, types.PostTransactionsResponse201>>;
    /**
     * Retorna uma lista paginada de transações com filtros opcionais por status, método de
     * pagamento e período.
     *
     * @summary Listar Transações
     * @throws FetchError<400, types.GetTransactionsResponse400> Requisição inválida - parâmetros malformados
     * @throws FetchError<401, types.GetTransactionsResponse401> Não autorizado - credenciais inválidas
     * @throws FetchError<500, types.GetTransactionsResponse500> Erro interno do servidor
     */
    getTransactions(metadata?: types.GetTransactionsMetadataParam): Promise<FetchResponse<200, types.GetTransactionsResponse200>>;
    /**
     * Obtém os detalhes completos de uma transação específica pelo ID.
     *
     * @summary Consultar Transação
     * @throws FetchError<401, types.GetTransactionsIdResponse401> Não autorizado - credenciais inválidas
     * @throws FetchError<404, types.GetTransactionsIdResponse404> Recurso não encontrado
     * @throws FetchError<500, types.GetTransactionsIdResponse500> Erro interno do servidor
     */
    getTransactionsId(metadata: types.GetTransactionsIdMetadataParam): Promise<FetchResponse<200, types.GetTransactionsIdResponse200>>;
    /**
     * Realiza o estorno total ou parcial de uma transação paga. Apenas transações com status
     * 'paid' podem ser estornadas.
     *
     * @summary Estornar Transação
     * @throws FetchError<400, types.DeleteTransactionsIdResponse400> Requisição inválida - parâmetros malformados
     * @throws FetchError<404, types.DeleteTransactionsIdResponse404> Recurso não encontrado
     * @throws FetchError<422, types.DeleteTransactionsIdResponse422> Erro de validação - dados não atendem aos requisitos
     * @throws FetchError<500, types.DeleteTransactionsIdResponse500> Erro interno do servidor
     */
    deleteTransactionsId(body: types.DeleteTransactionsIdBodyParam, metadata: types.DeleteTransactionsIdMetadataParam): Promise<FetchResponse<200, types.DeleteTransactionsIdResponse200>>;
    deleteTransactionsId(metadata: types.DeleteTransactionsIdMetadataParam): Promise<FetchResponse<200, types.DeleteTransactionsIdResponse200>>;
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
    putTransactionsIdDelivery(body: types.PutTransactionsIdDeliveryBodyParam, metadata: types.PutTransactionsIdDeliveryMetadataParam): Promise<FetchResponse<200, types.PutTransactionsIdDeliveryResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
