declare const DeleteTransactionsId: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly amount: {
                readonly type: "integer";
                readonly minimum: 1;
                readonly description: "Valor a ser estornado em centavos. Se omitido, estorna o valor total.";
                readonly examples: readonly [2500];
            };
            readonly reason: {
                readonly type: "string";
                readonly maxLength: 500;
                readonly description: "Motivo do estorno";
                readonly examples: readonly ["Produto não entregue"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ID único da transação";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "ID do estorno";
                };
                readonly transactionId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "ID da transação original";
                };
                readonly amount: {
                    readonly type: "integer";
                    readonly description: "Valor estornado em centavos";
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["processing", "completed", "failed"];
                    readonly description: "Status do estorno\n\n`processing` `completed` `failed`";
                };
                readonly createdAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTransactions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly default: 1;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Número da página (inicia em 1)";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 10;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Quantidade de registros por página (máximo 100)";
                };
                readonly status: {
                    readonly type: "string";
                    readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filtrar por status da transação";
                };
                readonly paymentMethod: {
                    readonly type: "string";
                    readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Filtrar por método de pagamento";
                };
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Data inicial (formato: YYYY-MM-DD)";
                };
                readonly endDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Data final (formato: YYYY-MM-DD)";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly required: readonly ["amount", "createdAt", "id", "paymentMethod", "pix", "status"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                    readonly description: "ID único da transação";
                                    readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                                };
                                readonly amount: {
                                    readonly type: "integer";
                                    readonly description: "Valor da transação em centavos";
                                    readonly examples: readonly [5000];
                                };
                                readonly refundedAmount: {
                                    readonly type: "integer";
                                    readonly description: "Valor estornado em centavos";
                                    readonly examples: readonly [0];
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                                    readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                                };
                                readonly paymentMethod: {
                                    readonly type: "string";
                                    readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                                    readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                                };
                                readonly installments: {
                                    readonly type: "integer";
                                    readonly description: "Número de parcelas";
                                    readonly examples: readonly [1];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data de criação da transação";
                                    readonly examples: readonly ["2024-08-09T14:30:00Z"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data da última atualização";
                                    readonly examples: readonly ["2024-08-09T14:35:00Z"];
                                };
                                readonly customer: {
                                    readonly type: "object";
                                    readonly required: readonly ["name", "email", "phone", "document"];
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly minLength: 2;
                                            readonly maxLength: 100;
                                            readonly description: "Nome completo do cliente";
                                            readonly examples: readonly ["João da Silva Santos"];
                                        };
                                        readonly email: {
                                            readonly type: "string";
                                            readonly format: "email";
                                            readonly description: "E-mail válido do cliente";
                                            readonly examples: readonly ["joao.silva@example.com"];
                                        };
                                        readonly phone: {
                                            readonly type: "string";
                                            readonly pattern: "^[0-9]{10,11}$";
                                            readonly description: "Telefone com DDD (apenas números)";
                                            readonly examples: readonly ["11987654321"];
                                        };
                                        readonly document: {
                                            readonly type: "object";
                                            readonly required: readonly ["number"];
                                            readonly properties: {
                                                readonly number: {
                                                    readonly type: "string";
                                                    readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                                    readonly examples: readonly ["12345678901"];
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly enum: readonly ["CPF", "CNPJ"];
                                                    readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                                    readonly examples: readonly ["CPF"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly items: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["title", "unitPrice", "quantity"];
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                                readonly maxLength: 100;
                                                readonly description: "Nome/descrição do item";
                                                readonly examples: readonly ["Produto Digital Premium"];
                                            };
                                            readonly unitPrice: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Preço unitário em centavos";
                                                readonly examples: readonly [2500];
                                            };
                                            readonly quantity: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Quantidade do item";
                                                readonly examples: readonly [2];
                                            };
                                            readonly externalRef: {
                                                readonly type: "string";
                                                readonly maxLength: 50;
                                                readonly description: "Referência externa/SKU do item";
                                                readonly examples: readonly ["SKU001"];
                                            };
                                        };
                                    };
                                };
                                readonly pix: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly qrcode: {
                                            readonly type: "string";
                                            readonly format: "uri";
                                            readonly description: "URL do QR Code PIX";
                                            readonly examples: readonly ["https://api.codiguz.com/pix/qr/abc123"];
                                        };
                                        readonly qrcodeText: {
                                            readonly type: "string";
                                            readonly description: "Código PIX para cópia e cola";
                                            readonly examples: readonly ["00020126580014br.gov.bcb.pix..."];
                                        };
                                        readonly expirationDate: {
                                            readonly type: "string";
                                            readonly format: "date-time";
                                            readonly description: "Data de expiração do PIX";
                                            readonly examples: readonly ["2024-08-10T14:30:00Z"];
                                        };
                                        readonly endToEndId: {
                                            readonly type: "string";
                                            readonly description: "ID fim-a-fim do PIX (após pagamento)";
                                            readonly examples: readonly ["E12345678202408091430123456789"];
                                        };
                                    };
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly required: readonly ["amount", "card", "createdAt", "id", "paymentMethod", "status"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                    readonly description: "ID único da transação";
                                    readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                                };
                                readonly amount: {
                                    readonly type: "integer";
                                    readonly description: "Valor da transação em centavos";
                                    readonly examples: readonly [5000];
                                };
                                readonly refundedAmount: {
                                    readonly type: "integer";
                                    readonly description: "Valor estornado em centavos";
                                    readonly examples: readonly [0];
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                                    readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                                };
                                readonly paymentMethod: {
                                    readonly type: "string";
                                    readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                                    readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                                };
                                readonly installments: {
                                    readonly type: "integer";
                                    readonly description: "Número de parcelas";
                                    readonly examples: readonly [1];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data de criação da transação";
                                    readonly examples: readonly ["2024-08-09T14:30:00Z"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data da última atualização";
                                    readonly examples: readonly ["2024-08-09T14:35:00Z"];
                                };
                                readonly customer: {
                                    readonly type: "object";
                                    readonly required: readonly ["name", "email", "phone", "document"];
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly minLength: 2;
                                            readonly maxLength: 100;
                                            readonly description: "Nome completo do cliente";
                                            readonly examples: readonly ["João da Silva Santos"];
                                        };
                                        readonly email: {
                                            readonly type: "string";
                                            readonly format: "email";
                                            readonly description: "E-mail válido do cliente";
                                            readonly examples: readonly ["joao.silva@example.com"];
                                        };
                                        readonly phone: {
                                            readonly type: "string";
                                            readonly pattern: "^[0-9]{10,11}$";
                                            readonly description: "Telefone com DDD (apenas números)";
                                            readonly examples: readonly ["11987654321"];
                                        };
                                        readonly document: {
                                            readonly type: "object";
                                            readonly required: readonly ["number"];
                                            readonly properties: {
                                                readonly number: {
                                                    readonly type: "string";
                                                    readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                                    readonly examples: readonly ["12345678901"];
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly enum: readonly ["CPF", "CNPJ"];
                                                    readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                                    readonly examples: readonly ["CPF"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly items: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["title", "unitPrice", "quantity"];
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                                readonly maxLength: 100;
                                                readonly description: "Nome/descrição do item";
                                                readonly examples: readonly ["Produto Digital Premium"];
                                            };
                                            readonly unitPrice: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Preço unitário em centavos";
                                                readonly examples: readonly [2500];
                                            };
                                            readonly quantity: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Quantidade do item";
                                                readonly examples: readonly [2];
                                            };
                                            readonly externalRef: {
                                                readonly type: "string";
                                                readonly maxLength: 50;
                                                readonly description: "Referência externa/SKU do item";
                                                readonly examples: readonly ["SKU001"];
                                            };
                                        };
                                    };
                                };
                                readonly card: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                            readonly description: "ID do token do cartão";
                                            readonly examples: readonly ["card_abc123"];
                                        };
                                        readonly brand: {
                                            readonly type: "string";
                                            readonly description: "Bandeira do cartão";
                                            readonly examples: readonly ["Visa"];
                                        };
                                        readonly holderName: {
                                            readonly type: "string";
                                            readonly description: "Nome do titular";
                                            readonly examples: readonly ["JOAO DA SILVA"];
                                        };
                                        readonly lastDigits: {
                                            readonly type: "string";
                                            readonly description: "Últimos 4 dígitos";
                                            readonly examples: readonly ["1111"];
                                        };
                                        readonly expirationMonth: {
                                            readonly type: "integer";
                                            readonly examples: readonly [12];
                                        };
                                        readonly expirationYear: {
                                            readonly type: "integer";
                                            readonly examples: readonly [2025];
                                        };
                                    };
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly required: readonly ["amount", "boleto", "createdAt", "id", "paymentMethod", "status"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                    readonly format: "uuid";
                                    readonly description: "ID único da transação";
                                    readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                                };
                                readonly amount: {
                                    readonly type: "integer";
                                    readonly description: "Valor da transação em centavos";
                                    readonly examples: readonly [5000];
                                };
                                readonly refundedAmount: {
                                    readonly type: "integer";
                                    readonly description: "Valor estornado em centavos";
                                    readonly examples: readonly [0];
                                };
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                                    readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                                };
                                readonly paymentMethod: {
                                    readonly type: "string";
                                    readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                                    readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                                };
                                readonly installments: {
                                    readonly type: "integer";
                                    readonly description: "Número de parcelas";
                                    readonly examples: readonly [1];
                                };
                                readonly createdAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data de criação da transação";
                                    readonly examples: readonly ["2024-08-09T14:30:00Z"];
                                };
                                readonly updatedAt: {
                                    readonly type: "string";
                                    readonly format: "date-time";
                                    readonly description: "Data da última atualização";
                                    readonly examples: readonly ["2024-08-09T14:35:00Z"];
                                };
                                readonly customer: {
                                    readonly type: "object";
                                    readonly required: readonly ["name", "email", "phone", "document"];
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly minLength: 2;
                                            readonly maxLength: 100;
                                            readonly description: "Nome completo do cliente";
                                            readonly examples: readonly ["João da Silva Santos"];
                                        };
                                        readonly email: {
                                            readonly type: "string";
                                            readonly format: "email";
                                            readonly description: "E-mail válido do cliente";
                                            readonly examples: readonly ["joao.silva@example.com"];
                                        };
                                        readonly phone: {
                                            readonly type: "string";
                                            readonly pattern: "^[0-9]{10,11}$";
                                            readonly description: "Telefone com DDD (apenas números)";
                                            readonly examples: readonly ["11987654321"];
                                        };
                                        readonly document: {
                                            readonly type: "object";
                                            readonly required: readonly ["number"];
                                            readonly properties: {
                                                readonly number: {
                                                    readonly type: "string";
                                                    readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                                    readonly examples: readonly ["12345678901"];
                                                };
                                                readonly type: {
                                                    readonly type: "string";
                                                    readonly enum: readonly ["CPF", "CNPJ"];
                                                    readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                                    readonly examples: readonly ["CPF"];
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly items: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly required: readonly ["title", "unitPrice", "quantity"];
                                        readonly properties: {
                                            readonly title: {
                                                readonly type: "string";
                                                readonly minLength: 1;
                                                readonly maxLength: 100;
                                                readonly description: "Nome/descrição do item";
                                                readonly examples: readonly ["Produto Digital Premium"];
                                            };
                                            readonly unitPrice: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Preço unitário em centavos";
                                                readonly examples: readonly [2500];
                                            };
                                            readonly quantity: {
                                                readonly type: "integer";
                                                readonly minimum: 1;
                                                readonly description: "Quantidade do item";
                                                readonly examples: readonly [2];
                                            };
                                            readonly externalRef: {
                                                readonly type: "string";
                                                readonly maxLength: 50;
                                                readonly description: "Referência externa/SKU do item";
                                                readonly examples: readonly ["SKU001"];
                                            };
                                        };
                                    };
                                };
                                readonly boleto: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly bankSlipUrl: {
                                            readonly type: "string";
                                            readonly format: "uri";
                                            readonly description: "URL do boleto em PDF";
                                            readonly examples: readonly ["https://api.codiguz.com/boleto/pdf/abc123"];
                                        };
                                        readonly digitableLine: {
                                            readonly type: "string";
                                            readonly description: "Linha digitável do boleto";
                                            readonly examples: readonly ["23790.00000 00000.000008 00000.000000 1 89470000005000"];
                                        };
                                        readonly barcode: {
                                            readonly type: "string";
                                            readonly description: "Código de barras do boleto";
                                            readonly examples: readonly ["23791894700000050000000000000000000000000008"];
                                        };
                                        readonly expirationDate: {
                                            readonly type: "string";
                                            readonly format: "date";
                                            readonly description: "Data de vencimento";
                                            readonly examples: readonly ["2024-08-12"];
                                        };
                                    };
                                };
                            };
                        }];
                    };
                };
                readonly pagination: {
                    readonly type: "object";
                    readonly properties: {
                        readonly currentPage: {
                            readonly type: "integer";
                            readonly examples: readonly [1];
                        };
                        readonly totalPages: {
                            readonly type: "integer";
                            readonly examples: readonly [5];
                        };
                        readonly totalItems: {
                            readonly type: "integer";
                            readonly examples: readonly [47];
                        };
                        readonly itemsPerPage: {
                            readonly type: "integer";
                            readonly examples: readonly [10];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetTransactionsId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ID único da transação";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly required: readonly ["amount", "createdAt", "id", "paymentMethod", "pix", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly pix: {
                        readonly type: "object";
                        readonly properties: {
                            readonly qrcode: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "URL do QR Code PIX";
                                readonly examples: readonly ["https://api.codiguz.com/pix/qr/abc123"];
                            };
                            readonly qrcodeText: {
                                readonly type: "string";
                                readonly description: "Código PIX para cópia e cola";
                                readonly examples: readonly ["00020126580014br.gov.bcb.pix..."];
                            };
                            readonly expirationDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Data de expiração do PIX";
                                readonly examples: readonly ["2024-08-10T14:30:00Z"];
                            };
                            readonly endToEndId: {
                                readonly type: "string";
                                readonly description: "ID fim-a-fim do PIX (após pagamento)";
                                readonly examples: readonly ["E12345678202408091430123456789"];
                            };
                        };
                    };
                };
            }, {
                readonly type: "object";
                readonly required: readonly ["amount", "card", "createdAt", "id", "paymentMethod", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly card: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "ID do token do cartão";
                                readonly examples: readonly ["card_abc123"];
                            };
                            readonly brand: {
                                readonly type: "string";
                                readonly description: "Bandeira do cartão";
                                readonly examples: readonly ["Visa"];
                            };
                            readonly holderName: {
                                readonly type: "string";
                                readonly description: "Nome do titular";
                                readonly examples: readonly ["JOAO DA SILVA"];
                            };
                            readonly lastDigits: {
                                readonly type: "string";
                                readonly description: "Últimos 4 dígitos";
                                readonly examples: readonly ["1111"];
                            };
                            readonly expirationMonth: {
                                readonly type: "integer";
                                readonly examples: readonly [12];
                            };
                            readonly expirationYear: {
                                readonly type: "integer";
                                readonly examples: readonly [2025];
                            };
                        };
                    };
                };
            }, {
                readonly type: "object";
                readonly required: readonly ["amount", "boleto", "createdAt", "id", "paymentMethod", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly boleto: {
                        readonly type: "object";
                        readonly properties: {
                            readonly bankSlipUrl: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "URL do boleto em PDF";
                                readonly examples: readonly ["https://api.codiguz.com/boleto/pdf/abc123"];
                            };
                            readonly digitableLine: {
                                readonly type: "string";
                                readonly description: "Linha digitável do boleto";
                                readonly examples: readonly ["23790.00000 00000.000008 00000.000000 1 89470000005000"];
                            };
                            readonly barcode: {
                                readonly type: "string";
                                readonly description: "Código de barras do boleto";
                                readonly examples: readonly ["23791894700000050000000000000000000000000008"];
                            };
                            readonly expirationDate: {
                                readonly type: "string";
                                readonly format: "date";
                                readonly description: "Data de vencimento";
                                readonly examples: readonly ["2024-08-12"];
                            };
                        };
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const PostTransactions: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["customer", "paymentMethod", "items", "amount"];
        readonly properties: {
            readonly customer: {
                readonly type: "object";
                readonly required: readonly ["name", "email", "phone", "document"];
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                        readonly minLength: 2;
                        readonly maxLength: 100;
                        readonly description: "Nome completo do cliente";
                        readonly examples: readonly ["João da Silva Santos"];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly format: "email";
                        readonly description: "E-mail válido do cliente";
                        readonly examples: readonly ["joao.silva@example.com"];
                    };
                    readonly phone: {
                        readonly type: "string";
                        readonly pattern: "^[0-9]{10,11}$";
                        readonly description: "Telefone com DDD (apenas números)";
                        readonly examples: readonly ["11987654321"];
                    };
                    readonly document: {
                        readonly type: "object";
                        readonly required: readonly ["number"];
                        readonly properties: {
                            readonly number: {
                                readonly type: "string";
                                readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                readonly examples: readonly ["12345678901"];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["CPF", "CNPJ"];
                                readonly description: "Tipo do documento";
                                readonly examples: readonly ["CPF"];
                            };
                        };
                    };
                };
            };
            readonly shipping: {
                readonly type: "object";
                readonly properties: {
                    readonly address: {
                        readonly type: "object";
                        readonly required: readonly ["street", "streetNumber", "zipCode", "neighborhood", "city", "state", "country"];
                        readonly properties: {
                            readonly street: {
                                readonly type: "string";
                                readonly description: "Nome da rua/avenida";
                                readonly examples: readonly ["Rua das Flores"];
                            };
                            readonly streetNumber: {
                                readonly type: "string";
                                readonly description: "Número do endereço";
                                readonly examples: readonly ["123"];
                            };
                            readonly complement: {
                                readonly type: "string";
                                readonly description: "Complemento (opcional)";
                                readonly examples: readonly ["Apartamento 101"];
                            };
                            readonly zipCode: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{5}-?[0-9]{3}$";
                                readonly description: "CEP no formato 12345-678 ou 12345678";
                                readonly examples: readonly ["01234-567"];
                            };
                            readonly neighborhood: {
                                readonly type: "string";
                                readonly description: "Bairro";
                                readonly examples: readonly ["Centro"];
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly description: "Cidade";
                                readonly examples: readonly ["São Paulo"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly pattern: "^[A-Z]{2}$";
                                readonly description: "Estado (UF)";
                                readonly examples: readonly ["SP"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly pattern: "^[A-Z]{2}$";
                                readonly description: "País (código ISO)";
                                readonly examples: readonly ["BR"];
                            };
                        };
                    };
                };
            };
            readonly paymentMethod: {
                readonly type: "string";
                readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                readonly description: "Método de pagamento escolhido";
                readonly examples: readonly ["PIX"];
            };
            readonly card: {
                readonly type: "object";
                readonly description: "Dados do cartão. Use 'id' para cartão tokenizado OU os outros campos para novo cartão.";
                readonly oneOf: readonly [{
                    readonly required: readonly ["id"];
                    readonly description: "Cartão tokenizado";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "Token do cartão previamente tokenizado. Se informado, outros campos são opcionais.";
                            readonly examples: readonly ["card_token_abc123"];
                        };
                        readonly number: {
                            readonly type: "string";
                            readonly pattern: "^[0-9]{13,19}$";
                            readonly description: "Número do cartão (apenas números). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["4111111111111111"];
                        };
                        readonly holderName: {
                            readonly type: "string";
                            readonly minLength: 2;
                            readonly maxLength: 50;
                            readonly description: "Nome do titular conforme cartão. Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["JOAO DA SILVA"];
                        };
                        readonly expirationMonth: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly maximum: 12;
                            readonly description: "Mês de expiração (1-12). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly [12];
                        };
                        readonly expirationYear: {
                            readonly type: "integer";
                            readonly minimum: 2024;
                            readonly maximum: 2050;
                            readonly description: "Ano de expiração (4 dígitos). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly [2025];
                        };
                        readonly cvv: {
                            readonly type: "string";
                            readonly pattern: "^[0-9]{3,4}$";
                            readonly description: "Código de segurança (3 ou 4 dígitos). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["123"];
                        };
                    };
                    readonly type: "object";
                }, {
                    readonly required: readonly ["number", "holderName", "expirationMonth", "expirationYear", "cvv"];
                    readonly description: "Novo cartão";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                            readonly description: "Token do cartão previamente tokenizado. Se informado, outros campos são opcionais.";
                            readonly examples: readonly ["card_token_abc123"];
                        };
                        readonly number: {
                            readonly type: "string";
                            readonly pattern: "^[0-9]{13,19}$";
                            readonly description: "Número do cartão (apenas números). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["4111111111111111"];
                        };
                        readonly holderName: {
                            readonly type: "string";
                            readonly minLength: 2;
                            readonly maxLength: 50;
                            readonly description: "Nome do titular conforme cartão. Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["JOAO DA SILVA"];
                        };
                        readonly expirationMonth: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly maximum: 12;
                            readonly description: "Mês de expiração (1-12). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly [12];
                        };
                        readonly expirationYear: {
                            readonly type: "integer";
                            readonly minimum: 2024;
                            readonly maximum: 2050;
                            readonly description: "Ano de expiração (4 dígitos). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly [2025];
                        };
                        readonly cvv: {
                            readonly type: "string";
                            readonly pattern: "^[0-9]{3,4}$";
                            readonly description: "Código de segurança (3 ou 4 dígitos). Obrigatório se 'id' não for informado.";
                            readonly examples: readonly ["123"];
                        };
                    };
                    readonly type: "object";
                }];
            };
            readonly boleto: {
                readonly type: "object";
                readonly required: readonly ["expiresInDays"];
                readonly properties: {
                    readonly expiresInDays: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly maximum: 30;
                        readonly description: "Dias para vencimento do boleto";
                        readonly examples: readonly [3];
                    };
                };
            };
            readonly pix: {
                readonly type: "object";
                readonly required: readonly ["expiresInDays"];
                readonly properties: {
                    readonly expiresInDays: {
                        readonly type: "integer";
                        readonly minimum: 1;
                        readonly maximum: 7;
                        readonly description: "Dias para expiração do PIX";
                        readonly examples: readonly [1];
                    };
                };
            };
            readonly installments: {
                readonly type: "integer";
                readonly minimum: 1;
                readonly maximum: 12;
                readonly default: 1;
                readonly description: "Número de parcelas (apenas para cartão)";
                readonly examples: readonly [3];
            };
            readonly items: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["title", "unitPrice", "quantity"];
                    readonly properties: {
                        readonly title: {
                            readonly type: "string";
                            readonly minLength: 1;
                            readonly maxLength: 100;
                            readonly description: "Nome/descrição do item";
                            readonly examples: readonly ["Produto Digital Premium"];
                        };
                        readonly unitPrice: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Preço unitário em centavos";
                            readonly examples: readonly [2500];
                        };
                        readonly quantity: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Quantidade do item";
                            readonly examples: readonly [2];
                        };
                        readonly externalRef: {
                            readonly type: "string";
                            readonly maxLength: 50;
                            readonly description: "Referência externa/SKU do item";
                            readonly examples: readonly ["SKU001"];
                        };
                    };
                };
            };
            readonly split: {
                readonly type: "array";
                readonly description: "Regras de divisão da transação entre múltiplos recebedores";
                readonly items: {
                    readonly type: "object";
                    readonly required: readonly ["recipientId", "amount"];
                    readonly properties: {
                        readonly recipientId: {
                            readonly type: "string";
                            readonly description: "ID do recebedor cadastrado";
                            readonly examples: readonly ["rec_abc123"];
                        };
                        readonly amount: {
                            readonly type: "integer";
                            readonly minimum: 1;
                            readonly description: "Valor em centavos para este recebedor";
                            readonly examples: readonly [1000];
                        };
                    };
                };
            };
            readonly amount: {
                readonly type: "integer";
                readonly minimum: 100;
                readonly description: "Valor total em centavos (mínimo R$ 1,00)";
                readonly examples: readonly [5000];
            };
            readonly postbackUrl: {
                readonly type: "string";
                readonly format: "uri";
                readonly description: "URL para receber notificações de mudança de status";
                readonly examples: readonly ["https://webhook.site/your-endpoint"];
            };
            readonly metadata: {
                readonly type: "object";
                readonly description: "Dados adicionais em formato JSON";
                readonly additionalProperties: true;
            };
            readonly ip: {
                readonly type: "string";
                readonly format: "ipv4";
                readonly description: "Endereço IP do cliente (para análise antifraude)";
                readonly examples: readonly ["192.168.1.1"];
            };
            readonly description: {
                readonly type: "string";
                readonly maxLength: 500;
                readonly description: "Descrição da transação";
                readonly examples: readonly ["Compra de produto digital"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly response: {
        readonly "201": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly required: readonly ["amount", "createdAt", "id", "paymentMethod", "pix", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly pix: {
                        readonly type: "object";
                        readonly properties: {
                            readonly qrcode: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "URL do QR Code PIX";
                                readonly examples: readonly ["https://api.codiguz.com/pix/qr/abc123"];
                            };
                            readonly qrcodeText: {
                                readonly type: "string";
                                readonly description: "Código PIX para cópia e cola";
                                readonly examples: readonly ["00020126580014br.gov.bcb.pix..."];
                            };
                            readonly expirationDate: {
                                readonly type: "string";
                                readonly format: "date-time";
                                readonly description: "Data de expiração do PIX";
                                readonly examples: readonly ["2024-08-10T14:30:00Z"];
                            };
                            readonly endToEndId: {
                                readonly type: "string";
                                readonly description: "ID fim-a-fim do PIX (após pagamento)";
                                readonly examples: readonly ["E12345678202408091430123456789"];
                            };
                        };
                    };
                };
            }, {
                readonly type: "object";
                readonly required: readonly ["amount", "card", "createdAt", "id", "paymentMethod", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly card: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "ID do token do cartão";
                                readonly examples: readonly ["card_abc123"];
                            };
                            readonly brand: {
                                readonly type: "string";
                                readonly description: "Bandeira do cartão";
                                readonly examples: readonly ["Visa"];
                            };
                            readonly holderName: {
                                readonly type: "string";
                                readonly description: "Nome do titular";
                                readonly examples: readonly ["JOAO DA SILVA"];
                            };
                            readonly lastDigits: {
                                readonly type: "string";
                                readonly description: "Últimos 4 dígitos";
                                readonly examples: readonly ["1111"];
                            };
                            readonly expirationMonth: {
                                readonly type: "integer";
                                readonly examples: readonly [12];
                            };
                            readonly expirationYear: {
                                readonly type: "integer";
                                readonly examples: readonly [2025];
                            };
                        };
                    };
                };
            }, {
                readonly type: "object";
                readonly required: readonly ["amount", "boleto", "createdAt", "id", "paymentMethod", "status"];
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "ID único da transação";
                        readonly examples: readonly ["c856345e-23d6-471d-bb7e-75dfe340c26d"];
                    };
                    readonly amount: {
                        readonly type: "integer";
                        readonly description: "Valor da transação em centavos";
                        readonly examples: readonly [5000];
                    };
                    readonly refundedAmount: {
                        readonly type: "integer";
                        readonly description: "Valor estornado em centavos";
                        readonly examples: readonly [0];
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly enum: readonly ["pending", "paid", "failed", "refunded", "expired"];
                        readonly description: "Status atual da transação\n\n`pending` `paid` `failed` `refunded` `expired`";
                    };
                    readonly paymentMethod: {
                        readonly type: "string";
                        readonly enum: readonly ["PIX", "CARD", "BOLETO"];
                        readonly description: "Método de pagamento utilizado\n\n`PIX` `CARD` `BOLETO`";
                    };
                    readonly installments: {
                        readonly type: "integer";
                        readonly description: "Número de parcelas";
                        readonly examples: readonly [1];
                    };
                    readonly createdAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data de criação da transação";
                        readonly examples: readonly ["2024-08-09T14:30:00Z"];
                    };
                    readonly updatedAt: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Data da última atualização";
                        readonly examples: readonly ["2024-08-09T14:35:00Z"];
                    };
                    readonly customer: {
                        readonly type: "object";
                        readonly required: readonly ["name", "email", "phone", "document"];
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly minLength: 2;
                                readonly maxLength: 100;
                                readonly description: "Nome completo do cliente";
                                readonly examples: readonly ["João da Silva Santos"];
                            };
                            readonly email: {
                                readonly type: "string";
                                readonly format: "email";
                                readonly description: "E-mail válido do cliente";
                                readonly examples: readonly ["joao.silva@example.com"];
                            };
                            readonly phone: {
                                readonly type: "string";
                                readonly pattern: "^[0-9]{10,11}$";
                                readonly description: "Telefone com DDD (apenas números)";
                                readonly examples: readonly ["11987654321"];
                            };
                            readonly document: {
                                readonly type: "object";
                                readonly required: readonly ["number"];
                                readonly properties: {
                                    readonly number: {
                                        readonly type: "string";
                                        readonly description: "Número do documento (CPF ou CNPJ, apenas números)";
                                        readonly examples: readonly ["12345678901"];
                                    };
                                    readonly type: {
                                        readonly type: "string";
                                        readonly enum: readonly ["CPF", "CNPJ"];
                                        readonly description: "Tipo do documento\n\n`CPF` `CNPJ`";
                                        readonly examples: readonly ["CPF"];
                                    };
                                };
                            };
                        };
                    };
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly required: readonly ["title", "unitPrice", "quantity"];
                            readonly properties: {
                                readonly title: {
                                    readonly type: "string";
                                    readonly minLength: 1;
                                    readonly maxLength: 100;
                                    readonly description: "Nome/descrição do item";
                                    readonly examples: readonly ["Produto Digital Premium"];
                                };
                                readonly unitPrice: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Preço unitário em centavos";
                                    readonly examples: readonly [2500];
                                };
                                readonly quantity: {
                                    readonly type: "integer";
                                    readonly minimum: 1;
                                    readonly description: "Quantidade do item";
                                    readonly examples: readonly [2];
                                };
                                readonly externalRef: {
                                    readonly type: "string";
                                    readonly maxLength: 50;
                                    readonly description: "Referência externa/SKU do item";
                                    readonly examples: readonly ["SKU001"];
                                };
                            };
                        };
                    };
                    readonly boleto: {
                        readonly type: "object";
                        readonly properties: {
                            readonly bankSlipUrl: {
                                readonly type: "string";
                                readonly format: "uri";
                                readonly description: "URL do boleto em PDF";
                                readonly examples: readonly ["https://api.codiguz.com/boleto/pdf/abc123"];
                            };
                            readonly digitableLine: {
                                readonly type: "string";
                                readonly description: "Linha digitável do boleto";
                                readonly examples: readonly ["23790.00000 00000.000008 00000.000000 1 89470000005000"];
                            };
                            readonly barcode: {
                                readonly type: "string";
                                readonly description: "Código de barras do boleto";
                                readonly examples: readonly ["23791894700000050000000000000000000000000008"];
                            };
                            readonly expirationDate: {
                                readonly type: "string";
                                readonly format: "date";
                                readonly description: "Data de vencimento";
                                readonly examples: readonly ["2024-08-12"];
                            };
                        };
                    };
                };
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "401": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const PutTransactionsIdDelivery: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["deliveryStatus"];
        readonly properties: {
            readonly deliveryStatus: {
                readonly type: "string";
                readonly enum: readonly ["shipped", "delivered", "returned", "lost"];
                readonly description: "Novo status de entrega";
            };
            readonly trackingCode: {
                readonly type: "string";
                readonly maxLength: 50;
                readonly description: "Código de rastreamento";
                readonly examples: readonly ["BR123456789"];
            };
            readonly deliveryDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Data de entrega (obrigatório para status 'delivered')";
                readonly examples: readonly ["2024-08-15"];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ID único da transação";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly transactionId: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
                readonly deliveryStatus: {
                    readonly type: "string";
                };
                readonly trackingCode: {
                    readonly type: "string";
                };
                readonly deliveryDate: {
                    readonly type: "string";
                    readonly format: "date";
                };
                readonly updatedAt: {
                    readonly type: "string";
                    readonly format: "date-time";
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "500": {
            readonly type: "object";
            readonly required: readonly ["error"];
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly required: readonly ["code", "message"];
                    readonly properties: {
                        readonly code: {
                            readonly type: "string";
                            readonly description: "Código identificador do erro";
                            readonly examples: readonly ["INVALID_CARD"];
                        };
                        readonly message: {
                            readonly type: "string";
                            readonly description: "Mensagem descritiva do erro";
                            readonly examples: readonly ["Os dados do cartão são inválidos"];
                        };
                        readonly details: {
                            readonly type: "array";
                            readonly description: "Detalhes específicos do erro";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["O CVV deve ter 3 ou 4 dígitos"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { DeleteTransactionsId, GetTransactions, GetTransactionsId, PostTransactions, PutTransactionsIdDelivery };
