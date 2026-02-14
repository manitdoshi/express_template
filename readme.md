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
