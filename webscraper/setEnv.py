import os
import json
with open(os.path.expanduser("~/.bashrc"), "a") as outfile:
    # 'a' stands for "append"  
    d = ''
    with open('./keys/service_account.json') as f:
        d = json.dumps(json.load(f))
    outfile.write("export GOOGLE_SERVICE_ACCOUNT=" + d)