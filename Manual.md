
<!-- GETTING STARTED -->
## Getting Started

* **`pip`**: The backend uses Django, and therefore dependencies can be installed using pip, 
```sh
python3 -m venv env              
source ./env/scripts/activate                         
```
* **`Backend`**: Go inside the backend directory and run
```sh
pip  pip install -r requirements.txt 
```

* **`npm`**: The frontend uses React, go inside the frontend folder and install the dependencies 

```sh
npm install  
```

### Running

This will require you to run backend and frontend separately using two terminals.

* Backend

```sh
python manage.py runserver
```

* Frontend

```sh
npm start      
```