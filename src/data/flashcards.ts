import type { Flashcard } from '@/types';

export const FLASHCARDS: Flashcard[] = [
  // Cloud Concepts
  {
    id: 'f1',
    topicId: 'cloud-concepts',
    front: 'What is cloud computing in one sentence?',
    back: 'Renting computing services — servers, storage, databases — over the internet from a provider, paying only for what you use.',
  },
  {
    id: 'f2',
    topicId: 'cloud-concepts',
    front: 'What is the difference between IaaS and PaaS?',
    back: 'IaaS gives you raw infrastructure (you manage the OS). PaaS gives you a ready platform (the provider manages the OS and runtime, you manage your app).',
  },
  {
    id: 'f3',
    topicId: 'cloud-concepts',
    front: 'What does SaaS stand for and give one example?',
    back: 'Software as a Service — a complete application hosted and managed by the provider. Example: web-based email or a cloud office suite.',
  },
  {
    id: 'f4',
    topicId: 'cloud-concepts',
    front: 'Define scalability.',
    back: 'The ability of a system to handle increased load by adding resources — vertically (bigger machine) or horizontally (more machines).',
  },
  {
    id: 'f5',
    topicId: 'cloud-concepts',
    front: 'Define elasticity.',
    back: 'The automatic scaling of resources up and down based on real-time demand — adding resources when busy, removing them when quiet.',
  },
  // Architecture & Services
  {
    id: 'f6',
    topicId: 'architecture-services',
    front: 'What is an Azure region?',
    back: 'A geographic area containing one or more data centres, connected by a low-latency network, used to meet latency and data residency requirements.',
  },
  {
    id: 'f7',
    topicId: 'architecture-services',
    front: 'What is an availability zone?',
    back: 'A physically separate data centre within a region with independent power, cooling, and networking — used for high availability and fault tolerance.',
  },
  {
    id: 'f8',
    topicId: 'architecture-services',
    front: 'What is Azure Blob Storage used for?',
    back: 'Storing large amounts of unstructured data — images, videos, documents, backups, and logs. "Blob" stands for Binary Large Object.',
  },
  {
    id: 'f9',
    topicId: 'architecture-services',
    front: 'What is a virtual machine?',
    back: 'A software-based computer that runs an OS and applications in the cloud. It is an IaaS offering that gives you full control of the OS and software.',
  },
  {
    id: 'f10',
    topicId: 'architecture-services',
    front: 'What is serverless computing?',
    back: 'A model where you write code and the provider runs it on demand — no server management. You pay only for execution time. Example: Azure Functions.',
  },
  // Management & Governance
  {
    id: 'f11',
    topicId: 'management-governance',
    front: 'What is a resource group?',
    back: 'A logical container that groups related Azure resources for a single application or workload, enabling unified management, monitoring, and billing.',
  },
  {
    id: 'f12',
    topicId: 'management-governance',
    front: 'What does Azure Cost Management do?',
    back: 'It helps you monitor, analyse, and optimise cloud spending with budgets, alerts, and spending insights — but it does not automatically reduce costs.',
  },
  {
    id: 'f13',
    topicId: 'management-governance',
    front: 'What is Azure Policy?',
    back: 'A governance service that enforces rules and standards on Azure resources — e.g. requiring tags, blocking unapproved regions, or enforcing naming conventions.',
  },
  // Security & Identity
  {
    id: 'f14',
    topicId: 'security-identity',
    front: 'What is Microsoft Entra ID?',
    back: 'A cloud-based identity and access management service that handles authentication (who you are) and authorisation (what you can access). Formerly Azure AD.',
  },
  {
    id: 'f15',
    topicId: 'security-identity',
    front: 'What does RBAC stand for and what does it do?',
    back: 'Role-Based Access Control. It assigns permissions through predefined roles (Reader, Contributor, Owner), following the principle of least privilege.',
  },
  {
    id: 'f16',
    topicId: 'security-identity',
    front: 'What is the principle of least privilege?',
    back: 'Giving users only the minimum permissions they need to do their job — no more. This reduces risk if an account is compromised or a mistake is made.',
  },
];
