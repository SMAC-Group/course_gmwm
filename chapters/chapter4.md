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

The sildes we will can be downloaded here:  [part I](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap4_1.pdf), and [part II](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap4_2.pdf). 


Main references:

1. Guerrier, S., Molinari, R., Victoria-Feser, M. P., & Xu, H. (2021). *Robust Two-Step Wavelet-Based Inference for Time Series Models*, Journal of the American Statistical Association, 117(540), 1996–2013, online version available [here](https://www.tandfonline.com/doi/full/10.1080/01621459.2021.1895176). 

2. Guerrier, S., Skaloud, J., Stebler, Y., & Victoria-Feser, M. P. (2013). *Wavelet-variance-based estimation for composite stochastic processes*, Journal of the American Statistical Association, 108(503), 1021-1030, online version available [here](https://www.tandfonline.com/doi/full/10.1080/01621459.2013.799920). 


Suggested reading:

1. Percival, D. P. (1995). *On estimation of the wavelet variance. Biometrika*, 82(3), 619-631.

2. Mondal, D., & Percival, D. B. (2012). *M-estimation of wavelet variance*, Annals of the Institute of Statistical Mathematics, 64(1), 27-53.

3. Guerrier, S., R. Molinari, & Balamuta (2016), J. *Discussion on Maximum Likelihood-Based Methods for Inertial Sensor Calibration*, IEEE Sensors Journal 16.14.

4. Guerrier, S., Jurado, J., Khaghani, M., Bakalli, G., Karemera, M., Molinari, R., Orso, S., Raquet, J., Schubert, C., Skaloud, J., Xu. H. & Zhang., Y. (2020) *Wavelet-Based Moment-Matching Techniques for Inertial Sensor Calibration*, IEEE Transactions on Instrumentation and Measurement, 69(10), 7542-7551.

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

<slides source="chapter4_03"> 
</slides>

</exercise>


<exercise id="5" title="Model Selection">

<slides source="chapter4_04"> 
</slides>

</exercise>

<exercise id="6" title="Example: Hydrology">

<slides source="chapter4_05"> 
</slides>

</exercise>

<exercise id="7" title="Example: Saving rates">

<slides source="chapter4_06"> 
</slides>

</exercise>

<exercise id="8" title="Exercises">

# Simulation

- Simulate an AR(1) with the parameters and sample size of your choice.
- Write a function that computes $\hat{Q}_n(\bm{\theta})$ as defined in the previous slide with $\bm{\Omega} = \mathbf{I}$.
- Find the GMWM estimator for the data you simulate in Step 1. Are the estimated parameters close to the correct ones?
- Compare the results with the ones obtained with the \texttt{gmwm()} function.

# Estimation

- Show that the theoretical WV for the model WN() + RW() can be expressed as $\bm{\nu}(\bm{\theta}) = \mathbf{X}\bm{\theta}$.
- In this case, show that the GMWM has a closed form solution.
- Simulate a time series with the parameter $\sigma^2 = 4$, $\gamma^2 = 0.01$ and $T = 10^4$. Compare the AVLR, GMWM (based on the \texttt{gmwm()} function) and the GMWM (closed form). Which estimator is the best one?
- Perform a simulation study to compare the three estimators. Are your results consistent with the ones of \cite{guerrier2016theoretical} (presented in the previous slide)?

# Econometic time series

- Plot the US saving rates data-set (get the data with \texttt{data(savingrt, package = "simts")})
- Find a suitable model of the type ``random walk + noise'' using the \texttt{gmwm()}. 
- Compare the robust and non-robust estimators.

 	
# Inertial sensor

- Find a suitable for error model to describe the signal of ln200 gyroscope. You can get the data as follows: \lstinputlisting[basicstyle=\tiny, language=r]{ln200.r}
- Same question for a KVH1750 accelerometer: \lstinputlisting[basicstyle=\tiny, language=r]{kvh.r}

</exercise>
