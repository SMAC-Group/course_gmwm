---
title: '4 - GMWM'
description:
  ' '
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

The sildes we will can be downloaded [here](TO BE FILLED). 

Suggested reading:

1. El-Sheimy, N., H. Hou, and X. Niu *Analysis and Modeling of Inertial Sensors using Allan Variance*, IEEE Transactions on Instrumentation and Measurement 57.1, 2008.
2. Guerrier, S., R. Molinari, and Y. Stebler *Theoretical Limitations of Allan Variance-based Regression for Time Series Model Estimation*, IEEE Signal Processing Letters 23.5, 2016.

Main references:

1. Allan, D. W. *Statistics of Atomic Frequency Standards*, Proceedings of the IEEE 54.2, 1966.
2. El-Sheimy, N., H. Hou, and X. Niu *Analysis and Modeling of Inertial Sensors using Allan Variance*, IEEE Transactions on Instrumentation and Measurement 57.1, 2008.
3. Greenhall, C. A. *Spectral Ambiguity of Allan Variance*, IEEE Transactions on Instrumentation and Measurement 47.3, 1998.
4. Guerrier, S., J. Jurado, M. Khaghani, G. Bakalli, M. Karemera, R. Molinari, S. Orso, J. Raquet, C. Schubert Kabban, J. Skaloud, H. Xu and Y. Zhang *Wavelet-Based Moment-Matching Techniques for Inertial Sensor Calibration*, submitted working paper, 2020, full text available on [arXiv](https://arxiv.org/abs/1911.07049).
5. Guerrier, S., R. Molinari, and J. Balamuta *Discussion on Maximum Likelihood-Based Methods for Inertial Sensor Calibration*, IEEE Sensors Journal 16.14, 2016.
6. Guerrier, S., R. Molinari, and Y. Stebler *Theoretical Limitations of Allan Variance-based Regression for Time Series Model Estimation*, IEEE Signal Processing Letters 23.5, 2016.
7. Percival, D. B. and P. Guttorp *Long-memory processes, the Allan variance and wavelets*, Wavelet Analysis and its Applications. Vol. 4. Elsevier, 1994.

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

<exercise id="8" title="KVH1750 - Accel">

<slides source="chapter4_09"> 
</slides>

</exercise>
