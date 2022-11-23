from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, favorites, db
from ..forms import ReservationForm

Base=declarative_base()

reservation_routes = Blueprint("reservation_routes", __name__, url_prefix="/api/reservations")

# ********************************** Reservation Routes ********************************* #

# View reservation details
@reservation_routes.route("/<int:reservation_id>", methods=["GET"])
def reservation_details(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if reservation:
        return reservation.to_dict(), 200
    return { "Error": "No reservations found" }, 404





    