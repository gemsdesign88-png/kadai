import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Remove all occurrences of export const runtime = ...
    content = re.sub(r"export const runtime = ['\"]edge['\"];?\n?", "", content)
    
    # Add it back at the top, but after 'use client' if it exists
    if "'use client'" in content or '"use client"' in content:
        # Find the end of the 'use client' line
        match = re.search(r"(['\"]use client['\"];?\n?)", content)
        if match:
            end_pos = match.end()
            content = content[:end_pos] + "export const runtime = 'edge';\n" + content[end_pos:]
        else:
            content = "export const runtime = 'edge';\n" + content
    else:
        content = "export const runtime = 'edge';\n" + content
    
    with open(filepath, 'w') as f:
        f.write(content)

dashboard_dir = 'src/app/dashboard'
for root, dirs, files in os.walk(dashboard_dir):
    for file in files:
        if file == 'page.tsx':
            fix_file(os.path.join(root, file))

# Also fix other dynamic routes
other_files = [
    'src/app/[tableBarcode]/page.tsx',
    'src/app/order/[tableBarcode]/page.tsx',
    'src/app/founder/page.tsx',
    'src/app/icon.tsx'
]

for filepath in other_files:
    if os.path.exists(filepath):
        fix_file(filepath)
