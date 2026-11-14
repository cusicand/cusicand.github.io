---
ref: software
lang: es
translation: draft
permalink: /es/software/
title: "Software"
---

Como una de mis dos líneas de investigación consiste en mejorar las herramientas que utilizamos para procesar productos de teledetección y estudiar las amenazas naturales.

# GeoMultiCorr

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17079419.svg)](https://doi.org/10.5281/zenodo.17079419)

Al final de mi tesis en el IGE, en 2022, me encontré con un problema relativamente común en geociencias: la «disponibilidad heterogénea» de los datos de teledetección óptica. En Francia en particular, el archivo de imágenes aéreas de muy alta resolución espacial (0,2–0,5 m) del Instituto Nacional de Información Geográfica y Forestal (IGN) para la cartografía nacional, así como la base de datos satelital GeoSUD (imágenes SPOT de 1,5 m de resolución espacial) y el proyecto Kalideos (imágenes Pléiades de 0,5–0,7 m de resolución espacial), constituyen un volumen de datos considerable (archivo estimado en 5 TB) y, sobre todo, están disponibles para su uso.

El proyecto GeoMultiCorr (Cusicanqui et al., 2025) nació de la necesidad de poder explotar estos archivos heterogéneos de teledetección óptica, procedentes de múltiples sensores, para medir la deformación del terreno (es decir, el desplazamiento de la superficie) en alta montaña. Esta cadena de procesamiento, escrita en Python, permite manipular de forma interactiva cualquier base de imágenes, armonizarla y prepararla para medir la deformación del terreno mediante correlación de imágenes. Para esto último utilizo software optimizado como Ames Stereo Pipeline (ASP), desarrollado por la NASA, para estimar el desplazamiento de la superficie. Para aprovechar mejor la información de estos datos, durante mi posdoctorado en el CNES en ISTerre acoplé una inversión de series temporales (TIO) (Bontemps et al., 2018) para obtener series de desplazamiento filtradas y depuradas. Esta metodología robusta me permitió diversificar aún más los datos que pueden utilizarse para monitorear los movimientos de masa en montaña, incluso con imágenes de resolución gruesa (15 m), como las de los satélites Landsat 4/5/7/8 y Sentinel-2 (Cusicanqui et al., 2024) y, más recientemente, las imágenes PlanetScope de 3 m de resolución espacial (Cusicanqui et al., 2025, en revisión). Este proyecto se puso a disposición de la comunidad científica en GitHub a través de la Rock Glacier Dynamics Toolbox (RGDyn toolbox), para que sea abierto y colaborativo.

_**¿Qué hace única a esta cadena de procesamiento frente a otras existentes?**_ Una de sus particularidades es su enfoque interactivo de los datos: la elección de las imágenes es fundamental para obtener buenas estimaciones del desplazamiento de la superficie. Otra característica distintiva es que se basa en software altamente optimizado, que consume muy pocos recursos de cálculo y permite paralelizar los procesos, lo que hace el análisis mucho más eficiente. Por último, puede instalarse en cualquier computadora y no requiere grandes recursos de cálculo.


```
```

# LidarHD IGN downloader

[![DOI](https://zenodo.org/badge/706232299.svg)](https://zenodo.org/doi/10.5281/zenodo.10697626)

En el marco del programa nacional [LiDAR HD](https://geoservices.ign.fr/lidarhd), el Instituto Nacional de Información Geográfica y Forestal de Francia (IGN) produce y distribuye una cartografía 3D completa del suelo y la superficie de Francia a partir de datos LiDAR. El proyecto «LidarHD IGN downloader» [(Cusicanqui, 2024)](https://zenodo.org/doi/10.5281/zenodo.10697626) nació de la necesidad de aprovechar al máximo estos datos.
En 2024, durante mi posdoctorado en el CNES en ISTerre, desarrollé una herramienta en Python que permite descargar fácilmente las nubes de puntos LiDAR de una zona definida, remuestrearlas a la resolución elegida por el usuario y producir un Modelo Digital del Terreno (MDT) del territorio francés. Se pueden ajustar varios parámetros, entre ellos: la resolución del MDT, el método de cálculo de la elevación, el formato de salida (GTiff o VRT) y la generación de un mapa de densidad de puntos. La herramienta admite multihilo, lo que acelera el procesamiento en máquinas de varios núcleos.
Este proyecto se ha difundido en los laboratorios del OSUG, en particular en ISTerre, el IGE y el laboratorio EDYTEM, así como en otros laboratorios de Toulouse. Al 1 de febrero de 2025, cuenta con una treintena de usuarios.

La última [versión estable](https://github.com/cusicand/lidarhd_ign_downloader) en GitHub puede descargarse con git:

```bash
git clone https://github.com/cusicand/lidarhd_ign_downloader.git
```

y luego instalarse con conda o mamba:
```bash
cd ./lidarhd_ign_downloader
mamba env create -f pdal_env.yml
```
Uso desde la línea de comandos (CLI) y desde Python/Jupyter:
```bash
lidar_downloader.py -h
```

```python
import lidar_downloader
```

# xDEM

[xDEM](https://github.com/Glaciohack/xdem)
