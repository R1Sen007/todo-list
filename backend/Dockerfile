FROM python:3.11

WORKDIR /app

COPY Makefile .

COPY requirements.txt .

RUN make requirements

COPY . .

CMD ["make", "run"]