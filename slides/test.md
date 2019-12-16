---
type: slides
---

# Title

---
# Introduction

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
---

<img src="AR1theoACF-1.png" alt=" " width="100%">

---
 
# Introduction
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

---

<img src="AR1acfcomp-1.png" alt=" " width="100%">

---