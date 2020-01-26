---
type: slides
---

# Simulating Time Series

---

Time series can easily be simulated with simts. For example, to simulate a White Noise (`WN`) with variance $$\sigma^2 = 1$$

```r
set.seed(18)                            # seed for reproducibility
n = 1000                                # process length
sigma2 = 1                              # process variance
Xt = gen_gts(n, WN(sigma2 = sigma2))
plot(Xt)
```

---

Similarly, for a random walk (RW):

```r
set.seed(18)                           # seed for reproducibility
n = 1000                               # process length
gamma2 = 1                             # process variance
Xt = gen_gts(n, RW(gamma2 = gamma2))
plot(Xt)
```

---

Composite stochastic processes can also be simulated. For example, the model `WN + RW + DR` can be simulated as follows:

```r
set.seed(18)                            # seed for reproducibility
n = 1000                                # process length
delta = 0.005                           # delta parameter (drift)
sigma2 = 10                             # variance parameter (white noise)
gamma2 = 0.1                            # innovation variance (random walk)
model = WN(sigma2 = sigma2) + RW(gamma2 = gamma2) + DR(omega = delta)
Xt = gen_lts(n = n, model = model)
```

---

```r
plot(Xt)
```

---

Equivalently, composite stochastic processes can also be simulated with plotting (and returning) the latent processes as follows:

```r
set.seed(18)           
Xt = gen_gts(n = n, model = model)
plot(Xt)
```
---