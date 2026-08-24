with open('e:/Apex orion/src/data/softwareDetails.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace apexpure gallery
old_apexpure = """    gallery: [
      // Fallback/Placeholders until real ones are connected
      '/placeholder-pos-1.jpg',
      '/placeholder-pos-2.jpg',
      '/placeholder-pos-3.jpg',
    ],"""
new_apexpure = """    gallery: [
      '/Apexpure/apexpure-1.webp',
      '/Apexpure/apexpure-2.webp',
      '/Apexpure/apexpure-3.webp',
    ],"""
content = content.replace(old_apexpure, new_apexpure)

# Replace apexrestu gallery
old_apexrestu = """    gallery: [
      '/ApexRestu POS/apexrestu-pos-1.webp',
      '/ApexRestu POS/apexrestu-pos-2.webp',
      '/ApexRestu POS/apexrestu-pos-3.webp',
    ],"""
new_apexrestu = """    gallery: [
      '/Apexrestu/apexrestu-1.webp',
      '/Apexrestu/apexrestu-2.webp',
      '/Apexrestu/apexrestu-3.webp',
    ],"""
content = content.replace(old_apexrestu, new_apexrestu)

with open('e:/Apex orion/src/data/softwareDetails.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated softwareDetails.tsx")
