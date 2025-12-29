PROJECT_NAME=toxic-text-ai
DOCKER_IMAGE=toxic-ai
COMPOSE=docker compose

.PHONY: help build up down restart logs api jupyter clean

help:
	@echo "Available commands:"
	@echo "  make build        Build docker images"
	@echo "  make up           Start API + Jupyter"
	@echo "  make down         Stop all containers"
	@echo "  make restart      Restart services"
	@echo "  make logs         Show logs"
	@echo "  make api          Run FastAPI locally (venv)"
	@echo "  make jupyter      Run Jupyter locally (venv)"
	@echo "  make clean        Remove containers & images"

build:
	$(COMPOSE) build

up:
	$(COMPOSE) up

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) down && $(COMPOSE) up

logs:
	$(COMPOSE) logs -f

clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

api:
	uvicorn main:app --reload

jupyter:
	jupyter lab
