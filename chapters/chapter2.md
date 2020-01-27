---
title: '2 - Introduction to Times Series'
description:
  'This chapter provides a brief introduction to (time domain) time series analysis as well as on statistical estimators.'
prev: /chapter1
next: /chapter3
type: chapter
id: 2
---


<exercise id="1" title="General Information">

In this chapter we will consider an introduction to time series analysis from standard statistical standpoint. This chapter is based on the R package [`simts`](https://smac-group.github.io/simts/index.html). This package is currently being modified and is likely to change significantly in the coming months. Therefore, we recommend to install the *development* version of the package as follows:

```r
# Install devtools
install.packages("devtools")

# Install simts from GitHub
devtools::install_github("SMAC-Group/simts")
```

The sildes we will can be downloaded [here](https://github.com/SMAC-Group/course_smac_epfl/raw/master/pdf_slides/slides_chap2.pdf). 

Main references:

1. *Time series analysis and its applications: with R examples*, Shumway & Stoffer, Fourth Edition, 2017, Springer, online version available [here](https://www.stat.pitt.edu/stoffer/tsa4/tsa4.pdf).
2. *Applied Time Series Analysis with `R`*, Guerrier, *et al.* 2019, online version available [here](http://ts.smac-group.com).

</exercise>



<exercise id="2" title="Plotting Time Series">

<slides source="chapter2_02"> 
</slides>

</exercise>




<exercise id="3" title="Simulating Time Series">

<slides source="chapter2_03"> 
</slides>

</exercise>

<exercise id="4" title="Autocorrelation and Partial Autocorrection">

<slides source="chapter2_04"> 
</slides>

</exercise>

<exercise id="5" title="Parameter Estimation">

<slides source="chapter2_05"> 
</slides>

</exercise>


<exercise id="6" title="Model Diagnostic">

<slides source="chapter2_06"> 
</slides>

</exercise>



<exercise id="7" title="Model Selection">

<slides source="chapter2_07"> 
</slides>

</exercise>



<exercise id="8" title="Prediction">

<slides source="chapter2_08"> 
</slides>

</exercise>


<exercise id="9" title="Case Study: Copper Price">

<slides source="chapter2_09"> 
</slides>

</exercise>



<exercise id="10" title="Case Study: Water Levels of Lake Erie">

<slides source="chapter2_10"> 
</slides>

</exercise>

<exercise id="11" title="Exercises">


# Simulating time series


Simulate and create a plot of the following processes of length \\( T=10^3 \\):

- An AR(1) process with \\(\phi= -0.85\\) and \\(\sigma^2 = 1\\),
- An MA(1) process with \\(\theta = 0.9\\) and \\(\sigma^2 = 2\\)
- A drift combined with a white noise process defined as \\( \omega + W_t\\) where \\(\omega = 0.01\\) and the variance of the white noise is \\(\sigma^2 = 2\\).
- A RW (random walk process) with innovation variance \\(\gamma^2=1\\).

By simply looking at these simulated process is it possible to guess which ones could be stationary? If so, explain your reasoning for each process.


# Analysis of time series data

The data hospital contains monthly patient counts for 767 hospitals from January 2000 to December 2007. Focus on the eighth hospital (i.e. hospital[, 8]), which can be downloaded as follows:

```r
# Install expsmooth R package
# install.packages("expsmooth")

# Load simts
library(simts)

# Construct gts object
Xt = gts(expsmooth::hospital[,8], start = 2000, freq = 12, unit_time = 'year',
         name_ts = 'Patient count', data_name = 'Monthly patient count data')

# plot time series
plot(Xt)
```

- Comment on the plot of the time series: does it appear to be stationary?
- If not stationary, use a linear regression to remove possible trends and/or seasonalities.
- Perform a diagnostic analysis on the residuals: does there appear to be dependence between lags?
- If there appears to be dependence in the residuals, propose and estimate a time series model for them. Justify the model.

# Estimation of latent time series models

Consider the process `AR(1) + WN` which can be written as:

<p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mtable><mtr><mtd columnalign="right"><msub><mi>X</mi><mi>t</mi></msub></mtd><mtd columnalign="left"><mo>=</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msub><mi>U</mi><mi>t</mi></msub></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>Z</mi><mi>t</mi></msub></mtd><mtd columnalign="left"><mo>=</mo><msub><mi>X</mi><mi>t</mi></msub><mo>+</mo><msub><mi>V</mi><mi>t</mi></msub></mtd></mtr><mtr><mtd columnalign="right"><mrow><mo stretchy="true" form="prefix">[</mo><mtable><mtr><mtd columnalign="center"><msub><mi>U</mi><mi>t</mi></msub></mtd></mtr><mtr><mtd columnalign="center"><msub><mi>V</mi><mi>t</mi></msub></mtd></mtr></mtable><mo stretchy="true" form="postfix">]</mo></mrow></mtd><mtd columnalign="left"><mo>∼</mo><mstyle mathvariant="script"><mi>𝒩</mi></mstyle><mrow><mo stretchy="true" form="prefix">(</mo><mstyle mathvariant="bold"><mn>0</mn></mstyle><mo>,</mo><mrow><mo stretchy="true" form="prefix">[</mo><mtable><mtr><mtd columnalign="center"><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup></mtd><mtd columnalign="center"><mn>0</mn></mtd></mtr><mtr><mtd columnalign="center"><mn>0</mn></mtd><mtd columnalign="center"><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mtd></mtr></mtable><mo stretchy="true" form="postfix">]</mo></mrow><mo stretchy="true" form="postfix">)</mo></mrow><mi>.</mi></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{align}
X_t &amp;= \rho X_{t-1} + U_t\\
Z_t &amp;= X_t + V_t\\
\begin{bmatrix}
U_t \\
V_t
\end{bmatrix} &amp;\sim
\mathcal{N}\left(\boldsymbol{0}, \begin{bmatrix}
\sigma_u^2 &amp; 0 \\
0 &amp;  \sigma_v^2
\end{bmatrix}\right).
\end{align}</annotation></semantics></math></p>


- Simulate a time series with sample size $n = 200$, $\rho = 0.9$, $\sigma^2_u = 1$ and $\sigma^2_v = 2$ using the "seed" 16 (i.e. using `set.seed(16)`).
- Assuming you know the true parameters (i.e. $\rho = 0.9$, $\sigma^2_u = 1$ and $\sigma^2_v = 2$), estimate the states (i.e. $X_t$) using a Kalman filter.
- Assuming that you don't know the true parameters, compute the MLE for $\boldsymbol{\theta} = [\rho = 0.9 \;\;\ \sigma^2_u \;\; \sigma^2_v]^T$ which we denote $\hat{\boldsymbol{\theta}}$. Run a Monte-carlo simulation where you compute $\hat{\boldsymbol{\theta}}$ $B = 500$. Is MLE reliable? It is computentially intensive? To answer the last question, replicate the same simulation with $n = 2000$.

**Hint for Part III:** It is easy to show that

<p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mtable><mtr><mtd columnalign="right"><mstyle mathvariant="double-struck"><mi>𝔼</mi></mstyle><mrow><mo stretchy="true" form="prefix">[</mo><msub><mi>Z</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">]</mo></mrow></mtd><mtd columnalign="left"><mo>=</mo><mn>0</mn></mtd></mtr><mtr><mtd columnalign="right"><mstyle mathvariant="double-struck"><mi>𝔼</mi></mstyle><mrow><mo stretchy="true" form="prefix">[</mo><msub><mi>Z</mi><mi>t</mi></msub><mo stretchy="false" form="prefix">|</mo><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy="true" form="postfix">]</mo></mrow></mtd><mtd columnalign="left"><mo>=</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub></mtd></mtr><mtr><mtd columnalign="right"><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>Z</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow></mtd><mtd columnalign="left"><mo>=</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>X</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>V</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mfrac><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup><mrow><mn>1</mn><mo>−</mo><msup><mi>ρ</mi><mn>2</mn></msup></mrow></mfrac><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mtd></mtr><mtr><mtd columnalign="right"><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>Z</mi><mi>t</mi></msub><mo stretchy="false" form="prefix">|</mo><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow></mtd><mtd columnalign="left"><mo>=</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>X</mi><mi>t</mi></msub><mo stretchy="false" form="prefix">|</mo><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>V</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>U</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>+</mo><mtext mathvariant="normal">Var</mtext><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>V</mi><mi>t</mi></msub><mo stretchy="true" form="postfix">)</mo></mrow><mo>=</mo><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup><mi>.</mi></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{align}
\mathbb{E} \left[Z_t\right] &amp;= 0\\
\mathbb{E} \left[Z_t | X_{t-1}\right] &amp;= \rho X_{t-1}\\
\text{Var} \left(Z_t \right) &amp;= \text{Var} \left( X_t \right) + \text{Var} \left(V_t \right) = \frac{\sigma_u^2}{1 - \rho^2} + \sigma^2_v\\
\text{Var} \left(Z_t | X_{t-1} \right) &amp;= \text{Var} \left( X_t | X_{t-1}\right) + \text{Var} \left(V_t \right) = \text{Var} \left(U_t \right) + \text{Var} \left(V_t \right) = \sigma_u^2 + \sigma_v^2.
\end{align}</annotation></semantics></math></p>


Assuming $X_t$ to be known the likelihood function would be

$$L\left(\boldsymbol{\theta}\right) = f(Z_1| \boldsymbol{\theta}) \prod_{t = 2}^n f(Z_t|X_{t-1}, \boldsymbol{\theta}),$$
where $f(Z_1|\boldsymbol{\theta})$ and $f(Z_t|X_{t-1},\boldsymbol{\theta})$ denote, respectively, the densities of $Z_1$ and $Z_t|X_{t-1}$ given $\boldsymbol{\theta}$. Therefore, we possible strategy is to compute the state based on a given value of $\boldsymbol{\theta}$, which we write as $X_{t|t}(\boldsymbol{\theta})$, and to replace it in the above definition leading to the (estimated) likelihood function:

$$\hat{L}\left(\boldsymbol{\theta}\right) = f(Z_1|\boldsymbol{\theta}) \prod_{t = 2}^n f(Z_t|X_{t-1|t-1}(\boldsymbol{\theta}), \boldsymbol{\theta}).$$

We can then numerically maximize this function (or its log) to obtain $\hat{\boldsymbol{\theta}}$.

## Solution

### Part I

We can simulate the time series as follows (to visualize the latente processes):

```r
# Set seed for reproducibility
set.seed(16)

# Parameter values
n = 200
rho = 0.9
sigma2_u = 1
sigma2_v = 2

# Simulate process
Zt = gen_lts(n = n, model = AR1(phi = rho, sigma2 = sigma2_u) + WN(sigma2 = sigma2_v))

# Plot time series
plot(Zt)
```

### Part II

We can derive the following Kalman update equations:

<p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mtable><mtr><mtd columnalign="right"><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><msup><mi>ρ</mi><mn>2</mn></msup><msub><mi>p</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>k</mi><mi>t</mi></msub></mtd><mtd columnalign="left"><mo>=</mo><mfrac><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mrow><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mrow></mfrac></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>X</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msub><mi>k</mi><mi>t</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>Z</mi><mi>t</mi></msub><mo>−</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>−</mo><mfrac><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mrow><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mrow></mfrac><mi>.</mi></mtd></mtr></mtable><annotation encoding="application/x-tex">\begin{align}
p_{t|t-1} &amp;= \rho^2 p_{t-1|t-1} + \sigma_u^2\\
k_t &amp;= \frac{p_{t|t-1}}{p_{t|t-1} + \sigma_v^2}\\
X_{t|t} &amp;= \rho X_{t-1|t-1} + k_t \left(Z_t - \rho X_{t-1|t-1}\right)\\
p_{t|t} &amp;= p_{t|t-1} - \frac{p_{t|t-1}}{p_{t|t-1} + \sigma_v^2}.
\end{align}</annotation></semantics></math></p>


This is implemented in the function below:

```r
kf_ar1_wn = function(theta, x0 = 0, p0 = var(Zt), Zt){
  # Assign parameters
  rho = theta[1]
  sigma2_u = theta[2]
  sigma2_v = theta[3]
  
  # Sample size
  n = length(Zt)
  
  # Initialisation
  pt_apriori = pt_apost = xt_apost = rep(NA, n + 1)
  xt_apost[1] = x0
  pt_apriori[1] = pt_apost[1] = p0

  # Start filter
  for (i in 1:n){
    # Compute a priori estimate covariance 
    pt_apriori[i + 1] = rho^2*pt_apost[i] + sigma2_u
  
    # Kalman gain
    k = pt_apriori[i + 1]/(pt_apriori[i + 1] + sigma2_v)
  
    # Compute a posteriori state estimate
    xt_apost[i + 1] = rho*xt_apost[i] + k*(Zt[i] - rho*xt_apost[i])
  
    # Compute a posteriori estimate covariance 
    pt_apost[i + 1] = pt_apriori[i] - pt_apriori[i]^2/(pt_apriori[i] + sigma2_v)
  }

  # Output
  list(X = xt_apost[-1], P = pt_apost[-1])
}
```

Let's plot the results

```r
# Run KF
kf = kf_ar1_wn(theta = c(0.9, 1, 2), Zt = Zt[,3])

# Split window
par(mfrow = c(2,1)) 

# Graph I: true vs estimates states
plot(NA, ylab = "Xt", xlab = "Time", 
     xlim = c(1, n), ylim = c(min(Zt[,1])-1.5, max(Zt[,1]) + 1))
polygon(c(1:n, rev(1:n)), 
        c(kf$X + 2*sqrt(kf$P), rev(kf$X - 2*sqrt(kf$P))),
        border = NA, col = "gray90")
lines(Zt[,1], col = "red4")
lines(kf$X, col = "blue2")
legend("bottomleft", c("Xt", "Xt|t", "CI"), col = c("red4", "blue2", "gray90"), lwd = c(1, 1, NA), pch = c(NA, NA, 15), pt.cex = c(NA, NA, 2))

# Graph II: time series vs estimates states
plot(NA, ylab = "Observations", xlab = "Time", 
     xlim = c(1, n), ylim = c(min(Zt[,3])-1.5, max(Zt[,3])))
lines(Zt[,3], col = "green2")
lines(Zt[,1], col = "red4")
lines(kf$X, col = "blue2")
legend("bottomleft", c("Zt", "Xt", "Xt|t"), col = c("green2", "red4", "blue2"), lwd = 1)
```

# Part III

The function below corresponds to the likelihood function (times -1) presented above:

```r
likelihood_ar1_wn = function(theta, Zt){
  # Sample size
  n = length(Zt)
  
  # Transform parameters (to avoid exiting parameter space)
  rho = 2/(1 + exp(-theta[1])) - 1   # To stay in (-1, 1)
  sigma2_u = exp(theta[2])           # To stay in R+
  sigma2_v = exp(theta[3])           # To stay in R+
  
  # Run KF
  kf = kf_ar1_wn(theta = c(rho, sigma2_u, sigma2_v), Zt = Zt)
  
  # Compute log likelihood
  inter = log(dnorm(Zt[1], 0, sqrt(sigma2_u/(1 - rho^2) + sigma2_v)))
  for (i in 2:n){
    inter = inter + log(dnorm(Zt[i], rho*kf$X[i-1], sqrt(sigma2_u + sigma2_v)))
  }
  -inter/n
}
```

In the function below, we implement the MLE

```r
mle_ar1_wn = function(Zt){
  # Initial value
  theta_start = c(0.9, 1, 2) #c(acf(Zt, plot = FALSE)$acf[2], rep(var(Zt)/2, 2))
  
  # Inverse parameter transformation
  theta_start[1] = -log((1 - theta_start[1])/(1 + theta_start[1]))
  theta_start[2] = log(theta_start[2])
  theta_start[3] = log(theta_start[3])
  
  # Optimization
  opt = optim(theta_start, likelihood_ar1_wn, Zt = Zt)
  
  # Output
  list(theta = c(2/(1 + exp(-opt$par[1])) - 1, exp(opt$par[2:3])), converged = opt$convergence)
}
```


```r
# Parameter values
B = 500
 
# Initialisation
theta = matrix(NA, B, 3)
converged = rep(NA, B)

# Start timer
start_time = Sys.time()

# Start Monte-Carlo
for (i in 1:B){
  # Set seed
  set.seed(i)
  
  # Simulate process
  Zt = gen_gts(n = n, model = AR1(phi = rho, sigma2 = sigma2_u) + WN(sigma2 = sigma2_v))
  
  # Compute MLE
  inter = mle_ar1_wn(Zt)
  converged[i] = inter$converged
  theta[i,] = inter$theta
}

# End timer
end_time = Sys.time()

# Save simulation time
time_simu1 = end_time - start_time
```


```r
# Parameter values
n = 2000
 
# Initialisation
theta2 = matrix(NA, B, 3)
converged2 = rep(NA, B)

# Start timer
start_time = Sys.time()

# Start Monte-Carlo
for (i in 1:B){
  # Set seed
  set.seed(i)
  
  # Simulate process
  Zt = gen_gts(n = n, model = AR1(phi = rho, sigma2 = sigma2_u) + WN(sigma2 = sigma2_v))
  
  # Compute MLE
  inter = mle_ar1_wn(Zt)
  converged2[i] = inter$converged
  theta2[i,] = inter$theta
}

# End timer
end_time = Sys.time()

# Save simulation time
time_simu2 = end_time - start_time
```


```r
time_simu1
time_simu2
```

```r
par(mfrow = c(1, 3))
boxplot(theta[,1], theta2[,1])
abline(h = 0.9)
boxplot(theta[,2], theta2[,2])
abline(h = 1)
boxplot(theta[,3], theta2[,3])
abline(h = 2)
```



</exercise>







