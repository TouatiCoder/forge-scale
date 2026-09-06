import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("Hostinger deep-route rewrite", () => {
  it("serves prerendered route index.html without a trailing-slash redirect", () => {
    const htaccess = fs.readFileSync(path.resolve(process.cwd(), "public/.htaccess"), "utf8");

    expect(htaccess).toContain("DirectorySlash Off");
    expect(htaccess).toContain("RewriteCond %{REQUEST_FILENAME}/index.html -f");
    expect(htaccess).toContain("RewriteRule ^(.+?)/?$ $1/index.html [L]");
    expect(htaccess).not.toContain("RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}/index.html -f");
  });
});
