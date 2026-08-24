import os

projects = [
    '3d tile visualizer & calculator',
    'Acme skill',
    'Chicken mashwi pos',
    'Chicken mashwi web',
    'eduka',
    'Marhaba Home',
    'oye biryani',
    'pollus'
]

public_dir = r"E:\Apex orion\public"

output = []
output.append("export interface ProjectDetailData {")
output.append("  id: string;")
output.append("  name: string;")
output.append("  description: string;")
output.append("  gallery: string[];")
output.append("}")
output.append("")
output.append("export const PROJECT_DETAILS: Record<string, ProjectDetailData> = {")

for p in projects:
    id_name = p.replace(' ', '-').lower()
    folder_path = os.path.join(public_dir, p)
    images = [f for f in os.listdir(folder_path) if f.endswith('.webp')]
    images.sort()
    
    gallery_str = ",\n      ".join([f"'/{(p)}/{img}'" for img in images])
    
    output.append(f"  '{id_name}': {{")
    output.append(f"    id: '{id_name}',")
    output.append(f"    name: '{p.title()}',")
    output.append(f"    description: 'Detailed showcase of {p.title()}.',")
    output.append(f"    gallery: [\n      {gallery_str}\n    ]")
    output.append("  },")

output.append("};")

with open(r"E:\Apex orion\src\data\projectDetails.tsx", "w") as f:
    f.write("\n".join(output))

print("Created projectDetails.tsx")
