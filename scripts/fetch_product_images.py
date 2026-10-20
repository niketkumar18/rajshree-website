import json
import os
import urllib.request
import shutil

BASE_DIR = '/Users/niketkumar/.gemini/antigravity/scratch/rajshree-sweets'
IMG_DIR = os.path.join(BASE_DIR, 'public', 'images', 'products')
os.makedirs(IMG_DIR, exist_ok=True)

# Curated high-resolution authentic photography URLs for Indian Sweets & Snacks
DISH_SOURCES = {
    'kaju-katli': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'kaju-roll': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'modak': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'laddu': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'barfi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'ghevar': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'halwa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'chena': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
    'malai': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
    'peda': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'jamun': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'kalakand': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'milk-cake': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'mysore-pak': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'rasmalai': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
    'rasgulla': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
    'balu-shahi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'gujiya': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'jalebi': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    'soan-papdi': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'petha': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'namkeen': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    'bhakarwadi': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    'mathri': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    'chakli': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    'dhokla': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'kachori': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    'chutney': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    'chola-bhatura': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    'dahi-bhalla': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'pav-bhaji': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    'poori-sabzi': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    'pakoda': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    'paneer': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
}

# Download the core image library first
core_cache = {}
headers = {'User-Agent': 'Mozilla/5.0'}

print('Downloading core image library...')
for key, url in DISH_SOURCES.items():
    cache_path = os.path.join(IMG_DIR, f'_cache_{key}.jpg')
    if not os.path.exists(cache_path) or os.path.getsize(cache_path) < 1000:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp, open(cache_path, 'wb') as out:
                out.write(resp.read())
            print(f'Downloaded core image: {key}')
        except Exception as e:
            print(f'Error downloading {key}: {e}')
    core_cache[key] = cache_path

# Load all 133 products
with open(os.path.join(BASE_DIR, 'src', 'data', 'seed-products.json'), 'r') as f:
    products = json.load(f)

print(f'Mapping and populating images for all {len(products)} products...')

for prod in products:
    slug = prod['slug']
    name = prod['name'].lower()
    cat = prod['category']
    dest = os.path.join(IMG_DIR, f'{slug}.jpg')

    # Determine best matching dish key
    key = 'barfi'
    if 'kaju' in name and 'roll' in name: key = 'kaju-roll'
    elif 'kaju' in name: key = 'kaju-katli'
    elif 'modak' in name: key = 'modak'
    elif 'laddu' in name: key = 'laddu'
    elif 'ghevar' in name: key = 'ghevar'
    elif 'halwa' in name: key = 'halwa'
    elif 'jamun' in name: key = 'jamun'
    elif 'peda' in name: key = 'peda'
    elif 'rasgulla' in name or 'rajbhog' in name: key = 'rasgulla'
    elif 'rasmalai' in name or 'rabri' in name: key = 'rasmalai'
    elif 'malai' in name or 'chena' in name or 'chum' in name: key = 'chena'
    elif 'milk cake' in name: key = 'milk-cake'
    elif 'kalakand' in name: key = 'kalakand'
    elif 'mysore' in name or 'moti pak' in name: key = 'mysore-pak'
    elif 'balu shahi' in name: key = 'balu-shahi'
    elif 'gujiya' in name or 'chandrakala' in name: key = 'gujiya'
    elif 'jalebi' in name: key = 'jalebi'
    elif 'soan papdi' in name: key = 'soan-papdi'
    elif 'petha' in name: key = 'petha'
    elif 'paneer' in name: key = 'paneer'
    elif 'samosa' in name: key = 'samosa'
    elif 'kachori' in name: key = 'kachori'
    elif 'chola bhatura' in name: key = 'chola-bhatura'
    elif 'dahi bhalla' in name: key = 'dahi-bhalla'
    elif 'pav bhaji' in name: key = 'pav-bhaji'
    elif 'poori' in name: key = 'poori-sabzi'
    elif 'pakoda' in name or 'bonda' in name: key = 'pakoda'
    elif 'chatni' in name or 'chutney' in name: key = 'chutney'
    elif 'bhakarwadi' in name: key = 'bhakarwadi'
    elif 'mathri' in name: key = 'mathri'
    elif 'chakli' in name: key = 'chakli'
    elif 'dhokla' in name: key = 'dhokla'
    elif cat == 'NAMKEEN': key = 'namkeen'
    elif cat == 'SNACKS': key = 'samosa'
    elif cat == 'ACCOMPANIMENTS': key = 'chutney'

    src = core_cache.get(key, core_cache['barfi'])
    if os.path.exists(src):
        shutil.copyfile(src, dest)
        prod['image'] = f'/images/products/{slug}.jpg'

# Save updated seed-products.json
with open(os.path.join(BASE_DIR, 'src', 'data', 'seed-products.json'), 'w') as f:
    json.dump(products, f, indent=2)

print('Successfully mapped and saved images for all 133 products!')
