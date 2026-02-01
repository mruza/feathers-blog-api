
export class PostService {
  constructor() {
    this.posts = [
      { id: 1, title: 'First Post', content: 'Hello World', author: 'Martin' },
      { id: 2, title: 'Learning FeathersJS', content: 'Great framework!', author: 'Martin' },
    ];
  }

  async find() {
    return this.posts;
  }

  async get(id) {
    const post = this.posts.find(p => p.id === parseInt(id));
    if (!post) throw new Error('Post not found');
    return post;
  }

  async create(data) {
    const newPost = {
      id: this.posts.length > 0 ? Math.max(...this.posts.map(p => p.id)) + 1 : 1,
      ...data,
    };
    this.posts.push(newPost);
    return newPost;
  }

  async update(id, data, params) {
    const post = this.posts.find(p => p.id === parseInt(id));
    if (!post) throw new Error('Post not found');
    
    if (params && params.user && params.user.email !== post.author) {
      throw new Error('You can only update your own posts');
    }
    
    Object.assign(post, data);
    return post;
  }

  async remove(id, params) {
    const index = this.posts.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Post not found');
    
    const post = this.posts[index];
    
    if (params && params.user && params.user.email !== post.author) {
      throw new Error('You can only delete your own posts');
    }
    
    return this.posts.splice(index, 1)[0];
  }
}