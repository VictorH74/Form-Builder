run: 
	docker-compose up -d
down:
	docker-compose down
build:
	docker-compose build --no-cache
	make run
rebuild_webapp:
	docker-compose up -d --no-deps --build web
rebuild_backend:
	docker-compose up -d --no-deps --build backend
make init:
	docker exec -it formbuild_backend bash -c "npm init -y"
migrations:
	docker exec -it formbuild_backend bash -c "cd /app/backend && python manage.py makemigrations"
	docker exec -it formbuild_backend bash -c "cd /app/backend && python manage.py migrate"		
superuser:
	docker exec -it formbuild_backend bash -c "cd /app/backend && python manage.py createsuperuser"
logs:
	docker-compose logs -f
db_terminal:
	docker exec -it formbuilder_db bash