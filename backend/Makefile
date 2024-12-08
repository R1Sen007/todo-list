ASGIIP=0.0.0.0
PORT=5000

requirements:
	pip install -r requirements.txt --no-cache-dir

run:
	gunicorn --bind $(ASGIIP):$(PORT) app:app