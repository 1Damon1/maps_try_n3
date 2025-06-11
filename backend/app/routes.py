from flask import jsonify, request
from . import app, db
from .models import Route

@app.route('/api/routes', methods=['GET'])
def get_routes():
    routes = Route.query.all()
    return jsonify([{'id': r.id, 'name': r.name, 'points': r.points} for r in routes])

@app.route('/api/routes', methods=['POST'])
def create_route():
    data = request.json
    new_route = Route(name=data['name'], points=data['points'])
    db.session.add(new_route)
    db.session.commit()
    return jsonify({'message': 'Route created', 'id': new_route.id}), 201
