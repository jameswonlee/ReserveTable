from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, DateField, TimeField, DateTimeField
from wtforms.validators import DataRequired, ValidationError


class ReservationForm(FlaskForm):
    date = DateTimeField("Date and Time", format="%Y-%m-%d", validators=[DataRequired()])
    # time = TimeField("Time", format="%H:%M", validators=[DataRequired()])
    party_size = IntegerField("Party Size", validators=[DataRequired()])
    submit = SubmitField("Submit")