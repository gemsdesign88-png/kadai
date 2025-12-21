import os

def remove_runtime_from_client_components(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".tsx") or file.endswith(".ts"):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                
                if '"use client"' in content or "'use client'" in content:
                    if "export const runtime = 'edge';" in content:
                        print(f"Removing runtime from {path}")
                        new_content = content.replace("export const runtime = 'edge';", "")
                        with open(path, 'w') as f:
                            f.write(new_content)

if __name__ == "__main__":
    remove_runtime_from_client_components("src/app/dashboard")
