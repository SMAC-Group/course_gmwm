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

<p>Simulate and create a plot of the following processes of length <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>T</mi><mo>=</mo><msup><mn>10</mn><mn>3</mn></msup></mrow><annotation encoding="application/x-tex">T=10^3</annotation></semantics></math>:</p>
<ul>
<li>An AR(1) process with <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ϕ</mi><mo>=</mo><mo>−</mo><mn>0.85</mn></mrow><annotation encoding="application/x-tex">\phi= -0.85</annotation></semantics></math> and <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\sigma^2 = 1</annotation></semantics></math>,</li>
<li>An MA(1) process with <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>θ</mi><mo>=</mo><mn>0.9</mn></mrow><annotation encoding="application/x-tex">\theta = 0.9</annotation></semantics></math> and <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\sigma^2 = 2</annotation></semantics></math></li>
<li>A drift combined with a white noise process defined as <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>X</mi><mi>t</mi></msub><mo>=</mo><mi>ω</mi><mo>+</mo><msub><mi>W</mi><mi>t</mi></msub><mo>,</mo></mrow><annotation encoding="application/x-tex">X_t = \omega + W_t,</annotation></semantics></math> where <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ω</mi><mo>=</mo><mn>0.01</mn></mrow><annotation encoding="application/x-tex">\omega = 0.01</annotation></semantics></math> and the variance of the white noise is <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>σ</mi><mn>2</mn></msup><mo>=</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\sigma^2 = 2</annotation></semantics></math>.</li>
<li>A RW (random walk process) with innovation variance <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>γ</mi><mn>2</mn></msup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\gamma^2=1</annotation></semantics></math>.</li>
</ul>
<p>By simply looking at these simulated process is it possible to guess which ones could be stationary? If so, explain your reasoning for each process.</p>



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

<div style="text-align:center"><img src="exo_chap2_1-1.png" alt=" " width="90%">

</div>
<ul>
<li>Comment on the plot of the time series: does it appear to be stationary?</li>
<li>If not stationary, use a linear regression to remove possible trends and/or seasonalities.</li>
<li>Perform a diagnostic analysis on the residuals: does there appear to be dependence between lags?</li>
<li>If there appears to be dependence in the residuals, propose and estimate a time series model for them. Justify the model.</li>
</ul>

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





<ul>
<li>Simulate a time series with sample size <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mn>200</mn></mrow><annotation encoding="application/x-tex">n = 200</annotation></semantics></math>, <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ρ</mi><mo>=</mo><mn>0.9</mn></mrow><annotation encoding="application/x-tex">\rho = 0.9</annotation></semantics></math>, <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\sigma^2_u = 1</annotation></semantics></math> and <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup><mo>=</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\sigma^2_v = 2</annotation></semantics></math>using the “seed” 16 (i.e. using <code>set.seed(16)</code>).</li>
<li>Assuming you know the true parameters (i.e. <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>ρ</mi><mo>=</mo><mn>0.9</mn></mrow><annotation encoding="application/x-tex">\rho = 0.9</annotation></semantics></math>, <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup><mo>=</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\sigma^2_u = 1</annotation></semantics></math> and <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup><mo>=</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">\sigma^2_v = 2</annotation></semantics></math>), estimate the states (i.e. <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><msub><mi>X</mi><mi>t</mi></msub><annotation encoding="application/x-tex">X_t</annotation></semantics></math>) using a Kalman filter.</li>
<li>Assuming that you don’t know the true parameters, compute the MLE for <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mstyle mathvariant="bold"><mi>𝛉</mi></mstyle><mo>=</mo><mo stretchy="false" form="prefix">[</mo><mi>ρ</mi><mo>=</mo><mn>0.9</mn><mspace width="0.278em"></mspace><mspace width="0.278em"></mspace><mspace width="0.222em"></mspace><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup><mspace width="0.278em"></mspace><mspace width="0.278em"></mspace><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup><msup><mo stretchy="false" form="postfix">]</mo><mi>T</mi></msup></mrow><annotation encoding="application/x-tex">\boldsymbol{\theta} = [\rho = 0.9 \;\;\ \sigma^2_u \;\; \sigma^2_v]^T</annotation></semantics></math> which we denote <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mover><mstyle mathvariant="bold"><mi>𝛉</mi></mstyle><mo accent="true">̂</mo></mover><annotation encoding="application/x-tex">\hat{\boldsymbol{\theta}}</annotation></semantics></math>. Run a Monte-carlo simulation where you compute <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mover><mstyle mathvariant="bold"><mi>𝛉</mi></mstyle><mo accent="true">̂</mo></mover><annotation encoding="application/x-tex">\hat{\boldsymbol{\theta}}</annotation></semantics></math> <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>B</mi><mo>=</mo><mn>500</mn></mrow><annotation encoding="application/x-tex">B = 500</annotation></semantics></math>. Is MLE reliable? It is computentially intensive? To answer the last question, replicate the same simulation with <math display="inline" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>=</mo><mn>2000</mn></mrow><annotation encoding="application/x-tex">n = 2000</annotation></semantics></math>.</li>
</ul>

<p>We can derive the following Kalman update equations:</p>
<p><math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mtable><mtr><mtd columnalign="right"><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><msup><mi>ρ</mi><mn>2</mn></msup><msub><mi>p</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>u</mi><mn>2</mn></msubsup></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>k</mi><mi>t</mi></msub></mtd><mtd columnalign="left"><mo>=</mo><mfrac><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mrow><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mrow></mfrac></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>X</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msub><mi>k</mi><mi>t</mi></msub><mrow><mo stretchy="true" form="prefix">(</mo><msub><mi>Z</mi><mi>t</mi></msub><mo>−</mo><mi>ρ</mi><msub><mi>X</mi><mrow><mi>t</mi><mo>−</mo><mn>1</mn><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo stretchy="true" form="postfix">)</mo></mrow></mtd></mtr><mtr><mtd columnalign="right"><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi></mrow></msub></mtd><mtd columnalign="left"><mo>=</mo><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>−</mo><mfrac><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mrow><msub><mi>p</mi><mrow><mi>t</mi><mo stretchy="false" form="prefix">|</mo><mi>t</mi><mo>−</mo><mn>1</mn></mrow></msub><mo>+</mo><msubsup><mi>σ</mi><mi>v</mi><mn>2</mn></msubsup></mrow></mfrac><mi>.</mi></mtd></mtr></mtable><annotation encoding="application/x-tex">
\begin{align}
p_{t|t-1} &amp;= \rho^2 p_{t-1|t-1} + \sigma_u^2\\
k_t &amp;= \frac{p_{t|t-1}}{p_{t|t-1} + \sigma_v^2}\\
X_{t|t} &amp;= \rho X_{t-1|t-1} + k_t \left(Z_t - \rho X_{t-1|t-1}\right)\\
p_{t|t} &amp;= p_{t|t-1} - \frac{p_{t|t-1}}{p_{t|t-1} + \sigma_v^2}.
\end{align}
</annotation></semantics></math></p>





</exercise>







