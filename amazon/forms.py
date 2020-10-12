# forms.py
import models
from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Optional, NumberRange, Length, Email, ValidationError

class ReviewForm(FlaskForm):
	buyer_email = StringField('Buyer Email', validators=[DataRequired(), Email()])
	seller_email = StringField('Seller Email', validators=[DataRequired(), Email()])
	item_id = IntegerField('Item ID', validators=[DataRequired()])
	# For the above, need to figure out how to automatically populate after clicking on a purchase history
	# As of now, these need to be manually filled in by the user
	# The datetime_submitted attribute is automatically handled upon valid tuple entry, dwbi

	rating_item = IntegerField('Item Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
	rating_seller = IntegerField('Seller Rating', validators=[Optional(), NumberRange(min=1, max=5)])
	review = TextAreaField('Review', validators=[DataRequired()])
	submit = SubmitField('Submit Review')

