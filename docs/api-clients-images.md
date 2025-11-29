# Clients Images API

This endpoint returns a flattened array of all client image URLs stored in the database.

Endpoint: GET /api/clients/images

Query parameters:
- branchId (optional) — if specified, returns only images that belong to clients of that branch.

Response: JSON array of image URL strings

Examples

- Get all client images

```bash
curl "http://localhost:3000/api/clients/images"
```

- Get client images for a branch

```bash
curl "http://localhost:3000/api/clients/images?branchId=arrham-trading-bahrain"
```

Notes
- The endpoint returns 404 when an invalid branchId is provided.
- If there are no images available it returns an empty array [].
