
from rembg import remove
from PIL import Image
import io
import os

input_path = 'public/brain-3d.png'
output_path = 'public/brain-3d-transparent.png'

# Check if input file exists
if not os.path.exists(input_path):
    print(f"Error: {input_path} not found.")
    exit(1)

with open(input_path, 'rb') as i:
    with open(output_path, 'wb') as o:
        input_image = i.read()
        output_image = remove(input_image)
        o.write(output_image)

print(f"Successfully processed {input_path} to {output_path}")
