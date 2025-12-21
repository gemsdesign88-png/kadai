**Troubleshooting 502 Bad Gateway on VPS (kadaipos.id)**

This guide and the included `scripts/vps-troubleshoot.sh` help gather diagnostics and attempt common fixes on your VPS. Run the script locally from the project root; it will SSH into the server and run checks (you'll be prompted for the SSH password unless keys are set up).

Usage

```bash
chmod +x ./scripts/vps-troubleshoot.sh
./scripts/vps-troubleshoot.sh root@72.60.76.34 22
```

What the script does
- Prints `pm2 list` and `pm2 status` so you can see whether the Next.js process is running.
- Shows processes that include `node` or `next` and looks for a listener on port 3000.
- Attempts to `curl` `http://127.0.0.1:3000/` from the server to confirm the app responds.
- Tails `pm2` logs and Nginx error logs (last 200 lines) and runs `nginx -t`.
- Optionally tries to reinstall production deps and restart the PM2 process, then reloads Nginx.

Common causes for 502 with this setup
- Next.js app not running (PM2 failed to start or crashed). Check `pm2 logs kadaipos-website`.
- App listening on a different port or binding to a socket not proxied by Nginx.
- Nginx proxy configuration pointing to the wrong upstream (not 127.0.0.1:3000).
- Firewall blocking local connections (rare for localhost proxying).
- SSL misconfiguration causing Nginx to error (check `/var/log/nginx/error.log`).

If you want me to run the script from here, I need either:
- SSH access (private key or password) from this environment (not recommended to share passwords here), or
- You run the script locally and paste the output here — I'll interpret and provide fixes.

Next steps after running the script
- If PM2 shows the app is down or crashing, paste the `pm2 logs` portion here.
- If `curl` to `127.0.0.1:3000` fails, the app isn't listening — check Node/PM2 startup logs.
- If Nginx config test (`nginx -t`) fails, paste the error lines from the Nginx error log.

If you'd like, I can also produce a safe, non-interactive sequence of SSH commands to run locally (one-liner) that will collect the same diagnostics — say the word `one-liner` and I will provide it.
