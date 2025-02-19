import os
from flask import Flask
from flask_cors import CORS
from routes import routes

port = os.getenv('PORT', 4002)

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True, port = port)
