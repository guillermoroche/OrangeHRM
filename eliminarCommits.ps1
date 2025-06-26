# ✅ Reinicia completamente el historial Git, dejando solo el estado actual como un nuevo commit

# Paso 1: Asegúrate de estar en la rama principal
git checkout main || git checkout master

# Paso 2: Crea una rama huérfana sin historial
git checkout --orphan nueva-raiz

# Paso 3: Añade todos los archivos al nuevo commit
git add .
git commit -m "Nuevo inicio del repositorio"

# Paso 4: Borra la rama principal antigua (usa 'main' o 'master' según tu caso)
git branch -D main 2>/dev/null || git branch -D master

# Paso 5: Renombra la nueva rama como 'main'
git branch -m main

# Paso 6: Fuerza el push al repositorio remoto
git push --force origin main
