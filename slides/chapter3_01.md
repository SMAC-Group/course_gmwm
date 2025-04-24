---
type: slides
---

# Computing the Allan Variance

---

# The avar function

Two estimators are implemented in the `avar` package. Here is a simple example on simulated data:

```r
# Simulate white noise 
library(avar); library(simts)
n = 10^4   
Xt = gen_gts(n = n, WN(sigma2 = 1))

# Compute (Maximal Overlap) AV
Xt_av = avar(Xt)
Xt_av
```

```out
##  Levels: 
##  [1]    2    4    8   16   32   64  128  256  512 1024 2048 4096
## 
##  Allan Variances: 
##  [1] 0.51158339 0.24744204 0.11787223 0.05902477 0.02957823 0.01604152
##  [7] 0.00833642 0.00561614 0.00275575 0.00098946 0.00092515 0.00014253
## 
##  Type: 
## [1] "mo"
```

---

# Log-Log plots (1/2)

The standard "log-log plot" of the AV can simply be made with the function `plot()`:

```r
plot(Xt_av)
```

<div style="text-align:center"><img src="av1-1.png" alt=" " width="70%">

---

# Log-Log plots (2/2)

To assess if the empirical AV is "close"" to its theoretical version, we add this quantity in red below:

```r
plot(Xt_av)
lines(Xt_av$levels, 1/Xt_av$levels, lwd = 2, col = "red")
```

<div style="text-align:center"><img src="av2-1.png" alt=" " width="68%">

