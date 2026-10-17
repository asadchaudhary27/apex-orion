import { ElementType } from 'react';
import { 
  ShoppingCart, Users, Package, DollarSign, BarChart, Settings, Car, CreditCard, 
  Shield, Utensils, TrendingUp, Menu, Truck, Calculator, ChefHat, Clock, 
  MessageSquare, ShieldCheck, Lock, Smartphone, Wrench, Layers, Zap, Globe, Cpu
} from 'lucide-react';

export interface SoftwareDetailSection {
  title: string;
  icon: ElementType;
  features: { name: string; description: string }[];
}

export interface SoftwareGalleryItem {
  src: string;
  title: string;
  tag: string;
  description: string;
}

export interface SoftwareDetailData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  sections: SoftwareDetailSection[];
  gallery: (string | SoftwareGalleryItem)[];
}

export const SOFTWARE_DETAILS: Record<string, SoftwareDetailData> = {
  'apexrestu-pos': {
    id: 'apexrestu-pos',
    name: 'APEX POS - Restaurant & Retail Operating System',
    tagline: 'Enterprise-grade, 100% offline-first POS suite with KOT routing, recipe BOM food costing, and AI WhatsApp automation.',
    description: 'Built with Electron, React, TypeScript, and SQLite. APEX POS delivers sub-second front-counter billing, multi-station KOT routing, real-time recipe ingredient deductions, tamper-proof shift reconciliations, and automated WhatsApp e-receipts with zero internet lag.',
    gradient: 'from-[#FF5722] to-orange-600',
    gallery: [
      {
        src: '/Apexrestu/apexrestu-1.webp',
        title: 'Touch & F-Key POS Counter Terminal',
        tag: 'Front-Desk Billing',
        description: 'Ultra-fast counter checkout interface featuring interactive categorized visual menu grids, live cart item totals, Dine-In table status maps, and split multi-tender payment options (Cash, Card, EasyPaisa, JazzCash, and Customer Udhar).'
      },
      {
        src: '/Apexrestu/apexrestu-2.webp',
        title: 'Kitchen Display System (KDS) & Multi-Station Routing',
        tag: 'Kitchen Automation',
        description: 'Live chef order management screen displaying active tickets across progress states (Pending ➔ Cooking ➔ Ready ➔ Served), complete with color-coded late order alert timers and automated station-specific KOT routing.'
      },
      {
        src: '/Apexrestu/apexrestu-3.webp',
        title: 'Recipe Bill of Materials (BOM) & Food Costing',
        tag: 'Inventory & Profit Control',
        description: 'Deep ingredient-level recipe costing module showing exact raw material consumption (flour, chicken, cheese), real-time food cost percentages, profit margin calculations, and automated warehouse deductions upon each sale.'
      }
    ],
    sections: [
      {
        title: 'Module 1: POS Billing Terminal',
        icon: ShoppingCart,
        features: [
          { name: 'Multi-Mode Orders', description: 'Interactive Dine-In table maps, quick Takeaway counter pickup, and phone delivery booking.' },
          { name: 'Standby & Recall (Hold Bills)', description: 'Hold incomplete bills to serve the next customer in line without losing punched items.' },
          { name: 'Split & Multi-Tender Payments', description: 'Split bills across Cash, Credit Cards, EasyPaisa, JazzCash, and Customer Udhar accounts.' },
          { name: 'Item Modifiers & Prep Notes', description: 'Add kitchen prep notes (e.g., "Extra Cheese", "No Mayo") printed directly on kitchen slips.' },
          { name: 'PIN-Controlled Discounts', description: 'Percentage or fixed discounts gated behind Manager PIN authentication.' },
          { name: 'ESC/POS Thermal Printing', description: 'Direct printing to 80mm and 58mm thermal printers with automatic cash drawer kick.' }
        ]
      },
      {
        title: 'Module 2: Kitchen Automation, KOT & KDS',
        icon: ChefHat,
        features: [
          { name: 'Multi-Station Smart Routing', description: 'Automatically routes ordered items to separate kitchen stations (Grill KOT, Pizza KOT, Beverage KOT).' },
          { name: 'Duplicate Print Prevention', description: 'Prevents double KOT issuance and duplicate cooking.' },
          { name: 'Live KDS Screen', description: 'Real-time chef screen tracking orders through Pending ➔ Cooking ➔ Ready ➔ Served states.' },
          { name: 'Visual Late Timers', description: 'Color-coded alerts indicating orders exceeding target preparation times.' },
          { name: 'Audited KOT Reprinting', description: 'Tracks reprint counts, user IDs, and timestamps for every kitchen slip reprint.' }
        ]
      },
      {
        title: 'Module 3: Shift Management & Cash Handover',
        icon: Clock,
        features: [
          { name: 'Opening Float Entry', description: 'Cashiers record their initial cash float before starting shift transactions.' },
          { name: 'Automated Shift Reconciliation', description: 'Reconciles total cash, card slips, digital wallet transfers, and credit sales.' },
          { name: 'Expected vs. Counted Cash', description: 'Compares physical drawer cash against system records, computing shortages or excesses.' },
          { name: 'Dual-Signature Handover Slips', description: 'Prints 80mm shift slips requiring signatures from both cashier and manager.' }
        ]
      },
      {
        title: 'Module 4: Inventory, Recipe BOM & Food Costing',
        icon: Package,
        features: [
          { name: 'Raw vs. Finished Goods', description: 'Distinguishes raw ingredients from saleable finished menu items.' },
          { name: 'Automated Recipe BOM Deduction', description: 'Each sale deducts exact ingredient quantities from warehouse stock.' },
          { name: 'Multi-Unit Conversions', description: 'Automatic conversion between Kilograms, Grams, Liters, Milliliters, and Pieces.' },
          { name: 'Live Food Cost % & Margins', description: 'Calculates real-time production costs and gross profit margins based on supplier prices.' },
          { name: 'Wastage & Spoilage Logger', description: 'Logs spoiled, burned, or expired ingredients with mandatory reasons.' },
          { name: 'Low Stock Alerts', description: 'Threshold warnings when stock drops below minimum safety buffers.' }
        ]
      },
      {
        title: 'Module 5: Customer CRM & Digital Khata (Udhar)',
        icon: Users,
        features: [
          { name: 'Customer Profiles & History', description: 'Instant retrieval of customer purchase history, preferences, and lifetime spend.' },
          { name: 'Digital Udhar Ledger', description: 'Tracks outstanding credit balances for corporate accounts and regular patrons.' },
          { name: 'Partial & Full Settlements', description: 'Records incoming client payments with auto-updating balance ledgers.' },
          { name: 'WhatsApp & Print Statements', description: 'Exports detailed customer ledgers via thermal print or direct WhatsApp message.' },
          { name: 'Admin PIN Deletion Protection', description: 'Prevents unauthorized tampering or deletion of customer credit entries.' }
        ]
      },
      {
        title: 'Module 6: Suppliers, Purchasing & Payables',
        icon: Truck,
        features: [
          { name: 'Supplier Directory', description: 'Centralized directory for ingredient vendors, payment terms, and contact records.' },
          { name: 'Purchase Orders & GRN', description: 'Goods Receiving Notes automatically increment warehouse stock and adjust cost averages.' },
          { name: 'Accounts Payable Ledger', description: 'Tracks outstanding supplier dues, invoice dates, and payment history.' }
        ]
      },
      {
        title: 'Module 7: Delivery Fleet & Rider Tracking',
        icon: Smartphone,
        features: [
          { name: 'Order Assignment Flow', description: 'Dispatches prepared delivery orders to specific in-house riders.' },
          { name: 'COD Cash Settlement Verification', description: 'Verifies and reconciles cash-on-delivery amounts collected by riders.' },
          { name: 'Rider Shift Closing Sheets', description: 'Prints summary sheets showing completed deliveries, rider commissions, and collected cash.' }
        ]
      },
      {
        title: 'Module 8: Staff Payroll & Advances',
        icon: DollarSign,
        features: [
          { name: 'Employee Profiles', description: 'Stores staff designations, hire dates, and agreed monthly salaries.' },
          { name: 'Mid-Month Advance Tracking', description: 'Logs cash advances with automated deduction from month-end salary totals.' },
          { name: 'Salary Slip Generation', description: 'Generates itemized monthly pay slips with gross pay, advances, and net payout.' }
        ]
      },
      {
        title: 'Module 9: Daily Expenses & Petty Cash Accounting',
        icon: CreditCard,
        features: [
          { name: 'Categorized Expense Logging', description: 'Logs operational overheads like utilities, rent, maintenance, staff tea, and daily purchases.' },
          { name: 'Petty Cash Control', description: 'Accounts for every cash drawer withdrawal with notes and receipts.' },
          { name: 'True Net Profit Calculation', description: 'Computes exact net profit: Revenue minus (Recipe Ingredient Cost + Operating Expenses).' }
        ]
      },
      {
        title: 'Module 10: Reports, Analytics & Day-End Closing',
        icon: BarChart,
        features: [
          { name: '1-Click Day-End Z-Report', description: 'Comprehensive daily financial closing report available in PDF or 80mm thermal print.' },
          { name: 'Sales Trend Graphs', description: 'Visual charts illustrating hourly sales spikes, daily revenue, and monthly trajectory.' },
          { name: 'Peak Hours Heatmap', description: 'Pinpoints highest-volume hours to optimize kitchen staffing and food prep.' },
          { name: 'Top & Slow-Selling Item Analytics', description: 'Highlights high-margin bestsellers and dead stock inventory.' }
        ]
      },
      {
        title: 'Module 11: AI & WhatsApp Cloud Integration',
        icon: MessageSquare,
        features: [
          { name: 'Paperless PDF E-Receipts', description: 'Delivers branded, paperless PDF receipts directly to customer WhatsApp numbers.' },
          { name: 'Bilingual AI Ordering Agent', description: 'Processes incoming WhatsApp messages in Urdu and English to queue customer orders.' },
          { name: 'AI OCR Payment Verification', description: 'Extracts and verifies TID, amount, and timestamp from JazzCash/EasyPaisa screenshots.' },
          { name: 'Broadcast Marketing', description: 'Sends automated discount vouchers and menu updates to inactive customer segments.' }
        ]
      },
      {
        title: 'Module 12: Role-Based Access Control (RBAC) & Security',
        icon: ShieldCheck,
        features: [
          { name: '4 Pre-Configured Hierarchical Roles', description: 'Owner / Super Admin, Branch Manager, Cashier, and Waiter.' },
          { name: '50+ Granular Permissions', description: 'Fine-grained toggle controls for every button, action, and financial report.' },
          { name: 'Individual PIN Logins', description: 'Fast, secure operator switching on shared counter terminals.' },
          { name: 'Mandatory-Reason Audit Vault', description: 'Settled bill alterations strictly require Manager PIN and a recorded reason.' }
        ]
      },
      {
        title: 'Module 13: Developer Mode & Customization Engine',
        icon: Wrench,
        features: [
          { name: '25+ Toggleable Feature Flags', description: 'Hide or disable unused modules (e.g., hide KOT in retail stores) in one click.' },
          { name: 'Permanent State Persistence', description: 'Custom feature configurations persist across restarts in a secure local config store.' },
          { name: 'Password-Hashed Developer Tools', description: 'Master-password protected developer settings prevent accidental misconfigurations.' }
        ]
      }
    ]
  },
  'apexpure-pos': {
    id: 'apexpure-pos',
    name: 'ApexPure POS - Water Delivery & Plant Management',
    tagline: 'Comprehensive Point of Sale & Inventory Management for Water Delivery.',
    description: 'Designed specifically for water delivery and plant retail businesses. ApexPure handles everything from walk-in sales to batch route deliveries, physical bottle returns, and customer credit ledgers—all with 100% offline capability.',
    gradient: 'from-amber-500 to-[#FF5722]',
    gallery: [
      {
        src: '/Apexpure/apexpure-1.webp',
        title: 'Batch Route Delivery & Counter Sales Interface',
        tag: 'Distribution & Walk-in Billing',
        description: 'Specialized water delivery processing screen enabling dispatchers to bulk-process route shipments, track returned empty 19L bottles, and settle cash or credit balances on the spot.'
      },
      {
        src: '/Apexpure/apexpure-2.webp',
        title: 'Customer Bottle Ledger & Digital Khata (Udhar)',
        tag: 'Asset & Credit Security',
        description: 'Detailed customer account ledger tracking physical empty bottles held by each client, outstanding credit balances, payment settlement history, and one-click WhatsApp statement dispatch.'
      },
      {
        src: '/Apexpure/apexpure-3.webp',
        title: 'Full vs. Empty Warehouse Inventory & Shift Reconciliation',
        tag: 'Warehouse & Drawer Audit',
        description: 'Two-tier inventory control dashboard segregating full commercial water bottles from returned empty inventory with automated low-stock warnings, wastage logs, and dual-signature shift handover closing sheets.'
      }
    ],
    sections: [
      {
        title: 'Sales & Route Invoicing',
        icon: ShoppingCart,
        features: [
          { name: 'Counter Sales', description: 'Fast checkout for both walk-in customers and registered account customers.' },
          { name: 'Batch Route Deliveries', description: 'Route-based delivery screen to bulk-process deliveries for all customers on that route at once, recording empties returned, cash collected, and credit.' },
          { name: 'Digital Receipts', description: 'Generates itemized digital receipts showing subtotals, custom additional charges, and discounts. Share via WhatsApp or PDF.' }
        ]
      },
      {
        title: 'Customer & Accounts Management',
        icon: Users,
        features: [
          { name: 'Credit & Dues Tracking', description: 'Automatically tracks balances. If a customer pays less than the total, the remaining amount is added to their dues.' },
          { name: 'Physical Bottle Tracking', description: 'Keeps an exact count of how many physical company bottles (empties) are currently being held by each customer.' },
          { name: 'Transaction History', description: 'Detailed ledger for every customer showing past sales and payments with auto-adjusting correction tools.' }
        ]
      },
      {
        title: 'Inventory & Stock Control',
        icon: Package,
        features: [
          { name: 'Full & Empty Tracking', description: 'Distinctly tracks full bottles ready for sale and empty bottles returned from customers.' },
          { name: 'Low Stock Alerts', description: 'Set custom threshold warnings when water reserves or bottle inventory fall below safety buffers.' },
          { name: 'Multi-Tier Pricing', description: 'Each item can have three different prices: Counter Price, Delivery Price, and Cost Price.' },
          { name: 'Stock Adjustments', description: 'Allows managers to manually add new stock or write off damaged bottles.' }
        ]
      },
      {
        title: 'Cash & Expense Management',
        icon: DollarSign,
        features: [
          { name: 'Daily Shift Closing', description: 'Tally physical cash drawer totals, subtract recorded expenses, and generate closing audit slips.' },
          { name: 'Expense Tracking', description: 'Record daily business expenses (fuel, vehicle maintenance, meals) reflecting directly against daily profit.' }
        ]
      },
      {
        title: 'Advanced Reporting (Owner Only)',
        icon: BarChart,
        features: [
          { name: 'Sales & Profit Reports', description: 'Visual charts and breakdowns of total revenue versus actual profit (calculated using the Cost Price).' },
          { name: 'Dues Report', description: 'A master list of all outstanding customer balances to help with debt collection.' },
          { name: 'Rider Performance', description: 'Tracks how many deliveries were completed by specific routes/staff to measure employee efficiency.' },
          { name: 'Inventory Value', description: 'Calculates the total monetary value of your current stock on hand.' }
        ]
      },
      {
        title: 'Administration & Offline Capabilities',
        icon: Settings,
        features: [
          { name: 'PIN-Based Login', description: 'Fast, secure login using a 4-digit PIN for staff, with role-based access control.' },
          { name: 'Route Management', description: 'Group customers into geographical routes to streamline delivery dispatches.' },
          { name: '100% Offline Capable', description: 'The entire database runs locally on the computer with zero cloud dependency.' }
        ]
      }
    ]
  },
  'veloce': {
    id: 'veloce',
    name: 'Veloce - Car Rental & Fleet Operations Platform',
    tagline: 'Comprehensive car rental management, dynamic vehicle booking, and automated invoicing system.',
    description: 'Veloce is a robust, 100% offline-capable software designed to streamline car rental businesses. From live fleet tracking and verified customer profiles to automated invoicing and dynamic branded PDF generation, Veloce puts you in complete control.',
    gradient: 'from-orange-600 to-[#FF5722]',
    gallery: [
      {
        src: '/veloce/veloce-1.webp',
        title: 'Fleet Master Dashboard & Vehicle Status Matrix',
        tag: 'Fleet Tracking',
        description: 'Real-time vehicle availability console displaying fleet status (Available, Rented, In Maintenance) filtered by make, category, transmission type, fuel level, and mileage.'
      },
      {
        src: '/veloce/veloce-2.webp',
        title: 'Customer KYC Verification & Booking Agreement',
        tag: 'Client Profiling & Agreements',
        description: 'Client profile management with driver license scans, emergency contacts, rental history, security deposit tracking, and automated legal rental agreement generation.'
      },
      {
        src: '/veloce/veloce-3.webp',
        title: 'Automated Invoicing & Dynamic Branded PDF Generator',
        tag: 'Billing & Invoicing',
        description: 'One-click invoice creation tool generating professional, itemized PDF invoices with dynamic company branding, logos, payment terms, and status tracking (Paid, Pending, Overdue).'
      },
      {
        src: '/veloce/veloce-4.webp',
        title: 'Revenue Analytics & Scheduled Maintenance Engine',
        tag: 'Financial Performance',
        description: 'Comprehensive financial reporting showing vehicle ROI, fuel expenditures, periodic maintenance reminders, and monthly revenue performance.'
      },
      {
        src: '/veloce/veloce-5.webp',
        title: 'Theme Customizer & Local SQLite Backup Shield',
        tag: 'System Settings',
        description: 'Full administrative controls offering instant color theme switching (Orange, Blue, Emerald, Crimson), automated local SQLite snapshots, and encrypted cloud backups.'
      }
    ],
    sections: [
      {
        title: 'Fleet Management',
        icon: Car,
        features: [
          { name: 'Full Fleet Control', description: 'Add, Edit, and monitor vehicles with category, transmission, fuel, make, model, year, and rate.' },
          { name: 'Live Status Matrix', description: 'Color-coded tags marking vehicles as Available, Rented, or Under Maintenance.' },
          { name: 'Search & Filtering', description: 'Instantly filter your fleet by name, make, category, or rental availability.' }
        ]
      },
      {
        title: 'Customer Management & KYC',
        icon: Users,
        features: [
          { name: 'Verified Customer Profiles', description: 'Store driver license copies, national ID numbers, emergency contacts, and addresses.' },
          { name: 'Rental History Ledger', description: 'View total lifetime rentals, security deposit status, and total revenue per customer.' }
        ]
      },
      {
        title: 'Payments & Branded Invoicing',
        icon: CreditCard,
        features: [
          { name: 'Invoice Creation', description: 'Create and settle rental bills directly in the desktop application.' },
          { name: 'Custom Payment Statuses', description: 'Track whether an invoice is Paid, Pending, Refunded, or Overdue.' },
          { name: 'Dynamic PDF Generation', description: 'One-click export to professional PDF invoices stamped with your custom logo and company address.' }
        ]
      },
      {
        title: 'Admin Settings & Customization',
        icon: Settings,
        features: [
          { name: 'Company Profile & Logo', description: 'Update legal company name, phone numbers, and official logo.' },
          { name: 'Dynamic Color Themes', description: 'Switch between Orange, Ocean Blue, Emerald Green, and Royal Purple interfaces.' },
          { name: 'Automated Backups', description: 'Periodic local SQLite database snapshots preventing data loss.' }
        ]
      },
      {
        title: 'Architecture & Security',
        icon: Shield,
        features: [
          { name: '100% Offline Capable', description: 'Runs locally on Windows desktop without requiring internet connectivity.' },
          { name: 'Robust SQLite Database', description: 'Fast local storage saved in secure user folders, guaranteeing privacy and speed.' }
        ]
      }
    ]
  },
  'apexrx-manager': {
    id: 'apexrx-manager',
    name: 'ApexRx - Pharmacy & Healthcare Clinic Manager',
    tagline: 'Comprehensive pharmacy, dispensary, and clinic management software with prescription tracking and batch expiry control.',
    description: 'Designed exclusively for retail pharmacies, hospital dispensaries, and clinical practices. ApexRx handles barcode medicine checkout, batch inventory with expiry warnings, supplier purchase orders, and patient records with extreme precision.',
    gradient: 'from-orange-600 to-amber-600',
    gallery: [
      {
        src: '/ApexRx manager/apexrx-manager-1.webp',
        title: 'High-Speed Medicine Barcode Checkout & Prescription POS',
        tag: 'Pharmacy Counter',
        description: 'Barcode-enabled pharmaceutical billing interface with rapid drug lookup, dosage notes, alternate brand suggestions, and instant receipt printing.'
      },
      {
        src: '/ApexRx manager/apexrx-manager-2.webp',
        title: 'Batch Inventory & Real-Time Expiry Alert Engine',
        tag: 'Inventory Safety',
        description: 'Intelligent stock tracker categorizing medicines by batch number, manufacturing date, and expiration alerts—preventing expired sales and minimizing supplier returns.'
      },
      {
        src: '/ApexRx manager/apexrx-manager-3.webp',
        title: 'Patient Medical History & Doctor Prescription Archive',
        tag: 'Clinical Records (EMR)',
        description: 'Digital patient records vault logging chronic prescriptions, physician notes, dosage frequencies, and recurring order reminders.'
      },
      {
        src: '/ApexRx manager/apexrx-manager-4.webp',
        title: 'Supplier Purchase Orders & Goods Receiving (GRN)',
        tag: 'Procurement & Dues',
        description: 'Pharmaceutical vendor management system automating purchase orders, bonus stock calculations, and accounts payable reconciliation.'
      },
      {
        src: '/ApexRx manager/apexrx-manager-5.webp',
        title: 'Daily Profit Margin & Pharmacy Shift Closing Sheet',
        tag: 'Financial Auditing',
        description: 'End-of-day audit sheet calculating gross retail sales, distributor cost margins, daily clinic expenses, and final cash drawer balance.'
      }
    ],
    sections: [
      {
        title: 'Prescription & Patient Management',
        icon: Users,
        features: [
          { name: 'Patient Medical Profiles', description: 'Securely store patient medical histories, chronic conditions, and contact details.' },
          { name: 'Prescription Tracking', description: 'Log and track prescriptions with dosage frequency, doctor details, and refill reminders.' }
        ]
      },
      {
        title: 'Batch Inventory & Expiry Control',
        icon: Package,
        features: [
          { name: 'Batch & Expiry Tracking', description: 'Keep track of medicine batch numbers, expiry dates, and automated near-expiry alerts.' },
          { name: 'Stock Variance Audits', description: 'Periodic physical stock verification to reconcile loose tablets, strips, and bottles.' }
        ]
      },
      {
        title: 'Supplier Management & Purchasing',
        icon: Truck,
        features: [
          { name: 'Vendor Directory', description: 'Maintain complete records of pharmaceutical distributors, reps, and payment terms.' },
          { name: 'Purchase Orders & GRN', description: 'Record incoming medicine shipments with bonus pack calculations and cost updates.' }
        ]
      },
      {
        title: 'Financial Accounting & Shift Closing',
        icon: DollarSign,
        features: [
          { name: 'Daily Z-Reports', description: 'One-click daily revenue closing, cash drawer reconciliation, and expense tracking.' },
          { name: 'Margin Analysis', description: 'Calculate exact profit margins across generic vs. branded pharmaceutical lines.' }
        ]
      }
    ]
  },
  'custom-software': {
    id: 'custom-software',
    name: 'Bespoke Custom Software Development',
    tagline: 'Tailor-made commercial software architectures, custom business logic, and on-demand modules.',
    description: 'Need software designed specifically for your business workflow? ApexOrion Tech engineers 100% custom desktop, web, and mobile systems from scratch—including dynamic thermal invoicing engines, industrial digital scales, biometric staff authentication, multi-branch cloud syncing, and dedicated mobile apps.',
    gradient: 'from-amber-500 to-[#FF5722]',
    gallery: [
      {
        src: '/custom_software.png',
        title: 'Custom Architecture Blueprint & Business Logic',
        tag: 'Bespoke Engineering',
        description: 'Ground-up system design matching your exact company workflows, custom database schemas, and tailored departmental user permissions.'
      },
      {
        src: '/logo_transparent.png',
        title: 'White-Label Branding & Custom Domain Deployment',
        tag: 'Enterprise Identity',
        description: 'Complete white-label packaging with your organization logo, color themes, custom invoices, and dedicated desktop installer.'
      }
    ],
    sections: [
      {
        title: '1. Bespoke Feature & Module Development',
        icon: Wrench,
        features: [
          { name: 'Custom Business Logic', description: 'Workflows tailored for factories, distribution setups, wholesale marts, meat processing, and specialized clinics.' },
          { name: 'Tiered Pricing & Volume Discounts', description: 'B2B wholesale pricing, customer credit tiers, automated bundle discounts, and loyalty rules.' }
        ]
      },
      {
        title: '2. White-Labeling & Custom Branding',
        icon: ShieldCheck,
        features: [
          { name: 'Your Brand Identity', description: 'Complete removal of standard branding. Packaged with your official business name, logo, and custom color scheme.' },
          { name: 'Custom Installer Packaging', description: 'Dedicated desktop and mobile installers configured specifically for your franchise network.' }
        ]
      },
      {
        title: '3. Hardware & POS Peripheral Integrations',
        icon: Cpu,
        features: [
          { name: 'Dynamic Thermal & PDF Invoicing', description: 'High-speed automated ESC/POS thermal receipt printing, custom business tax formulas, and PDF invoice generation.' },
          { name: 'Digital Weighing Scales (Kanta)', description: 'Direct USB/RS232 connection to digital weighing scales for live barcode weight reading in grocery and butcher shops.' },
          { name: 'Biometric & RFID Readers', description: 'High-speed staff clock-in and operator authentication using fingerprint scanners and RFID card readers.' }
        ]
      },
      {
        title: '4. Multi-Branch & Central Cloud Head-Office Sync',
        icon: Globe,
        features: [
          { name: 'Franchise Network Sync', description: 'Offline-first branch terminals that automatically push sales and stock changes to a centralized cloud dashboard.' },
          { name: 'Central Menu & Price Updates', description: 'Update product prices and promotions from head-office to synchronize across all branches instantly.' }
        ]
      },
      {
        title: '5. Full-Stack Web & Mobile Applications',
        icon: Smartphone,
        features: [
          { name: 'Waiter Order-Taking Tablets', description: 'Handheld Android/iOS apps for waiters to punch orders directly at customer dining tables.' },
          { name: 'Customer Self-Ordering QR Menus', description: 'Zero-app browser menu ordering enabling customers to order and pay from their smartphones.' },
          { name: 'In-House Rider & Delivery Apps', description: 'Turnkey delivery fleet management apps eliminating high third-party aggregator commissions.' }
        ]
      }
    ]
  }
};
