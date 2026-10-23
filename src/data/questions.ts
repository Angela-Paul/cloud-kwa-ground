import type { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ── Cloud Concepts ──
  {
    id: 'q1',
    topicId: 'cloud-concepts',
    question: 'What is the main idea behind cloud computing?',
    options: [
      'Buying your own physical servers and keeping them in your office',
      'Renting computing services over the internet instead of owning the hardware',
      'Storing all data on USB flash drives for portability',
      'Using only open-source software on local machines',
    ],
    correctIndex: 1,
    explanation:
      'Cloud computing means you access computing resources (servers, storage, databases) over the internet from a provider, paying only for what you use — you do not own or maintain the physical hardware.',
    realLifeExample:
      'Think of it like renting water from the tap instead of digging your own well. You pay for what you use and the water company handles the pipes.',
  },
  {
    id: 'q2',
    topicId: 'cloud-concepts',
    question: 'Which model gives you the most control over the operating system and software?',
    options: ['SaaS (Software as a Service)', 'PaaS (Platform as a Service)', 'IaaS (Infrastructure as a Service)', 'FaaS (Functions as a Service)'],
    correctIndex: 2,
    explanation:
      'IaaS provides raw computing infrastructure — virtual machines, storage, and networking. You manage the OS, applications, and data, giving you the most control but also the most responsibility.',
    realLifeExample:
      'IaaS is like renting an empty plot of land. You build whatever house you want, but you handle all the construction and maintenance yourself.',
  },
  {
    id: 'q3',
    topicId: 'cloud-concepts',
    question: 'What is the key difference between scalability and elasticity?',
    options: [
      'They are the exact same thing',
      'Scalability is about handling growth; elasticity is about automatically adjusting up and down with demand',
      'Scalability only works in the cloud; elasticity only works on-premises',
      'Elasticity means permanent expansion; scalability means temporary',
    ],
    correctIndex: 1,
    explanation:
      'Scalability is the ability of a system to handle increased load (growing). Elasticity is the ability to automatically add or remove resources based on real-time demand — scaling out and scaling in as needed.',
    realLifeExample:
      'A matatu can carry more passengers if you add more seats (scalability). An elastic matatu would magically grow extra seats during rush hour and shrink them when the road is quiet.',
  },
  {
    id: 'q4',
    topicId: 'cloud-concepts',
    question: 'Which cloud model is hosted entirely within your own data centre?',
    options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Multi-cloud'],
    correctIndex: 1,
    explanation:
      'A private cloud is hosted on infrastructure owned and operated by the organisation itself, usually within its own data centre. It offers the most control and privacy but requires you to maintain the hardware.',
    realLifeExample:
      'A private cloud is like having your own kitchen at home — full control over everything, but you buy the stove and do the cooking yourself.',
  },

  // ── Architecture & Services ──
  {
    id: 'q5',
    topicId: 'architecture-services',
    question: 'What is an Azure region?',
    options: [
      'A single data centre building',
      'A geographical area with at least one data centre, designed for data residency and compliance',
      'A network of undersea cables',
      'A pricing zone for billing purposes',
    ],
    correctIndex: 1,
    explanation:
      'An Azure region is a set of data centres deployed within a defined geographic boundary, connected through a low-latency network. Regions help meet data residency, compliance, and latency requirements.',
    realLifeExample:
      'Think of a region like a county in Kenya. Each county has its own infrastructure and serves the people nearby, but all counties are connected by roads (the network).',
  },
  {
    id: 'q6',
    topicId: 'architecture-services',
    question: 'What is an availability zone?',
    options: [
      'A backup of your billing data',
      'A feature that slows down your app for safety',
      'A physically separate location within a region with independent power, cooling, and networking',
      'A software firewall zone',
    ],
    correctIndex: 2,
    explanation:
      'An availability zone is a distinct data centre within a region that has its own power, cooling, and networking. If one zone fails, applications in another zone keep running — this provides high availability.',
    realLifeExample:
      'If your shop in CBD loses power, your backup shop in Westlands keeps serving customers. Each shop is like an availability zone.',
  },
  {
    id: 'q7',
    topicId: 'architecture-services',
    question: 'Which Azure service provides virtual machines you can configure and control?',
    options: ['Azure Functions', 'Azure Virtual Machines', 'Azure Blob Storage', 'Azure Key Vault'],
    correctIndex: 1,
    explanation:
      'Azure Virtual Machines lets you create and manage VMs in the cloud. You choose the OS, install software, and have full control — this is an IaaS offering.',
    realLifeExample:
      'A virtual machine is like renting a fully configurable apartment. You bring your own furniture, paint the walls, and live however you want.',
  },
  {
    id: 'q8',
    topicId: 'architecture-services',
    question: 'What is Azure Blob Storage primarily used for?',
    options: [
      'Running containerised applications',
      'Hosting relational databases',
      'Storing large amounts of unstructured data like images, videos, and documents',
      'Managing user passwords',
    ],
    correctIndex: 2,
    explanation:
      'Azure Blob Storage is designed to store massive amounts of unstructured data — images, videos, documents, backups, and log files. "Blob" stands for Binary Large Object.',
    realLifeExample:
      'Think of Blob Storage like a huge storeroom where you dump boxes of all shapes and sizes — photos, videos, PDFs — and retrieve them whenever you need.',
  },
  {
    id: 'q8b',
    topicId: 'architecture-services',
    question: 'What is the difference between Azure regions and availability zones?',
    options: [
      'They are the same thing with different names',
      'A region is a geographic area with data centres; an availability zone is a separate data centre within a region',
      'Availability zones span multiple regions; regions are within a single zone',
      'Regions are for storage only; availability zones are for computing only',
    ],
    correctIndex: 1,
    explanation:
      'A region is a geographic area (like East US or West Europe) containing one or more data centres. An availability zone is a physically separate data centre within that region, with its own power, cooling, and networking. Zones provide fault tolerance within a region.',
    realLifeExample:
      'Think of a region as a county like Nairobi, and availability zones as different neighbourhoods within Nairobi. If one neighbourhood has a blackout, the others keep going.',
  },

  // ── Management & Governance ──
  {
    id: 'q9',
    topicId: 'management-governance',
    question: 'What is a resource group in Azure?',
    options: [
      'A security team that monitors your account',
      'A container that holds related Azure resources for a single application or workload',
      'A pricing discount tier',
      'A type of virtual network',
    ],
    correctIndex: 1,
    explanation:
      'A resource group is a logical container that groups related Azure resources (VMs, databases, storage accounts) so they can be managed, monitored, and billed together. Resources often share a common lifecycle.',
    realLifeExample:
      'Think of a resource group like a project folder. Everything related to one construction project — blueprints, budgets, materials — goes in one folder so you can manage it together.',
  },
  {
    id: 'q10',
    topicId: 'management-governance',
    question: 'What does the Azure Cost Management tool help you do?',
    options: [
      'Automatically reduce your cloud bill by half',
      'Monitor, analyse, and optimise your cloud spending with budgets and alerts',
      'Pay for Azure services using mobile money',
      'Negotiate prices with Microsoft on your behalf',
    ],
    correctIndex: 1,
    explanation:
      'Azure Cost Management provides tools to track spending, set budgets, create alerts when costs exceed limits, and identify cost-saving opportunities. It does not automatically reduce costs — you must act on the insights.',
    realLifeExample:
      'It is like M-Shwari showing you a breakdown of your spending and sending an SMS when you are about to overspend your budget.',
  },
  {
    id: 'q11',
    topicId: 'management-governance',
    question: 'What is the purpose of Azure Policy?',
    options: [
      'To enforce rules and standards on your Azure resources, like requiring tags or blocking certain regions',
      'To store company passwords safely',
      'To create new virtual machines automatically',
      'To handle customer complaints',
    ],
    correctIndex: 0,
    explanation:
      'Azure Policy lets you create rules that enforce compliance across your resources — for example, requiring all resources to have a department tag, or blocking deployment in unapproved regions. It evaluates resources and can block or flag non-compliant ones.',
    realLifeExample:
      'It is like a school rule that says all students must wear a uniform. If a student arrives without one, they get flagged and cannot enter class.',
  },
  {
    id: 'q11b',
    topicId: 'management-governance',
    question: 'What is the benefit of organising resources into resource groups?',
    options: [
      'It automatically makes your applications run faster',
      'It lets you manage, monitor, and delete related resources together as a unit',
      'It gives you free Azure credits for grouping resources',
      'It encrypts all resources in the group automatically',
    ],
    correctIndex: 1,
    explanation:
      'Resource groups let you organise related resources so they can be managed together. When a project ends, you can delete the entire resource group instead of removing resources one by one. You can also apply permissions and policies at the group level.',
    realLifeExample:
      'A matatu SACCO groups all its vehicles, drivers, and routes under one office. When the SACCO closes, everything is handled together — not one matatu at a time.',
  },

  // ── Security & Identity ──
  {
    id: 'q12',
    topicId: 'security-identity',
    question: 'What is Microsoft Entra ID (formerly Azure AD)?',
    options: [
      'A physical identity card for Azure employees',
      'A cloud-based identity and access management service that handles authentication and authorisation',
      'A backup service for user photos',
      'A type of Azure virtual machine',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Entra ID is a cloud-based identity service. It manages user accounts, handles sign-in (authentication), and controls what users can access (authorisation). It supports single sign-on, multi-factor authentication, and integration with thousands of SaaS apps.',
    realLifeExample:
      'Think of Entra ID like the security desk at a big office building. It checks your ID at the door and decides which floors and rooms you are allowed to enter.',
  },
  {
    id: 'q13',
    topicId: 'security-identity',
    question: 'What does RBAC (Role-Based Access Control) do in Azure?',
    options: [
      'It backs up your data automatically',
      'It assigns permissions to users based on their assigned roles, so they can only do what their role allows',
      'It speeds up virtual machines',
      'It encrypts network traffic',
    ],
    correctIndex: 1,
    explanation:
      'RBAC lets you assign roles (like Reader, Contributor, Owner) to users, groups, or applications. Each role has a specific set of permissions. This follows the principle of least privilege — people only get the access they need.',
    realLifeExample:
      'In a restaurant, the chef can go in the kitchen, the waiter takes orders, and the cashier handles money. RBAC does the same thing — each person gets only the access their job requires.',
  },
  {
    id: 'q14',
    topicId: 'security-identity',
    question: 'What is the principle of least privilege?',
    options: [
      'Giving every user admin access so nothing breaks',
      'Giving users only the minimum access they need to do their job — no more',
      'Removing all security to simplify work',
      'Using only one password for everyone',
    ],
    correctIndex: 1,
    explanation:
      'The principle of least privilege means granting users the minimum permissions required to perform their tasks. This reduces the risk of accidental damage or intentional misuse if an account is compromised.',
    realLifeExample:
      'A bank teller can handle deposits and withdrawals but cannot approve large loans — that is the manager’s job. Each person gets only the power they need.',
  },
];
