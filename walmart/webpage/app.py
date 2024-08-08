#  this file is for making json file  
import pandas as pd

# Load the CSV file
walmart_data = pd.read_csv('walmart.csv', header=None)

# Set the column names
walmart_data.columns = [
 
   "URL","product_name","image_url","mr2","price_dollar",
   "f6 2","price_desciption","price_per_unit","review_count",
   "rating","Additional_Details","gray 3","f7","flex src","f7 2","b",
   "f7 3","b 2","dark-gray"

]

# Convert the DataFrame to JSON
walmart_data.to_json('walmart.json', orient='records')
