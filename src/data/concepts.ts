import type { ConceptEntry } from '@/types';

export const CONCEPTS: ConceptEntry[] = [
  {
    id: 'c1',
    term: 'Cloud Computing',
    plainEnglish:
      'Instead of buying and maintaining your own computers and servers, you rent computing power and storage from a big company over the internet. You pay for only what you use, just like electricity or water.',
    realLifeExample:
      'Think of it like using a matatu instead of buying your own bus. You pay for the ride, not for the whole vehicle. The matatu SACCO handles maintenance, fuel, and the driver — you just pay your fare.',
    technicalDefinition:
      'Delivery of computing services — servers, storage, databases, networking, software — over the internet ("the cloud") on a pay-as-you-go basis from a cloud provider.',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c2',
    term: 'IaaS (Infrastructure as a Service)',
    plainEnglish:
      'You rent the raw building blocks — virtual servers, storage, and networking — and you build everything else yourself. You install the operating system and software. Maximum control, maximum responsibility.',
    realLifeExample:
      'Like renting an empty plot of land in your town. You build the house, install plumbing, and do all the maintenance. The landlord only provides the land — everything else is your responsibility.',
    technicalDefinition:
      'A cloud service model where the provider supplies virtualised computing infrastructure (VMs, storage, networking). The consumer manages the OS, applications, and data.',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c3',
    term: 'PaaS (Platform as a Service)',
    plainEnglish:
      'You get a ready-made platform to build and run your apps — the operating system and tools are already set up for you. You focus on your code; the provider handles the underlying infrastructure.',
    realLifeExample:
      'Like renting a fully equipped kitchen. The stove, utensils, and ingredients are there — you just cook your own dish.',
    technicalDefinition:
      'A cloud service model providing a managed platform for developing, deploying, and managing applications. The provider manages the OS, runtime, and infrastructure; the consumer manages applications and data.',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c4',
    term: 'SaaS (Software as a Service)',
    plainEnglish:
      'You use a complete application that runs in the cloud. You do not install or manage anything — you just log in and use it, usually through your browser.',
    realLifeExample:
      'Like ordering food at a restaurant. The chef cooks, the waiter serves, and you just eat. You do not worry about the kitchen at all.',
    technicalDefinition:
      'A cloud service model where the provider hosts and manages a complete application delivered over the internet. The consumer only uses the software — no infrastructure or platform management.',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c5',
    term: 'Scalability',
    plainEnglish:
      'The ability of a system to grow and handle more work by adding resources. You can scale up (bigger machines) or scale out (more machines). It is about capacity for growth.',
    realLifeExample:
      'A kibanda (small kiosk) that adds more seats and tables to serve more customers during lunch hour is scaling to meet demand.',
    technicalDefinition:
      'The capability of a system to handle increased load by adding resources — vertically (scaling up to more powerful hardware) or horizontally (scaling out to more instances).',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c6',
    term: 'Elasticity',
    plainEnglish:
      'The ability of a cloud system to automatically add resources when demand spikes and remove them when demand drops. You only pay for what you use at each moment.',
    realLifeExample:
      'During the festive season, a small business in town hires extra staff to handle the rush, then lets them go when things quiet down. Elasticity does this automatically in the cloud — no hiring or firing needed.',
    technicalDefinition:
      'The cloud capability to automatically provision and de-provision resources in response to real-time demand, ensuring optimal resource utilisation and cost efficiency.',
    topicId: 'cloud-concepts',
  },
  {
    id: 'c7',
    term: 'Regions',
    plainEnglish:
      'A region is a geographic area on the map (like East US or West Europe) where Azure has one or more data centres. Choosing a region closer to your users makes things faster, and some data must legally stay in a specific region.',
    realLifeExample:
      'If you have customers in Nairobi, you would choose a region close to them so the data travels a shorter distance — just like opening a shop near your customers instead of in another country.',
    technicalDefinition:
      'A set of data centres deployed within a latency-defined perimeter, connected through a regional low-latency network, used to meet data residency and compliance requirements.',
    topicId: 'architecture-services',
  },
  {
    id: 'c8',
    term: 'Availability Zones',
    plainEnglish:
      'Within a region, availability zones are separate data centres with their own power, cooling, and network. If one zone has a problem (like a power cut), the others keep running so your app stays online.',
    realLifeExample:
      'Like having two branches of your shop in different parts of town. If one has a blackout, the other keeps serving customers.',
    technicalDefinition:
      'Physically separate locations within a single Azure region, each with independent power, cooling, and networking, providing high availability and fault tolerance.',
    topicId: 'architecture-services',
  },
  {
    id: 'c9',
    term: 'Virtual Machines',
    plainEnglish:
      'A virtual machine is a computer that exists only in software. It behaves like a real computer — it runs an operating system and software — but it lives on a server in the cloud. You can create one in minutes without buying hardware.',
    realLifeExample:
      'Like renting a fully equipped apartment instead of building a house. You move in immediately and can change the furniture (software) however you like.',
    technicalDefinition:
      'An IaaS offering that provides on-demand, scalable virtualised computing instances running an operating system, configurable for CPU, memory, and storage requirements.',
    topicId: 'architecture-services',
  },
  {
    id: 'c10',
    term: 'Serverless Computing',
    plainEnglish:
      'You write code and the cloud runs it automatically when needed — you do not manage any servers at all. The cloud provider handles all the infrastructure, and you only pay when your code actually runs.',
    realLifeExample:
      'Like using a taxi. You do not own the car, do not pay for parking, and only pay for the trips you take. The taxi company handles everything else.',
    technicalDefinition:
      'A cloud computing model where the provider dynamically manages resource allocation, allowing developers to run code (functions) without managing servers, paying only for execution time.',
    topicId: 'architecture-services',
  },
  {
    id: 'c11',
    term: 'Storage',
    plainEnglish:
      'Cloud storage lets you save files, backups, images, and data in the cloud instead of on your own hard drive. You can access them from anywhere and they are kept safe even if your own computer breaks.',
    realLifeExample:
      'Like keeping your important documents in a bank safe deposit box instead of under your mattress — secure, accessible during business hours, and protected from fire.',
    technicalDefinition:
      'Cloud-based data storage services offering different tiers (Blob, Disk, File, Table) with varying access patterns, redundancy options, and durability guarantees.',
    topicId: 'architecture-services',
  },
  {
    id: 'c12',
    term: 'Microsoft Entra ID',
    plainEnglish:
      'Entra ID (formerly Azure Active Directory) is like a digital security guard for your organisation. It checks who you are when you log in and decides what you are allowed to access. It works with thousands of apps and supports multi-factor authentication.',
    realLifeExample:
      'Like the security desk at a big office building. It verifies your identity at the front door and gives you a pass that only lets you into the rooms you are authorised for.',
    technicalDefinition:
      'A cloud-based identity and access management service providing authentication, single sign-on, multi-factor authentication, and application access management across cloud and on-premises resources.',
    topicId: 'security-identity',
  },
  {
    id: 'c13',
    term: 'RBAC (Role-Based Access Control)',
    plainEnglish:
      'Instead of giving each person individual permissions, you assign roles — like "Reader", "Contributor", or "Owner". Each role comes with a set of permissions. This makes it easy to manage who can do what.',
    realLifeExample:
      'In a matatu SACCO, the treasurer can approve fuel money, the driver can only drive, and the conductor collects fares. Each role has specific permissions based on their job — nobody can do everything.',
    technicalDefinition:
      'An access control mechanism that assigns permissions to users/groups through predefined roles, enabling granular access management following the principle of least privilege.',
    topicId: 'security-identity',
  },
  {
    id: 'c14',
    term: 'Azure Policy',
    plainEnglish:
      'Azure Policy lets you set rules for your cloud resources — like requiring all resources to have a tag, or blocking certain regions. If a resource breaks the rules, Azure flags or blocks it automatically.',
    realLifeExample:
      'Like a school rule that says all students must wear a uniform. If someone shows up without one, the prefect stops them at the gate. Azure Policy does the same thing for your cloud resources — non-compliant resources are blocked before they are created.',
    technicalDefinition:
      'A governance service that enables creation, assignment, and enforcement of compliance policies across Azure resources through evaluation and remediation of non-compliant resources.',
    topicId: 'management-governance',
  },
];
