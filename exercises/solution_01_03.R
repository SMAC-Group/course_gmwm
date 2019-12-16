# Load library
library(simts)

# Sample size
n = 10^3

# Define model
model = WN(sigma2 = 1)

# Simulate time series
Xt = gen_gts(n = n, model = model)

# Plot time series
plot(Xt)