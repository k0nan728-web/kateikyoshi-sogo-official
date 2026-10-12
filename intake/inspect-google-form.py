from urllib.request import Request, urlopen
from urllib.error import URLError
import re,json,sys
url="https://docs.google.com/forms/d/e/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/viewform"
try:
    req=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; site-audit/1.0)","Accept-Language":"ja-JP,ja;q=0.9"})
    with urlopen(req,timeout=20) as resp:
        print("HTTP",resp.status,"URL",resp.url)
        html=resp.read().decode("utf-8",errors="replace")
except URLError as e:
    print("FETCH FAILED:",str(e)[:400])
    sys.exit(1)
match=re.search(r"FB_PUBLIC_LOAD_DATA_\\s*=\\s*(\\[.*?\\]);",html,re.S)
if not match:
    print("NO FORM METADATA. HTML TITLE:",re.findall("<title>(.*?)</title>",html,re.S)[:2])
    print("HTML LENGTH:",len(html))
    sys.exit(1)
form=json.loads(match.group(1))
items=form[1][1]
print("TOTAL_ITEMS",len(items))
for ix,f in enumerate(items):
    label=str(f[1])[:180] if len(f)>1 else ""
    kind=f[3] if len(f)>3 else ""
    subs=f[4] if len(f)>4 else []
    fields=[]
    for sub in subs or []:
        if isinstance(sub,list) and sub:
            opts=[str(o[0])[:100] for o in (sub[1] or []) if isinstance(o,list) and o] if len(sub)>1 and isinstance(sub[1],list) else []
            fields.append({"entry":sub[0],"required":sub[2] if len(sub)>2 else "", "options":opts[:35]})
    print(json.dumps({"i":ix,"title":label,"type":kind,"fields":fields},ensure_ascii=False))
