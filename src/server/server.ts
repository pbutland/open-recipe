import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';
import recipeRoutes from './routes/recipeRoutes';
import ingredientRoutes from './routes/ingredientRoutes';
import { errorHandler } from './middleware/errorMiddleware';

// Load OpenAPI specification
const openApiPath = path.join(__dirname, '../../open-recipe.yaml');
const openApiSpec = yaml.load(fs.readFileSync(openApiPath, 'utf8')) as Record<string, unknown>;

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Use Express's built-in JSON parser instead of body-parser

// Mount Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// API routes
app.use('/api/v1', recipeRoutes);
app.use('/api/v1', ingredientRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
}

export default app;
