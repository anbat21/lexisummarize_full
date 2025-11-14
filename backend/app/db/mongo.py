
import os
from pymongo import MongoClient

uri = os.getenv("MONGO_URI","mongodb+srv://anbatquoclong_db_user:An21022004@cluster003.jqwvtsv.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster003")
client = MongoClient(uri)
db = client["lexi_v2"]
users_collection = db["users"]

# Ensure a unique index on email to prevent duplicates/races
try:
	users_collection.create_index("email", unique=True)
except Exception:
	# Index creation may fail if the DB is unavailable; startup should still continue for local dev
	pass
