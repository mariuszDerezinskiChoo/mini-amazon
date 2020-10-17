from wtforms import Form, StringField, SelectField

class ItemSearchForm(Form) :
    categories = [('books', 'books'),
                  ('food', 'food')]
    select = SelectField('Category:', choices= categories)
    search = StringField('')