import type { Topic } from '@/types';

export const TOPICS: Topic[] = [
  {
    id: 'cloud-concepts',
    name: 'Cloud Concepts',
    shortName: 'Concepts',
    description: 'Understand what cloud computing is, its benefits, and different service models.',
    icon: 'Cloud',
    color: 'violet',
  },
  {
    id: 'architecture-services',
    name: 'Azure Architecture & Services',
    shortName: 'Architecture',
    description: 'Learn about Azure regions, availability zones, virtual machines, and storage.',
    icon: 'Server',
    color: 'cyan',
  },
  {
    id: 'management-governance',
    name: 'Azure Management & Governance',
    shortName: 'Governance',
    description: 'Explore cost management, resource organisation, and policy enforcement in Azure.',
    icon: 'Settings',
    color: 'violet',
  },
  {
    id: 'security-identity',
    name: 'Security & Identity',
    shortName: 'Security',
    description: 'Discover how Azure handles identity, access control, and security best practices.',
    icon: 'Shield',
    color: 'cyan',
  },
];

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
);
