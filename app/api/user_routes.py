from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Reservation, Restaurant, Review, favorites, db

user_routes = Blueprint('users', __name__, url_prefix="/api/users")

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
    user_reservations = Reservation.query.filter(Reservation.user_id == user_id).all()

    if user_reservations:
        response = []
        for reservation in user_reservations:
            reservation_obj = reservation.to_dict()
            response.append(reservation_obj)
        return { "Reservations": response }, 200
    return { "Error": "No user/reservations found" }, 404


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
    return { "Error": "No user/reviews found" }, 404


#View all user favorite restaurants
# @user_routes.route("/<int:user_id>/favorites", methods=["GET"])
# @login_required
# def user_favorite_restaurants(user_id):
#     user_restaurants = Restaurant.query.filter(Restaurant.users.id == user_id).all()


# Create user favorite restaurant
@user_routes.route("/<int:user_id>/favorites/<int:restaurant_id>", methods=["POST"])
@login_required
def create_favorite(user_id, restaurant_id):
    restaurant = Restaurant.get(restaurant_id)
    user = User.get(user_id)
