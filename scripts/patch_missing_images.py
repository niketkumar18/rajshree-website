import os
import urllib.request
import shutil
import json

BASE_DIR = '/Users/niketkumar/.gemini/antigravity/scratch/rajshree-sweets'
IMG_DIR = os.path.join(BASE_DIR, 'public', 'images', 'products')

specific_urls = {
    'rasgulla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Rasgulla_%28Indian_sweet%29.jpg/640px-Rasgulla_%28Indian_sweet%29.jpg',
    'rasmalai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rasmalai_at_Sweet_Bengal.jpg/640px-Rasmalai_at_Sweet_Bengal.jpg',
    'paneer': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Paneer_cubes.jpg/640px-Paneer_cubes.jpg',
    'chena': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Chomchom_sweet.jpg/640px-Chomchom_sweet.jpg',
}

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'}

for k, url in specific_urls.items():
    p = os.path.join(IMG_DIR, f'_cache_{k}.jpg')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(p, 'wb') as out:
            out.write(resp.read())
        print(f'Successfully downloaded {k}')
    except Exception as e:
        print(f'Error on {k}: {e}')

with open(os.path.join(BASE_DIR, 'src', 'data', 'seed-products.json'), 'r') as f:
    products = json.load(f)

for p in products:
    slug = p['slug']
    name = p['name'].lower()
    dest = os.path.join(IMG_DIR, f'{slug}.jpg')

    target_cache = None
    if 'rasgulla' in name or 'rajbhog' in name:
        target_cache = os.path.join(IMG_DIR, '_cache_rasgulla.jpg')
    elif 'rasmalai' in name or 'rabri' in name:
        target_cache = os.path.join(IMG_DIR, '_cache_rasmalai.jpg')
    elif 'paneer' in name:
        target_cache = os.path.join(IMG_DIR, '_cache_paneer.jpg')
    elif 'chena' in name or 'chum' in name or 'malai' in name:
        target_cache = os.path.join(IMG_DIR, '_cache_chena.jpg')

    if target_cache and os.path.exists(target_cache):
        shutil.copyfile(target_cache, dest)
        p['image'] = f'/images/products/{slug}.jpg'

with open(os.path.join(BASE_DIR, 'src', 'data', 'seed-products.json'), 'w') as f:
    json.dump(products, f, indent=2)

print('Updated seed-products with specific chena/rasmalai/paneer images')
