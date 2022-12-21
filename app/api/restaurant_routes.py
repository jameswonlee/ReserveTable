from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, SavedRestaurant, db
from ..forms import ReservationForm, ReviewForm


Base=declarative_base()

restaurant_routes = Blueprint("restaurant_routes", __name__, url_prefix="/api/restaurants")


# **************************** Restaurant Routes ******************************* #

# View all restaurants
@restaurant_routes.route("/", methods=["GET"])
def all_restaurants():
    all_restaurants = Restaurant.query.all()
    if all_restaurants:
        response = []
        for restaurant in all_restaurants:
            restaurant_obj = restaurant.to_dict()
            response.append(restaurant_obj)
        return { "Restaurants": response }, 200
    return { "Error": "No restaurants found" } , 404


# View one restaurant
@restaurant_routes.route("/<int:restaurant_id>", methods=["GET"])
def one_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant:
        return restaurant.to_dict(), 200
    return { "Error": "No restaurant found" } , 404



# Create new reservation
@restaurant_routes.route("/<int:restaurant_id>/reservations", methods=["POST"])
@login_required
def create_reservation(restaurant_id):
    reservation_form = ReservationForm()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    
    if reservation_form.validate_on_submit():
        reservation_data = reservation_form.data

        new_reservation_data = Reservation()
        reservation_form.populate_obj(new_reservation_data)

        restaurant = Restaurant.query.get(restaurant_id)

        if restaurant:
            new_reservation = Reservation(
                user_id=current_user.id, 
                restaurant_id=restaurant.id, 
                reservation_time=reservation_data["reservation_time"],
                party_size=reservation_data["party_size"]
            )

            db.session.add(new_reservation)
            db.session.commit()
            new_reservation_obj = new_reservation.to_dict()
            
            return new_reservation_obj, 201
        return { "Error": "Restaurant not found" }, 404
    return { "Error": "Validation Error" }, 401


# View all restaurant reviews - Need to return number of reviews for each user
@restaurant_routes.route("/<int:restaurant_id>/reviews", methods=["GET"])
def restaurant_reviews(restaurant_id):
    reviews = Review.query.filter(Review.restaurant_id == restaurant_id).all()

    if reviews:
        response = []
        for review in reviews:
            review_obj = review.to_dict()
            response.append(review_obj)
        return response, 200
    return { "Error": "No reviews found" }, 404


# Create new review for restaurant
@restaurant_routes.route("/<int:restaurant_id>/reviews", methods=["POST"])
@login_required
def new_review(restaurant_id):
    review_form = ReviewForm()
    review_form['csrf_token'].data = request.cookies['csrf_token']

    if review_form.validate_on_submit():
        review_data = review_form.data

        new_review_data = Review()
        review_form.populate_obj(new_review_data)

        new_review = Review(
            user_id=current_user.id, 
            restaurant_id=restaurant_id, 
            review = review_data["review"],
            rating = review_data["rating"]
        )

        db.session.add(new_review)
        db.session.commit()
        new_review_obj = new_review.to_dict()
        return new_review_obj, 201
    return { "Error": "Validation Error" }, 401