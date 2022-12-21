from flask import Blueprint, render_template, url_for, redirect, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.ext.declarative import declarative_base
from ..models import Restaurant, Reservation, Review, SavedRestaurant, db
from ..forms import ReviewForm

Base=declarative_base()

review_routes = Blueprint("review_routes", __name__, url_prefix="/api/reviews")

# **************************************** Review Routes ******************************** #

# Edit user review
@review_routes.route("/<int:review_id>", methods=["PUT"])
@login_required
def update_review(review_id):
    edit_review_form = ReviewForm()
    edit_review_form['csrf_token'].data = request.cookies['csrf_token']

    if edit_review_form.validate_on_submit():
        data = edit_review_form.data

        review = Review.query.get(review_id)

        if review:
            review.review = data["review"]
            review.rating = data["rating"]
            db.session.commit()

            updated_review_obj = review.to_dict()
            return updated_review_obj, 201
        return { "Error": "Review not found" }, 404
    return { "Error": "Validation Error" }, 401


# Delete user review
@review_routes.route("/<int:review_id>", methods=["DELETE"])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if review:
        db.session.delete(review)
        db.session.commit()
        return { "Message": "Review successfully deleted" }, 200
    return { "Error": "Review not found" }, 404



