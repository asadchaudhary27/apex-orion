import json

projects = [
    {
        "id": "3d-tile-visualizer-&-calculator",
        "title": "3D Tile Visualizer & Calculator",
        "category": "Web Application",
        "description": "An interactive 3D visualizer and calculator for tiles.",
        "tags": ["React", "3D", "WebGL"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-teal-500 to-emerald-300",
        "imageUrl": "/3d tile visualizer & calculator/3d-tile-visualizer-&-calculator-1.webp",
        "internalLink": True
    },
    {
        "id": "acme-skill",
        "title": "Acme Skill",
        "category": "Corporate Platform",
        "description": "Professional learning and skills development platform.",
        "tags": ["React", "UI/UX", "Education"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-purple-500 to-pink-300",
        "imageUrl": "/Acme skill/acme-skill-1.webp",
        "internalLink": True
    },
    {
        "id": "chicken-mashwi-pos",
        "title": "Chicken Mashwi POS",
        "category": "POS System",
        "description": "Customized point-of-sale system for Chicken Mashwi.",
        "tags": ["Desktop", "Electron", "POS"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-orange-500 to-red-400",
        "imageUrl": "/Chicken mashwi pos/chicken-mashwi-pos-1.webp",
        "internalLink": True
    },
    {
        "id": "chicken-mashwi-web",
        "title": "Chicken Mashwi Web",
        "category": "Web Experience",
        "description": "Online food ordering and digital menu platform for Chicken Mashwi.",
        "tags": ["React", "E-commerce"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-red-500 to-orange-300",
        "imageUrl": "/Chicken mashwi web/chicken-mashwi-web-1.webp",
        "internalLink": True
    },
    {
        "id": "eduka",
        "title": "Eduka",
        "category": "EdTech Platform",
        "description": "Modern educational management system and portal.",
        "tags": ["EdTech", "React", "Dashboard"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-blue-500 to-cyan-300",
        "imageUrl": "/eduka/eduka-1.webp",
        "internalLink": True
    },
    {
        "id": "marhaba-home",
        "title": "Marhaba Home",
        "category": "Real Estate",
        "description": "Premium real estate and property showcase platform.",
        "tags": ["Real Estate", "Next.js"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-stone-500 to-gray-300",
        "imageUrl": "/Marhaba Home/marhaba-home-1.webp",
        "internalLink": True
    },
    {
        "id": "oye-biryani",
        "title": "Oye Biryani",
        "category": "Food Delivery",
        "description": "Appetizing food delivery platform for Oye Biryani.",
        "tags": ["Restaurant", "Delivery"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-amber-600 to-yellow-400",
        "imageUrl": "/oye biryani/oye-biryani-1.webp",
        "internalLink": True
    },
    {
        "id": "pollus",
        "title": "Pollus",
        "category": "Business Solution",
        "description": "Business management and analytics dashboard.",
        "tags": ["Analytics", "Dashboard"],
        "bentoSpan": "col-span-1 lg:col-span-1 row-span-1",
        "accentColor": "from-indigo-500 to-blue-400",
        "imageUrl": "/pollus/pollus-1.webp",
        "internalLink": True
    }
]

with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'r') as f:
    content = f.read()

import re

# Insert new projects to array
projects_str = ""
for p in projects:
    projects_str += f"""  {{
    id: '{p['id']}',
    title: '{p['title']}',
    category: '{p['category']}',
    description: '{p['description']}',
    tags: {json.dumps(p['tags'])},
    bentoSpan: '{p['bentoSpan']}',
    accentColor: '{p['accentColor']}',
    imageUrl: '{p['imageUrl']}',
    internalLink: true
  }},
"""

content = content.replace("export const PROJECTS_DATA: ProjectData[] = [", "export const PROJECTS_DATA: ProjectData[] = [\n" + projects_str)

# Modify ProjectData interface
content = content.replace("  link?: string;", "  link?: string;\n  internalLink?: boolean;")

# Add Link import if not present
if "import { Link } from 'react-router-dom';" not in content:
    content = content.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport { Link } from 'react-router-dom';")

# Modify the view project button to use Link
old_button = """                <span className="text-[#FF5722] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1 relative z-20">
                  <span>View Project</span>
                  <Code2 className="w-3.5 h-3.5" />
                </span>"""

new_button = """                {project.internalLink ? (
                  <Link to={/project/} className="text-[#FF5722] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1 relative z-20">
                    <span>View Project</span>
                    <Code2 className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-[#FF5722] font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1 relative z-20">
                    <span>View Project</span>
                    <Code2 className="w-3.5 h-3.5" />
                  </span>
                )}"""

content = content.replace(old_button, new_button)

with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'w') as f:
    f.write(content)

print("Updated ProjectsGrid.tsx")
