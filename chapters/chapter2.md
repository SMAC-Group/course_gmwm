---
title: 'Chapter 2: Introduction to Times Series'
description:
  ''
prev: /chapter1
next: /chapter3
type: chapter
id: 2
---


<exercise id="1" title="General Information">

In this chapter we will consider an introduction to time series analysis from . This chapter is based on the R package [`simts`](https://smac-group.github.io/simts/index.html), which can be installed as follows:

```{r}
# Cran (stable) version
install.packages("simts")

# Developpement version
devtools::install_github("SMAC-Group/simts")
```

The sildes we will can be downloaded [here](https://www.google.com). 

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
<img src="chap2_simuWN-1.png" alt=" " width="100%">

Similarly, for a random walk (RW):

```{r}
n = 1000                               # process length
gamma2 = 1                             # process variance
Xt = gen_gts(n, RW(gamma2 = gamma2))
plot(Xt)
```
<img src="chap2_simuRW-1.png" alt=" " width="100%">

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
<img src="chap2_simu_composite-1.png" alt=" " width="100%">

Equivalently, composite stochastic processes can also be simulated with plotting (and returning) the latent processes as follos:

```{r}
set.seed(18)           
Xt = gen_gts(n = n, model = model)
plot(Xt)
```
<img src="chap2_simu_composite2-1.png" alt=" " width="100%">


<codeblock id="01_03">

This is a hint.

</codeblock>
</exercise>