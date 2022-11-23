from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError


class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    submit = SubmitField("Submit")