import pyterrier as pt
import pandas as pd
import os
import json

if not pt.started():
    pt.init()


def globalLocations():
    
    __location__ = os.path.realpath(os.path.join(
        os.getcwd(), os.path.dirname(__file__)))
    __location__ = __location__.replace("\\", "/")
    
    metadataPath = str(__location__) + "/trec_metadata.json.gz"
    
    metadata = pd.read_json(metadataPath, lines=True)
    metadata = metadata.rename(columns={"page_id": "docno"})
    metadata["geographic_locations"] = metadata["geographic_locations"].apply(
        lambda x: x if len(x) > 0 else ['unknown'])
    
    metadataExploded = metadata.explode('geographic_locations')
    counts = metadataExploded['geographic_locations'].value_counts()

    # convert the resulting series into a dictionary
    counts_dict = counts.to_dict()
    print(counts_dict)
    return counts_dict
print(globalLocations())