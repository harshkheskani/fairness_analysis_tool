import pyterrier as pt 
import pandas as pd
import os

if not pt.started():
    pt.init()

def searchQuery(search):

    __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    __location__ = __location__.replace("\\","/")
    # Index path (make dynamic)

    indexPath = str(__location__) + "/monicaLongNewSecond/nfs/trec21MonicaLong/"
    index = pt.IndexFactory.of(indexPath)

    # Experiments
    tf_idf = pt.BatchRetrieve(index, wmodel = "TF_IDF")
    #BM25 = pt.BatchRetrieve(index, wmodel = "BM25")
    #PL2 = pt.BatchRetrieve(index, wmodel = "PL2") 

    # Topics
    topicPath = str(__location__) + "/eval-topics-with-qrels.json.gz"
    topics = pd.read_json(topicPath, lines=True)
    topicQuery = topics[["id","title"]]
    topicQuery = topicQuery.rename(columns = {"id":"qid", "title":"qrels"})
    topicQuery["qid"] = topicQuery["qid"].astype(str)

    # Coverting every element in rel_docs into its own separate row
    explodeTopics = topics.explode("rel_docs")
    qrels = explodeTopics[["id","rel_docs"]]
    qrels = qrels.rename(columns = {"id":"qid", "rel_docs":"doc_id"}) 
    qrels["qid"] = qrels["qid"].astype(str)
    qrels["doc_id"] = qrels["doc_id"].astype(str)
    qrels["label"] = 1

    # Finding top 5 results of search results on TF_IDF
    tf_idf_search = (tf_idf.search(str(search))).head(5)
    tf_idf_search = tf_idf_search.to_json(orient = "records")
    
    # run experiments here 

    return tf_idf_search





