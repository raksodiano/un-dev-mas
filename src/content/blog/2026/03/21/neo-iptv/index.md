---
title: 'NeoIPTV: Mi camino aprendiendo Python con un reproductor de IPTV'
slug: '2026/03/21/neo-iptv'
description: 'Cómo creé mi propio reproductor de IPTV con Python, PyQt6 y MPV, y lo que aprendí en el proceso.'
pubDate: '2026-03-21'
tags: ['Blog', 'Python', 'IPTV', 'Qt', 'MPV']
coverImage: './blog-post-2026-03-21.png'
---

## Introducción

Si me conocés, sabés que me gusta experimentar con tecnologías nuevas. Hace un tiempo decidí dedicarme de lleno en [Python](https://www.python.org/), un lenguaje que ya había visto antes, pero nunca de forma seria (solo algún script de prueba o pequeños experimentos sueltos).

Los típicos ejercicios de aprendizaje los conocía de memoria: calculadoras, sistemas de gestión de tareas, pequeños [scrapers](https://es.wikipedia.org/wiki/Web_scraping)... nada que me emocionara realmente. Quería construir algo con lo que pudiera interactuar a diario, algo más allá del código por el código.

Estaba viendo una publicidad de **[Pluto TV](https://pluto.tv/)** cuando se me encendió el foco: ¿por qué no hacer mi propia versión? IPTV era un mundo completamente nuevo para mí (no tenía ni idea de qué era un playlist [M3U](https://en.wikipedia.org/wiki/M3U), cómo funcionaba el streaming, ni mucho menos cómo manejarlo desde Python). Pero precisamente eso era lo que me atraía: aprender algo desde cero.

Y así nació **NeoIPTV**: un reproductor de IPTV construido con Python, [PyQt6](https://www.riverbankcomputing.com/software/pyqt/) y [MPV](https://mpv.io/).

## De Pluto TV a IPTV

Estuve investigando un poco más sobre qué era Pluto TV y cómo funcionaba, y fue ahí donde me topé con el término de **IPTV** (Internet Protocol Television). Eso me llevó a buscar y encontrar un sinfín de aplicaciones web que ofrecían este servicio. También descubrí un repositorio muy interesante: [iptv-org/iptv](https://github.com/iptv-org/iptv), donde se encuentran muchos canales bajo licencia GPL (y otros sin ella).

Eso me llevó a estudiar más sobre los archivos **M3U**, que ya había visto antes en VLC pero a los que no les había dado mayor importancia. Una vez que entendí estos puntos, ya sabía lo que quería y cómo lo quería: una aplicación donde poder ver "televisión" por internet, escuchar música y tener mi propia lista de canales, totalmente controlada por mí. Y como no podía ser de otra manera, quería que fuera **software libre**.

## La decisión estética

Paralelamente a todo esto, quería que la aplicación fuera atractiva visualmente. ¿Qué mejor que ir por las librerías **Qt**? No soy muy fan de **GTK**, y aunque estuve mirando **Tkinter** de Python, que tiene herramientas muy buenas para crear interfaces bonitas y estilizadas, mis gustos no me permitieron darme el lujo de aceptarla. Así que tomé la decisión meramente estética de que se viera bien en mis sistemas, en donde siempre instalo **KDE**.

## La cuestión de los datos

En esos momentos, ya sabiendo qué quería visualmente y que el lenguaje sería Python (que estaba aprendiendo), me surgió otra pregunta: ¿cómo iba a manejar los datos? ¿Un archivo o una base de datos? Hice unas pruebas con un script de Python y me percaté de que usar un archivo para leerlo o actualizarlo era muy lento. Me parecía muy poco profesional usar un simple archivo, sobre todo porque soy muy quisquilloso y me gusta que mis aplicaciones puedan soportar grandes cantidades de datos y que se muevan con cierta elegancia. Así que me fui por una base de datos que ya conociera.

Pensé inicialmente en **MySQL**, pero era demasiado para dos o tres tablitas. Así que me fui por su hermanita menor: **SQLite**. Esta es una base de datos embebida, lo que significa que no necesita un servidor externo; toda la información se guarda en un simple archivo, pero con la potencia de SQL. Es perfecta para aplicaciones de escritorio por su ligereza, no requiere configuración y funciona automáticamente con solo incluirla en el proyecto.

## Los primeros pasos del desarrollo

Teniendo ya la base de datos, el lenguaje y la librería gráfica, comencé con el desarrollo de una interfaz algo tosca pero simple: una lista a la derecha con todos los canales, usando **QVBoxLayout** y **QListView**. En la parte inferior usé **QHBoxLayout** y **QWidget** para tener todos los botones abajo.

Mientras leía la documentación y entendía cómo funcionaban los layouts en Qt, me percaté de algo importante: ¿dónde podría reproducir mis canales? ¿Python tiene algo para ello?

Detuve mi desarrollo por unos días buscando e indagando cómo podría reproducir estos canales. Después de estudiar varios, me quedé con dos reproductores: **VLC** y **MPV**, ambos muy buenos. ¿Cuál me convenía más? Simplemente tomé la decisión de irme por **MPV**, ya que su librería, aunque más simple que VLC y con documentación un poco más escasa, me servía porque no necesitaba algo tan pesado y completo como VLC.

Aquí vinieron varios dolores de cabeza, ya que no sabía cómo hacer que MPV quedara dentro del frame de mi app, más específicamente dentro del **QWidget** donde tenía que estar el reproductor. Después de casi 3 días de estar batallando con la documentación y prueba y error, me di cuenta de algo: ¿qué hago yo programando sin logs? Al ser un proyecto personal y fuera del horario laboral, estaba cansado y no había caído en cuenta de que no tenía logs y no sabía cuál era el error como tal de lo que ocurría.

Así que implementé el módulo de logger, haciéndolo "legible" para mí, creando siempre su directorio y dejando los logs por 15 días para no estar batallando con los errores. Dejé una estructura muy similar a la que siempre manejo en mis aplicaciones, donde muestro la hora, el nivel de error/información/debugging y un mensaje que yo coloque, todo almacenado en mi directorio de logs con la fecha por nombre.

## Base de datos e hilos

En este punto comencé con la implementación de dos cosas. Primero, la base de datos **SQLite**, levantando las conexiones y estudiando también cómo Python trabaja con SQLite (ya que nunca había tocado SQLite). En este punto había descargado un par de archivos con canales para entender su estructura y crear un método para exportar los datos hacia SQLite. Maté dos pájaros de un tiro: desarrollé el método para cargar datos a la base mediante archivos y apliqué lo mismo para que previamente descargara el archivo desde una **URL**, evitando tener los archivos dispersos en mis directorios.

La segunda implementación fueron los **hilos** en Python, ya que al unir la carga con la interfaz, esta se congelaba mientras se procesaban los archivos, que en ese momento tenían más de 13 mil canales. Para acelerar las cosas, preferí agregar hilos para procesar las cosas con mayor celeridad.

## La primera prueba real

Para este punto, visualmente y funcionalmente era exactamente lo que había imaginado. La interfaz estaba lista, los botones respondían, la lista de canales se mostraba correctamente... pero no tenía canales para reproducir. Así que llegó el momento de la verdad: la primera prueba real.

Hice uso del método para obtener todos los canales desde SQLite y probé también el rendimiento mientras se cargaban los más de 13 mil registros que tenía en mi base de datos. Hice que estos se mostraran en la lista del lado derecho, donde solo ajusté un poco el scrollbar para que se viera bien, y luego, tomando el primer elemento de esta lista, lo pasé directo al reproductor.

Cuando vi que el primer canal comenzó a reproducirse después de 3 semanas de desarrollo, la sensación fue hermosa. Por primera vez podía ver un canal de televisión desde mi propia aplicación, con mi propia lista de canales, mis propios datos. Todo funcionaba.

## Mejoras y el poder de la IA

Ya para este punto en el desarrollo, solo han venido mejoras, bugs y casos que han sido nuevos para mí. Python no es mi fuerte, por muy fácil que se diga que es; mi código no es el mejor ni mucho menos. Este proyecto lo tuve en pausa cerca de 9 meses, y hace poco lo retomé con la ayuda de la IA.

Hice ajustes como cambiar un poco más la interfaz gráfica, agregar un buscador, mostrar el nombre del canal que se está viendo en el centro de los controles, resaltar el canal que se está reproduciendo, añadir favoritos, eliminar un canal, entre otras cosas que he ido agregando con la IA. En este punto, la IA me ha ayudado a avanzar a pasos agigantados este proyecto personal.

Este proyecto me ha dejado un aprendizaje: solo tienes que tener las ganas de empezar, tomar tu tiempo para sacarlo adelante y, por muy poco tiempo que puedas dedicarle, es mejor que no hacer nada. Este proyecto me enseñó que salirse de los caminos conocidos (los mismos sistemas web, calculadoras, sistemas de gestión, inventarios) está bien para practicar, pero si realmente quieres aprender, rompe el molde. Busca otra cosa para hacer. No todo el tiempo deben ser estos proyectos de universidad o proyectos que te encuentras en un vídeo. Imagina lo que quieres y trata de hacerlo.

Aquí aprendí muchas cosas: **IPTV**, **M3U**, un poco de **Qt**, del reproductor **MPV** (ahora lo uso incluso con **Emacs** para mis feeds/rss), **SQLite**, el manejo de **hilos** de Python, que es muy interesante como lo trabaja. Aunque no tengo los términos o temas dominados del todo, me ha ayudado a comprender mejor a Python y sus diversas bondades.

Y lo más importante: este proyecto sigue vivo. Si querés ver el código o contribuir, puedes encontrarlo en [GitHub](https://github.com/raksodiano/neo-iptv).

¡Hasta la próxima!

> **Recuerda:** _"Benditos sean los que comparten su código, porque de ellos será el reino del software libre"_
