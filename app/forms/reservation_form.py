from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, DateField, TimeField, DateTimeField
from wtforms.validators import DataRequired, ValidationError


class ReservationForm(FlaskForm):
    reservation_time = DateTimeField("Reservation Time", validators=[DataRequired()])
    party_size = IntegerField("Party Size", validators=[DataRequired()])
    submit = SubmitField("Submit")