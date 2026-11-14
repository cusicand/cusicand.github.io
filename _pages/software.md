---
ref: software
permalink: /software/
title: "Software"
---

As one of my two research agendas involves improving the tools we use to process remote sensing data and study natural hazards.

# GeoMultiCorr

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.17079419.svg)](https://doi.org/10.5281/zenodo.17079419)

At the end of my thesis at the IGE in 2022, I encountered a relatively common problem in geosciences: the ‘heterogeneous availability’ of optical remote sensing data. Particularly in France, the archive of very high spatial resolution aerial images (0.2–0.5 m) from the National Institute of Geographic and Forest Information (IGN) for national mapping, as well as the GeoSUD satellite database (SPOT satellite images with 1.5 m spatial resolution) and the Kalideos project (Pléiades images with 0.5–0.7 m spatial resolution) constitute a significant volume of data (estimated archive size of 5 TB), but above all, they are available for use.

The GeoMultiCorr project (Cusicanqui et al., 2025) arose from the need to be able to exploit these heterogeneous optical remote sensing archives, derived from multiple sensors, to measure ground deformation (i.e. surface displacement) in high mountains. This processing chain, written in Python, allows any image database to be manipulated interactively, harmonised and prepared to measure ground deformation via image correlation. For the latter, I use optimised software such as Ames Stereo Pipeline (ASP), developed by NASA, to estimate surface displacement. In order to make better use of the information from these data, during my post-doctorate at CNES at ISTerre, I coupled time series inversion (TIO) (Bontemps et al., 2018) to produce filtered and cleaned displacement series. This robust methodology allowed me to further diversify the data that could potentially be used to monitor mass movements in mountains, even with coarse-resolution images (15 m), such as those from Landsat 4/5/7/8 satellites, Sentinel-2 (Cusicanqui et al., 2024) and, more recently, PlanetScope images with 3 m spatial resolution (Cusicanqui et al., 2025, in review). This project has been made available to the scientific community on GitHub via the Rock Glacier Dynamics Toolbox (RGDyn toolbox) to make it open and collaborative.

_**What makes this processing chain unique compared to other existing chains?**_ One of its unique features is its interactive approach to data. The choice of images is fundamental to obtaining good estimates of surface displacement. Another distinctive feature is that this project is based on highly optimised software, which consumes very few computing resources and allows for the parallelisation of processes, making the analysis much more efficient. Finally, it can be installed on any computer and does not require significant computing resources.


# LidarHD IGN downloader

[![DOI](https://zenodo.org/badge/706232299.svg)](https://zenodo.org/doi/10.5281/zenodo.10697626)

As part of the national [LiDAR HD](https://geoservices.ign.fr/lidarhd) programme, the French National Institute for Geographic and Forest Information (IGN) produces and distributes comprehensive 3D mapping of France's ground and surface using LiDAR data. The ‘LidarHD IGN downloader’ project [(Cusicanqui, 2024)](https://zenodo.org/doi/10.5281/zenodo.10697626) was born out of the need to make optimal use of this data.
In 2024, during my post-doctorate at CNES at ISTerre, I developed a Python tool that makes it easy to retrieve LiDAR point clouds for a defined area, resample them at a user-selected resolution, and produce a Digital Terrain Model (DTM) covering the French territory. Several parameters can be adjusted, including: DTM resolution, elevation calculation method, output format (GTiff or VRT), and point density map generation. This tool supports multi-threading, thus accelerating data processing on multi-core machines.
This project has been promoted within OSUG laboratories, notably at ISTerre, IGE and the EDYTEM laboratory, as well as in other laboratories in Toulouse. As of 1 February 2025, it has around thirty users.

The latest [stable version](https://github.com/cusicand/lidarhd_ign_downloader) on GitHub can be downloaded using git:

```bash
git clone https://github.com/cusicand/lidarhd_ign_downloader.git
```

and then installed with conda or mamba:
```bash
cd ./lidarhd_ign_downloader
mamba env create -f pdal_env.yml
```
Usage from the command line (CLI) and Python/Jupyter:
```bash
lidar_downloader.py -h
```

```python
import lidar_downloader
```

# xDEM

[xDEM](https://github.com/Glaciohack/xdem)
