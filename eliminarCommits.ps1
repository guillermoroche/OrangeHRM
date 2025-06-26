# Paso 1: Cambiar a la rama principal
git checkout main

# Paso 2: Crear una rama huérfana sin historial
git checkout --orphan nueva-raiz

# Paso 3: Añadir todos los archivos y hacer un nuevo commit
git add .
git commit -m "Nuevo inicio del repositorio"

# Paso 4: Borrar la rama principal antigua si existe y es distinta de la actual
try {
    git branch -D main
} catch {
    Write-Host "La rama 'main' no se pudo eliminar (puede que ya esté activa o no exista)."
}

# Paso 5: Renombrar la nueva rama como 'main'
# Solo si no existe ya
$branchExists = git branch --list main
if (-not $branchExists) {
    git branch -m main
} else {
    Write-Host "La rama 'main' ya existe. No se renombró."
}

# Paso 6: Forzar el push
git push --force origin main
