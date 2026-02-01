import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import { PostService } from './services.js';
import { UserService } from './userService.js';
import { authenticate, checkAuthor } from './authHooks.js';

const app = express(feathers());

app.use(express.json());
app.configure(express.rest());

app.get('/', (req, res) => {
  res.json({ message: 'Ahoj FeathersJS!' });
});

// Services
app.use('/users', new UserService());
app.use('/posts', new PostService());

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const userService = app.service('/users');
    const result = await userService.login(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

const postService = app.service('/posts');
postService.hooks({
  before: {
    create: [authenticate, checkAuthor],
    update: [authenticate],
    remove: [authenticate],
  },
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 FeathersJS server is running at http://localhost:${PORT}`);
});