import { ElementType } from 'react';
import { ShoppingCart, Users, Package, DollarSign, BarChart, Settings, Car, CreditCard, Shield, Utensils, TrendingUp, Menu, Truck, Calculator } from 'lucide-react';

export interface SoftwareDetailSection {
  title: string;
  icon: ElementType;
  features: { name: string; description: string }[];
}

export interface SoftwareDetailData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  sections: SoftwareDetailSection[];
  gallery: string[];
}

export const SOFTWARE_DETAILS: Record<string, SoftwareDetailData> = {
  'apexpure-pos': {
    id: 'apexpure-pos',
    name: 'ApexPure POS',
    tagline: 'Comprehensive Point of Sale & Inventory Management for Water Delivery.',
    description: 'Designed specifically for water delivery and retail businesses. ApexPure handles everything from walk-in sales to route deliveries, stock tracking, and customer credit—all with 100% offline capability.',
    gradient: 'from-blue-600 to-[#06b6d4]',
    gallery: [
      // Fallback/Placeholders until real ones are connected
      '/placeholder-pos-1.jpg',
      '/placeholder-pos-2.jpg',
      '/placeholder-pos-3.jpg',
    ],
    sections: [
      {
        title: 'Sales & Invoicing',
        icon: ShoppingCart,
        features: [
          { name: 'Counter Sales', description: 'Fast checkout for both walk-in customers and registered account customers.' },
          { name: 'Delivery Sales', description: 'Route-based delivery screen to bulk-process deliveries for all customers on that route at once (tracking empties returned, cash collected, and credit given).' },
          { name: 'Digital Receipts', description: 'Automatically generates itemized digital receipts showing subtotals, custom additional charges, and discounts. Share via WhatsApp or PDF.' }
        ]
      },
      {
        title: 'Customer & Accounts Management',
        icon: Users,
        features: [
          { name: 'Credit & Dues Tracking', description: 'Automatically tracks balances. If a customer pays less than the total, the remaining amount is added to their dues.' },
          { name: 'Bottle Tracking', description: 'Keeps an exact count of how many physical company bottles (empties) are currently being held by each customer.' },
          { name: 'Transaction History', description: 'Detailed ledger for every customer showing past sales and payments. Mistakes are easily corrected with an auto-adjusting Delete function.' }
        ]
      },
      {
        title: 'Inventory & Stock Control',
        icon: Package,
        features: [
          { name: 'Full & Empty Tracking', description: 'Distinctly tracks full bottles ready for sale and empty bottles returned from customers.' },
          { name: 'Low Stock Alerts', description: 'Set custom threshold warnings (e.g., alert when 19L bottles fall below 10 units).' },
          { name: 'Multi-Tier Pricing', description: 'Each item can have three different prices: Counter Price, Delivery Price, and Cost Price.' },
          { name: 'Stock Adjustments', description: 'Allows managers to manually add new stock or write off damaged bottles.' }
        ]
      },
      {
        title: 'Cash & Expense Management',
        icon: DollarSign,
        features: [
          { name: 'Daily Closing', description: 'Tally up the physical cash drawer at the end of the day, compare it against system sales, subtract daily expenses, and close the shift.' },
          { name: 'Expense Tracking', description: 'Record daily business expenses (fuel, vehicle maintenance, meals) so they accurately reflect against your daily profit.' }
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
          { name: 'PIN-Based Login', description: 'Fast, secure login using a 4-digit PIN for staff, with role-based access control (Owners can see reports, Cashiers cannot).' },
          { name: 'Route Management', description: 'Group customers into geographical routes to make delivery dispatches easier.' },
          { name: '100% Offline Capable', description: 'The entire database runs locally on the computer. It does not require an active internet connection to process sales, check inventory, or view reports.' }
        ]
      }
    ]
  },
  'veloce': {
    id: 'veloce',
    name: 'Veloce Car Rental',
    tagline: 'Comprehensive car rental management and booking system.',
    description: 'Veloce is a robust, 100% offline-capable software designed to streamline car rental businesses. From fleet tracking and customer profiles to automated invoicing and dynamic PDF generation, Veloce puts you in complete control.',
    gradient: 'from-orange-600 to-[#FF5722]',
    gallery: [
      '/placeholder-veloce-1.jpg',
      '/placeholder-veloce-2.jpg',
      '/placeholder-veloce-3.jpg',
    ],
    sections: [
      {
        title: 'Fleet Management',
        icon: Car,
        features: [
          { name: 'Full CRUD', description: 'Add, Edit, Delete, and View vehicles with ease.' },
          { name: 'Customizable Details', description: 'Easily type or select the Category, Fuel Type, Transmission, Make, Model, Year, Seats, Daily Rate, and Mileage.' },
          { name: 'Live Status Tracking', description: 'Mark vehicles as Available, Rented, or Under Maintenance.' },
          { name: 'Search & Filtering', description: 'Instantly filter your fleet by name, make, or status.' }
        ]
      },
      {
        title: 'Customer Management',
        icon: Users,
        features: [
          { name: 'Customer Profiles', description: 'Add, Edit, and Delete clients. Store Name, Email, Phone Number, and Address.' },
          { name: 'Profile Photos', description: 'Upload profile photos (avatars) for your clients, or let the system generate colorful initials automatically.' },
          { name: 'History Tracking', description: 'View their total rentals and total money spent.' }
        ]
      },
      {
        title: 'Payments & Invoicing',
        icon: CreditCard,
        features: [
          { name: 'Invoice Creation', description: 'Create, Edit, and Delete bills/invoices directly in the app.' },
          { name: 'Custom Statuses', description: 'Track whether an invoice is Paid, Pending, Refunded, or Overdue.' },
          { name: 'Dynamic PDF Generation', description: 'One-click export to a professional PDF invoice. The PDF automatically reads your company name, address, contact info, and custom logo from your settings!' }
        ]
      },
      {
        title: 'Admin Settings & Customization',
        icon: Settings,
        features: [
          { name: 'Company Profile', description: 'Update your company name, email, phone number, operating hours, and address.' },
          { name: 'Logo Uploader', description: 'Upload your own company logo which will automatically stamp onto your generated PDFs.' },
          { name: 'Dynamic Color Themes', description: 'Change the look and feel of the entire software on the fly! Choose from Veloce Orange, Ocean Blue, Emerald Green, Royal Purple, or Crimson Red.' },
          { name: 'Data Backups', description: 'Toggle automated local database backups to prevent data loss.' }
        ]
      },
      {
        title: 'Architecture & Security',
        icon: Shield,
        features: [
          { name: 'Fully Offline Capable', description: 'The software runs 100% locally on your Windows machine without needing an internet connection.' },
          { name: 'Robust Local Database', description: 'Powered by a local SQLite engine that saves directly to your user folder, ensuring lightning-fast load times and extreme privacy.' },
          { name: 'Standalone Installer', description: 'Delivered as a standard .exe file that can be easily installed on any modern Windows PC.' }
        ]
      }
    ]
  },
  'apexrestu-pos': {
    id: 'apexrestu-pos',
    name: 'ApexRestu POS',
    tagline: 'High-performance restaurant POS featuring live recipe costing, rider management, and dynamic receipt printing.',
    description: 'Designed exclusively for the fast-paced restaurant industry, ApexRestu streamlines your entire operation—from dynamic menu and table management to deep ingredient cost analysis and offline closing.',
    gradient: 'from-rose-600 to-pink-500',
    gallery: [
      '/placeholder-restu-1.jpg',
      '/placeholder-restu-2.jpg',
      '/placeholder-restu-3.jpg',
    ],
    sections: [
      {
        title: 'Point of Sale (POS) Interface',
        icon: Utensils,
        features: [
          { name: 'Order Processing', description: 'Create Dine-In, Takeaway, and Delivery orders.' },
          { name: 'Cart Management', description: 'Add items, adjust quantities, add order-specific notes, and apply item-level discounts.' },
          { name: 'Payment Handling', description: 'Process payments (Cash, Card, etc.), calculate change, and mark orders as paid or unpaid.' },
          { name: 'Dynamic Receipts', description: 'Automatically generate and print fully customized receipts with dynamic headers, footers, logos, tax IDs, and optional customer/cashier details.' }
        ]
      },
      {
        title: 'Dashboard & Analytics',
        icon: TrendingUp,
        features: [
          { name: 'Sales Overview', description: 'View total sales, daily revenue, and active orders at a glance.' },
          { name: 'Performance Metrics', description: 'Track the most popular items, peak hours, and general business performance.' }
        ]
      },
      {
        title: 'Menu Management',
        icon: Menu,
        features: [
          { name: 'Product Catalog', description: 'Add, edit, and categorize menu items.' },
          { name: 'Pricing & SKUs', description: 'Manage item prices, SKUs, and availability status.' }
        ]
      },
      {
        title: 'Stock & Inventory Management',
        icon: Package,
        features: [
          { name: 'Ingredient Tracking', description: 'Maintain a database of raw ingredients and their current stock levels.' },
          { name: 'Daily Reconciliation', description: 'Alerts and workflows to ensure stock is checked and deductions (like waste or daily usage) are recorded daily.' }
        ]
      },
      {
        title: 'Recipe Cost Calculator',
        icon: Calculator,
        features: [
          { name: 'Margin Analysis', description: 'Link ingredients to specific menu items to calculate the exact cost to produce a dish.' },
          { name: 'Profitability', description: 'Automatically calculate profit margins based on the raw ingredient cost versus the selling price.' }
        ]
      },
      {
        title: 'Rider & Delivery Management',
        icon: Truck,
        features: [
          { name: 'Rider Profiles', description: 'Manage delivery personnel, including their contact info, vehicle details, and creation/update history.' },
          { name: 'Delivery Assignment', description: 'Assign specific delivery orders to riders and track delivery charges.' }
        ]
      },
      {
        title: 'Expense Tracking & End of Day',
        icon: DollarSign,
        features: [
          { name: 'Daily Expenses', description: 'Log day-to-day shop expenses (e.g., utility bills, supplies, petty cash) for accurate profit calculations.' },
          { name: 'Closing Sheet', description: 'Generate a comprehensive Closing Sheet that calculates total revenue, subtracts recorded expenses, and determines final cash-in-drawer.' }
        ]
      },
      {
        title: 'Advanced Shop Settings & Architecture',
        icon: Settings,
        features: [
          { name: 'Receipt Customization', description: 'A live-preview editor to customize exactly what prints on the thermal receipts (supports 58mm & 80mm printers).' },
          { name: 'Security & Auto-heal', description: 'Secure the system with a PIN code, perform encrypted database backups, and run automated health checks.' },
          { name: '100% Offline Desktop App', description: 'Built with an embedded SQLite database, packaged as a standalone Windows .exe, running entirely offline.' }
        ]
      }
    ]
  }
};
