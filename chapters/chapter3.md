---
title: '3 - Allan Variance Calibration Techniques'
description:
  'In this chapter we will consider an introduction to Allan Variance (AV) -based analysis. This chapter is based on the R package avar.'
prev: /chapter2
next: /chapter4
type: chapter
id: 3
---

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

# Estimate a white noise using the Allan variance

Let \\(X_t\\) be an WN with variance \\(\sigma^2\\) and length \\(N\\).

- Write an R function that returns the ML estimator for \\(\sigma^2\\), i.e.

$$
\hat\sigma^2 = N^{-1}\sum_{t = 1}^{N} X_t^2
$$
- Write an R function that computes the AVAR of the input (`avar` function) and estimates \\(\hat \sigma^2\\) (use Equation 3.10 and 3.11). 
- Chose a value for \\(\sigma^2\\) and \\(N\\), e.g., \\(1\\) and \\(1000\\), and generate \\(M\\) realization of \\(X_t\\).
- Compare the perfomances of the two estimators (use the `boxplot` R function).
- What is the difference?



# A more complex case?

Consider \\(X_t\\) (lenght \\(T = 10^5\\)) to be the sum of a white noise and a random walk with parameters \\(\sigma^2=1\\) and \\(\gamma^2=10^{-4}\\).

- From one realisation of the process, select the scales to be used to estimate the parameters of the two processes with the `avlr` function.
- Generate \\(N = 100\\) realisations of \\(X_t\\).
- Use the `avlr` function  to estimate \\(\sigma^2\\) and \\(\gamma^2\\).
- Compare the estimates of \\(\sigma^2\\) and \\(\gamma^2\\) with the true values.
- Are the estimates good?

# Let's try our best on a real case

Consider the Y axis of the accelerometer of the ADIS IMU.

```r
library(avar)
data("adis_av")
plot(adis_av$avar$`Accel. Y`)
```

<div style="text-align:center"><img src="adis_accel_y.png" alt=" " width="85%">
</div>

Decide which are the most appropriate processes, select the appropriate scales and estimate the model parameters using the `avar` function.

# How can we do better? Let's guess

- Take the paper Zhang, Nien Fan. "Allan variance of time series models for measurement data." *Metrologia* 45.5 (2008): 549.
- Equation 30 gives the analytical expression for the Allan Variance for an AR1 process.
- Given the observed AVAR of an AR1 process, how could you construct an estimator for \\(\phi\\) and \\(\sigma^2\\)?

</exercise>

