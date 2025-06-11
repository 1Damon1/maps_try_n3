from datetime import datetime
from .. import db

class Route(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    points = db.Column(db.JSON, nullable=False)  # {start: [lat, lon], end: [lat, lon]}
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
