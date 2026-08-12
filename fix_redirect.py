import re
import os

def fix_files():
    # index.html の修正
    html_path = "index.html"
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()
        # JSリダイレクトコードを削除
        new_content = re.sub(r"<!-- www to non-www redirect -->.*?<\/script>", "", content, flags=re.DOTALL)
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Fixed index.html")

    # _redirects の修正
    redirects_path = "_redirects"
    with open(redirects_path, "w", encoding="utf-8") as f:
        f.write("# SEO best practice: Redirect to HTTPS and non-www\n")
        f.write("https://www.kateikyoshi-sogo.com/* https://kateikyoshi-sogo.com/:splat 301\n")
        f.write("http://www.kateikyoshi-sogo.com/* https://kateikyoshi-sogo.com/:splat 301\n")
        f.write("http://kateikyoshi-sogo.com/* https://kateikyoshi-sogo.com/:splat 301\n")
    print("Fixed _redirects")

if __name__ == "__main__":
    fix_files()
