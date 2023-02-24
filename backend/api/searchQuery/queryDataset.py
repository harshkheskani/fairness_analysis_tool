import pyterrier as pt
import pandas as pd
import os

if not pt.started():
    pt.init()


def searchQuery(search):

    # Break Down of search Dictionary

    searchTerm = search.get("searchTerm")
    retrievalModels = search.get("retrievalModels")

    # General Location path, to make it dynamic
    __location__ = os.path.realpath(os.path.join(
        os.getcwd(), os.path.dirname(__file__)))
    __location__ = __location__.replace("\\", "/")

    # Path to the index
    indexPath = str(__location__) + \
        "/monicaLongNewSecond/nfs/trec21MonicaLong/"
    index = pt.IndexFactory.of(indexPath)

    # Experiments
    tf_idf = pt.BatchRetrieve(index, wmodel="TF_IDF", metadata=[
                              "docno", "title", "text", "url"])
    bm25 = pt.BatchRetrieve(index, wmodel="BM25", metadata=[
                            "docno", "title", "text", "url"])
    pl2 = pt.BatchRetrieve(index, wmodel="PL2", metadata=[
                           "docno", "title", "text", "url"])

    # Topics
    topicPath = str(__location__) + "/eval-topics-with-qrels.json.gz"
    topics = pd.read_json(topicPath, lines=True)
    topicQuery = topics[["id", "title"]]
    topicQuery = topicQuery.rename(columns={"id": "qid", "title": "qrels"})
    topicQuery["qid"] = topicQuery["qid"].astype(str)

    # Coverting every element in rel_docs into its own separate row
    explodeTopics = topics.explode("rel_docs")
    qrels = explodeTopics[["id", "rel_docs"]]
    qrels = qrels.rename(columns={"id": "qid", "rel_docs": "doc_id"})
    qrels["qid"] = qrels["qid"].astype(str)
    qrels["doc_id"] = qrels["doc_id"].astype(str)
    qrels["label"] = 1

    # Finding top 5 results of search results on TF_IDF
    # tf_idf_search = (tf_idf.search(str(searchTerm))).head(100)

    metadataPath = str(__location__) + "/trec_metadata.json.gz"
    metadata = pd.read_json(metadataPath, lines=True)
    metadata = metadata.rename(columns={"page_id": "docno"})
    metadata["geographic_locations"] = metadata["geographic_locations"].apply(
        lambda x: x if len(x) > 0 else ['unknown'])
    metadata["docno"] = metadata["docno"].astype(str)

    # run experiments here

    results = {}

    for model in retrievalModels:
        if model == "TF_IDF":
            tf_idf_search = (tf_idf.search(str(searchTerm))).head(100)
            tf_idf_search = tf_idf_search.merge(metadata, on="docno")
            tf_idf_search = tf_idf_search.to_json(orient="records")
            results["TF_IDF"] = tf_idf_search
        elif model == "PL2":
            pl2_search = (pl2.search(str(searchTerm))).head(100)
            pl2_search = pl2_search.merge(metadata, on="docno")
            pl2_search = pl2_search.to_json(orient="records")
            results["PL2"] = pl2_search
        elif model == "BM25":
            bm25_search = (bm25.search(str(searchTerm))).head(100)
            bm25_search = bm25_search.merge(metadata, on="docno")
            bm25_search = bm25_search.to_json(orient="records")
            results["BM25"] = bm25
    return results
