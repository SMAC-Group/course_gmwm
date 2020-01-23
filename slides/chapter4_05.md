---
type: slides
---

# Model Selection

---

In practice, the model we should consider to describe a specific time series models is generally unknown. For example, if we consider a time series issued from the model ` WN() + AR1() + RW()`, the WV of this time series may not clearly indicate which model should be used. Here is an example:

```r
library(gmwm)
# Set seed to repliacte results
set.seed(182)

# Sample size
n = 4*10^4

# Specify model
model = AR1(phi = .9, sigma2 = .1) + WN(sigma2 = 1) + RW(gamma2 = 0.0001) 

# Generate Data
Xt = gen_gts(n = n, model = model) 

# Plot WV
plot(wvar(Xt)) 
```

---

Assuming that one indentifies the correct model, they would obtain the following result:

```r
# Fit true model
mod = gmwm(WN() + AR1() + RW(), Xt) 
summary(mod, inference = TRUE)      
```

```r
plot(mod)     
```

---

We could then wonder if a *smaller* model might be more approriate (e.g. `WN() + AR1()`). To avoid any numerical issues we initialize the next model using the parameters values obtained from the previous estimation:

```r
mod1_start = WN(sigma2 = 0.990997918) + AR1(phi = 0.897352858, sigma2 = 0.100979984)
mod1 = gmwm(mod1_start, Xt) 
summary(mod1, inference = TRUE)    
```

```r
plot(mod1)     
```

---

Thie second model appears to provide a poorer fit then our first (correct) model. We can further compare these models as follows:

```r
compare_models(mod, mod1, show.theo.wv = T,   
               facet.label = c('WN() + AR1() + RW()', 'WN() + AR1()')) 
```

---

The `gmwm` also contains an automatic method to select and rank models by either providing a list of models or searching all *nested* models. We will use the second method and search all models nested with the model `WN() + AR1() + RW()`, namely the following seven models:

- `WN()`
- `AR1()`
- `RW()`
- `WN() + AR1()`
- `WN() + RW()`
- `AR1() + RW()`
- `WN() + AR1() + RW()`

---

This method selection approach is implemented in the function `rank_models()`, which is used in the example below:

```r
rank_models(WN() + AR1() + RW(), data = Xt, nested = TRUE, bootstrap = TRUE, model.type = "imu", B = 100)
```

---

In this case, the model `WN() + AR1() + RW()` appears to provide the best fit among all candidate models. However, this example is bit artificial as the correct model is used as reference. One could wonder what would happend if were to specify an *incorrect* one to the function `rank_models()`. This is done as an example using the model `WN() + 2*AR1() + RW()` which is clearly not the right one:

```r
rank_models(WN() + 2*AR1() + RW(), data = Xt, nested = TRUE, bootstrap = TRUE, model.type = "imu", B = 100)
```

---

In this case also the suggested model remains the correct model, i.e. `WN() + AR1() + RW()`. However, this method selection approach is mainly indicative and more research is needed on the reliability of this method. In fact, all models having a Goodness-of-Fit (GoF) P-Values larger than, say, 5% should be considered as viable models. A possible approach is to select the model with the smallest number of parameters within these set of models having a GoF P-Values larger than 5%. In this case, the set of models is: 

- `WN + AR1 + RW`
- `WN + 2*AR1` 
- `WN + 2*AR1 + RW` 
- `2*AR1 + RW`,

---

also leading to the choice of the model `WN + AR1 + RW` (since it has the smallest number of parameters). Finally, we could also compare these models graphically as follows:

```r
mod1 = gmwm(WN() + AR1() + RW(), Xt) 
mod2 = gmwm(WN() + 2*AR1(), Xt) 
mod3 = gmwm(WN() + 2*AR1() + RW(), Xt) 
mod4 = gmwm(2*AR1() + RW(), Xt) 

compare_models(mod1, mod2, mod3, mod4, show.theo.wv = T,   
               facet.label = c('WN() + AR1() + RW()', 'WN() + 2*AR1()',
                               'WN() + 2*AR1() + RW()', 
                               '2*AR1() + RW()'))
```

It can clearly be observed that all model provide extremly similar fits and using the "smallest" appears reasonable.