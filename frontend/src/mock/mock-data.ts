export interface MockUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
  userId: string | null;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockItem {
  id: string;
  title: string;
  contentType: 'text' | 'file';
  content: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  url: string | null;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  language: string | null;
  userId: string;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const currentUser: MockUser = {
  id: 'user-1',
  email: 'dev@stash.io',
  displayName: 'Staff Dev',
  avatarUrl: null,
  isPro: false,
};

export const itemTypes: MockItemType[] = [
  {
    id: 'type-snippet',
    name: 'Snippet',
    slug: 'snippet',
    icon: 'Code',
    color: '#3b82f6',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-prompt',
    name: 'Prompt',
    slug: 'prompt',
    icon: 'Sparkles',
    color: '#8b5cf6',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-command',
    name: 'Command',
    slug: 'command',
    icon: 'Terminal',
    color: '#f97316',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-note',
    name: 'Note',
    slug: 'note',
    icon: 'StickyNote',
    color: '#fde047',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-link',
    name: 'Link',
    slug: 'link',
    icon: 'Link',
    color: '#10b981',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-file',
    name: 'File',
    slug: 'file',
    icon: 'File',
    color: '#6b7280',
    isSystem: true,
    userId: null,
  },
  {
    id: 'type-image',
    name: 'Image',
    slug: 'image',
    icon: 'Image',
    color: '#ec4899',
    isSystem: true,
    userId: null,
  },
];

export const collections: MockCollection[] = [
  {
    id: 'collection-react',
    name: 'React & Frontend Patterns',
    description: 'A collection of highly reusable React hooks, Tailwind styles, and UI helpers.',
    isFavorite: true,
    defaultTypeId: 'type-snippet',
    userId: currentUser.id,
    createdAt: new Date('2026-06-28T10:00:00Z'),
    updatedAt: new Date('2026-06-28T10:00:00Z'),
  },
  {
    id: 'collection-devops',
    name: 'DevOps & Docker Commands',
    description: 'Frequently used commands, dockerfiles, and compose templates for deployment.',
    isFavorite: true,
    defaultTypeId: 'type-command',
    userId: currentUser.id,
    createdAt: new Date('2026-06-27T14:30:00Z'),
    updatedAt: new Date('2026-06-27T14:30:00Z'),
  },
  {
    id: 'collection-prompts',
    name: 'Gemini & LLM Prompts',
    description: 'Highly detailed instructions, system prompts, and formatting guidelines for LLM code gen.',
    isFavorite: true,
    defaultTypeId: 'type-prompt',
    userId: currentUser.id,
    createdAt: new Date('2026-06-26T09:15:00Z'),
    updatedAt: new Date('2026-06-26T09:15:00Z'),
  },
  {
    id: 'collection-saas',
    name: 'SaaS Boilerplate Configs',
    description: 'Configuration templates, schema definitions, and env examples for rapid bootstrapping.',
    isFavorite: false,
    defaultTypeId: null,
    userId: currentUser.id,
    createdAt: new Date('2026-06-25T16:45:00Z'),
    updatedAt: new Date('2026-06-25T16:45:00Z'),
  },
  {
    id: 'collection-interview',
    name: 'Interview Prep & Algorithms',
    description: 'Dynamic programming, tree traversals, and common DSA cheat sheets.',
    isFavorite: false,
    defaultTypeId: null,
    userId: currentUser.id,
    createdAt: new Date('2026-06-24T11:20:00Z'),
    updatedAt: new Date('2026-06-24T11:20:00Z'),
  },
];

export const items: MockItem[] = [
  {
    id: 'item-1',
    title: 'useLocalStorage React Hook',
    contentType: 'text',
    content:
      "export function useLocalStorage<T>(key: string, initialValue: T) {\n  const [value, setValue] = useState<T>(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? (JSON.parse(item) as T) : initialValue;\n    } catch {\n      return initialValue;\n    }\n  });\n  // ...\n}",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'A fully typed React hook to sync component state with browser localStorage automatically.',
    isFavorite: true,
    isPinned: true,
    language: 'typescript',
    userId: currentUser.id,
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-react'],
    tags: ['react', 'hooks', 'typescript'],
    createdAt: new Date('2026-06-28T10:30:00Z'),
    updatedAt: new Date('2026-06-28T10:30:00Z'),
  },
  {
    id: 'item-2',
    title: 'Code Reviewer Persona System Prompt',
    contentType: 'text',
    content:
      'You are a meticulous Staff Engineer conducting a code review. Be direct but constructive. Focus on correctness, maintainability, performance, and security. Suggest concrete improvements and ask clarifying questions when context is missing.',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'System prompt to turn any LLM into a meticulous Staff Engineer for code reviews.',
    isFavorite: true,
    isPinned: true,
    language: 'markdown',
    userId: currentUser.id,
    itemTypeId: 'type-prompt',
    collectionIds: ['collection-prompts'],
    tags: ['llm', 'prompt', 'review'],
    createdAt: new Date('2026-06-27T11:00:00Z'),
    updatedAt: new Date('2026-06-27T11:00:00Z'),
  },
  {
    id: 'item-3',
    title: 'Prune Unused Docker Volumes & Images',
    contentType: 'text',
    content:
      'docker system prune -a --volumes -f\n\n# Nukes all unused containers, networks, images (both dangling and unreferenced), and volumes to reclaim disk space.',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Nuke all unused containers, networks, images (both dangling and unreferenced), and volumes to reclaim disk space.',
    isFavorite: true,
    isPinned: true,
    language: 'bash',
    userId: currentUser.id,
    itemTypeId: 'type-command',
    collectionIds: ['collection-devops'],
    tags: ['docker', 'cleanup', 'devops'],
    createdAt: new Date('2026-06-27T15:00:00Z'),
    updatedAt: new Date('2026-06-27T15:00:00Z'),
  },
  {
    id: 'item-4',
    title: 'Tailwind Flex Centering Utility',
    contentType: 'text',
    content: '<div class="flex items-center justify-center min-h-screen">\n  <!-- perfectly centered content -->\n</div>',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Quick one-liner for centering content both vertically and horizontally with Tailwind.',
    isFavorite: false,
    isPinned: false,
    language: 'html',
    userId: currentUser.id,
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-react'],
    tags: ['tailwind', 'css', 'ui'],
    createdAt: new Date('2026-06-28T11:00:00Z'),
    updatedAt: new Date('2026-06-28T11:00:00Z'),
  },
  {
    id: 'item-5',
    title: 'Docker Compose Postgres Template',
    contentType: 'text',
    content:
      'services:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: dev\n      POSTGRES_PASSWORD: dev\n      POSTGRES_DB: app\n    ports:\n      - "5432:5432"\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Reusable Docker Compose setup for a local PostgreSQL database.',
    isFavorite: false,
    isPinned: false,
    language: 'yaml',
    userId: currentUser.id,
    itemTypeId: 'type-command',
    collectionIds: ['collection-devops', 'collection-saas'],
    tags: ['docker', 'postgres', 'compose'],
    createdAt: new Date('2026-06-27T16:00:00Z'),
    updatedAt: new Date('2026-06-27T16:00:00Z'),
  },
  {
    id: 'item-6',
    title: 'Frontend Architecture Decision Record',
    contentType: 'text',
    content:
      '# ADR-001: Standalone Components\n\n## Status\nAccepted\n\n## Context\nNgModules add friction in Angular v22+ projects.\n\n## Decision\nUse standalone components for all new UI.',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'A concise ADR explaining the move to Angular standalone components.',
    isFavorite: false,
    isPinned: false,
    language: 'markdown',
    userId: currentUser.id,
    itemTypeId: 'type-note',
    collectionIds: ['collection-react'],
    tags: ['angular', 'architecture', 'adr'],
    createdAt: new Date('2026-06-26T10:00:00Z'),
    updatedAt: new Date('2026-06-26T10:00:00Z'),
  },
  {
    id: 'item-7',
    title: 'Zard UI Component Library',
    contentType: 'text',
    content: null,
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: 'https://zardui.com/',
    description: 'Modern Angular UI component library used for the DevStash interface.',
    isFavorite: false,
    isPinned: false,
    language: null,
    userId: currentUser.id,
    itemTypeId: 'type-link',
    collectionIds: ['collection-react'],
    tags: ['angular', 'ui', 'library'],
    createdAt: new Date('2026-06-25T13:00:00Z'),
    updatedAt: new Date('2026-06-25T13:00:00Z'),
  },
  {
    id: 'item-8',
    title: 'Recursive Tree Traversal',
    contentType: 'text',
    content:
      'function traverse<T>(node: TreeNode<T>, visit: (n: TreeNode<T>) => void) {\n  visit(node);\n  node.children?.forEach(child => traverse(child, visit));\n}',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Generic recursive tree traversal helper for DSA practice.',
    isFavorite: false,
    isPinned: false,
    language: 'typescript',
    userId: currentUser.id,
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-interview'],
    tags: ['dsa', 'tree', 'typescript'],
    createdAt: new Date('2026-06-24T12:00:00Z'),
    updatedAt: new Date('2026-06-24T12:00:00Z'),
  },
  {
    id: 'item-9',
    title: 'Sequelize Association Snippet',
    contentType: 'text',
    content:
      "User.hasMany(Item, { foreignKey: 'userId', as: 'items' });\nItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Basic Sequelize one-to-many association boilerplate.',
    isFavorite: false,
    isPinned: false,
    language: 'typescript',
    userId: currentUser.id,
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-saas'],
    tags: ['sequelize', 'orm', 'backend'],
    createdAt: new Date('2026-06-25T17:00:00Z'),
    updatedAt: new Date('2026-06-25T17:00:00Z'),
  },
  {
    id: 'item-10',
    title: 'Stripe Customer Env Example',
    contentType: 'text',
    content:
      'STRIPE_PUBLISHABLE_KEY=pk_test_...\nSTRIPE_SECRET_KEY=sk_test_...\nSTRIPE_WEBHOOK_SECRET=whsec_...',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Environment variables needed for Stripe integration in development.',
    isFavorite: false,
    isPinned: false,
    language: 'env',
    userId: currentUser.id,
    itemTypeId: 'type-note',
    collectionIds: ['collection-saas'],
    tags: ['stripe', 'env', 'payments'],
    createdAt: new Date('2026-06-25T18:00:00Z'),
    updatedAt: new Date('2026-06-25T18:00:00Z'),
  },
  {
    id: 'item-11',
    title: 'Dynamic Programming Memoization Pattern',
    contentType: 'text',
    content:
      'function fib(n: number, memo: Record<number, number> = {}): number {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo));\n}',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Classic top-down memoization pattern used in dynamic programming problems.',
    isFavorite: false,
    isPinned: false,
    language: 'typescript',
    userId: currentUser.id,
    itemTypeId: 'type-snippet',
    collectionIds: ['collection-interview'],
    tags: ['dp', 'algorithms', 'typescript'],
    createdAt: new Date('2026-06-24T13:00:00Z'),
    updatedAt: new Date('2026-06-24T13:00:00Z'),
  },
  {
    id: 'item-12',
    title: 'Docker Build & Push Script',
    contentType: 'text',
    content:
      '#!/bin/bash\ndocker build -t myapp:latest .\ndocker tag myapp:latest registry/myapp:latest\ndocker push registry/myapp:latest',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'Simple bash script to build, tag, and push a Docker image.',
    isFavorite: false,
    isPinned: false,
    language: 'bash',
    userId: currentUser.id,
    itemTypeId: 'type-command',
    collectionIds: ['collection-devops'],
    tags: ['docker', 'ci', 'bash'],
    createdAt: new Date('2026-06-27T17:00:00Z'),
    updatedAt: new Date('2026-06-27T17:00:00Z'),
  },
  {
    id: 'item-13',
    title: 'Prompt Formatting Guidelines',
    contentType: 'text',
    content:
      '1. Start with a clear role definition.\n2. Provide step-by-step instructions.\n3. Include one or two examples.\n4. Specify output format.\n5. Add constraints and edge cases.',
    fileUrl: null,
    fileName: null,
    fileSize: null,
    url: null,
    description: 'A reusable checklist for writing effective LLM prompts.',
    isFavorite: false,
    isPinned: false,
    language: 'markdown',
    userId: currentUser.id,
    itemTypeId: 'type-prompt',
    collectionIds: ['collection-prompts'],
    tags: ['llm', 'prompt', 'guidelines'],
    createdAt: new Date('2026-06-26T14:00:00Z'),
    updatedAt: new Date('2026-06-26T14:00:00Z'),
  },
];
