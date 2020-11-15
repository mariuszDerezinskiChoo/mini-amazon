echo "Querying each table"
for table in buyer storefront item cart purchase listing reviews; do
    sqlite3 backend/api/database.db "select * from ${table}" > ${table}.txt
    num_entries=$(cat ${table}.txt | wc -l)
    echo "Table ${table} has ${num_entries} entries"
done