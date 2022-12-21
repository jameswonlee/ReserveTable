from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Reservation, Restaurant, Review, SavedRestaurant, db
# from app.models import favorites

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


# Get all user reservations
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


# Get all user reviews
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


# Get all user favorite restaurants
@user_routes.route("/<int:user_id>/favorites", methods=["GET"])
@login_required
def user_saved_restaurants(user_id):
    user = User.query.get(user_id)
    if not user:
        raise NotFoundError("User not found")
    saved_restaurants = SavedRestaurant.query.filter(SavedRestaurant.user_id == user_id).all()
    return { "SavedRestaurants": [restaurant.to_dict() for restaurant in saved_restaurants] }, 200


# Create saved restaurant
@user_routes.route("/<int:user_id>/favorites/<int:restaurant_id>", methods=["POST"])
@login_required
def create_saved_restaurant(user_id, restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    user = User.query.get(user_id)
    if not restaurant:
        raise NotFoundError("Restaurant not found")
    # if user.id != user_id:
    #     raise ForbiddenError("User id's do not match")
    check_saved_restaurant = SavedRestaurant.query.filter(SavedRestaurant.restaurant_id == restaurant_id, SavedRestaurant.user_id == user_id).first()
    if not check_saved_restaurant:
        new_saved_restaurant = SavedRestaurant(
            user_id=user.id,
            restaurant_id=restaurant_id
        )
        db.session.add(new_saved_restaurant)
        db.session.commit()
        return new_saved_restaurant.to_dict(), 201
    return { "Error": "Restaurant already saved" }, 400


# Remove saved restaurant
@user_routes.route("/<int:user_id>/favorites/<int:restaurant_id>", methods=["DELETE"])
def remove_saved_restaurant(user_id, restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    user = User.query.get(current_user.id)
    # if user.id != user_id:
    #     raise ForbiddenError("User id's do not match")
    if not restaurant:
        raise NotFoundError("Restaurant not found")
    check_saved_restaurant = SavedRestaurant.query.filter(SavedRestaurant.restaurant_id == restaurant_id, SavedRestaurant.user_id == user_id).first()
    if check_saved_restaurant:
        db.session.delete(check_saved_restaurant)
        db.session.commit()
        return { "Message": "Restaurant unsaved" }, 202
    return { "Error": "Restaurant not yet saved"}