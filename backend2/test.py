import pandas as pd

# Initialize category mappers and unique counters for each column
category_mappers = {}
unique_counters = {}

def map_categories_to_int(df, cat_columns):
    global category_mappers, unique_counters
    
    mapped_df = df.copy()
    
    for col_idx in cat_columns:
        if col_idx not in category_mappers:
            category_mappers[col_idx] = {}
            unique_counters[col_idx] = 0
        
        col_name = df.columns[col_idx]
        categories = df.iloc[:, col_idx]
        mapped_values = []
        
        for cat in categories:
            if cat not in category_mappers[col_idx]:
                # Assign a new integer value and update the mapper
                category_mappers[col_idx][cat] = unique_counters[col_idx]
                unique_counters[col_idx] += 1
            mapped_values.append(category_mappers[col_idx][cat])
        
        mapped_df[col_name] = mapped_values
    
    return mapped_df

# Example usage
data = {
    'UserID': [1, 1, 2, 2, 3],
    'purchaseAmount': [1000, 2000, 3000, 1100, 20200],
    'purchaseType': ['f', 'luxury', 'cloths', 'luxury', 'luxury'],
    'paymentCompletionTime': [10, 13, 2, 10, 13],
    'success': [1, 1, 1, 1, 1],
    'method': ['UPI', 'UPI', 'ff', 'UPI', 'WALLET']
}

df = pd.DataFrame(data)

# Specify categorical columns (0-based index)
categorical_columns = [2, 5]

# Map categories to integers
mapped_df = map_categories_to_int(df, categorical_columns)

# Print the mapped DataFrame
print(mapped_df)


# Example usage
data = {
    'UserID': [1, 1, 2, 2, 3],
    'purchaseAmount': [1000, 2000, 3000, 1100, 20200],
    'purchaseType': ['f', 'g', 'cloths', 'hh', 'luxury'],
    'paymentCompletionTime': [10, 13, 2, 10, 13],
    'success': [1, 1, 1, 1, 1],
    'method': ['UPI', 'UPI', 'ff', 'dfdf', 'WALLET']
}


df = pd.DataFrame(data)
# Map categories to integers
mapped_df = map_categories_to_int(df, categorical_columns)


# Print the mapped DataFrame
print(mapped_df)
