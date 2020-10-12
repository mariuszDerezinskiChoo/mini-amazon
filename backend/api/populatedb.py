import sqlite3
conn = sqlite3.connect('./database.db')
c = conn.cursor()
c.execute("INSERT into User values (?,?,?,?,?,?,?)",('email1@gmail.com','password1','name1','lastname1',0, True, 'this is seller description'))
c.execute("INSERT into User values (?,?,?,?,?,?,?)",('email2@gmail.com','password1','name2','lastname2',0, True, 'this is seller description'))
c.execute("INSERT into User values (?,?,?,?,?,?,?)",('email3@gmail.com','password1','name3','lastname3',0, False, ''))
c.execute("INSERT into User values (?,?,?,?,?,?,?)",('email4@gmail.com','password1','name4','lastname4',0, False, ''))
c.execute("INSERT into User values (?,?,?,?,?,?,?)",('email5@gmail.com','password1','name5','lastname5',0, False, ''))

c.execute("INSERT into item values (?,?,?,?)",(1,'books','Harry Potter 1','this is first book in series'))
c.execute("INSERT into item values (?,?,?,?)",(2,'books','Harry Potter 2','this is second book'))
c.execute("INSERT into item values (?,?,?,?)",(3,'books','Harry Potter 3','this is third book'))
c.execute("INSERT into item values (?,?,?,?)",(4,'books','Harry Potter 4','this is fourth book'))
c.execute("INSERT into item values (?,?,?,?)",(5,'books','Hamlet','this is a book'))
c.execute("INSERT into item values (?,?,?,?)",(6,'food','Goldfish','this is goldfish'))
c.execute("INSERT into item values (?,?,?,?)",(7,'food','Cheez-It','this is food'))
c.execute("INSERT into item values (?,?,?,?)",(8,'food','Pretzels','this is food'))
c.execute("INSERT into item values (?,?,?,?)",(9,'food','bread','this is a food'))
c.execute("INSERT into item values (?,?,?,?)",(10,'food','Ritz cracker','this is a cracker'))

c.execute("INSERT into reviews values (?,?,?,?,?,?,?,?)",(1,'email3@gmail.com','email1@gmail.com', '2020-06-03',1, 10, 10, 'great product'))
c.execute("INSERT into reviews values (?,?,?,?,?,?,?,?)",(2,'email5@gmail.com','email1@gmail.com', '2020-06-03',2, 10, 10, 'great product'))

conn.commit()


