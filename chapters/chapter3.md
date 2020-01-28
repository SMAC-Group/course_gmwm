---
title: '3 - Allan Variance Calibration Techniques'
description:
  'In this chapter we will consider an introduction to Allan Variance (AV) -based analysis. This chapter is based on the R package avar.'
prev: /chapter2
next: /chapter4
type: chapter
id: 3
---

<exercise id="0" title="Introduction" type="slides">

<slides source="chapter1_01_introduction">
</slides>

</exercise>

<exercise id="1" title="General Information">

This chapter is based on the R package [`avar`](https://smac-group.github.io/avar/index.html), which can be installed as follows:

```r
install.packages("avar")
```

The *development* version of the package is available on [GitHub](https://github.com/SMAC-Group/avar) and you can install it if you wish to have the latest version. This can be done as follows:

```r
# Install dependencies
install.packages("devtools")

# Install/Update the package from GitHub
devtools::install_github("SMAC-Group/avar")
```

Note that this installation process from GitHub is slower and may take a few minutes. The main features of the package are presented in the sections below and require to load `simts` (which we installed in the previous chapter) and `avar`. This can be done as follows:

```r
library(simts)
library(avar)
```

The sildes we will can be downloaded [here](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap3.pdf). 

Main references:

1. *Statistics of Atomic Frequency Standards*, Allan, D., Proceedings of the IEEE, Vol. 54, No. 2, 1966, online version available [here](https://ieeexplore.ieee.org/document/1446564).
2. *Analysis and modeling of inertial sensors using Allan variance*, El-Sheimy, N., Hou, H. & Niu, X., IEEE Transactions on Instrumentation and Measurement,  Vol. 57, No. 1, 2008, online version available [here](https://ieeexplore.ieee.org/abstract/document/4404126). 
3. *Theoretical Limitations of Allan Variance-based Regression for Time Series Model Estimation*, Guerrier, S., Molinari, R. & Stebler, Y.,	IEEE Signal Processing Letters, Vol. 23, No. 5, 2016, online version available [here](https://ieeexplore.ieee.org/document/7433406).  

</exercise>

<exercise id="2" title="Computing the Allan Variance">

<slides source="chapter3_01"> 
</slides>

</exercise>

<exercise id="3" title="Computing the Allan Variance of an IMU">

<slides source="chapter3_02"> 
</slides>

</exercise>

<exercise id="4" title="Allan Variance-based Regression for Time Series Model Estimation">

<slides source="chapter3_03"> 
</slides>

</exercise>

<exercise id="5" title="Exercises">

<exercise id="6" title="Exercise 1">
 
</exercise>

<exercise id="7" title="Exercise 2">
 
</exercise>

<exercise id="8" title="Exercise 3">
 
</exercise>

<exercise id="9" title="Exercise 4">
 
</exercise>

</exercise>

