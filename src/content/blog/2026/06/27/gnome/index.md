---
title: 'En defensa de Gnome'
slug: '2026/06/27/gnome'
description: 'Defiendo a Gnome, el escritorio Linux más criticado y a la vez más influyente. Por qué su filosofía de diseño sigue siendo relevante y por qué merece una oportunidad.'
pubDate: '2026-06-27'
tags: ['Gnome', 'Linux', 'Escritorio Linux']
coverImage: './blog-post-2026-06-27.png'
---

Si hay un escritorio que divide opiniones en el mundo Linux, ese es **Gnome**. Parece que no hay punto medio: o lo amas o lo odias. He visto debates interminables en redes sociales, foros y grupos donde se le acusa de todo: que si es muy simple, que si le faltan opciones, que si las extensiones rompen todo, que si **Gnome** 3 "mató" el escritorio Linux.

Llevo un par de meses usando **Gnome** como mi escritorio principal. No digo que sea perfecto -ningún escritorio lo es- pero creo que muchas de las críticas vienen de esperar algo que **Gnome** nunca quiso ser.

## La filosofía: menos es más

**Gnome** no es KDE. Y nunca lo fue. Desde **Gnome** 3, el proyecto dejó claro su rumbo: ofrecer un escritorio limpio, minimalista, centrado en la productividad y en las pantallas táctiles. Esto no es un defecto, es una decisión de diseño.

La metáfora que puedo usar en estos momentos es la de un escritorio de oficina. Puedes tener un escritorio lleno de objetos al alcance de la mano -tazas, papeles, bolígrafos, fotos, adornos- o puedes tener un escritorio con lo justo para trabajar. **Gnome** eligió ser el segundo. Y eso está bien.

El flujo de trabajo de **Gnome** está pensado para que te centres en una cosa a la vez. Las Activities te dan una vista general de todo lo que tienes abierto, los workspaces organizan tus tareas por espacio virtual, y el dash te permite acceder a tus aplicaciones favoritas sin saturar la pantalla. No hay barra de tareas con mil iconos parpadeando, no hay notificaciones constantes, no hay distracciones.

Para mí, que suelo trabajar con documentación, la terminal y el navegador al mismo tiempo, el sistema de workspaces de **Gnome** me ha resultado bastante útil. Un workspace para código, otro para documentación, otro para comunicación. Todo separado, todo accesible con un gesto o un atajo de teclado. No es que no se pueda hacer en otros escritorios, es que **Gnome** te obliga a que así sea.

## Lo que hace bien

### Wayland y rendimiento

**Gnome** no fue de los primeros en apostar por Wayland, y el proceso de migración se alargó más de lo deseado. Pero hoy en día la experiencia con Wayland en **Gnome** es muy buena y sin mayores problemas.

Las críticas de rendimiento eran más válidas en los tiempos de **Gnome** 3. Hoy, con **Gnome** 50 (la versión actual a fecha de este post) y el backend de mutter optimizado, el rendimiento a nivel general sin una gráfica dedicada es muy fluido y aceptable. En mis dos ThinkPads con gráficos integrados va fluido sin mayores problemas desde que llegó Wayland. Cuando traté de usarlo con X11, iba horrible.

### Integración y cohesión

**Gnome** se siente como un todo cohesionado, con una coherencia visual que ayuda -no es perfecto ya que Flatpak y otros deben ser configurados para que tomen sus temas-. El ecosistema de aplicaciones, desde los ajustes hasta los gestos táctiles, está pensado en conjunto y no por separado. El estilo visual puede no gustarle a todo el mundo -es cuestión de gustos y a mí no me gusta-, pero la coherencia del conjunto es innegable.

Aplicaciones como **Gnome** Terminal, Nautilus (el gestor de archivos), **Gnome** Software (su tienda de aplicaciones) o el calendario están bien integradas y cumplen su función sin estorbarte. No tienes que pasar horas configurando temas para que todo se vea bien porque ya viene uniforme de fábrica.

### Extensiones: el mejor y peor de sus mundos

Sé que las extensiones son un punto polémico. Y sí, es cierto: a veces una actualización de **Gnome** rompe extensiones, y eso molesta. Pero también es cierto que las extensiones son opcionales. **Gnome** funciona perfectamente sin ninguna extensión instalada.

El problema no es **Gnome**, sino la expectativa en la mayoría de los casos -me incluyo en ese punto-. Si vienes de KDE o de Windows y quieres un botón de minimizar, un icono en la bandeja del sistema y un escritorio lleno de widgets, entonces sí, vas a necesitar extensiones. Y ahí entra el riesgo de que se rompan y que consuma más -mucho más-. Pero también puedes probar **Gnome** tal como viene y ver si el flujo de trabajo te funciona.

De hecho, las extensiones son una prueba de lo flexible que puede llegar a ser **Gnome**. La gente las usa para personalizar casi cualquier aspecto, y eso es gracias a que **Gnome** tiene una API de extensiones bien documentada. No es un sistema cerrado: es un sistema que permite personalización sin comprometer la experiencia base.

## Respondiendo a las críticas comunes

### **Gnome** es muy simple, le faltan opciones

**Gnome** no es simple porque no pueda ser complejo. Es simple porque esa es la visión de diseño. Las opciones existen, pero están ocultas a propósito para no abrumar al usuario nuevo. Si necesitas configuraciones avanzadas, `gnome-tweaks` (una aplicación gráfica para ajustes avanzados) y `dconf-editor` (un editor jerárquico de configuraciones) están ahí. También existe el gestor de extensiones nativo y el de Flatpak, este último te permite buscar dentro de la misma web de [extensions.gnome.org](https://extensions.gnome.org/) para encontrar la extensión que más te favorezca. La filosofía es: opciones sí, pero no en la cara del usuario.

### Consume muchos recursos

Es cierto. **Gnome** sigue teniendo un consumo alto de recursos: más de 1 GB de RAM solo por tenerlo corriendo, sin ninguna extensión instalada (aunque parte de ese consumo corresponde a caché de disco, que el sistema libera si otra aplicación la necesita). Si vienes de escritorios más ligeros como Xfce o LXQt, la diferencia se nota. No es un escritorio para equipos con pocos recursos y mucho menos para quienes juegan.

## Mi experiencia personal

Hace un par de meses, después de años usando KDE, decidí probar **Gnome**. No es que KDE no me guste, todo lo contrario: me encanta su diseño, su fluidez y todo lo que tiene para ofrecer. Pero había momentos en los que tantas configuraciones me abrumaban, me mareaba entre tantas opciones y quise algo distinto.

Al principio me chocó: venía de un escritorio tradicional con menú de aplicaciones, barra de tareas y iconos en el escritorio. **Gnome** me parecía extraño.

Pero decidí darle una oportunidad seria. Eso sí, desde el principio usé tres extensiones: AppIndicator, Caffeine y Wallpaper Slideshow (esta última porque me acostumbré a cambiar de fondo de pantalla constantemente). Al principio fue incómodo, pero con el tiempo el flujo de trabajo se hizo muy cómodo. Aprendí los atajos de teclado: Super para Activities, Super+PageUp/PageDown para cambiar de workspace, Alt+Tab para cambiar de ventana. Empecé a usar los workspaces de forma natural. Descubrí que no necesitaba minimizar ventanas porque podía simplemente cambiar de workspace.

Además, aunque existen herramientas gráficas como `gnome-tweaks` o `dconf-editor` para ajustar la configuración, descubrí que `gsettings` -la herramienta de configuración por terminal de **Gnome**- me encantó. Con ella puedo modificar ajustes al instante sin navegar entre menús. Por ejemplo, para activar el modo oscuro ejecuto `gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'`, o para mostrar los segundos en el reloj del panel uso `gsettings set org.gnome.desktop.interface clock-show-seconds true`. Es rápido, directo y no requiere salir del flujo de trabajo. Incluso puedes agrupar todos los comandos `gsettings` en un script de bash y, cada vez que hagas una instalación fresca, ejecutarlo para dejar todo listo con tus configuraciones favoritas -cosa que sí le falta a KDE, o por lo menos yo no supe cómo hacerlo-.

Hoy **Gnome** es mi escritorio principal en mis dos ThinkPads. Uso muy pocas extensiones: solo las que realmente necesito. Y cuando actualizo **Gnome** y alguna se rompe, no pasa nada: apago la extensión y sigo trabajando.

Lo que más valoro es que **Gnome** se "aparta" de mi camino. No me distrae, no me bombardea con opciones, no me pide configurar cosas. Abro la sesión y trabajo. Punto.

### Videojuegos

Si hablamos de juegos, es cierto que **Gnome** rinde peor que KDE. En los pocos que juego, llego a perder entre 15 y 20 fps o más comparado con KDE, y sospecho que es por la gestión de memoria y el compositor de Mutter. Pero no soy de jugar muchos juegos, y los que juego no son títulos competitivos donde esos fps marquen la diferencia. Prefiero la experiencia de escritorio de **Gnome** y asumo esa pérdida de rendimiento; no es algo que a mí personalmente me quite el sueño.

## Conclusión

**Gnome** no es para todos. Y está bien. No todos los escritorios tienen que ser para todos. Pero creo que **Gnome** merece más respeto del que recibe -espero redimirme de tantas críticas que yo mismo le hice-.

Es un escritorio con una visión "clara", una identidad propia y una propuesta diferente dentro del ecosistema Linux. No es perfecto -tiene un consumo alto de recursos, su migración a Wayland fue lenta y su ecosistema de extensiones puede ser frágil- pero cumple con lo que promete: un entorno limpio, coherente y centrado en el trabajo.

Si nunca le has dado una oportunidad a **Gnome**, te invito a que lo hagas. Pero hazlo con la mentalidad correcta: no esperes que sea KDE ni Windows. Espera que sea **Gnome**. Y quizás descubras que, después de todo, no está tan mal.

> Al final, el mejor escritorio no es el que más opciones tiene, sino el que te ayuda con tu trabajo.
