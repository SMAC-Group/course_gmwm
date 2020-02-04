---
title: '4 - The Generalized Method of Wavelet Moments'
description: 'In this chapter, we provides an introduction to Generalized Method of Wavelet Moments and its robust extension. This chapter is based on the R package gmwm.'
prev: /chapter3
next: /chapter5
type: chapter
id: 4
---

<exercise id="1" title="General Information">

This repository holds the Generalized Method of Wavelet Moments (GMWM) R package. This estimation technique was introduces in [Guerrier et al. (2013)](https://doi.org/10.1080/01621459.2013.799920) and uses the wavelet variances in a moment-matching spirit to estimate parameters of time series models such as ARMA or state-space models. This package is currently being modified and is likely to change significantly in the coming months. The *development* version of the package is available on [GitHub](https://github.com/SMAC-Group/gmwm) and can be installed as follows:

```r
# Install dependencies
install.packages("devtools")

# Install/Update the package from GitHub
devtools::install_github("SMAC-Group/gmwm")
```

The main features of the package are presented in the sections below and will use data from the `imudata` R package, which can be installed as:

```r
# Install/Update the package from GitHub
devtools::install_github("SMAC-Group/imudata")
```

Note that the installation process may be a little slow.

The sildes we will can be downloaded [here](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap4_1.pdf). 


Main references:

1. Guerrier, S., Molinari, R., Victoria-Feser, M. P., & Xu, H. (2020). *Robust Two-Step Wavelet-Based Inference for Time Series Models*, arXiv preprint arXiv:2001.04214.

2. Guerrier, S., Skaloud, J., Stebler, Y., & Victoria-Feser, M. P. (2013). *Wavelet-variance-based estimation for composite stochastic processes*, Journal of the American Statistical Association, 108(503), 1021-1030.

Suggested reading:

1. Percival, D. P. (1995). *On estimation of the wavelet variance. Biometrika*, 82(3), 619-631.

2. Mondal, D., & Percival, D. B. (2012). *M-estimation of wavelet variance*, Annals of the Institute of Statistical Mathematics, 64(1), 27-53.

3. Guerrier, S., R. Molinari, and J. Balamuta *Discussion on Maximum Likelihood-Based Methods for Inertial Sensor Calibration*, IEEE Sensors Journal 16.14, 2016.


</exercise>

<exercise id="2" title="Computing the Wavelet Variance">

<slides source="chapter4_01"> 
</slides>

</exercise>


<exercise id="3" title="Computing the Robust Wavelet Variance">

<slides source="chapter4_02"> 
</slides>

</exercise>


<exercise id="4" title="The Generalized Method of Wavelet Moments">

<slides source="chapter4_04"> 
</slides>

</exercise>


<exercise id="5" title="Model Selection">

<slides source="chapter4_05"> 
</slides>

</exercise>

<exercise id="6" title="Case Study: Hydrology">

<slides source="chapter4_07"> 
</slides>

</exercise>

<exercise id="7" title="Case Study: Saving rates">

<slides source="chapter4_08"> 
</slides>

</exercise>
