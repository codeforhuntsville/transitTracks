import urllib

x = urllib.urlopen("http://maps.huntsvilleal.gov/geojson/HuntsvilleShuttleBusRoutes.geojson").read()
data_file = file("transit-service-routes.geojson", "w")

x = 'var allRoutes = ' + x
print x
data_file.write(x)


y = urllib.urlopen("http://maps.huntsvilleal.gov/geojson/HuntsvilleShuttleBusStops.geojson").read()
data_file = file("transit-service-stops.geojson", "w")

y = 'var allStops = ' + y
print y
data_file.write(y)