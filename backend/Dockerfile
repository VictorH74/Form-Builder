FROM python:3.8

# Create app directory
WORKDIR /app/backend

# Install app dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Bundle app source
COPY . .

EXPOSE 8000

# Start the app
CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
