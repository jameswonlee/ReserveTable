from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Reservation, Restaurant, Review, favorites, db

user_routes = Blueprint('users', __name__)

# ***************************************** User Routes ************************************ #

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# View all user reservations
@user_routes.route("/<int:user_id>/reservations", methods=["GET"])
@login_required
def user_reservations(user_id):
    user_reservations = Reservation.query.get(user_id)
    if user_reservations:
        return user_reservations.to_dict(), 200
    return { "Error": "No reservations not found" }, 404


# View all user reviews
@user_routes.route("/<int:user_id>/reviews", methods=["GET"])
@login_required
def user_reviews(user_id):
    user_reviews = Review.query.filter(Review.user_id == user_id).all()

    if user_reviews:
        response = []
        for review in user_reviews:
            review_obj = review.to_dict()
            response.append(review_obj)
        return response, 200
    return { "Error": "No reviews found" }, 404
