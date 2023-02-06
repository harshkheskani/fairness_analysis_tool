import pyterrier as pt
import os

def addMetadata(mainFile, metadata):
    for key in metadata:
        if key in mainFile:
            mainFile[key].update(metadata[key])
    return mainFile

print(addMetadata({1:"1",2:"2",3:"3"}, {1:"2",2:"3",3:"1"}))

