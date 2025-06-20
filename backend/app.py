from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с фронта
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///routes.db'
db = SQLAlchemy(app)


# Модель данных
class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start = db.Column(db.String(50), nullable=False)
    end = db.Column(db.String(50), nullable=False)
    distance = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


# Создаём БД при первом запуске
with app.app_context():
    db.create_all()


# Роуты API
@app.route('/api/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify([
        {
            "id": r.id,
            "start": r.start,
            "end": r.end,
            "distance": r.distance,
            "created_at": r.created_at.isoformat()
        } for r in routes
    ])


@app.route('/api/routes', methods=['POST'])
def create_route():
    data = request.get_json()

    # Валидация данных
    if not all(key in data for key in ['start', 'end', 'distance']):
        return jsonify({"error": "Missing required fields"}), 400

    new_route = Route(
        start=data['start'],
        end=data['end'],
        distance=data['distance']
    )

    db.session.add(new_route)
    db.session.commit()

    return jsonify({"message": "Route saved"}), 201


@app.route('/api/routes/<int:id>', methods=['DELETE'])
def delete_route(id):
    route = Route.query.get_or_404(id)
    db.session.delete(route)
    db.session.commit()
    return jsonify({'message': 'Deleted'}), 200



if __name__ == '__main__':
    app.run(debug=True)
