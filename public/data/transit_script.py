import urllib

x = urllib.urlopen("http://data.huntsvilleal.opendata.arcgis.com/datasets/8df7fd62753f4d618f54e33a5f59a758_0.geojson").read()
data_file = file("transit-service-routes.geojson", "w")

x = 'var allRoutes = ' + x
print x
data_file.write(x)
