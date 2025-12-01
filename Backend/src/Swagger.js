import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Configuración de swagger-jsdoc
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentación API",
        version: "1.0.0",
        description:
            "Documentación de las rutas de la API, (Por JSONeros del conocimiento)",
    },
    servers: [
        {
            url: "http://localhost:4000/api",
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./Routes/*.Routes.js"], // aquí busca los comentarios JSDoc
};

const spec = swaggerJSDoc(options);

const serve = swaggerUi.serve;

const setup = swaggerUi.setup(spec, {
    swaggerOptions: {
        docExpansion: "none",
    }
});

export default { serve, setup };
