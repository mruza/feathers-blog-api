import jwt from 'jsonwebtoken';
import { config } from './config.js';

export function authenticate(context) {
  const authHeader = context.params.headers?.authorization;

  if (!authHeader) {
    throw new Error('Authorization header required');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    context.params.user = decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }

  return context;
}

export function checkAuthor(context) {
  if (!context.params.user) {
    throw new Error('User not authenticated');
  }

  const post = context.data;
  if (post && post.author && post.author !== context.params.user.email) {
    throw new Error('Not authorized');
  }

  context.data.author = context.params.user.email;

  return context;
}

export function checkPostAuthor(context) {
  if (!context.params.user) {
    throw new Error('User not authenticated');
  }

  if (context.data.author && context.data.author !== context.params.user.email) {
    throw new Error('You can only delete your own posts');
  }

  return context;
}


export function logAuth(context) {
  console.log(`🔐 User ${context.params.user?.email} accessed ${context.method}`);
  return context;
}