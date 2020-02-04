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
set.seed(123456)

# Sample size
n = 10^4

# Specify model
model = AR1(phi = .98, sigma2 = .02) + WN(sigma2 = 1)

# Generate Data
Xt = gen_gts(n = n, model = model)
```

---


Using this data we can compute the Haar WV as follows:

```{r, fig.align='center', fig.width=6, fig.height=4, cache=TRUE}
# Compute Haar WV
wv_Xt = wvar(Xt)
wv_Xt
```

```out
##          Variance       Low CI    High CI
## 2    0.5040246746 4.848355e-01 0.52438168
## 4    0.2575291592 2.438265e-01 0.27242615
## 8    0.1419863801 1.314772e-01 0.15381451
## 16   0.0856663890 7.690263e-02 0.09602667
## 32   0.0751639935 6.462772e-02 0.08851931
## 64   0.0775315023 6.280984e-02 0.09814196
## 128  0.0867295180 6.475235e-02 0.12221927
## 256  0.0988645867 6.605164e-02 0.16412708
## 512  0.0802739036 4.615342e-02 0.17319413
## 1024 0.0292439048 1.372569e-02 0.09950726
## 2048 0.0125773999 4.464459e-03 0.10887441
## 4096 0.0054020268 1.268531e-03 0.73551481
## 8192 0.0002093866 4.167821e-05 0.21320962
```

---

It is also possible to create a standard "log-log" plot by simply using the function `plot()`:

```{r gmwm1, fig.align='center', fig.width=6, fig.height=4, cache=TRUE}
plot(wv_Xt)
```

<div style="text-align:center"><img src="gmwm1-1.png" alt=" " width="95%">

---
