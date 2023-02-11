import pyterrier as pt
import pandas as pd
import os
import json

if not pt.started():
    pt.init()


def indexStats():
    __location__ = os.path.realpath(os.path.join(
        os.getcwd(), os.path.dirname(__file__)))
    __location__ = __location__.replace("\\", "/")

    indexPath = str(__location__) + \
                    "/monicaLongNewSecond/nfs/trec21MonicaLong/"
    index = pt.IndexFactory.of(indexPath)

    baseString = index.getCollectionStatistics().toString()


    baseString = baseString.split("\n")
    jsonString = json.dumps(baseString)

    return jsonString

print(indexStats())
