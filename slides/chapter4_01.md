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

```out
       Variance       Low CI    High CI
2    0.49375142 0.4749533550 0.51369350
4    0.24404394 0.2310587900 0.25816087
8    0.13388042 0.1239712349 0.14503329
16   0.08197953 0.0735929447 0.09189393
32   0.06570955 0.0564985751 0.07738497
64   0.07706511 0.0624319990 0.09755158
128  0.08458639 0.0631522889 0.11919917
256  0.06584253 0.0439895313 0.10930650
512  0.03480209 0.0200094382 0.07508690
1024 0.03308818 0.0155300079 0.11258804
2048 0.04856671 0.0172391831 0.42041058
4096 0.03831322 0.0089969012 5.21654893
8192 0.00306863 0.0006108081 3.12465831
```

---

It is also possible to create a standard "log-log" plot by simply using the function `plot()`:

```r
plot(wv_Xt)
```

<div style="text-align:center"><img src="gmwm1-1.png" alt=" " width="70%">

---

