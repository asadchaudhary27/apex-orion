import re

with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'r') as f:
    content = f.read()

# Find Zarco object
zarco_pattern = re.compile(r"  {\s+id:\s+'zarcostar'.*?},\n", re.DOTALL)
match = zarco_pattern.search(content)

if match:
    zarco_str = match.group(0)
    # Remove it from its current position
    content = content.replace(zarco_str, "")
    # Insert it right after the array opening
    content = content.replace("export const PROJECTS_DATA: ProjectData[] = [\n", "export const PROJECTS_DATA: ProjectData[] = [\n" + zarco_str)
    
    with open('e:/Apex orion/src/components/sections/ProjectsGrid.tsx', 'w') as f:
        f.write(content)
    print("Moved Zarco to top")
else:
    print("Could not find Zarco object")
