import { app } from './app';
import { ENV } from './config/env';

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});

// Add health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
}); 