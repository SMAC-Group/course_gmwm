# Load library
library(simts)

# Sample size
n = 10^3

# Parameter value
sigma2     = 1
gamma2     = 0.01
phi        = 0.9
sigma2_ar1 = 1

# Define model
model = WN(sigma2 = 1) + 
        RW(gamma2 = gamma2) + 
        AR1(phi = phi, sigma2 = sigma2_ar1)

# Simulate time series
Xt = gen_lts(n = n, model = model)

# Plot time series
plot(Xt)