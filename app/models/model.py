from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base=declarative_base()

favorites = db.Table(
    "favorites",
    db.Model.metadata,
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "restaurant_id",
        db.Integer,
        db.ForeignKey("restaurants.id"),
        primary_key=True
    ),
    # extend_exisiting=True,
)

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_name = db.Column(db.String(255), nullable=False)
    neighborhood = db.Column(db.String(255), nullable=False)
    cuisine = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    operation_hours = db.Column(db.String(255), nullable=False)
    dining_style = db.Column(db.String(255), nullable=False)
    dress_code = db.Column(db.String(255), nullable=False)
    parking_details = db.Column(db.String(2000), nullable=False)
    payment_options = db.Column(db.String(2000), nullable=False)
    address = db.Column(db.String(2000), nullable=False)
    cross_street = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(255), nullable=False)
    executive_chef = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    preview_img = db.Column(db.String(2000), nullable=False)

    reservations = db.relationship("Reservation", back_populates="restaurant")
    reviews = db.relationship("Review", back_populates="restaurant")

    users = db.relationship("User", secondary=favorites, back_populates="restaurants")


class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    party_size = db.Column(db.Integer, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="reservations")
    user = db.relationship("User", back_populates="reservations")


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    review = db.Column(db.String(2000), nullable=True)
    rating = db.Column(db.Integer, nullable=False)

    restaurant = db.relationship("Restaurant", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")


