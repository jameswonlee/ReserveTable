from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, favorites, db
from ..forms import ReservationForm

Base=declarative_base()

reservation_routes = Blueprint("reservation_routes", __name__, url_prefix="/api/reservations")

# ********************************** Reservation Routes ********************************* #

# View all user reservations
@reservation_routes.route("/<int:user_id>", methods=["GET"])
def user_reservations(user_id):
    user_reservations = Reservation.query.get(user_id)
    if user_reservations:
        # for reservation in reservations:
        #     reservation_obj = reservation.to_dict()
        #     response.append(reservation_obj)
        return user_reservations.to_dict(), 200
    return { "Error": "Reservations not found" }, 404




    