reset_all:
	docker-compose down --volumes --remove-orphans
	sudo rm -rf data
	make build
run: 
	docker-compose up -d

down:
	docker-compose down

build:
	make remove_migrations_files
	docker-compose build --no-cache
	make run

rebuild_webapp:
	docker-compose up -d --no-deps --build web

rebuild_backend:
	docker-compose up -d --no-deps --build backend

migrations:
	docker exec -it formbuilder_api bash -c "python manage.py makemigrations"
	docker exec -it formbuilder_api bash -c "python manage.py migrate"

remove_migration_files:
	sudo find . -path "./backend/*/migrations/*.py" -not -name "__init__.py" -delete

superuser:
	docker exec -it formbuilder_api bash -c "python manage.py createsuperuser"

logs:
	docker-compose logs -f

db_bash:
	docker exec -it formbuilder_db bash

backend_bash:
	docker exec -it formbuilder_api bash

frontend_bash:
	docker exec -it formbuilder_web bash