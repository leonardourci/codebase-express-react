# User API

## Overview
User profile management endpoints for retrieving and updating user account information.

---

## `user.getProfile`

**Summary:** Get current user's profile information  
**Use case:** Display user profile data in dashboard or settings

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| - | - | - | No parameters (uses authenticated user context) |

**Note:** Requires authentication (Bearer token in Authorization header)

### Input Example
```json
{}
```

### Output Example
```json
{
  "id": "user_123",
  "email": "john.doe@example.com",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "age": 30
}
```

---

## `user.updateProfile`

**Summary:** Update current user's profile information  
**Use case:** Allow users to modify their account details

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fullName | string | No | User's full name (min 3 chars) |
| email | string | No | User's email address |
| phone | string | No | User's phone number |
| age | number | No | User's age (positive integer) |

**Note:** Requires authentication. At least one field must be provided.

### Input Example
```json
{
  "fullName": "John Updated Doe",
  "age": 31
}
```

### Output Example
```json
{
  "id": "user_123",
  "email": "john.doe@example.com",
  "fullName": "John Updated Doe",
  "phone": "+1234567890",
  "age": 31
}
```

---

## Usage Notes

- All endpoints require authentication
- Profile data excludes sensitive information (passwords, tokens)
- Update operations return the complete updated profile
- Email validation follows standard email format rules
- Age must be a positive integer
- Phone cannot be empty if provided