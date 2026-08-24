import os
from PIL import Image

public_dir = r"E:\Apex orion\public"
folders = [f for f in os.listdir(public_dir) if os.path.isdir(os.path.join(public_dir, f)) and f != 'team']

for folder in folders:
    folder_path = os.path.join(public_dir, folder)
    images = [f for f in os.listdir(folder_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    images.sort() # Sort alphabetically to process them in order
    for idx, filename in enumerate(images):
        file_path = os.path.join(folder_path, filename)
        
        # Determine new name: foldername.webp (or foldername-1.webp, etc if multiple)
        safe_folder_name = folder.replace(' ', '-').lower()
        if len(images) == 1:
            new_filename = f"{safe_folder_name}.webp"
        else:
            new_filename = f"{safe_folder_name}-{idx+1}.webp"
            
        webp_path = os.path.join(folder_path, new_filename)
        
        try:
            img = Image.open(file_path)
            
            # Compress & resize
            if img.width > 1200:
                ratio = 1200 / float(img.width)
                new_height = int((float(img.height) * float(ratio)))
                img = img.resize((1200, new_height), Image.Resampling.LANCZOS)
                
            # If image has alpha but needs to be saved properly
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
                
            img.save(webp_path, 'WEBP', quality=80)
            print(f"Compressed and renamed: {file_path} -> {webp_path}")
            
            # Delete original
            os.remove(file_path)
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
