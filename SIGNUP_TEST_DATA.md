# 🌾 Harvest Hub Signup Test Data

## 📋 Complete Signup Boilerplate Data (ALL MANDATORY FIELDS)

### For Postman Signup Testing (JSON Format):

```json
{
  "name": "Ramesh Kumar Singh",
  "email": "ramesh.farmer@gmail.com",
  "password": "farmer123",
  "phone": "9876543210",
  "aadhaar": "123456789012",
  "userType": "farmer",
  "farmLocation": "Amritsar, Punjab",
  "cropType": "Wheat",
  "farmSize": 5,
  "experience": "5-10 years",
  "cropVariety": "HD 2967",
  "plantedDate": "2024-11-01",
  "expectedHarvestDate": "2025-03-01",
  "currentStage": "Seeded"
}
```

### For Postman Login Testing:

```json
{
  "email": "ramesh.farmer@gmail.com",
  "password": "farmer123"
}
```

## ⚠️ **MANDATORY FIELDS CHECKLIST:**

### Always Required:

- ✅ `name` (String)
- ✅ `email` (String, unique, lowercase)
- ✅ `password` (String, min 6 characters)
- ✅ `phone` (String)
- ✅ `aadhaar` (String)

### Required for Farmers (userType = "farmer"):

- ✅ `farmLocation` (String)
- ✅ `cropType` (String)

### Optional but Recommended:

- `userType` (defaults to "farmer")
- `farmSize` (Number)
- `experience` (String)
- `cropVariety` (String)
- `plantedDate` (Date)
- `expectedHarvestDate` (Date)
- `currentStage` (String)

## � **Quick Test Accounts:**

### Account 1 - Wheat Farmer

```json
{
  "name": "Ramesh Kumar Singh",
  "email": "ramesh@test.com",
  "password": "123456",
  "phone": "9876543210",
  "aadhaar": "123456789012",
  "userType": "farmer",
  "farmLocation": "Amritsar, Punjab",
  "cropType": "Wheat"
}
```

### Account 2 - Rice Farmer

```json
{
  "name": "Suresh Patil",
  "email": "suresh@test.com",
  "password": "123456",
  "phone": "9876543211",
  "aadhaar": "123456789013",
  "userType": "farmer",
  "farmLocation": "Thanjavur, Tamil Nadu",
  "cropType": "Rice"
}
```

## 🔧 **Testing Sequence:**

1. **First Signup** with Account 1
2. **Then Login** with same credentials
3. **Get Token** from login response
4. **Test Crop API** with the token

## 📝 **Valid Enum Values:**

### userType:

- `"farmer"`
- `"advisor"`

### cropType (any string, examples):

- `"Wheat"`
- `"Rice"`
- `"Maize"`
- `"Cotton"`
- etc.

### experience:

- `"Less than 1 year"`
- `"1-3 years"`
- `"3-5 years"`
- `"5-10 years"`
- `"More than 10 years"`

### currentStage:

- `"Seeded"`
- `"Germination"`
- `"Vegetative"`
- `"Flowering"`
- `"Grain Development"`
- `"Maturity"`
- `"Harvested"`
