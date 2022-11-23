from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, favorites, db

Base=declarative_base()

review_routes = Blueprint("review_routes", __name__, url_prefix="/api/reviews")

# **************************************** Review Routes ******************************** #

# 
