from django.test import TestCase
import json
# Create your tests here.
class APIEndpointTest(TestCase):
    def test_data_retrieval(self):
        response = self.client.get('http://127.0.0.1:8000/searchQuery/')
        self.assertEqual (response.status_code, 200)
    def test_data_retrieval_format_tfidf(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["TF-IDF"]}), content_type='application/json')
         self.assertEqual (response.status_code, 200)
    def test_data_retrieval_format_bm25(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["BM25"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)
    def test_data_retrieval_format_pl2(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["PL2"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)
    def test_data_retrieval_format_tfidf_bm25(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["TF-IDF","BM25"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)
        #self.assertContains (response, [{"TF-IDF": []},{"BM25": []}])
    def test_data_retrieval_format_tfidf_pl2(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["TF-IDF","PL2"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)

    def test_data_retrieval_format_bm25_pl2(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["BM25", "PL2"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)

    def test_data_retrieval_format_tfidf_bm25_pl2(self):
         response = self.client.post('http://127.0.0.1:8000/searchQuery/', json.dumps({"searchTerm": "Math", "retrievalModels": ["BM25", "TF-IDF", "PL2"]}), content_type='application/json')
         print(response)
         self.assertEqual (response.status_code, 200)

