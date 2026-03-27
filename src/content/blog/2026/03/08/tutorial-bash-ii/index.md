---
title: 'Tutorial Bash II: Operadores, Condicionales y Bucles'
slug: '2026/03/08/tutorial-bash-ii'
description: 'Aprende los operadores, estructuras condicionales y bucles en Bash para crear scripts más complejos y automatizar tareas en Linux.'
pubDate: '2026-03-08'
tags: ['Bash', 'Linux', 'Scripting']
coverImage: './blog-post-2026-03-08.png'
---

## Introducción

En este tutorial continuamos explorando **Bash**, profundizando en aspectos fundamentales del scripting: operadores, estructuras condicionales y bucles. Estos elementos son esenciales para escribir scripts robustos y automatizar tareas en sistemas Unix/Linux.

> La curiosidad es el motor del aprendizaje. Cada problema resuelto te acerca un paso más a dominar Bash.

## Operadores

En Bash tenemos operadores matemáticos, de comparación y lógicos. Estos nos permiten realizar diversas validaciones según los distintos escenarios que puedan surgir en nuestros scripts.

### Operadores Matemáticos

Usados para realizar operaciones aritméticas básicas.

| Nombre         | Operador | Ejemplo              |
| -------------- | -------- | -------------------- |
| Suma           | +        | echo $(( 1 + 1 ))    |
| Resta          | -        | echo $(( 1 - 1 ))    |
| Multiplicación | \*       | echo $(( 2 \* 2 ))   |
| División       | /        | echo $(( 10 / 2 ))   |
| Módulo         | %        | echo $(( 5 % 2 ))    |
| Potencia       | \*\*     | echo $(( 2 \*\* 3 )) |
| Incremento     | ++       | ((x++))              |
| Decremento     | --       | ((x--))              |

### Operadores de Comparación

Usados para comparar números o cadenas, comúnmente en estructuras condicionales.

| Nombre        | Operador | Ejemplo           |
| ------------- | -------- | ----------------- |
| Igual         | -eq      | [ "$a" -eq "$b" ] |
| Distinto      | -ne      | [ "$a" -ne "$b" ] |
| Menor que     | -lt      | [ "$a" -lt "$b" ] |
| Menor o igual | -le      | [ "$a" -le "$b" ] |
| Mayor que     | -gt      | [ "$a" -gt "$b" ] |
| Mayor o igual | -ge      | [ "$a" -ge "$b" ] |

### Operadores Lógicos

Permiten combinar múltiples condiciones.

| Nombre   | Operador | Ejemplo                       |
| -------- | -------- | ----------------------------- |
| Negación | !        | [ ! "$a" = "$b" ]             |
| AND      | -a       | [ "$a" -gt 5 -a "$b" -lt 10 ] |
| OR       | -o       | [ "$a" -gt 5 -o "$b" -lt 10 ] |

## Condicionales

Las estructuras condicionales permiten que tus scripts tomen decisiones basadas en si una condición es verdadera o falsa.

### if

El comando **if** se utiliza para evaluar condiciones dentro de un script. Si la condición es verdadera, se ejecuta el bloque de código contenido en el **if**.

La sintaxis básica es:

```bash
if [ condición ]; then
   # instrucciones si la condición es verdadera
fi
```

**Ejemplo práctico:**

```bash
#!/bin/bash

echo -n "Ingresa tu edad: "
read edad

if [ $edad -gt 17 ]; then
  echo "Eres mayor de edad"
fi

echo "Fin del script"
```

### else

El **else** permite ejecutar otro bloque de código cuando la condición anterior no se cumple.

```bash
if [ condición ]; then
   # instrucciones si la condición es verdadera
else
   # instrucciones si es falsa
fi
```

**Ejemplo:**

```bash
#!/bin/bash

echo -n "Ingresa tu edad: "
read edad

if [ $edad -gt 17 ]; then
  echo "Eres mayor de edad"
else
  echo "Eres menor de edad"
fi

echo "Fin del script"
```

### elif

El **elif** evalúa una nueva condición cuando la anterior no se cumple, permitiendo validar múltiples condiciones de manera secuencial.

```bash
if [ condición1 ]; then
    # si condición1 es verdadera
elif [ condición2 ]; then
    # si condición2 es verdadera
else
    # si ninguna se cumple
fi
```

**Ejemplo:**

```bash
#!/bin/bash

echo -n "Ingresa tu edad: "
read edad

if [ $edad -lt 0 ]; then
  echo "La edad no puede ser negativa"

elif [ $edad -gt 17 -a $edad -lt 60 ]; then
  echo "Eres mayor de edad"

elif [ $edad -ge 60 ]; then
  echo "Eres adulto mayor"

else
  echo "Eres menor de edad"
fi

echo "Fin del script"
```

### case

La estructura **case** permite realizar comparaciones de patrones. Se define una variable y los diferentes valores que puede tomar.

```bash
case $variable in
  patron1)
    # instrucciones
    ;;
  patron2)
    # instrucciones
    ;;
  *)
    # por defecto
    ;;
esac
```

**Ejemplo:**

```bash
#!/bin/bash

echo -n "Ingresa el nombre de un animal: "
read animal

case $animal in
  "gato")
    echo "Es un felino doméstico"
    ;;
  "perro")
    echo "Es el mejor amigo del hombre"
    ;;
  "oso")
    echo "Es un animal salvaje"
    ;;
  *)
    echo "Animal no reconocido"
    ;;
esac
```

> **Nota**: Las comparaciones en **case** son sensibles a mayúsculas y minúsculas. "gato", "Gato" y "GATO" son valores diferentes.

## Bucles

Los bucles son estructuras que permiten ejecutar un bloque de comandos repetidamente mientras se cumpla una condición. Son fundamentales para automatizar tareas repetitivas.

### For

El bucle **for** recorre una lista o un rango, ejecutando el mismo bloque de código para cada elemento.

```bash
for variable in lista/rango
do
  # instrucciones
done
```

**Ejemplo - Recorrer una lista:**

```bash
#!/bin/bash

animales="perro gato conejo elefante tigre"

for animal in $animales
do
  echo "Animal: $animal"
done
```

**Ejemplo - Recorrer un rango:**

```bash
#!/bin/bash

for i in {1..10}
do
  echo "Iteración: $i"
done
```

### While

El bucle **while** se ejecuta mientras una condición sea verdadera. Es útil cuando no sabemos de antemano cuántas veces necesitamos iterar.

```bash
while [ condición ]
do
  # instrucciones
done
```

**Ejemplo:**

```bash
#!/bin/bash

i=1

while [ $i -le 10 ]
do
  echo "Hola x$i"
  ((i++))
done
```

### Until

El bucle **until** es similar a **while**, pero se ejecuta hasta que la condición sea verdadera (es decir, mientras la condición sea falsa).

```bash
until [ condición ]
do
  # instrucciones
done
```

**Ejemplo:**

```bash
#!/bin/bash

i=1

until [ $i -ge 11 ]
do
  echo "Hola x$i"
  ((i++))
done
```

### Control de Bucles

Los bucles infinitos pueden surgir si la condición nunca se cumple. Por fortuna, existen herramientas para controlarlos.

#### Break

La instrucción **break** permite salir del bucle antes de que termine normalmente.

```bash
#!/bin/bash

i=1

while [ true ]; do
  echo "Número: $i"

  if [ $i -eq 5 ]; then
    echo "¡Llegamos a 5! Terminando..."
    break
  fi

  ((i++))
done
```

> **Información**: Para detener un bucle infinito manualmente, usa `Ctrl + C`.

#### Continue

La instrucción **continue** salta la iteración actual y pasa a la siguiente.

```bash
#!/bin/bash

i=1

until [ $i -gt 10 ]; do
  if [ $i -eq 5 ]; then
    ((i++))
    continue
  fi

  echo "Número: $i"
  ((i++))
done
```

> **Información**: En el ejemplo anterior, la línea `Número: 5` no aparecerá porque se salta esa iteración.

## Conclusión

En este tutorial cubrimos los operadores matemáticos, de comparación y lógicos en Bash, junto con las estructuras condicionales (`if`, `else`, `elif`, `case`) y los diferentes tipos de bucles (`for`, `while`, `until`), incluyendo el control de flujo con `break` y `continue`.

Estos fundamentos te permitirán escribir scripts más complejos y automatizar tareas de manera eficiente. Te invito a practicar con los ejemplos proporcionados y a experimentar por tu cuenta.

> **Pensamiento final**
>
> Que tus scripts siempre encuentren su `PATH`,
> y que jamás te falte un buen `grep` para encontrar sentido entre las líneas.
>
> **Recuerda:** _"Benditos sean los que comparten su código, porque de ellos será el reino del software libre"_
