with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("'/Chicken mashwi pos/chicken-mashwi-pos-1.webp'", "'/Apexrestu/apexrestu-1.webp'")
# Also we need to fix apexpure-pos in ProjectsGrid which had '/apexpure.png' (we can leave it as apexpure.png since it exists in public/)

with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

with open('e:/Apex orion/src/data/projectDetails.tsx', 'r', encoding='utf-8') as f:
    p_content = f.read()

p_content = p_content.replace(
    "'/Chicken mashwi pos/chicken-mashwi-pos-1.webp',\n      '/Chicken mashwi pos/chicken-mashwi-pos-2.webp',\n      '/Chicken mashwi pos/chicken-mashwi-pos-3.webp'",
    "'/Apexrestu/apexrestu-1.webp',\n      '/Apexrestu/apexrestu-2.webp',\n      '/Apexrestu/apexrestu-3.webp'"
)

with open('e:/Apex orion/src/data/projectDetails.tsx', 'w', encoding='utf-8') as f:
    f.write(p_content)

print("Fixed Chicken mashwi pos broken paths")
