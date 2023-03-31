# Guidance
This is a suggested template for a project. You can modify it as you please, but
but remember to keep:

* a timelog, updated regularly in the `timelog.md` format;
* all source under version control;
* data well organised and with appropriate ethical approval (for human subject data);

Here's an overview of the structure as it stands:

* `timelog.md` The time log for your project.
* `plan.md` A skeleton week-by-week plan for the project. 
* `data/` data you acquire during the project
* `src/` source code for your project
* `status_report/` the status report submitted in December
* `meetings/` Records of the meetings you have during the project.
* `dissertation/` source and for your project dissertation
* `presentation/` your presentation

* Make sure you add a `.gitignore` or similar for your VCS for the tools you are using!
* Add any appropriate continuous integration (e.g. Travis CI) in this directory.

* Remove this `readme.md` file from any repository and replace it with something more appropriate!

## Running the app 


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

## Notice

The dataset and index are not available in the codebase due to their massive size, it was agreed with the supervisor that it should not be updated.