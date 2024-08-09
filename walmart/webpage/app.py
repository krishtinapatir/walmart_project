

import pandas as pd

# 1st data  
walmart_data1 = pd.read_csv('csv_file/walmart.csv', header=None)

walmart_data1.columns = [
   "URL","product_name","image_url","add to cart","price_dollar",
   "f6 2","price_desciption","price_per_unit","review_count",
   "rating","Additional_Details","gray 3","f7","flex src","f7 2","b",
   "f7 3","b 2","dark-gray"
]

walmart_data1.to_json('json_data/mix.json', orient='records')


# 2nd data   
walmart_data2 = pd.read_csv('csv_file/gadget.csv',  header=None)


walmart_data2.columns = [
"URL","product_name","w_VbBP","image_url","add to cart","price_description",
"price","past_price","total item sell till now","rating","f7","flex src","w_hhLG href","f7 3","rag"

]

walmart_data2.to_json('json_data/gadget.json', orient='records')



# 3rd data 
walmart_data3 = pd.read_csv('csv_file/skincare-makeup.csv', header=None)

walmart_data3.columns = [
"URL","product_name","w_VbBP","image_url","w_hhLG href","price_description",
"f7","total item sell till now","past_price","f7 2","flex src","f7 3","price",
"gray 3","z-2 href 4","br-100 src 4"

]

walmart_data3.to_json('json_data/makeup.json', orient='records')

