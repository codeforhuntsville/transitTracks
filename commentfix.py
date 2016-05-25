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

history = [" ", " ", " "]
output = ""
sum = 0
for i in contents:
  history[0] = history[1]
  history[1] = history[2]
  history[2] = i
  if (history[0] == "/") and (history[1] == "/") and (not history[2] == " "):
    sum += 1
    output += "  " + i
  else:
    output += i

codeFile = open(fileName, 'w')
codeFile.write(output)
codeFile.close()
print "Done with ", sum, " comment corrections."
