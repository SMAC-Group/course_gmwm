library(gmwmx2)
library(tikzDevice)
station_data <- download_station_ngl("CHML")
tikz(file  = "img/station.tex",
     width = 5, height = 4, standAlone = T)

plot(station_data, component = "N")
dev.off()
#  compile in pdf
system("pdflatex -output-directory='img' img/station.tex")


fit1 <- gmwmx2(station_data, n_seasonal = 2, component = "N", stochastic_model = "wn + pl")

tikz(file  = "img/fit.tex",
     width = 5, height = 6, standAlone = T)
plot(fit1)
dev.off()
#  compile in pdf
system("pdflatex -output-directory='img' img/fit.tex")
