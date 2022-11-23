from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, favorites, db
from ..forms import ReservationForm

Base=declarative_base()

restaurant_routes = Blueprint("restaurant_routes", __name__, url_prefix="/api/restaurants")


# **************************** Restaurant Routes ******************************* #

# Create new reservation
@restaurant_routes.route("/<int:restaurant_id>/reservations", methods=["POST"])
def create_reservation(restaurant_id):
    reservation_form = ReservationForm()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']

    if reservation_form.validate_on_submit():
        reservation_data = reservation_form.data

        new_reservation_data = Reservation()
        reservation_form.populate_obj(new_reservation_data)

        restaurant = Restaurant.query.get(restaurant_id)

        new_reservation = Reservation(
            user_id=current_user.id, 
            restaurant_id=restaurant.id, 
            date=reservation_data["date"],
            time=reservation_data["time"],
            party_size=reservation_data["party_size"]
        )

        db.session.add(new_reservation)
        db.session.commit()

        new_reservation_obj = new_reservation.to_dict()
        return new_reservation_obj, 201
    return { "Error": "Validation Error" }, 401


#