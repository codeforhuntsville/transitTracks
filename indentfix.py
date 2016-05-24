import sys

fileName = "hsvtt.js"

try:
  fileName = sys.argv[1]
except:
  doNothing = True

print "Using filename: ", fileName

codeFile = open(fileName)
contents = codeFile.read()
codeFile.close()

backupFile = open(fileName + ".old", 'w')
backupFile.write(contents)
backupFile.close()

output = ""
sum = 0
for i in contents:
  if i == "\t":
    sum += 1
    output += "  "
  else:
    output += i

codeFile = open(fileName, 'w')
codeFile.write(output)
codeFile.close()
print "Done with ", sum, " indentation corrections."
