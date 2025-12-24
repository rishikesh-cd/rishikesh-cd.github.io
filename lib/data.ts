import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'rishikeshcd619@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Rishikesh, I am reaching out to you because...',

    oldPortfolio: 'https://www.legacy.me.toinfinite.dev',
};

const mailSubject = encodeURIComponent(
    'Hiring Inquiry from [Your Recruiter Name]',
);

export const EMAIL_LINK = `mailto:${GENERAL_INFO.email}?subject=${mailSubject}`;

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/rishikeshcd619' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/rishikesh-cd' },
    { name: 'whatsapp', url: 'https://wa.me/917736638889?text=Hello%20Rishikesh%2C%20I%20reviewed%20your%20portfolio%20and%20am%20interested%20in%20applying%20for%20a%20new%20position.%20I%20am%20reaching%20out%20about%3A%20[Job%20Title/Role].%20My%20name%20is%20[Your%20Name/Company%20Name].' },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Redux/Toolkit',
            icon: '/logo/redux.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Jest',
            icon: '/logo/jest.png',
        },
        {
            name: 'Enzyme',
            icon: '/logo/enzyme.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Shadcn UI',
            icon: '/logo/shadcn.png',
        },
        {
            name: 'Sass',
            icon: '/logo/sass.png',
        },
        {
            name: 'Bootstrap',
            icon: '/logo/bootstrap.svg',
        },
        {
            name: 'Chakra UI',
            icon: '/logo/chakra.png',
        },

    ],
    'mobile development': [
        {
            name: 'Dart',
            icon: '/logo/dart.png',
        },
        {
            name: 'Flutter',
            icon: '/logo/flutter.png',
        },
        {
            name: 'BLoC',
            icon: '/logo/bloc.png',
        }
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Express.js',
            icon: '/logo/express.png',
        },
        {
            name: 'PHP',
            icon: '/logo/php.png',
        },
        {
            name: 'Laravel',
            icon: '/logo/laravel.png',
        },
        {
            name: 'Livewire',
            icon: '/logo/livewire.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'SQLite',
            icon: '/logo/sqlite.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.svg',
        }
    ],
    tools: [
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Tanstack',
            icon: '/logo/tanstack.png',
        },
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        }, {
            name: 'Vite',
            icon: '/logo/vite.svg',
        },
        {
            name: 'webpack',
            icon: '/logo/webpack.png',
        },
        {
            name: 'babel',
            icon: '/logo/babel.png',
        },
        {
            name: 'jira',
            icon: '/logo/jira.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'Harithamithram Web Application',
        slug: 'harithamithram',
        liveUrl: 'https://harithamithram.lsgkerala.gov.in/',
        year: 2025,
        description: `
      The Harithamithra Web Application is a centralized administrative and monitoring platform designed to manage waste-management operations across local self-government institutions in Kerala. <br/> <br/>
      
      <strong>Core Objectives</strong>
      <ul>
        <li>To manage agencies and system users involved in waste collection and processing</li>
        <li>To monitor real-time progress of waste-management activities</li>
        <li>To provide data-driven insights through reports and dashboards at multiple administrative levels</li>
      </ul><br/>
      
      <strong>Key Functionalities</strong>
      <br/>
      1. <strong>Agency & User Management</strong>
      <ul>
        <li>Manage waste-management agencies</li>
        <li>Role-based user management for: Haritha Karma Sena, Supervisors, Local body officials, District & State-level administrators</li>
        <li>Assign wards, routes, and responsibilities</li>
      </ul>
      2. <strong>Waste Management Monitoring</strong>
      <ul>
        <li>Track daily waste collection activities</li>
        <li>Monitor service completion status ward-wise</li>
        <li>Validate service entries from mobile applications</li>
        <li>Identify pending, delayed, or missed collections</li>
      </ul>
      3. <strong>Live Vehicle Tracking</strong>
      <ul>
        <li>Real-time GPS tracking of waste-collection vehicles</li>
        <li>Route monitoring and movement history</li>
        <li>Improve operational transparency and efficiency</li>
      </ul>
      4. <strong>Reports & Analytics</strong>
      <ul>
        <li>Generate ward-wise, local body-wise, district-wise, and state-wise reports</li>
        <li>Reports include: Waste collected (category-wise), Service coverage and efficiency, Agency and worker performance</li>
        <li>Export reports for audits and reviews</li>
      </ul>
      5. <strong>Dashboards & Insights</strong>
      <ul>
        <li>Visual dashboards for officials at different levels</li>
        <li>Performance comparison across wards and districts</li>
        <li>Supports data-driven planning and decision-making</li>
      </ul><br/>
      
      <strong>Overall Impact</strong>
      <ul>
        <li>Transparency in waste-management operations</li>
        <li>Accountability of agencies and workers</li>
        <li>Effective coordination between local bodies and state authorities</li>
      </ul>
      `,
        role: `
      Frontend Developer <br/>
      Developed the administrative dashboard and monitoring systems using React and Chakra UI. Implemented complex state management with Redux Toolkit for handling real-time data and reports.
      `,
        techStack: [
            'React',
            'Redux Toolkit',
            'Tailwind CSS',
            'Chakra UI',
        ],
        thumbnail: '/projects/harithamithram-1.png',
        longThumbnail: '/projects/harithamithram-1.png',
        images: [
            '/projects/harithamithram-1.png',
            '/projects/harithamithram-2.png',
            '/projects/harithamithram-3.png',
            '/projects/harithamithram-4.png',
            '/projects/harithamithram-5.png',
            '/projects/harithamithram-6.png',
        ],
    },
    {
        title: 'Harithamithram Mobile Application',
        slug: 'harithamithram-mobile',
        techStack: [
            'Flutter',
            'BLoC',
            'SQLite',
        ],
        thumbnail: '/projects/harithamithram-mobile-1.jpg',
        longThumbnail: '/projects/harithamithram-mobile-1.jpg',
        images: [
            '/projects/harithamithram-mobile-1.jpg',
            '/projects/harithamithram-mobile-2.jpg',
            '/projects/harithamithram-mobile-3.jpg',
            '/projects/harithamithram-mobile-4.jpg',
            '/projects/harithamithram-mobile-5.jpg',
            '/projects/harithamithram-mobile-6.jpg',
            '/projects/harithamithram-mobile-7.jpg',
            '/projects/harithamithram-mobile-8.jpg',
            '/projects/harithamithram-mobile-9.jpg',
            '/projects/harithamithram-mobile-10.jpg',
        ],
        liveUrl: 'https://play.google.com/store/apps/details?id=in.gov.ikm.harithamithram',
        year: 2025,
        description: `
      The Harithamithra Mobile Application is a field-level operational app developed for Haritha Karma Sena members, enabling efficient doorstep waste-management services with full offline capability. <br/> <br/>
      
      <strong>Primary Users</strong>
      <ul>
        <li>Haritha Karma Sena (HKS) members – waste collectors and field workers</li>
        <li>Citizens/Customers – to view and track waste-management services</li>
      </ul><br/>
      
      <strong>Key Features</strong>
      <br/>
      1. <strong>User & Customer Management</strong>
      <ul>
        <li>Register new customers directly from the field</li>
        <li>Fetch and validate customer details using geolocation-based mapping</li>
        <li>Manage household and commercial user profiles</li>
      </ul>
      2. <strong>Subscription & Service Management</strong>
      <ul>
        <li>Add and manage waste-collection subscriptions</li>
        <li>Record door-to-door service activities</li>
        <li>Generate service records even in offline mode</li>
      </ul>
      3. <strong>Demand & Payment Collection</strong>
      <ul>
        <li>Generate demands for waste-management services</li>
        <li>Collect payments from customers</li>
        <li>Store transactions offline and sync automatically when online</li>
      </ul>
      4. <strong>Offline-First Architecture</strong>
      <ul>
        <li>All critical operations supported without internet connectivity</li>
        <li>Data securely stored in SQLite and synchronized with the server</li>
        <li>Ensures uninterrupted service in low-network areas</li>
      </ul>
      5. <strong>Reports & Statistics</strong>
      <ul>
        <li>View daily, weekly, and monthly collection reports</li>
        <li>Track personal and ward-level performance statistics</li>
        <li>Monitor collection counts, payments, and service status</li>
      </ul>
      6. <strong>Customer Login & Tracking</strong>
      <ul>
        <li>Separate customer login module</li>
        <li>Customers can view: Service history, Payment details, Waste-collection status and updates</li>
      </ul><br/>
      
      <strong>Impact</strong>
      <ul>
        <li>The mobile application empowers Haritha Karma Sena members to deliver reliable, transparent, and accountable waste-collection services, while enabling citizens to stay informed and engaged in local waste-management initiatives.</li>
      </ul>
      `,
        role: `
        Mobile App Developer <br/>
        Built the complete mobile application using Flutter and BLoC for state management. Implemented the offline-first architecture using SQLite and background synchronization.
        `,
    },
    {
        title: 'Sunny Diamonds E-commerce',
        slug: 'sunny-diamonds',
        techStack: [
            'Next.js',
            'React',
            'Redux',
            'Tailwind CSS',
        ],
        thumbnail: '/projects/sunny-diamonds-1.png',
        longThumbnail: '/projects/sunny-diamonds-1.png',
        images: [
            '/projects/sunny-diamonds-1.png',
            '/projects/sunny-diamonds-2.png',
            '/projects/sunny-diamonds-3.png',
            '/projects/sunny-diamonds-4.png',
            '/projects/sunny-diamonds-5.png',
        ],
        liveUrl: 'https://www.sunnydiamonds.com/',
        year: 2022,
        description: `
            The Sunny Diamonds E-commerce Application is an online shopping platform designed to provide customers with a smooth and convenient jewellery-buying experience. <br/> <br/>

            <strong>Key Features</strong>
            <ul>
                <li>Browse and view a complete catalogue of diamond and jewellery products</li>
                <li>Advanced product search and easy filtering to find items quickly</li>
                <li>View detailed product information with images and pricing</li>
                <li>Add products to cart and manage cart items</li>
                <li>Secure checkout process</li>
                <li>Supports both: Registered customers and Guest users (checkout without login)</li>
                <li>Customer login for managing orders and personal details</li>
                <li>Responsive design for seamless usage on desktop and mobile devices</li>
            </ul> <br/>

            <strong>Overall Experience</strong>
            <ul>
                <li>The application focuses on: Easy product discovery, Fast and smooth checkout, Flexible purchasing options for all types of customers</li>
                <li>It ensures a reliable and user-friendly online shopping experience while enabling Sunny Diamonds to showcase and sell its products effectively through a digital platform.</li>
            </ul>
        `,
        role: `
            Frontend Developer <br/>
            Built the responsive e-commerce platform using Next.js and Redux. Implemented product catalog, search filtering, and secure checkout integration.
        `,
    },
    {
        title: 'Price Engine',
        slug: 'price-engine',
        techStack: [
            'Laravel',
            'React',
            'Redux',
            'Redis',
            'Algolia Search',
        ],
        thumbnail: '',
        longThumbnail: '',
        images: [],
        liveUrl: '',
        year: 2022,
        description: `
            Price Engine is the core ERP application for Sunny Diamonds and serves as the central pillar of the entire ecosystem. It acts as the primary system where all critical business data, workflows, and pricing logic are managed and shared with connected microservices and applications. <br/><br/>

            <strong>Core Responsibilities</strong>
            <ul>
                <li>Acts as the central data store for the ecosystem</li>
                <li>Integrates with multiple microservices and supporting applications</li>
                <li>Maintains consistency and accuracy of business data</li>
            </ul>

            <strong>Key Features</strong>
            <ul>
                <li>Fetches real-time and accurate gold prices</li>
                <li>Applies custom pricing rules</li>
                <li>Supports geolocation-based offers</li>
                <li>Applies offers based on: Product categories, Customer categories</li>
                <li>Generate and manage new orders</li>
                <li>Handle requests for new products and designs</li>
                <li>Manage offer and discount rules</li>
                <li>Billing and invoicing management</li>
                <li>System maintenance and operational configurations</li>
            </ul>

            <strong>End-to-End Jewellery Workflow Management</strong>
            <ul>
                <li>Manages all stages of the jewellery business, from raw materials to finished products</li>
                <li>Tracks operational flow across departments</li>
                <li>Ensures smooth coordination between inventory, sales, billing, and fulfilment</li>
            </ul><br/>

            <strong>Overall Importance</strong>
            <ul>
                <li>Acts as the single source of truth for pricing and business rules</li>
                <li>Ensures accurate and consistent product pricing across channels</li>
                <li>Enables personalized and location-aware offers</li>
                <li>Supports scalability and long-term business growth</li>
                <li>Serves as the backbone for all digital operations</li>
            </ul>
        `,
        role: `
            Full-Stack Developer <br/>
            Developed and maintained the core ERP system using Laravel and React. Implemented complex pricing logic, order management workflows, and integrated Algolia for advanced search capabilities.
        `,
    },
    {
        title: 'SD Panel',
        slug: 'sd-panel',
        techStack: ['React', 'Laravel', 'Livewire', 'MySQL'],
        year: 2022,
        description: `
            SD Panel is an internal admin dashboard developed for the Sunny Diamonds e-commerce platform. It enables efficient management of products, customers, orders, users, and staff, while acting as an integration layer between the e-commerce website and the Price Engine ERP. The system ensures accurate pricing, synchronized data flow, and streamlined operational workflows.
        `,
        role: `
            Full-Stack Developer <br/>
            Developed and maintained internal administrative tools and dashboard features. Integrated the panel with Price Engine ERP to ensure real-time data synchronization and consistent pricing across the platform.
        `,
        thumbnail: '/projects/sd-panel-1.png',
        longThumbnail: '/projects/sd-panel-1.png',
        images: [
            '/projects/sd-panel-1.png',
            '/projects/sd-panel-3.png',
        ],
    },
    {
        title: 'Encart – Custom Ecosystem',
        slug: 'encart',
        techStack: [
            'Next.js',
            'React',
            'Redux',
            'Tailwind CSS',
        ],
        thumbnail: '',
        longThumbnail: '',
        images: [],
        liveUrl: '',
        year: 2023,
        description: `
            Encart is a complete e-commerce ecosystem developed as a scalable and maintainable product for Sunny Diamonds. It is designed to build and manage custom e-commerce web applications in a flexible and future-ready way.<br/><br/>

            <strong>What Encart Is</strong><br/>
            Encart is not just a single application, but a product platform that enables the creation of tailored e-commerce solutions based on business needs. It provides a structured foundation where features can be added, removed, or modified without affecting the entire system.<br/><br/>

            <strong>Key Characteristics</strong>
            <ul>
                <li>Acts as a central ecosystem for all Sunny Diamonds e-commerce projects</li>
                <li>Built to support multiple e-commerce applications from a common platform</li>
                <li>Ensures long-term maintainability and scalability</li>
            </ul>

            <strong>Flexible Feature Management</strong>
            <ul>
                <li>Supports a plug-in / plug-out model for features and add-ons</li>
                <li>New functionalities can be enabled only when required</li>
                <li>Avoids unnecessary complexity by keeping unused features disabled</li>
            </ul>

            <strong>Service-Based Architecture</strong>
            <ul>
                <li>Business functionalities are developed as independent services</li>
                <li>Services can be added, updated, or reused across projects</li>
                <li>Allows gradual expansion as business requirements grow</li>
            </ul>

            <strong>Purpose & Impact</strong>
            <ul>
                <li>Enables faster development of custom e-commerce applications</li>
                <li>Reduces duplication of effort across projects</li>
                <li>Provides a consistent, reusable, and extensible foundation</li>
                <li>Designed as a product, not a one-time project</li>
            </ul>
        `,
        role: `
            Core Developer <br/>
            Contributed to the architecture and development of the core platform using Next.js. Implemented the modular service-based structure to ensure scalability and reusability across multiple e-commerce instances.
        `,
    },
    {
        title: 'Microservices Ecosystem',
        slug: 'microservices-ecosystem',
        techStack: ['Node.js', 'Laravel', 'Microservices', 'Express.js', 'Redis'],
        thumbnail: '/projects/microservices-ecosystem.png',
        longThumbnail: '/projects/microservices-ecosystem.png',
        images: [
            '/projects/microservices-ecosystem.png',
            '/projects/microservices-chatbox-1.png',
            '/projects/microservices-chatbox-2.png',
            '/projects/microservices-chatbox-3.png',
            '/projects/microservices-chatbox-4.png',
        ],
        liveUrl: '',
        year: 2023,
        description: `
            The platform is built as a microservices-based ecosystem, where each core functionality is developed as an independent, reusable service. This approach ensures flexibility, scalability, and easy maintenance across all applications and products. <br/><br/>

            <strong>Authentication Microservice</strong>
            <ul>
                <li>Manages secure user login across all applications</li>
                <li>Uses a custom Single Sign-On (SSO) mechanism</li>
                <li>Allows users to access multiple platforms with a single login</li>
                <li>Centralizes authentication for consistency and security</li>
            </ul>

            <strong>Cipher – Authorization Microservice</strong>
            <ul>
                <li>Acts as the central authorization service for the ecosystem</li>
                <li>Manages user roles, permissions, and access rules</li>
                <li>Provides verified user details to applications and services</li>
                <li>Ensures users can access only authorized features and data</li>
                <li>Enables consistent role-based access across all platforms</li>
            </ul>

            <strong>Payment Centralization Microservice</strong>
            <ul>
                <li>Serves as a unified payment layer for all applications</li>
                <li>Centralizes transaction handling and payment validation</li>
                <li>Supports integration with POS machines and digital payment systems</li>
                <li>Includes Ezetap integration for POS-based payments</li>
                <li>Ensures secure, consistent, and auditable payment processing</li>
            </ul>

            <strong>Asset Management Microservice</strong>
            <ul>
                <li>Manages and configures digital assets such as images and media files</li>
                <li>Centralized upload, storage, and organization of assets</li>
                <li>Supports asset editing, updating, and replacement</li>
                <li>Enables reuse of assets across multiple applications and services</li>
                <li>Ensures visual consistency and easy content maintenance</li>
            </ul>

            <strong>Echo – Communication Microservice</strong>
            <ul>
                <li>Handles sending and monitoring of SMS and email notifications</li>
                <li>Supports both high-bandwidth and low-bandwidth delivery modes</li>
                <li>Manages traffic and delivery queues during peak loads</li>
                <li>Provides status tracking and delivery monitoring</li>
            </ul>

            <strong>Pendulum – Data Integration Microservice</strong>
            <ul>
                <li>Streamlines data transfer between different projects and applications</li>
                <li>Acts as a controlled bridge for inter-project data exchange</li>
                <li>Ensures data consistency and synchronization across systems</li>
                <li>Reduces duplication and manual data handling</li>
                <li>Supports scalable integration as new projects are added</li>
            </ul>

            <strong>Flyport – Hardware Integration Microservice</strong>
            <ul>
                <li>Enables integration with hardware devices used in jewellery inventory</li>
                <li>Supports devices such as weighing machines and related equipment</li>
                <li>Captures and transfers hardware-generated data into the system</li>
                <li>Ensures accurate, real-time inventory updates</li>
                <li>Provides a standardized interface for adding new hardware devices</li>
            </ul>

            <strong>Inkwhiz – Reporting & Export Microservice</strong>
            <ul>
                <li>Handles exporting of reports and graphical representations</li>
                <li>Supports standard and extensible export formats</li>
                <li>Enables data visualization outputs for analysis and audits</li>
                <li>Ensures consistent reporting across all applications</li>
            </ul>

            <strong>E-Reminder – Reminder & Notification Microservice</strong>
            <ul>
                <li>Manages reminder scheduling and automated notifications</li>
                <li>Supports event-based and time-based reminders</li>
                <li>Delivers notifications through integrated communication channels</li>
                <li>Ensures important tasks, deadlines, and follow-ups are not missed</li>
            </ul>

            <strong>Chatbox – Conversational Interface Microservice</strong>
            <ul>
                <li>Enables chatbot integration across applications</li>
                <li>Provides automated responses and guided user interactions</li>
                <li>Improves user engagement and support availability</li>
                <li>Can be extended for AI-driven assistance and workflows</li>
            </ul><br/>

            <strong>Overall Benefits</strong>
            <ul>
                <li>Clear separation of responsibilities across services</li>
                <li>Plug-and-play addition or removal of features</li>
                <li>Reusable services across multiple products</li>
                <li>Improved scalability, reliability, and long-term maintainability</li>
            </ul>
        `,
        role: `
            Backend Developer <br/>
            Designed and implemented the microservices architecture using Node.js. Developed core services for authentication, authorization, and payments, ensuring robust security and seamless communication between services.
        `,
    },
    {
        title: 'Spark - Inventory Management',
        slug: 'spark',
        techStack: [
            'React.js',
            'Node.js',
            'MySQL',
            'QR Code',
            'Tailwind CSS',
        ],
        thumbnail: '',
        longThumbnail: '',
        images: [],
        liveUrl: '',
        year: 2024,
        description: `
            The Stock Management Project is designed to manage and track inventory across the entire jewellery manufacturing lifecycle, ensuring transparency and accuracy at every stage. <br/><br/>

            <strong>Key Features</strong>
            <ul>
                <li>Manage stock across multiple inventory stages: Incoming stock, Holding stock, Outgoing stock</li>
                <li>Track raw materials used for making ornaments</li>
                <li>Assign a unique QR code to each stock item</li>
                <li>Use QR code scanning to: Transfer stock from one stage to the next, Record movement history accurately</li>
            </ul>

            <strong>Stock Tracking & Control</strong>
            <ul>
                <li>Ensures proper and authorized transfer of stock between stages</li>
                <li>Maintains a complete movement trail for every stock item</li>
                <li>Helps identify delays, mismatches, or incorrect transfers</li>
            </ul>

            <strong>Reports & Monitoring</strong>
            <ul>
                <li>Generate daily, weekly, and monthly reports</li>
                <li>Monitor stock flow and transfer accuracy</li>
                <li>Supports audits and internal reviews</li>
            </ul>

            <strong>Purchase Order Management</strong>
            <ul>
                <li>Generate and request purchase orders</li>
                <li>Track purchase order documents and status</li>
                <li>Maintain records until the order is fully settled</li>
            </ul><br/>

            <strong>Overall Benefits</strong>
            <ul>
                <li>Improves inventory transparency and accountability</li>
                <li>Reduces manual errors in stock handling</li>
                <li>Enables better planning and control of jewellery production</li>
                <li>Supports smooth coordination between departments</li>
            </ul>
        `,
        role: `
            Full-Stack Developer <br/>
            Developed the end-to-end stock tracking system using Next.js and MongoDB. Integrated QR code generation and scanning features for real-time inventory updates and movement tracking.
        `,
    },
    {
        title: 'Diamond for Everyone',
        slug: 'diamond-for-everyone',
        techStack: [
            'React.js',
            'Laravel',
            'Tailwind CSS',
            'PWA',
        ],
        thumbnail: '/projects/dfe-1.png',
        longThumbnail: '/projects/dfe-1.png',
        images: [
            '/projects/dfe-1.png',
            '/projects/dfe-2.png',
            '/projects/dfe-3.png',
        ],
        liveUrl: 'https://dfe.sunnydiamonds.com/',
        year: 2024,
        description: `
            Diamond for Everyone is a dedicated digital portal for requesting and managing an instalment-based diamond jewellery purchase plan. It is designed to make diamond ownership more accessible through flexible and transparent payment options. <br/><br/>

            <strong>Key Features</strong>
            <ul>
                <li>Customer portal for requesting enrolment in the Diamond for Everyone plan</li>
                <li>Structured instalment plans for diamond jewellery purchases</li>
                <li>Integrated payment system for instalment collection</li>
                <li>Support for online and digital payment methods</li>
                <li>Track payment progress and remaining instalments</li>
                <li>Transparent view of plan details, terms, and status</li>
            </ul>

            <strong>Payment & Accessibility</strong>
            <ul>
                <li>Secure payment integration for instalment collections</li>
                <li>Automated updates on payment completion and due amounts</li>
                <li>Available in PWA (Progressive Web App) mode for: Mobile-like experience, Offline access to basic information, Easy installation on mobile devices</li>
            </ul><br/>

            <strong>Overall Benefits</strong>
            <ul>
                <li>Makes diamond jewellery affordable through instalments</li>
                <li>Simplifies payment tracking and plan management</li>
                <li>Improves customer convenience and engagement</li>
                <li>Offers a modern, app-like experience without app installation</li>
            </ul>
        `,
        role: `
            Frontend Developer <br/>
            Built the customer-facing portal using Next.js and PWA technologies to ensure seamless access across devices. Implemented the instalment tracking dashboard and secure payment integration.
        `,
    },
    {
        title: 'Tally Exchanger',
        slug: 'tally-exchanger',
        techStack: [
            'Laravel',
            'Livewire',
            'MySQL',
        ],
        thumbnail: '/projects/tally-exchanger-1.png',
        longThumbnail: '/projects/tally-exchanger-1.png',
        images: [
            '/projects/tally-exchanger-1.png',
            '/projects/tally-exchanger-2.png',
            '/projects/tally-exchanger-3.png',
        ],
        liveUrl: '',
        year: 2024,
        description: `
            Tally Exchanger is an intermediate application designed to manage and monitor data exchange between the Price Engine ERP and Tally. It acts as a controlled bridge to ensure accurate and consistent entry flow between both systems. <br/><br/>

            <strong>Key Functions</strong>
            <ul>
                <li>Manages data transfer between Price Engine ERP and Tally</li>
                <li>Monitors entries to ensure successful synchronization</li>
                <li>Validates and controls data before it is exchanged</li>
                <li>Maintains consistency across financial and pricing records</li>
            </ul>

            <strong>Operational Control</strong>
            <ul>
                <li>Tracks the status of data entries and exchanges</li>
                <li>Helps identify failures or mismatches in transfers</li>
                <li>Ensures reliable communication between systems</li>
            </ul><br/>

            <strong>Overall Benefits</strong>
            <ul>
                <li>Reduces manual intervention and errors</li>
                <li>Improves reliability of ERP–Tally integration</li>
                <li>Ensures accurate accounting and pricing data</li>
                <li>Acts as a safeguard layer between critical systems</li>
            </ul>
        `,
        role: `
            Backend Developer <br/>
            Developed the middleware application using Node.js to bridge ERP and Tally systems. Implemented data validation logic and synchronization monitoring to ensure error-free financial data transfer.
        `,
    },
    {
        title: 'Disburse',
        slug: 'disburse',
        techStack: [
            'Laravel',
            'Lumen',
            'Livewire',
            'MySQL',
            'Tailwind CSS',
        ],
        thumbnail: '',
        longThumbnail: '',
        images: [],
        liveUrl: '',
        year: 2023,
        description: `
            Disburse is a centralized fund request and reimbursement management application designed to handle financial requests from multiple departments within an organization. It provides complete visibility and control over fund flow and reimbursements, under the supervision of the Finance Manager. <br/><br/>

            <strong>Key Features</strong>
            <ul>
                <li>Department-wise fund request submission</li>
                <li>Workflow-based approval and reimbursement process</li>
                <li>Centralized tracking of all fund requests and disbursements</li>
                <li>Real-time monitoring of fund status and utilization</li>
                <li>Clear visibility into pending, approved, and settled requests</li>
            </ul>

            <strong>Financial Control & Supervision</strong>
            <ul>
                <li>Entire application is supervised by the Finance Manager</li>
                <li>Ensures compliance with internal financial policies</li>
                <li>Maintains accountability and transparency across departments</li>
            </ul><br/>

            <strong>Overall Benefits</strong>
            <ul>
                <li>Simplifies inter-department fund management</li>
                <li>Reduces manual paperwork and delays</li>
                <li>Improves financial tracking and audit readiness</li>
                <li>Enhances transparency and control over organizational expenses</li>
            </ul>
        `,
        role: `
            Full-Stack Developer <br/>
            Built the fund management system using Laravel and Livewire. Implemented the approval workflow engine and financial reporting dashboard.
        `,
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Software Engineer (Web & Mobile Applications)',
        company: 'Trois Infotech Private Limited, Trivandrum',
        duration: 'Oct 2024 - Present',
    },
    {
        title: 'FullStack Developer',
        company: 'SPR Digital Lab LLP, Kochi',
        duration: 'Nov 2021 - Aug 2024',
    },
    {
        title: 'Software Developer Intern',
        company: 'Invoid Systems Private Limited, Calicut',
        duration: 'Sep 2020 - Aug 2021',
    },
];
