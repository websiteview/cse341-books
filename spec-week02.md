# Books API Week 02 Spec

## Version 1

# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

* `id`: string, required, custom id such as `b1`
* `authorId`: string, required, references the `id` field of an author document
* `title`: string, required
* `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

* Status code: `200`
* Response body: an array of book objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

* Status code: `200`
* Response body: the matching book object

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

* Status code: `201`
* Response body: the newly created book object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if the `authorId` does not match an existing author
* `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

* Status code: `200`
* Response body: the updated book object

Errors:

* `400` if a required field is missing
* `400` if the `authorId` does not match an existing author
* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

* Status code: `204`
* Response body: none

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection to the Books API and provide complete CRUD operations for author documents. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

* `id`: string, required, custom id such as `a1`
* `name`: string, required
* `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books reference authors using the book's `authorId` field.

The value of a book's `authorId` must match the custom `id` of an existing author.

An author should not be deleted while one or more books reference that author. This prevents books from being left with an invalid author reference.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom id.

Success:

* Status code: `200`
* Response body: the matching author object

Errors:

* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a4",
  "name": "Example Author",
  "birthYear": 1980
}
```

Success:

* Status code: `201`
* Response body: the newly created author object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if `birthYear` is not a valid number
* `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```
{
  "name": "Updated Author Name",
  "birthYear": 1985
}
```

Success:

* Status code: `200`
* Response body: the updated author object

Errors:

* `400` if a required field is missing
* `400` if `birthYear` is not a valid number
* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

The custom `id` of an author will not be changed through the PUT route.

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

* Status code: `204`
* Response body: none

Errors:

* `404` if no author exists with that id
* `409` if one or more books still reference the author
* `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every author route.

The Swagger documentation must include:

* Required request fields
* Request body examples
* Path parameters
* Expected success status codes
* Expected error status codes
* Response examples where appropriate

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

---

# Specification Evaluation

The Version 1 specification was reviewed for bugs, security considerations, efficiency concerns, and unclear response behavior.

## 1. Bugs or Short-Sighted Decisions

One possible problem is allowing an author to be deleted while books still reference that author. This would create books containing an `authorId` that no longer points to an existing author.

To prevent this, the specification requires the API to return `409 Conflict` when an author still has books associated with them.

Another consideration is that custom IDs must remain unique within their collection. The API must check for an existing ID before creating a new book or author.

The PUT routes should not allow the custom ID to be changed because the ID is used by other documents as a reference.

## 2. Security Considerations

The API should validate incoming request data before storing it in MongoDB.

The API should:

* Validate required fields.
* Validate data types.
* Reject malformed or unexpected values.
* Avoid exposing sensitive database information in error responses.
* Return appropriate HTTP status codes instead of detailed database errors.
* Validate route parameters before using them in database queries.

The API should also use environment variables for database connection information rather than storing credentials directly in source code.

## 3. Efficiency Concerns

The API should use database queries that search by the custom `id` field when retrieving or modifying individual books and authors.

When deleting an author, the API must check whether any books reference that author before deleting the author.

Database indexes on frequently queried fields such as the custom `id` field could improve performance as the collection grows.

The API should return only the information needed by the client and avoid unnecessary database queries.

## 4. Response and Error Behavior

All routes should use consistent HTTP status codes and JSON response structures for errors.

Successful GET requests return the requested document or array.

Successful POST requests return `201` and the newly created document.

Successful PUT requests return `200` and the updated document.

Successful DELETE requests return `204` with no response body.

If a requested resource does not exist, the API returns `404`.

If an author cannot be deleted because books reference that author, the API returns `409 Conflict`.

Unexpected database or server errors return `500` without exposing sensitive implementation details.

---

# Version 2

# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports complete CRUD operations for books. Every book route must be documented and testable through Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required fields:

* `id`: string, required, unique within the books collection
* `authorId`: string, required, must reference an existing author's custom `id`
* `title`: string, required
* `publicationDate`: string, required

Books will continue using custom string IDs such as `b1` instead of MongoDB `_id` values for route parameters.

The `id` field cannot be changed through the PUT route.

### Author Relationship

Every book must reference an existing author through `authorId`.

When creating or updating a book:

1. Validate that all required fields are present.
2. Validate that the submitted data has the correct types.
3. Verify that the referenced author exists.
4. Return `400` if the `authorId` does not reference an existing author.

A book must not contain an invalid or missing author reference.

### GET /books

Purpose: Return all books.

Success:

* `200`
* Response body: array of book objects

Errors:

* `500` for unexpected server or database errors

### GET /books/:id

Purpose: Return one book by its custom ID.

Success:

* `200`
* Response body: matching book object

Errors:

* `404` if the book does not exist
* `500` for unexpected server or database errors

### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Validation:

* `id` is required and must be unique.
* `authorId` is required and must reference an existing author.
* `title` is required and must be a string.
* `publicationDate` is required and must be a valid string representing the publication date.

Success:

* `201`
* Response body: newly created book object

Errors:

* `400` for missing or invalid required data
* `400` if the `id` already exists
* `400` if the `authorId` does not reference an existing author
* `500` for unexpected server or database errors

### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

The request must include all required book fields except the custom `id`, which is taken from the URL.

The book's custom `id` cannot be changed through this route.

Success:

* `200`
* Response body: updated book object

Errors:

* `400` for missing or invalid required data
* `400` if the `authorId` does not reference an existing author
* `404` if no book exists with the specified ID
* `500` for unexpected server or database errors

### DELETE /books/:id

Purpose: Delete an existing book.

Success:

* `204`
* No response body

Errors:

* `404` if no book exists with the specified ID
* `500` for unexpected server or database errors

### Swagger

Swagger must document every book route, including:

* HTTP method
* Route path
* Parameters
* Request body schema
* Required fields
* Example request bodies
* Success responses
* Error responses

The Swagger interface at `/api-docs` must allow each route to be executed and tested.

---

## Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection and provide complete CRUD operations for authors. Authors will be referenced by books using the author's custom `id`.

### Data Model

Author documents will be stored in the `authors` collection.

Required fields:

* `id`: string, required, unique within the authors collection
* `name`: string, required
* `birthYear`: number, required

Example:

```
{
  "id": "a1",
  "name": "Example Author",
  "birthYear": 1980
}
```

Authors will use custom string IDs rather than MongoDB `_id` values for route parameters.

The author's custom `id` cannot be changed through the PUT route.

### Relationship to Books

Books reference authors through `authorId`.

Before deleting an author, the API must check the `books` collection for documents whose `authorId` matches the author's `id`.

If books reference the author:

* Do not delete the author.
* Return `409 Conflict`.

This prevents orphaned author references.

### GET /authors

Purpose: Return all authors.

Success:

* `200`
* Response body: array of author objects

Errors:

* `500` for unexpected server or database errors

### GET /authors/:id

Purpose: Return one author by its custom ID.

Success:

* `200`
* Response body: matching author object

Errors:

* `404` if no author exists with the specified ID
* `500` for unexpected server or database errors

### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a4",
  "name": "Example Author",
  "birthYear": 1980
}
```

Validation:

* `id` is required and must be unique.
* `name` is required and must be a string.
* `birthYear` is required and must be a number.

Success:

* `201`
* Response body: newly created author object

Errors:

* `400` for missing or invalid required data
* `400` if the `id` already exists
* `500` for unexpected server or database errors

### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```
{
  "name": "Updated Author Name",
  "birthYear": 1985
}
```

The custom `id` cannot be changed.

Success:

* `200`
* Response body: updated author object

Errors:

* `400` for missing or invalid required data
* `404` if no author exists with the specified ID
* `500` for unexpected server or database errors

### DELETE /authors/:id

Purpose: Delete an existing author.

Before deleting the author, the API must verify that no books reference the author.

Success:

* `204`
* No response body

Errors:

* `404` if no author exists with the specified ID
* `409` if one or more books reference the author
* `500` for unexpected server or database errors

### Swagger

Swagger must document every author route, including:

* HTTP method
* Route path
* Path parameters
* Request body schemas
* Required fields
* Example request bodies
* Success responses
* Error responses

The Swagger interface at `/api-docs` must allow every author route to be executed and tested from the browser.

### Deployment Expectations

After implementation:

1. Test all book routes locally through `/api-docs`.
2. Test all author routes locally through `/api-docs`.
3. Verify that book-author relationships work correctly.
4. Verify that an author with referenced books cannot be deleted.
5. Deploy the API to Render.
6. Test all routes through the deployed `/api-docs`.
7. Verify that Swagger documentation matches the actual implementation and status codes.
8. Verify that the deployed API connects successfully to MongoDB.
