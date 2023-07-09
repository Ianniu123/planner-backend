import pymongo
import pandas as pd
from mongoengine import connect, Document, StringField, DecimalField

connect('Courses', host='mongodb+srv://985683179yzy:Zhiyao0219yu-@courses.tgl1khs.mongodb.net/?retryWrites=true&w=majority')

class Course(Document):
    subject = StringField()
    title = StringField()
    credits = DecimalField()
    schedule = StringField()
    instructor = StringField()
    days = StringField()
    start_time = StringField()
    end_time = StringField()
    term = StringField()

df = pd.read_csv('fall2023.csv')

for _, row in df.iterrows():
    document = Course(
        subject=row['Subject'],
        title=row['Title'],
        credits=row['Credits'],
        schedule=row['Schedule'],
        instructor=row['Instructor'],
        days=row['Days'],
        start_time=row['Time'][1:6],
        end_time=row['Time'][9:14],
        term=row['Term']
    )

    document.save()