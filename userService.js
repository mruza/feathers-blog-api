import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from './config.js';

export class UserService {
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'martin@test.com',
        name: 'Martin',
        password: bcrypt.hashSync('password123', 10),
      },
    ];
    this.SECRET = config.JWT_SECRET;
  }

  async find() {
    return this.users.map(({ password, ...user }) => user);
  }

  async create(data) {
    const { email, password, name } = data;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: this.users.length + 1,
      email,
      name,
      password: bcrypt.hashSync(password, 10),
    };

    this.users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(data) {
    const { email, password } = data;

    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.SECRET, {
      expiresIn: config.JWT_EXPIRY,
    });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}