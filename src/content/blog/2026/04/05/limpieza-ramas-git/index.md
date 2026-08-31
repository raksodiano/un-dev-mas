---
title: 'Limpia tus ramas de Git automáticamente con scripts'
slug: '2026/04/05/limpieza-ramas-git'
description: 'Aprende a limpiar ramas de Git de forma manual y automática. Desde comandos básicos con grep y xargs, hasta un script completo para limpiar múltiples proyectos con estructuras de directorios complejas.'
pubDate: '2026-04-05'
tags: ['Git', 'Bash', 'Linux', 'Scripting']
coverImage: './blog-post-2026-04-05.png'
---

## Introducción

Si alguna vez trabajaste en un proyecto con metodologías ágiles, sabes que al final de cada sprint llega el momento de la limpieza. Es ese momento donde necesitas empezar "fresco" para el siguiente ciclo, sin ramas obsoletas que te confunda, sin código muerto acumulándose, y sin el miedo de hacer un `git merge` en la rama equivocada.

La solución rápida que muchos usan es simple pero tediosa: respaldar las variables de entorno, eliminar el proyecto, volver a clonar, instalar dependencias y restaurar las variables. Funciona, no voy a negarlo. Pero con el tiempo las cosas se complican: más proyectos, más variables de entorno, más ramas para limpiar, y muchas cosas que no puedes pasar por alto.

Y cuando tienes 10, 15, o más proyectos activos... estar uno a uno ejecutando esa acción es una perdida innecesaria de tiempo.

Con el pasar de los años, me he encontrado creando varias acciones simples para ayudarme en el camino con todo lo que regularmente me encuentro. He llegado a manejar una cantidad importante de proyectos y no puedo estar uno a uno ejecutando scripts de terminal que me van a hacer perder el tiempo.

## Limpiando ramas en un proyecto

Cuando empezamos a eliminar ramas, la forma más básica es usar la línea de comandos:

```bash
git checkout otra-rama
git branch -D nombre-rama
```

Esto funciona perfecto si solo trabajaste en una rama: hiciste tu funcionalidad, la mergiaste, cambiaste a otra rama y la eliminaste. Fin de la historia.

El problema aparece cuando el proyecto crece. Los requerimientos suben, los Pull Requests se acumulan, y de repente tienes ramas que nunca mergiaste, ramas de otros desarrolladores que ya no existen en el repositorio remoto, y un listado de 30+ ramas que no sabes cuáles sirven y cuáles no.

Ahí es donde la terminal se vuelve tu mejor amiga. Con `xargs` y `grep` puedes eliminar múltiples ramas al mismo tiempo, filtrando exactamente lo que necesitas borrar.

`grep` es un filtro que busca patrones específicos en el texto. En nuestro caso, nos permite encontrar exactamente las ramas que queremos eliminar basándonos en un patrón, como por ejemplo todas las ramas que contengan cierta palabra o que empiecen con un prefijo específico.

`xargs` toma la salida de un comando y la convierte en argumentos para otro. Es decir, si `grep` nos devuelve una lista de nombres de ramas, `xargs` se encarga de pasarle cada uno de esos nombres a `git branch -D` para que los elimine.

> Si quieres saber más sobre estos comandos, te recomiendo que leas su manual en la terminal. Es tan fácil como ejecutar `man grep` o `man xargs`.

Por ejemplo, si quieres eliminar todas las ramas excepto `main` y `dev`, puedes usar este comando:

```bash
git branch | grep -vE "main|dev" | xargs git branch -D
```

Vamos a ver qué hace cada parte:

- `git branch` - Lista todas las ramas locales de tu repositorio
- `grep -vE "main|dev"` - Filtra esa lista, excluyendo las ramas que contengan "main" o "dev":
  - Sin `-E` ni `-v`: `grep "main"` solo mostraría las ramas que contengan "main"
  - Con `-E`: Permite usar expresiones regulares para buscar múltiples patrones a la vez (en este caso "main" o "dev"). Si solo aplicáramos `-E` sin `-v`, nos mostraría solo lo que coincida con la búsqueda
  - Con `-v`: Invierte el filtro. Sin `-v`, `grep` mostraría las ramas que coinciden con "main" o "dev". Con `-v`, nos muestra todo lo que NO coincide con esos patrones, es decir, todo lo "distinto" a la búsqueda
- `xargs git branch -D` - Toma la salida de `grep` y se la pasa a `git branch -D` para eliminar cada una de esas ramas:
  - `xargs` toma cada nombre de rama y lo convierte en el argumento que `git branch -D` necesita, ejecutando algo como `git branch -D nombre-rama` para cada una
  - Básicamente, `xargs` actúa como un puente: recibe la lista filtrada de ramas y la transforma en los argumentos que `git branch -D` necesita. Sin `xargs`, tendríamos que pasar cada nombre de rama manualmente.

Con esto, podemos fácilmente trabajar en una cantidad pequeña de proyectos. Si tienes el autocompletado en la terminal o incluso tienes las recomendaciones dentro de tu terminal, solo movernos dentro de cada uno es relativamente fácil y simple. Nos ayuda a limpiar rápidamente las ramas dentro de uno o varios proyectos en los que estuvimos trabajando.

## Limpiando múltiples proyectos

Cuando vamos avanzado en el dominio de la terminal, a veces dejamos de lado cosas como los `cd ..` infinitos. Es decir, cuando queremos subir dos o tres directorios, siempre hacemos `cd ..`, pero luego conocemos cosas como `cd ../../..` para subir varios niveles a la vez. A veces creamos alias para acortar las veces que tecleamos, porque a veces podemos ser algo "flojos" al momento de escribir.

Tomando esa idea, es algo molesto estar haciendo `cd proyecto1`, ejecutar la línea de la sección anterior, luego `cd ..` o incluso `cd ../..`, y después `cd proyecto2`, y así sucesivamente.

Sin embargo, cuando ya manejamos dentro de un directorio varios proyectos y necesitamos limpiar todas las ramas, es algo tedioso estar haciendo lo mismo por una cantidad de tiempo considerable. Para ello, podemos hacer algo también usando la terminal.

Para esto, podemos usar un comando que itere por todos los directorios dentro de nuestro directorio de proyectos y aplique la limpieza en cada uno:

```bash
for dir in ~/proyectos/*/; do (cd "$dir" && git branch | grep -vE "main|dev" | xargs git branch -D 2>/dev/null); done
```

Vamos a ver qué hace cada parte:

- `for dir in ~/proyectos/*/` - Itera por cada directorio dentro de ~/proyectos/
- `(cd "$dir" && ...)` - Entra en cada directorio y ejecuta el comando entre paréntesis
- `git branch | grep -vE "main|dev" | xargs git branch -D` - El mismo comando de limpieza que vimos anteriormente
- `2>/dev/null` - Redirige los mensajes de error al "olvido" para que no aparezcan en pantalla

De esta manera, con un solo comando podemos limpiar todas las ramas de todos los proyectos que tengamos en nuestro directorio de proyectos.

### Comando en una línea

Si prefieres tener el comando listo para ejecutar en cualquier momento:

```bash
for dir in ~/proyectos/*/; do (cd "$dir" && git branch | grep -vE "main|dev" | xargs git branch -D 2>/dev/null); done
```

### Script organizado

Si prefieres tener un script más legible y fácil de mantener, puedes guardarlo en un archivo:

```bash
#!/bin/bash

# Directorio donde están tus proyectos
PROJECTS_DIR="$HOME/proyectos"

# Ramas a excluir (separadas por |)
EXCLUDE_BRANCHES="main|dev"

for dir in "$PROJECTS_DIR"/*/; do
    echo "Limpiando ramas en: $dir"
    (cd "$dir" && git branch | grep -vE "$EXCLUDE_BRANCHES" | xargs git branch -D 2>/dev/null)
done
```

Este script tiene las ventajas de:

- Ser más legible y fácil de entender
- Permitir cambiar fácilmente el directorio de proyectos
- Permitir agregar o quitar ramas a excluir sin modificar la lógica
- Mostrar en qué proyecto estamos trabajando antes de limpiar

## Estructuras de directorios más complejas

Ahora bien, si eres un freelance como algunos amigos y conocidos, o incluso eres alguien ordenado como yo, dentro de tu directorio de proyectos puedes tener el orden que gustes. Pero muy posiblemente aquí te tocaría hacer algo como:

```bash
cd grupo1
./limpiar-ramas.sh
cd ..
cd grupo2
./limpiar-ramas.sh
cd ..
```

Y así sucesivamente.

O incluso tienes algo más complejo como:

```
trabajo/
├── empresa1/
│   ├── grupo1/
│   │   ├── proyecto-api/
│   │   └── proyecto-web/
│   ├── grupo2/
│   │   ├── app-mobile/
│   │   └── dashboard/
│   └── grupo3/
│       └── backend/
├── empresa2/
│   ├── grupo1/
│   │   ├── ecommerce/
│   │   └── landing-page/
│   └── grupo2/
│       └── cms/
└── empresa3/
    └── grupo1/
        └── intranet/
```

En ese caso, la cosa se complica un poco más, pero la terminal siempre tiene una solución.

En este caso, la solución la podemos llevar a cabo llevando el código anterior un nivel más allá. Podemos extrapolarlo con selección de directorios, validaciones de directorios o subdirectorios, recorridos completos y complejos, según sea tu caso. El código lo puedes ajustar como gustes.

De hecho, durante años he estado usando este script que he ido ajustando poco a poco, ya que me he encontrado con varios casos particulares o se lo he facilitado a algunos amigos y ellos lo han modificado a como han querido y necesitado en su flujo de trabajo. Para ello, terminé creando el siguiente script:

El script completo lo puedes encontrar en mi repositorio de GitHub: [raksodiano/.scripts - git-branch-cleanup](https://github.com/raksodiano/.scripts/tree/main/git-branch-cleanup)

### Opciones del script

El script cuenta con varias opciones que le permiten adaptarse a diferentes necesidades:

| Opción | Descripción                                                          |
| ------ | -------------------------------------------------------------------- |
| **-o** | Eliminar ramas remotas del origin (no solo locales)                  |
| **-d** | Directorio base donde comenzar a buscar (default: directorio actual) |
| **-e** | Ramas adicionales a excluir (separadas por coma)                     |
| **-p** | Patrón de ramas a excluir (regex)                                    |
| **-x** | Directorios a excluir de la búsqueda (ej: "node_modules,vendor")     |
| **-r** | Profundidad de búsqueda en subdirectorios (default: 1)               |
| **-m** | Remote(s) a usar (default: origin)                                   |
| **-n** | Modo dry-run (simula sin eliminar)                                   |
| **-i** | Confirmación interactiva antes de eliminar                           |
| **-l** | Guardar salida en un archivo de log                                  |
| **-h** | Mostrar mensaje de ayuda                                             |

### Ramas excluidas por defecto

- main
- master
- staging
- dev

**Nota:** Al momento de eliminar las ramas, el script siempre se cambia a una rama segura (main, master, dev o staging) antes de proceder con la limpieza.

### Ejemplos de uso

Limpiar ramas en el directorio actual:

```bash
./git-branch-cleanup.sh
```

Limpiar ramas en un path específico:

```bash
./git-branch-cleanup.sh -d /path/to/repos
```

Dry-run con eliminación de ramas remotas:

```bash
./git-branch-cleanup.sh -o -e "branch1,branch2" -n
```

Buscar más profundo en subdirectorios y excluir directorios específicos:

```bash
./git-branch-cleanup.sh -d /projects -r 2 -x "node_modules,vendor"
```

Eliminar ramas remotas con patrón de exclusión:

```bash
./git-branch-cleanup.sh -o -p "feature/.*|hotfix/.*" -i
```

## Siguientes pasos

Estos son algunos de los métodos y herramientas que utilizo para mantener mis proyectos ordenados. Si te interesa ver más scripts como este, no dudes en revisar mi GitHub. ¡Nos vemos en el próximo post!

> **Recuerda:** _Benditos sean los que comparten su código, porque de ellos será el reino del software libre_
