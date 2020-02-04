---
type: slides
---

# Computing the Wavelet Variance

---

The `gmwm` package implements the standard (Haar) Wavelet Variance (WV) proposed by Percival, (1995). Here is a simple example:

```r
# Load package
library(gmwm)

#set seed
set.seed(1988)

# Sample size
n = 10^4

# Specify model
model = AR1(phi = .98, sigma2 = .02) + WN(sigma2 = 1)

# Generate Data
Xt = gen_gts(n = n, model = model)
```

---


Using this data we can compute the Haar WV as follows:

```r
# Compute Haar WV
wv_Xt = wvar(Xt)
wv_Xt
```

```out
##         Variance       Low CI    High CI
## 2    0.513384576 0.4938390429 0.53411962
## 4    0.260757638 0.2468831779 0.27584138
## 8    0.140323501 0.1299374290 0.15201311
## 16   0.087092109 0.0781824999 0.09762481
## 32   0.075487675 0.0649060323 0.08890050
## 64   0.088419240 0.0716302114 0.11192403
## 128  0.099993029 0.0746549061 0.14091021
## 256  0.104395909 0.0697471258 0.17330974
## 512  0.064482946 0.0370744239 0.13912452
## 1024 0.043766989 0.0205421297 0.14892447
## 2048 0.031965178 0.0113463228 0.27670187
## 4096 0.034045238 0.0079946734 4.63544098
## 8192 0.002170678 0.0004320716 2.21031132
```

---

It is also possible to create a standard "log-log" plot by simply using the function `plot()`:

```{r gmwm1, fig.align='center', fig.width=6, fig.height=4, cache=TRUE}
plot(wv_Xt)
```

<div style="text-align:center"><img src="gmwm1-1.png" alt=" " width="95%"></div>

