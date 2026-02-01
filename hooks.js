
export function validatePost(context) {
  const { data } = context;

  if (!data.title || data.title.trim() === '') {
    throw new Error('Title is required');
  }

  if (!data.content || data.content.trim() === '') {
    throw new Error('Content is required');
  }

  if (data.title.length < 3) {
    throw new Error('Title must be at least 3 characters');
  }

  return context;
}

export function addTimestamp(context) {
  context.data.createdAt = new Date();
  return context;
}

export function logCreated(context) {
  console.log(`✅ Post created: "${context.result.title}"`);
  return context;
}

export function logUpdated(context) {
  console.log(`✏️ Post updated: "${context.result.title}"`);
  return context;
}

export function logDeleted(context) {
  console.log(`🗑️ Post deleted: "${context.result.title}"`);
  return context;
}