---
type: slides
---

# Allan Variance-based Regression for Time Series Model Estimation

---

# Fitting Allan Variance-based Linear Regression Method (1/)

The Allan Variance-based Linear Regression or AVLR is a technique to estimate the parameters of latent (or composite) stochastic processes. This method is implemented in the `avar` package in the `avlr` function (for more infomation `?avlr`). We will use the data presented previously as well as simulated data to illustrate how the method works. 

Let us start with a simple simulated example where the true data generating process is a white noise together with a random walk (i.e. `WN() + RW()`). 

```r
# Sample size
N = 100000

# Model
mod = WN(sigma2 = 1) + RW(gamma2 = 1e-4)

# Simulate time series
set.seed(12)
Xt = gen_gts(n = n, model = mod)
```

---

# Fitting Allan Variance-based Linear Regression Method (1/)

```r
# Compute AV
av = avar(Xt)

# Plot av
plot(av)
```

<div style="text-align:center"><img src="av8-1.png" alt=" " width="60%">

---
