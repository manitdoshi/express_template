# ================================
# EXPRESS + TYPESCRIPT (ESM) SKELETON SETUP
# ================================

# 1️⃣ Create project folder
mkdir express-ts-skeleton
cd express-ts-skeleton

# 2️⃣ Initialize npm project
npm init -y

# 3️⃣ Install runtime dependency
npm install express

# 4️⃣ Install development dependencies
npm install -D typescript tsx nodemon @types/node @types/express

# 5️⃣ Enable ESM (no manual editing of package.json)
npm pkg set type=module

# 6️⃣ Add npm scripts via CLI (no manual editing)

# Dev script (nodemon + tsx for ESM support)
npm pkg set scripts.dev="nodemon --watch src --ext ts --exec tsx src/index.ts"

# Build script (compile TypeScript)
npm pkg set scripts.build="tsc"

# Production start script
npm pkg set scripts.start="node dist/index.js"

# 7️⃣ Generate TypeScript config (NodeNext + ESM correct)
npx tsc --init \
--rootDir src \
--outDir dist \
--module NodeNext \
--moduleResolution NodeNext \
--target ES2022 \
--strict \
--verbatimModuleSyntax true \
--isolatedModules true \
--skipLibCheck true

# 8️⃣ Create source folder and files
mkdir src
touch src/index.ts
touch src/server.ts

# ================================
# DONE
# ================================

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

++++++++++++++++++++++++++++++++++++++++
CREATE TABLE roles(
id SERIAL primary key,
name VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE permissions(
id SERIAL PRIMARY KEY,
name VARCHAR(50) UNIQUE NOT NULL
);


CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
password TEXT NOT NULL,
role_id INTEGER NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT fk_role
		FOREIGN KEY(role_id)
		REFERENCES roles(id)
		ON DELETE RESTRICT
);

CREATE TABLE role_permissions(
role_id INTEGER NOT NULL,
permission_id INTEGER NOT NULL,

PRIMARY KEY(role_id,permission_id),

CONSTRAINT fk_role
	FOREIGN KEY(role_id)
	REFERENCES roles(id)
	ON DELETE CASCADE,

CONSTRAINT fk_permission
	FOREIGN KEY(permission_id)
	REFERENCES permissions(id)
	ON DELETE CASCADE

);


INSERT INTO roles (name)
VALUES ('ADMIN'), ('MANAGER'), ('USER');


INSERT INTO permissions (name)
VALUES 
('CREATE_USER'),
('DELETE_USER'),
('VIEW_USERS'),
('UPDATE_PROFILE');


INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;

INSERT INTO role_permissions (role_id, permission_id)
VALUES
(2, 3), -- VIEW_USERS
(2, 4); -- UPDATE_PROFILE

INSERT INTO role_permissions (role_id, permission_id)
VALUES
(3, 4); -- UPDATE_PROFILE only


SELECT r.name AS role, p.name AS permission
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
ORDER BY r.name;





