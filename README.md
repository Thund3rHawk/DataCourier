```markdown
# CSV Email Sender API

This project allows admins to add users to a list via CSV upload, efficiently handling 10,000+ records, and send email notifications to them using the provided CSV file.

## API Endpoints

### 1. Create a List

- **URL:** `http://localhost:3000/`
- **Method:** `POST`
- **Description:** Creates a new list with a title and custom properties.
- **Request Body:**
  ```json
  {
    "title": "My List",
    "customProperties": [
      { "title": "city", "fallbackValue": "Unknown" }
    ]
  }
  ```
- **Response:**
  - **201 Created:** List created successfully.
  - **400 Bad Request:** Missing or invalid parameters.
  - **409 Conflict:** List with the same title already exists.

- **Example:**
  ```sh
  curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{
    "title": "My List",
    "customProperties": [
      { "title": "city", "fallbackValue": "Unknown" }
    ]
  }'
  ```

  ✅ List creation with title and custom properties

### 2. Upload Users via CSV

- **URL:** `http://localhost:3000/:listTitle/users`
- **Method:** `POST`
- **Description:** Adds users to the specified list via CSV upload. The CSV must have a header row with 'name' and 'email' as required fields. Custom properties should match the headers.
- **URL Parameters:**
  - `listTitle` (string) - The title of the list to add users to.
- **Request Body:** Multipart/form-data
  - **file:** CSV file containing users to be added.

- **Sample CSV Format:**

  | name      | email            | city       |
  | --------- | ---------------- | ---------- |
  | John Doe  | john.doe@example.com | Bengaluru  |
  | Jane Doe  | jane.doe@example.com |            |

  - **Note:** The second record doesn't have the city value defined, so the fallback value present in the list should be used.

- **Response:**
  - **200 OK:** Users added successfully with details.
  - **400 Bad Request:** Missing or invalid parameters.
  - **404 Not Found:** List not found.
  - **409 Conflict:** Duplicate emails found.
  - **Partial Success:** Users added with some errors. The response will include details about the errors and successful additions.

- **Example:**
  ```sh
  curl -X POST http://localhost:3000/My%20List/users -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/file.csv"
  ```

  ✅ Upload CSV file to add users to the list

## Error Handling

- **Invalid Parameters:** Ensure all required parameters are included in the request body or URL.
- **Unique Emails:** Ensure no duplicate emails are present in the CSV file.
- **List Not Found:** Ensure the list title specified in the URL exists.

## Example Usage

### Create a New List
```sh
curl -X POST http://localhost:3000/ -H "Content-Type: application/json" -d '{
  "title": "Friends List",
  "customProperties": [
    { "title": "hobby", "fallbackValue": "Unknown" }
  ]
}'
```

### Add Users to a List via CSV Upload
```sh
curl -X POST http://localhost:3000/Friends%20List/users -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/file.csv"
```

## Environment Variables

Ensure to set up the following environment variables:

- `AUTH_EMAIL` - The email address used for sending emails.
- `AUTH_EMAIL_PASS` - The password or app-specific password for the email account.
- `MONGODB_URI` - The url for mongodb.
```sh
AUTH_EMAIL=your-email@gmail.com
AUTH_EMAIL_PASS=your-email-password
MONGODB_URI= mongoDB-url
```
