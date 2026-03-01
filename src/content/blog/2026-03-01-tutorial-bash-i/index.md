---
title: 'Tutorial Bash I'
slug: 'tutorial-bash-i'
description: 'Una guía fundamental sobre Bash: desde su definición como intérprete y lenguaje de scripting hasta la gestión básica de variables y entrada/salida de datos.'
pubDate: '2026-03-01'
updatedDate: '2026-03-01'
tags: ['Bash', 'Linux', 'Scripting']
coverImage: './blog-post-2026-03-01.png'
---

## Introducción

Bienvenidos a esta guía introductoria sobre **Bash**. Contrario a lo que se suele pensar, Bash no es solo una [shell](<https://es.wikipedia.org/wiki/Shell_(inform%C3%A1tica)>), sino también un potente lenguaje de scripting. Esta versatilidad lo convierte en una herramienta esencial para cualquier desarrollador o administrador de sistemas.

A lo largo de este artículo, encontrarán enlaces a recursos externos como Wikipedia. Considero que desarrollar la capacidad de investigación y lectura crítica es fundamental en el ámbito de la informática y el desarrollo de software.

## ¿Qué es Bash?

**Bash** es un intérprete de comandos para sistemas **Unix/Linux**, además de un lenguaje de scripting que permite interactuar con el sistema operativo mediante instrucciones escritas en la terminal. Fue desarrollado por [Brian Fox](<https://es.wikipedia.org/wiki/Brian_Fox_(programador)>) para el proyecto [GNU](https://es.wikipedia.org/wiki/Proyecto_GNU), con el objetivo de reemplazar al clásico shell [Bourne](https://es.wikipedia.org/wiki/Bourne_Shell).

Su nombre es un acrónimo de _Bourne-again shell_, un juego de palabras que hace referencia al shell que sustituye y al concepto de "renacimiento" (_Born-again_).

**Bash** es el intérprete predeterminado en la gran mayoría de las distribuciones GNU/Linux y ofrece una amplia gama de funcionalidades:

- Compatibilidad con el shell tradicional [Bourne](https://es.wikipedia.org/wiki/Bourne_Shell) (sh).
- Capacidad para ejecutar comandos, desarrollar scripts complejos, gestionar procesos y personalizar el entorno de ejecución.
- Características avanzadas como autocompletado, historial de comandos extendido, gestión de variables, funciones y control de trabajos (_job control_).

## Formas de uso: Interactivo vs. No interactivo

Podemos distinguir dos modos principales de operación en **Bash**: el modo **interactivo** y el **no interactivo**.

### Modo interactivo

Es el modo que empleamos al introducir comandos manualmente desde la terminal, ejecutándolos uno por uno. Por ejemplo:

```bash
[usuario@localhost ~]$ ls -la
```

### Modo no interactivo

En este modo, Bash ejecuta una serie de instrucciones predefinidas en un archivo (script). El script se ejecuta de forma secuencial sin requerir intervención constante del usuario. Por ejemplo:

```bash
[usuario@localhost ~]$ ./build_project.sh
```

## Creación de tu primer script

Para comenzar, utilizaremos un editor de texto plano. Puedes elegir cualquiera que esté disponible en tu sistema, como **Vim**, **Nano**, o incluso editores con interfaz gráfica si lo prefieres.

> **Recomendación**: Es buena práctica organizar tus scripts en un directorio específico y utilizar la extensión `.sh`.
>
> Mantener un entorno de trabajo ordenado facilita la gestión de tus proyectos y evita la pérdida de archivos.
>
> **Ejemplo de estructura inicial**:
>
> ```sh
> mkdir -p Workspace/scripts/bash    # Creación del directorio
> cd Workspace/scripts/bash          # Cambio al directorio de trabajo
> touch primer_script.sh             # Creación del archivo de script
> ```

> **Nota**: Para que un archivo sea ejecutable, es necesario asignarle los permisos adecuados:
>
> ```sh
> chmod +x primer_script.sh       # Asigna permisos de ejecución
> ./primer_script.sh              # Ejecución del script
> ```

### Estructura básica: El Shebang

Todo script de Bash debe comenzar con el **shebang** (`#!`), seguido de la ruta al intérprete. Esto indica al sistema operativo qué programa debe usar para procesar las instrucciones del archivo.

```bash
#!/bin/bash
```

> **Nota Técnica**: Existen otros intérpretes disponibles, cada uno con sus propias características y limitaciones:
>
> ```sh
> #!/bin/sh    # Bourne Shell (estándar básico)
> #!/bin/zsh   # Z Shell (extensión de Bash con extras)
> ```
>
> Por consistencia en este tutorial, nos enfocaremos exclusivamente en **Bash**.

### Ejemplo: Hola Mundo

A continuación, presentamos un ejemplo básico que muestra texto en la terminal:

```bash
#!/bin/bash

echo "Hola Mundo"

# Salida: Hola Mundo
```

## Fundamentos de Programación en Bash

Dominar un lenguaje requiere comprender sus pilares fundamentales. A continuación, exploraremos los conceptos esenciales para construir scripts robustos.

### Comentarios

Los comentarios son vitales para la documentación del código. El intérprete los ignora durante la ejecución, permitiendo a los desarrolladores incluir explicaciones sobre la lógica implementada.

Una buena práctica de documentación facilita el mantenimiento del script a largo plazo.

#### Comentarios de una sola línea

Se utiliza el carácter `#`. Todo lo que se escriba después de este símbolo en la misma línea será ignorado.

```bash
#!/bin/bash

# Este es un comentario que describe la función del script
echo "Hola Mundo" # También se pueden añadir comentarios al final de una instrucción
```

#### Comentarios multi-línea (HereDoc)

Aunque Bash no dispone de una sintaxis nativa para comentarios multi-línea como otros lenguajes, se puede emplear la técnica **HereDoc** (`<<`) para este fin. Esta técnica permite redirigir bloques de texto. Si no se asocia a ningún comando, el bloque actúa como un comentario.

```bash
#!/bin/bash

<< 'COMMENT'
Este bloque de texto
actúa como un comentario
de varias líneas.
COMMENT

echo "Ejecución del script"
```

Por convención, se suelen utilizar delimitadores en mayúsculas como `EOF` o `COMMENT`.

### Variables

Las variables son contenedores para almacenar datos que serán utilizados a lo largo del script. En Bash, hay reglas importantes para su definición:

1.  **Nombres**: Deben comenzar con una letra o guion bajo (`_`). No pueden empezar con números ni contener caracteres especiales (excepto el guion bajo).
2.  **Sensibilidad a mayúsculas (_Case Sensitive_)**: Bash distingue entre `mi_variable` y `MI_VARIABLE`.
3.  **Asignación**: No debe haber espacios alrededor del signo igual (`=`).

Ejemplo de uso:

```bash
#!/bin/bash

# Declaración y asignación
mensaje="Hola"

# Uso de la variable mediante el símbolo $
echo $mensaje

# Salida: Hola
```

> **Nota**: Utilizar nombres descriptivos mejora la legibilidad. Aquí algunos estándares comunes:
>
> ```bash
> # 📌 Variables de entorno (en MAYÚSCULAS por convención)
> LOGNAME="admin"
> BASE_PATH="/var/www/html"
>
> # 🧪 Variables locales (snake_case)
> nombre_archivo="reporte_ventas.txt"
> contador_usuarios=10
> es_valido=true
>
> # 🧩 Variables de configuración (prefijo CFG_)
> CFG_TIMEOUT=30
> CFG_RETRY_LIMIT=5
>
> # 🔁 Variables especiales del sistema
> echo "Nombre del script: $0"
> echo "Número de argumentos: $#"
> echo "Lista de argumentos: $@"
>
> # 🧾 Variables posicionales (argumentos recibidos)
> primer_argumento=$1
> segundo_argumento=$2
>
> # 🔒 Constantes (mediante comando readonly)
> readonly VERSION_APP="1.2.0"
> readonly MAX_CONEXIONES=100
>
> # 🐚 Exportación para subprocesos
> export API_KEY="a1b2c3d4e5f6"
> ```

> **Nota**: Bash es de tipado dinámico, lo que significa que una variable puede cambiar el tipo de dato que contiene durante la ejecución. Sin embargo, para mantener la claridad y evitar errores lógicos, se recomienda ser consistente con el propósito de cada variable.
>
> ```bash
> datos="Texto inicial"
> echo $datos          # Salida: Texto inicial
>
> datos=1024           # Válido, pero usar con precaución
> echo $datos          # Salida: 1024
> ```

### Entrada y Salida de Datos

La interacción con el usuario y la presentación de resultados son fundamentales en cualquier script.

#### Mostrar Información al Usuario (`echo`)

El comando `echo` es la herramienta estándar para imprimir texto en la terminal.

```bash
#!/bin/bash

# Uso básico
echo "Este mensaje se muestra en pantalla."

# Impresión de variables (locales y de entorno)
echo "Usuario actual: $USER"
echo "Directorio de trabajo: $PWD"

# Eliminación del salto de línea final (-n)
echo -n "Procesando... "
echo "Hecho."

# Interpretación de caracteres especiales (-e)
# \n: Salto de línea
# \t: Tabulación
echo -e "Línea 1\nLínea 2\tDato tabulado"

# Aplicación de formato (colores ANSI)
echo -e "\e[32mOperación exitosa\e[0m"

# Escape de caracteres (comillas dentro de comillas)
echo "Ejecutando el comando \"ls -la\""
```

#### Captura de Datos del Usuario (`read`)

El comando `read` permite que el script reciba información introducida por el usuario a través de la entrada estándar (teclado).

```bash
#!/bin/bash

echo "Por favor, introduzca su nombre:"
read nombre_usuario

echo "Bienvenido, $nombre_usuario"
```

El valor introducido se almacena dinámicamente en la variable especificada.

> **Tip**: Para conocer más a fondo las opciones de estos comandos, puedes consultar los manuales del sistema:
>
> ```sh
> man echo
> man read
> ```

## Conclusiones

Este artículo ha cubierto los fundamentos básicos de **Bash**, desde su definición hasta la gestión elemental de variables y comandos de entrada/salida.

La programación en Bash es una habilidad sumamente valiosa que permite automatizar tareas cotidianas y optimizar flujos de trabajo en entornos Linux. Aunque hemos abordado conceptos iniciales, la versatilidad de este lenguaje es inmensa.

En próximas entregas, exploraremos estructuras de control, funciones y técnicas avanzadas de scripting. Espero que esta introducción les sea de gran utilidad en su camino de aprendizaje técnico.

¡Hasta la próxima! 🐧✨
