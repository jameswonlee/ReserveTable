from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError


class ReservationForm(FlaskForm):
    date = DateField("Date", format="%Y-%m-%d", validators=[DataRequired()])
    time = TimeField("Time", format="%H:%M", validators=[DataRequired()])
    party_size = IntegerField("Party Size", validators=[DataRequired()])
    submit = SubmitField("Submit")