---
ref: software
lang: fr
translation: draft
permalink: /fr/software/
title: "Logiciels"
---

L'un de mes deux axes de recherche visant à améliorer les outils que nous utilisons pour traiter produit de télédétection and les alèas naturels.

# GeoMultiCorr

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17079419.svg)](https://doi.org/10.5281/zenodo.17079419)

À la fin de ma thèse à l'IGE en 2022, j'ai été confronté à un problème assez courant en géosciences : la « disponibilité hétérogène » des données de télédétection optique. En France notamment, les archives d'images aériennes à très haute résolution spatiale (0,2–0,5 m) de l'Institut national de l'information géographique et forestière (IGN) pour la cartographie nationale, ainsi que la base de données satellitaires GeoSUD (images SPOT à 1,5 m de résolution spatiale) et le projet Kalideos (images Pléiades à 0,5–0,7 m de résolution spatiale), représentent un volume de données considérable (archive estimée à 5 To) et, surtout, elles sont disponibles.

Le projet GeoMultiCorr (Cusicanqui et al., 2025) est né du besoin d'exploiter ces archives hétérogènes de télédétection optique, issues de capteurs multiples, pour mesurer la déformation du sol (c'est-à-dire le déplacement de surface) en haute montagne. Cette chaîne de traitement, écrite en Python, permet de manipuler de façon interactive n'importe quelle base d'images, de l'harmoniser et de la préparer à la mesure de la déformation du sol par corrélation d'images. Pour cette dernière étape, j'utilise des logiciels optimisés comme Ames Stereo Pipeline (ASP), développé par la NASA, pour estimer le déplacement de surface. Afin de mieux exploiter l'information contenue dans ces données, j'ai couplé pendant mon post-doctorat au CNES à ISTerre une inversion de séries temporelles (TIO) (Bontemps et al., 2018) pour produire des séries de déplacement filtrées et nettoyées. Cette méthodologie robuste m'a permis de diversifier encore les données utilisables pour suivre les mouvements de masse en montagne, même avec des images de résolution grossière (15 m), comme celles des satellites Landsat 4/5/7/8 et Sentinel-2 (Cusicanqui et al., 2024) et, plus récemment, les images PlanetScope à 3 m de résolution spatiale (Cusicanqui et al., 2025, en révision). Ce projet a été mis à la disposition de la communauté scientifique sur GitHub via la Rock Glacier Dynamics Toolbox (RGDyn toolbox), afin qu'il soit ouvert et collaboratif.

_**Qu'est-ce qui rend cette chaîne de traitement unique par rapport aux autres ?**_ L'une de ses particularités est son approche interactive des données : le choix des images est essentiel pour obtenir de bonnes estimations du déplacement de surface. Autre particularité, elle repose sur des logiciels très optimisés, qui consomment très peu de ressources de calcul et permettent de paralléliser les traitements, ce qui rend l'analyse beaucoup plus efficace. Enfin, elle peut être installée sur n'importe quel ordinateur et ne demande pas de ressources de calcul importantes.


```
```

# LidarHD IGN downloader

[![DOI](https://zenodo.org/badge/706232299.svg)](https://zenodo.org/doi/10.5281/zenodo.10697626)

Dans le cadre du programme national [LiDAR HD](https://geoservices.ign.fr/lidarhd), l'Institut national de l'information géographique et forestière (IGN) produit et diffuse une cartographie 3D complète du sol et du sursol de la France à partir de données LiDAR. Le projet « LidarHD IGN downloader » [(Cusicanqui, 2024)](https://zenodo.org/doi/10.5281/zenodo.10697626) est né du besoin d'exploiter au mieux ces données.
En 2024, pendant mon post-doctorat au CNES à ISTerre, j'ai développé un outil Python qui permet de récupérer facilement les nuages de points LiDAR d'une zone donnée, de les rééchantillonner à la résolution choisie par l'utilisateur et de produire un Modèle Numérique de Terrain (MNT) couvrant le territoire français. Plusieurs paramètres sont réglables, notamment : la résolution du MNT, la méthode de calcul de l'altitude, le format de sortie (GTiff ou VRT) et la création d'une carte de densité de points. L'outil prend en charge le multithreading, ce qui accélère le traitement sur les machines multicœurs.
Ce projet a été diffusé dans les laboratoires de l'OSUG, notamment à ISTerre, à l'IGE et au laboratoire EDYTEM, ainsi que dans d'autres laboratoires à Toulouse. Au 1<sup>er</sup> février 2025, il compte une trentaine d'utilisateurs.

La dernière [version stable](https://github.com/cusicand/lidarhd_ign_downloader) sur GitHub peut être téléchargée avec git :

```bash
git clone https://github.com/cusicand/lidarhd_ign_downloader.git
```

puis installée avec conda ou mamba :
```bash
cd ./lidarhd_ign_downloader
mamba env create -f pdal_env.yml
```
Utilisation en ligne de commande (CLI) et depuis Python/Jupyter :
```bash
lidar_downloader.py -h
```

```python
import lidar_downloader
```

# xDEM

[xDEM](https://github.com/Glaciohack/xdem)
