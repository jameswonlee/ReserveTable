from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    # created_at = db.Column(db.DateTime, nullable=False, index=False, default=datetime.utcnow)

    reviews = db.relationship("Review", back_populates="user")
    reservations = db.relationship("Reservation", back_populates="user")

    saved_restaurants = db.relationship("SavedRestaurant", back_populates="users")

    # restaurants = db.relationship("Restaurant", secondary="favorites", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'saved_restaurants': [restaurant.to_dict() for restaurant in self.saved_restaurants] if self.saved_restaurants else None,
            # 'reviews': self.reviews,
            # 'reservations': self.reservations
            # 'reviews': len(self.reviews)
        }
