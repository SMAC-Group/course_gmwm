---
type: slides
---

# Computing the Allan Variance

---

# Computing the Wavelet Variance

The `gmwm` package implements the standard (Haar) Wavelet Variance (WV) proposed by Percival, (1995). Here is a simple example:

```r
# Load package
library(gmwm)

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
It is also possible to create a standard "log-log" plot by simply using the function `plot()`:

```r
plot(wv_Xt)
```


<div style="text-align:center"><img src="av1-1.png" alt=" " width="55%">

---

