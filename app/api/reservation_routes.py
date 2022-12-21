from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, SavedRestaurant, db
# from ..models import favorites
from ..forms import ReservationForm

Base=declarative_base()

reservation_routes = Blueprint("reservation_routes", __name__, url_prefix="/api/reservations")

# ********************************** Reservation Routes ********************************* #

# View reservation details
@reservation_routes.route("/<int:reservation_id>", methods=["GET"])
@login_required
def reservation_details(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if reservation:
        return reservation.to_dict(), 200
    return { "Error": "No reservations found" }, 404


# Update reservation
@reservation_routes.route("/<int:reservation_id>", methods=["PUT"])
@login_required
def update_reservation(reservation_id):
    edit_reservation_form = ReservationForm()
    edit_reservation_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_reservation_form.validate_on_submit():
        data = edit_reservation_form.data

        reservation = Reservation.query.get(reservation_id)

        if reservation:
            reservation.reservation_time = data["reservation_time"]
            reservation.party_size = data["party_size"]
            db.session.commit()
            
            new_reservation = reservation.to_dict()
            return new_reservation, 201
        return { "Error": "Reservation not found" }, 404
    return { "Error": "Validation Error" }, 400


# Delete reservation
@reservation_routes.route("/<int:reservation_id>", methods=["DELETE"])
@login_required
def delete_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)

    if reservation:
        db.session.delete(reservation)
        db.session.commit()
        return { "Message": "Reservation successfully deleted" }, 200
    return { "Error": "Reservation not found" }, 404







    