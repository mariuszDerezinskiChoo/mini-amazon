import sqlite3
# Assuming you cd to backend/api/ after creating database.db with models.py in backend/
conn = sqlite3.connect('./database.db')
c = conn.cursor()

c.execute("INSERT into buyer values (?,?,?,?,?)", ('buyer_email1@gmail.com','password','firstname1','lastname1',0))
c.execute("INSERT into buyer values (?,?,?,?,?)", ('buyer_email2@gmail.com','password','firstname2','lastname2',0))
c.execute("INSERT into buyer values (?,?,?,?,?)", ('buyer_email3@gmail.com','password','firstname3','lastname3',0))

c.execute("INSERT into storefront values (?,?,?,?,?)", ('storefront_email1@gmail.com','password','name1',0,'Welcome to our store! We are Store 1.'))
c.execute("INSERT into storefront values (?,?,?,?,?)", ('storefront_email2@gmail.com','password','name2',0,'Welcome to our store! We are Store 2.'))

c.execute("INSERT into item values (?,?,?,?)", (1,'Harry Potter 1','This is the first book.','books'))
c.execute("INSERT into item values (?,?,?,?)", (2,'Harry Potter 2','This is the second book.','books'))
c.execute("INSERT into item values (?,?,?,?)", (3,'Harry Potter 3','This is the third book.','books'))
c.execute("INSERT into item values (?,?,?,?)", (4,'Harry Potter 4','This is the fourth book.','books'))
c.execute("INSERT into item values (?,?,?,?)", (5,'Hamlet (2nd Edition) (Norton Critical Editions)','Great book. - Harold Bloom','books'))
c.execute("INSERT into item values (?,?,?,?)", (6,'Goldfish, Original, 60 Oz. Box, 2-Count 30 Oz. Cartons','The snack that smiles back.','food'))
c.execute("INSERT into item values (?,?,?,?)", (7,'Cheez-It, Original, 4 oz 20 Count','Box of Cheez-It lunch bags.','food'))
c.execute("INSERT into item values (?,?,?,?)", (8,'Cheez-It, Parmesan, 10 oz 4 Count','Four retail boxes.','food'))
c.execute("INSERT into item values (?,?,?,?)", (9,'Cheez-It, White Cheddar, Pack of 2','Two retail boxes of Cheez-It White Cheddar.','food'))
c.execute("INSERT into item values (?,?,?,?)", (10,'Ritz Original Crackers, 6 x 15 oz Boxes','Ritz for the whole family.','food'))

# buyer, storefront, item are listed first so sqlite doesn't throw error about other schema asking for foreign keys?

c.execute("INSERT into listing values (?,?,?,?)", (1,5,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (2,5,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (3,5,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (4,5,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (5,5,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (6,12,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (7,12,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (8,12,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (9,12,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (10,12,10,'storefront_email1@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (1,4,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (2,4,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (3,4,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (4,4,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (5,4,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (6,11,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (7,11,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (8,11,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (9,11,20,'storefront_email2@gmail.com'))
c.execute("INSERT into listing values (?,?,?,?)", (10,11,20,'storefront_email2@gmail.com'))

c.execute("INSERT into purchase values (?,?,?,?,?,?)", (1,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (2,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (3,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (4,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (5,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (6,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (7,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (8,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (9,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (10,1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (1,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (2,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (3,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (4,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (5,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (6,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (7,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (8,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (9,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))
c.execute("INSERT into purchase values (?,?,?,?,?,?)", (10,2,5,'storefront_email2@gmail.com','buyer_email2@gmail.com','20120618 10:34:09 AM'))

c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(1,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:10 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(2,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:11 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(3,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:12 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(4,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:13 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(5,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:14 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(6,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:15 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(7,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:16 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(8,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:17 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(9,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:18 AM',1,1,'Got ripped off WTF.'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?)",(10,'storefront_email1@gmail.com','buyer_email1@gmail.com','20120619 10:34:19 AM',1,1,'Got ripped off WTF.'))

c.execute("INSERT into cart values (?,?,?,?)",(1,10,'storefront_email1@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(2,8,'storefront_email2@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(3,3,'storefront_email1@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(4,6,'storefront_email2@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(5,2,'storefront_email1@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(6,1,'storefront_email2@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(7,9,'storefront_email1@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(8,20,'storefront_email2@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(9,3,'storefront_email1@gmail.com','buyer_email1@gmail.com'))
c.execute("INSERT into cart values (?,?,?,?)",(10,7,'storefront_email2@gmail.com','buyer_email1@gmail.com'))


conn.commit()

