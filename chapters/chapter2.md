---
title: '2 - Introduction to Times Series'
description:
  ''
prev: /chapter1
next: /chapter3
type: chapter
id: 2
---


<exercise id="1" title="General Information">

In this chapter we will consider an introduction to time series analysis from standard statistical standpoint. This chapter is based on the R package [`simts`](https://smac-group.github.io/simts/index.html), which can be installed as follows:

```{r}
# Cran (stable) version
install.packages("simts")

# Developpement version
devtools::install_github("SMAC-Group/simts")
```

The sildes we will can be downloaded [here](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap2.pdf). 

Main references:

1. *Time series analysis and its applications: with R examples*, Shumway & Stoffer, Fourth Edition, 2017, Springer, online version available [here](https://www.stat.pitt.edu/stoffer/tsa4/tsa4.pdf).
2. *Applied Time Series Analysis with `R`*, Guerrier, *et al.* 2019, online version available [here](http://ts.smac-group.com).

</exercise>

<exercise id="2" title="Plotting Time Series">


The `simts` has plenty of example time series. For example, we consider here a data set coming from the domain of hydrology. The data concerns monthly precipitation (in *mm*) over a certain period of time (1907 to 1972) and is interesting for scientists in order to study water cycles. The data are presented in the graph below:

```{r}
# Loading simts
library(simts)

# Load hydro dataset
data("hydro")

# Simulate based on data
hydro = gts(as.vector(hydro), start = 1907, freq = 12, unit_ts = "in.", 
            name_ts = "Precipitation", data_name = "Hydrology data")

# Plot hydro 
plot(hydro)
```
<img src="chap2_precip_plot.png" alt="" width="100%">

Let us consider the limitations of a direct graphical representation of a time series when the sample size is large. Indeed, due to visual limitations, a direct plotting of the data will probably result in an uninformative aggregation of points between which it is unable to distinguish anything. For example, we consider here the data coming from the calibration procedure of an Inertial Measurement Unit (IMU) which, in general terms, is used to enhance navigation precision or reconstruct three dimensional movements. These sensors are used in a very wide range of applications such as robotics, virtual reality, vehicle stability control, human and animal motion capture and so forth. The signals coming from these instruments are measured at high frequencies over a long time and are often characterized by linear trends and numerous underlying stochastic processes. The code below retrieves some data from an IMU and plots it directly. First, we install the `imudata` which is hosted on GitHub:

```{r, eval=FALSE}
# Install imudata R package (this may take a few minutes)
devtools::install_github("SMAC-Group/imudata")
```

Next, we plot the time series:

```{r, cache=TRUE}
# Load IMU data
data(imu6, package = "imudata")

# Construct gst object
Xt = gts(imu6[,1], data_name = "Gyroscope data", unit_time = "hour", 
         freq = 100*60*60, name_ts = "Angular rate", 
         unit_ts = bquote(rad^2/s^2))

# Plot time series
plot(Xt)
```
<img src="chap_imu_plot.png" alt=" " width="100%">

</exercise>

<exercise id="3" title="Simulating Time Series">

Time series can easily be simulated with `simts`. For example, to simulate an White Noise (WN) with variance $\sigma^2 = 1$:

```{r}
n = 1000                               # process length
sigma2 = 1                             # process variance
Xt = gen_gts(n, WN(sigma2 = sigma2))
plot(Xt)
```

<div align="center">
<img src="chap2_simuWN-1.png" alt=" " width="90%">
</div>

Similarly, for a random walk (RW):

```{r}
n = 1000                               # process length
gamma2 = 1                             # process variance
Xt = gen_gts(n, RW(gamma2 = gamma2))
plot(Xt)
```

<div align="center">
<img src="chap2_simuRW-1.png" alt=" " width="90%">
</div>

Composite stochastic processes can also be simulated. For example, the model WN + RW + DR can be simulated as follows:

```{r}
set.seed(18)                            # seed for reproducibility
n = 1000                                # process length
delta = 0.005                           # delta parameter (drift)
sigma2 = 10                             # variance parameter (white noise)
gamma2 = 0.1                            # innovation variance (random walk)
model = WN(sigma2 = sigma2) + RW(gamma2 = gamma2) + DR(omega = delta)
Xt = gen_lts(n = n, model = model)
plot(Xt)
```
<div align="center">
<img src="chap2_simu_composite-1.png" alt=" " width="90%">
</div>

Equivalently, composite stochastic processes can also be simulated with plotting (and returning) the latent processes as follos:

```{r}
set.seed(18)           
Xt = gen_gts(n = n, model = model)
plot(Xt)
```

<div align="center">
<img src="chap2_simu_composite2-1.png" alt=" " width="90%">
</div>

Using your favorite R IDE (RStudio) or the coding enviroment below simulate a white noise process of length 1000 with variance 1:

<codeblock id="01_03">

The function `WN()` can be used here.

</codeblock>

Similarly, simulate a composite process containg a white noise, a random walk and an AR(1) with the length and the parameter values of your choice:

<codeblock id="01_04">

The functions `RW()` and `AR1()` can be used here. It is interesting to compare the functions `gen_gts()` and `gen_lts()`.

</codeblock>


</exercise>

<exercise id="4" title="Autocorrelation">

It is possible to plot the *theoretical* ACF of most time series with `simts`. For example, for an AR(1) we have

```{r AR1theoACF, cache = TRUE, echo = TRUE, fig.cap = "Comparison of theoretical ACF of AR(1) with different parameter values", fig.align='center', fig.height = 8, fig.width = 10}
par(mfrow=c(2,2))
plot(theo_acf(ar = 0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ", phi, " = 0.9")))
plot(theo_acf(ar = 0.5, ma = NULL),
     main = expression(paste("Theoretical ACF plot of AR(1) with ", phi, " = 0.5")))
plot(theo_acf(ar = -0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ", phi, " = -0.9")))
plot(theo_acf(ar = 0.1, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ", phi, " = 0.1")))
```

<img src="AR1theoACF-1.png" alt=" " width="100%">

The theoretical ACF of a process can also be compared with the empirical ACF. For example

```{r AR1acfcomp, cache = TRUE, echo = TRUE, fig.cap = "Comparison between theoretical and empirical ACF for an AR(1) process", fig.align='center', fig.height = 8, fig.width = 10}
par(mfrow=c(2,2))
plot(theo_acf(ar = 0.9, ma = NULL), 
     main = expression(paste("Theoretical ACF plot of AR(1) with ", phi, " = 0.9")))

Xt = gen_gts(n = 50, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 50")

Xt = gen_gts(n = 500, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 500")

Xt = gen_gts(n = 5000, model = AR1(phi = 0.9, sigma2 = 1))
plot(auto_corr(Xt, lag.max = 20), main = "Simulated AR(1) with n = 5000")
```

<img src="AR1acfcomp-1.png" alt=" " width="100%">

</exercise>


<exercise id="5" title="hgjgs">

</exercise>

<exercise id="6" title="Robustness Issues">

The data generating process delivers a theoretical autocorrelation
(autocovariance) function that, as explained in the previous section,
can then be estimated through the sample autocorrelation (autocovariance)
functions. However, in practice, the sample is often issued from a data 
generating process that is "close" to the true one, meaning that the sample
suffers from some form of small contamination. This contamination is typically
represented by a small amount of extreme observations that are called "outliers"
that come from a process that is different from the true data generating process. The fact that the sample can suffer from outliers implies that the standard
estimation of the autocorrelation (autocovariance) functions through the sample
functions could be highly biased. The standard estimators presented in the
previous section are therefore not "robust" and can behave badly when the sample
suffers from contamination. More details on this topic can be found [here](https://smac-group.github.io/ts/fundtimeseries.html#robustness-issues). 
 
In order to limit this effect of outliers, different *robust* estimators exist for time
series problems which are designed to reduce the impact of contamination on 
the estimation procedure. Among these estimators, there are a few that estimate the
autocorrelation (autocovariance) functions in a robust manner. One of these 
estimators is provided in the ``robacf()`` function in the `robcor` package which we will use to investigate the importance of robust ACF estimation on some real data. We consider the data on monthly precipitation (`hydro`) presented in the previous chapter. This data is measured over 65 years (between 1907 and 1972) and is an example of data that is used to determine the behaviour of a water cycle. More specifically, precipitation is often considered the starting point for the analysis of a water cycle and, based on its behaviour, the rest of the water cycle is determined based on other variables. Therefore, a correct analysis of precipitation is extremely important to correctly define the behaviour of the water cycle passing through run-off and groundwater formation to evaporation and condensation. Given this, let us now take a look at the classic autocorrelation plot of this data.

```{r}
# Load hydro dataset
data("hydro")
# Define the time series as a gts object
hydro = gts(as.vector(hydro), start = 1907, freq = 12, unit_ts = "mm", name_ts = "Precipitation", data_name = "Hydrology data")
# Plot the Empirical ACF
plot(auto_corr(hydro))
```


<div align="center">
<img src="chap2_acf-1.png" alt=" " width="75%">
</div>

Based on this ACF plot, one would probably conclude that (counterintuitively) there does not appear to be any significant form of correlation between lagged observations in the data. From a hydrological point of view, one would therefore assume an uncorrelated model for precipitation (i.e. white noise) and, based on this, model the rest of the water cycle. However, let us take a look at the robust ACF plot.

```{r}
# Plot the Robust ACF
plot(auto_corr(hydro, robust = TRUE))
```

<div align="center">
<img src="chap2_robacf-1.png" alt=" " width="75%" class="center">
</div>

If we analyse this output, the conclusion appears to be extremely different and, in some way, makes more sense from a hydrological point of view (i.e. the amount of precipitation between close months and over specific months is correlated). Indeed, we can see that there appears to be a seasonal correlation ("waves" in the ACF plot) and that close months appear to be correlated between them. To better highlight this difference (whci can lead to different conclusions) let us finally compare the plots.

```{r}
# Compare classic and robust ACF
compare_acf(hydro)
```

<img src="chap2_compareacf-1.png" alt=" " width="100%">

Therefore, based on the choice of analysis (i.e. classic or robust), the entire water cycle analysis would change and could deliver very different conclusions.

</exercise>

<exercise id="7" title="kh">

ksdgrg;kb lfzsgn

zflgn

```{r}
sdrgm
```
<slides source = "test">

</slides>

</exercise>