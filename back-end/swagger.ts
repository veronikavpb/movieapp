import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie App API',
            version: '1.0.0',
            description: 'API documentation for the Movie App',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server',
            },
        ],
    },
    apis: ['./controller/*.ts'], // Points to all controllers for documentation
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
