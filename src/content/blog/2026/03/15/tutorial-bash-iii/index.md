---
title: 'Tutorial Bash III: Funciones, Argumentos y Manejo de Errores'
slug: '2026/03/15/tutorial-bash-iii'
description: 'Aprende a crear funciones, manejar argumentos y controlar errores en Bash para escribir scripts robustos y reutilizables.'
pubDate: '2026-03-15'
tags: ['Bash', 'Linux', 'Scripting']
coverImage: './blog-post-2026-03-15.png'
---

## Introducción

En este tutorial continuamos nuestra serie sobre **Bash**, explorando conceptos esenciales para escribir scripts más sofisticados y profesionales: funciones, manejo de argumentos y control de errores. Estos temas te permitirá crear scripts reutilizables, interactivos y confiables.

> La curiosidad es el motor del aprendizaje. Cada problema resuelto te acerca un paso más a dominar Bash.

## Funciones

Las funciones son bloques de código reutilizables que nos permiten definir una lógica una sola vez y ejecutarla las veces que sean necesarias dentro de nuestros scripts. Estas funciones nos permiten estructurar mejor nuestro código, evitando la repetición y facilitando el mantenimiento.

En Bash tenemos dos formas de definir funciones:

```bash
function nombre_funcion {
  # instrucciones
}

nombre_funcion() {
  # instrucciones
}
```

Como podemos ver, dentro de las llaves `{}` definimos el bloque de código que se ejecutará cuando llamemos a la función. Dentro de las mismas podemos utilizar todo lo que hemos visto en los tutoriales anteriores.

### Ejemplo práctico

```bash
#!/bin/bash

# Definimos la función
function saludar {
  echo "Hola, esta es mi primera función"
}

# Llamado de la función
saludar
```

```bash
#!/bin/bash

mensaje() {
  echo "Esta es una función"
}

mensaje
```

> **Nota**: Las funciones deben definirse antes de llamarse en el script.

## Manejo de Argumentos

En Bash podemos utilizar argumentos para hacer nuestros scripts interactivos y reutilizables, permitiéndole al usuario pasar datos al momento de ejecutar el script.

### Variables Especiales para Argumentos

| Variable | Descripción                          |
| -------- | ------------------------------------ |
| $0       | Nombre del script                    |
| $1       | Primer argumento                     |
| $2       | Segundo argumento                    |
| $#       | Número de argumentos enviados        |
| $\*      | Todos los argumentos como una cadena |
| $@       | Todos los argumentos como array      |

```bash
#!/bin/bash

echo "Nombre del script: $0"
echo "Primer argumento: $1"
echo "Segundo argumento: $2"
echo "Número de argumentos: $#"
```

**Ejemplo de uso:**

```bash
./mi_script.sh argumento1 argumento2
```

> **Tip**: Para acceder a argumentos más allá del noveno, usa `${10}`, `${11}`, etc.

### Entrada del Usuario

También podemos solicitar información directamente al usuario mediante el comando `read`.

```bash
#!/bin/bash

echo -n "¿Cómo te llamas? "
read nombre

echo "Hola, $nombre"
```

## Control de Errores

El manejo de errores en Bash es fundamental para crear scripts confiables y fáciles de mantener.

### set

La orden `set` permite modificar el comportamiento del script para detectar errores automáticamente.

```bash
#!/bin/bash

set -x           # Imprime cada comando antes de ejecutarlo (debug)
set -e           # Termina el script si algún comando falla (exit != 0)
set -u           # Termina si usas una variable no definida
set -o pipefail  # Falla si algún comando en un pipeline falla
```

> **Recomendación**: Usa `set -euo pipefail` al inicio de tus scripts para mayor robustez.

```bash
#!/bin/bash

set -euo pipefail
```

> **Información**: La opción `-x` es útil para depuración, pero debe quitarse en producción ya que genera mucha salida.

### trap

El comando `trap` nos permite capturar señales del sistema o errores y ejecutar acciones específicas cuando ocurren. Es muy útil para limpiar archivos temporales o manejar interrupciones.

**Capturar errores:**

```bash
#!/bin/bash

set -e

trap 'echo "Ocurrió un error"; exit 1' ERR
```

**Capturar interrupción (Ctrl+C):**

```bash
#!/bin/bash

set -e

trap 'echo "Script interrumpido por el usuario"; exit 2' INT
```

**Ejemplo combinado:**

```bash
#!/bin/bash

set -euo pipefail

trap 'echo "Ocurrió un error inesperado"; exit 1' ERR
trap 'echo "Script interrumpido"; exit 2' INT

echo "Iniciando script..."
sleep 3

# Forzar un error
false

echo "Esto no se mostrará"
```

> **Información**: Si dejas el script correr, el error (código 1) se ejecutará después de 3 segundos. Si lo cancelas con `Ctrl + C` antes, ejecutará la señal de interrupción (código 2).

### Verificar el Código de Salida

Podemos verificar manualmente el código de salida de los comandos:

```bash
#!/bin/bash

cp archivo.txt /ruta/de/destino
if [ $? -ne 0 ]; then
  echo "Error al copiar el archivo"
  exit 1
fi
```

O de forma más concisa usando el operador `||`:

```bash
#!/bin/bash

cp archivo.txt /ruta/destino || {
  echo "Error al copiar el archivo"
  exit 1
}
```

### Funciones con Códigos de Error

```bash
#!/bin/bash

descargar_archivo() {
  curl -O "$1" || return 1
}

descargar_archivo "https://www.ejemplo.com" || {
  echo "Error al descargar el archivo"
  exit 1
}
```

## Conclusión

En este tutorial cubrimos tres temas fundamentales para escribir scripts profesionales en Bash:

1. **Funciones**: Para reutilizar código y estructurar mejor nuestros scripts
2. **Argumentos**: Para hacer nuestros scripts interactivos
3. **Control de errores**: Para crear scripts confiables y robustos

Estos conceptos te permitirán crear scripts más complejos y automatizar tareas de manera eficiente. Te invito a practicar con los ejemplos proporcionados y a experimentar por tu cuenta.

> **Recuerda:** _"Benditos sean los que comparten su código, porque de ellos será el reino del software libre"_
