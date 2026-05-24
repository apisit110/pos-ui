



---



Step 1 — Create a GitHub PAT

Go to: github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → check write:packages + read:packages + repo.

Step 2 — Export the token and publish

export NODE_AUTH_TOKEN=ghp_YOUR_TOKEN_HERE

# Build and publish pos-ui
cd /Users/digio13air2021/Desktop/programming/aun/apisit/anti-1/pos-ui
npm run build
npm publish

You should see + @apisit110/pos-ui@0.1.0 when it succeeds.

Step 3 — Install from the registry

export NODE_AUTH_TOKEN=ghp_YOUR_TOKEN_HERE

cd /Users/digio13air2021/Desktop/programming/aun/apisit/anti-1/pos-cashier
pnpm install

cd /Users/digio13air2021/Desktop/programming/aun/apisit/anti-1/pos-center
pnpm install


---






Upgrade flow for future releases

When you update components in pos-ui:

# 1. Bump version in pos-ui/package.json  (e.g. 0.1.0 → 0.2.0)
# 2. Commit + tag
git tag v0.2.0 && git push origin v0.2.0
# → GitHub Actions publishes @apisit110/pos-ui@0.2.0

# 3. In each consuming repo, bump the version
# "@apisit110/pos-ui": "^0.2.0"
# then run pnpm install



----