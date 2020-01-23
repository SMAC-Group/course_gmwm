---
type: slides
---

# The Generalized Method of Wavelet Moments

---

The `gmwm` allows to estimate the parameters of various time series models in an efficient and consistent manner. The function which implements this method is simply called `gmwm()`. There are multiple arguments to this function which provide the users with a flexible range of options to tailor the estimation to their needs. This function relies on  users supplying an error model which can be specified using a combination of all or a subset of the following processes:

- `GM()`: a Gauss-Markov process;
- `AR1()`: a first-order autoregressive process;
- `WN()`: a white noise process;
- `QN()`: quantization noise process;
- `RW()`: a random walk process;
- `DR()`: a drift "process";
- `AR(p)`: a `p`-order autoregressive process;
- `MA(q)`: a `q`-order moving average process;
- `ARMA(p,q)`: an autoregressive-moving average process.

---

It  must  be  underlined  that  a  first-order  autoregressive  process  (`AR1()`)  is  simply  an one-to-one  reparametrization  of  a Gauss-Markov process (`GM()`). The  latent  processes  underlying  the  error  signal,  whose  parameters  need  to  be  estimated,  can  be  specified  by simply adding the different processes mentioned above via the `+` operator. However, there are some limits to how many times a process can be included in a model. In particular, only the `GM()` or `AR1()` models can be included more than once (say `k` times) by specifying, for example, `k*GM()` while the other processes can only be included once within the same model.

---

To illustrate how the function `gmwm()` can be used we start by considering the AR1() with measrument error we discussed previously. 

```r
mod = gmwm(AR1() + WN(), Xt)
summary(mod)
```

```r
plot(mod)
```

The "true" data generating used to generate `Xt` was given by

```r
model
```

---

and therefore the GMWM provides reasonable estimated parameters. We can repeat the same process with the perturbed version of `Xt` which we called `Yt`:

```r
mod_Yt = gmwm(AR1() + WN(), Yt)
summary(mod_Yt)
```

```r
plot(mod_Yt)
```

---

In this case, the estimation is quite poor and, for example, the variance of the `WN()` is largely overestimated. Alternatively, we can used the robust estimator as follows:

```r
mod_Yt_rob = gmwm(AR1() + WN(), Yt, robust = TRUE)
summary(mod_Yt_rob)
```

```r
plot(mod_Yt_rob)
```

In this case, the result are much closer to the ones obtained on `Xt` and illustrates the robustness of the estimator.
