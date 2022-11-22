from .db import db, environment, SCHEMA
from .user import User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base=declarative_base()

class Restaurant(db.Model):
    __tablename__ = "restaurants"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
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



