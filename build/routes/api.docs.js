"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDocs = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: 'Sistema ventas API',
            version: '1.0.0',
            description: 'Documentacion API',
            contact: {
                name: 'Maria Cardenas',
                email: 'mcasr2014@gmail.com'
            },
            servers: {
                url: 'http://localhost:3000',
                description: 'Developer Server'
            }
        },
    },
    basePath: '/',
    apis: ['./src/routes/*.ts']
};
const swaggerDocs = swaggerJsDocs(options);
exports.default = swaggerDocs;
