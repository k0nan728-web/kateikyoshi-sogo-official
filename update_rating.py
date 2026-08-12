"""マナリンクの公開評価を取得し、静的サイトの評価表示を更新する。"""

from __future__ import annotations

import re
from pathlib import Path

import requests

MANALINK_URL = "https://manalink.jp/teacher/18499"
ROOT = Path(__file__).resolve().parent


def get_manalink_rating() -> tuple[str, str]:
    """公開ページ先頭のJSON-LDから、評価と口コミ件数を取得する。"""
    pattern = re.compile(
        r'"aggregateRating":\{"@type":"AggregateRating","ratingValue":"([0-5]\.\d{1,2})","ratingCount":(\d+)\}'
    )
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/131.0.0.0 Safari/537.36"
        )
    }
    received = ""
    with requests.get(MANALINK_URL, headers=headers, timeout=(10, 10), stream=True) as response:
        response.raise_for_status()
        for chunk in response.iter_content(chunk_size=4096, decode_unicode=True):
            if not chunk:
                continue
            received += chunk
            match = pattern.search(received)
            if match:
                rating, review_count = match.groups()
                if 0 <= float(rating) <= 5 and int(review_count) >= 0:
                    return rating, review_count
            if len(received) > 50_000:
                break

    raise RuntimeError("マナリンクの公開ページ先頭の構造化データから評価・口コミ件数を取得できませんでした。")


def replace_exactly_once(content: str, pattern: str, replacement: str, label: str) -> str:
    updated, replacements = re.subn(pattern, replacement, content, count=1)
    if replacements != 1:
        raise RuntimeError(f"{label} の更新対象を一意に特定できませんでした。")
    return updated


def update_files(rating: str, review_count: str) -> None:
    bundle_path = ROOT / "index-ROriAf5U.js"
    html_path = ROOT / "index.html"

    bundle = bundle_path.read_text(encoding="utf-8")
    bundle = replace_exactly_once(
        bundle,
        r"(?<![\d.])\d\.\d{1,2}\s*\(\d+件\)",
        f"{rating} ({review_count}件)",
        "JavaScriptバンドル内のマナリンク評価",
    )
    bundle_path.write_text(bundle, encoding="utf-8")

    html = html_path.read_text(encoding="utf-8")
    html = replace_exactly_once(
        html,
        r'"ratingValue":\s*"[0-5]\.\d{1,2}"',
        f'"ratingValue": "{rating}"',
        "構造化データ内の評価",
    )
    html = replace_exactly_once(
        html,
        r'"reviewCount":\s*"\d+"',
        f'"reviewCount": "{review_count}"',
        "構造化データ内の口コミ件数",
    )
    html_path.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    current_rating, current_review_count = get_manalink_rating()
    update_files(current_rating, current_review_count)
    print(f"Updated Manalink rating: {current_rating} ({current_review_count}件)")
