# Frontend Deployment Guide (Nginx)

This guide explains how to deploy a production React/Vite frontend using **Nginx**.

---

## 1. Build the Frontend

Navigate to the frontend directory and create the production build.

```bash
cd frontend
npm run build
```

This will generate a `dist` directory containing the optimized production files.

---

## 2. Create the Web Root

Create a directory where Nginx will serve the frontend.

```bash
sudo mkdir -p /var/www/frontend
```

---

## 3. Copy the Build Files

Copy all generated files from the `dist` folder into the Nginx web root.

```bash
sudo cp -r dist/* /var/www/frontend/
```

---

## 4. Create an Nginx Configuration

Create a new Nginx site configuration.

```bash
sudo nano /etc/nginx/sites-available/frontend
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name app.yourdomain.com;

    root /var/www/frontend;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> Replace `app.yourdomain.com` with your actual domain.

---

## 5. Enable the Site

Create a symbolic link to enable the configuration.

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
```

If the default Nginx site is enabled and not needed, remove it:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## 6. Test the Configuration

Verify that the Nginx configuration is valid.

```bash
sudo nginx -t
```

If the output shows:

```
syntax is ok
test is successful
```

continue to the next step.

---

## 7. Restart Nginx

On systems using **systemd**:

```bash
sudo systemctl restart nginx
```

If your system does **not** use systemd (for example, some MX Linux installations), use:

```bash
sudo service nginx restart
```

---

## 8. Verify the Deployment

Open your browser and visit:

```
http://localhost
```

or

```
http://localhost:80
```

If everything is configured correctly, your production frontend should load successfully.

---

## Updating the Frontend

Whenever you make changes to the frontend:

```bash
cd frontend
npm run build
sudo cp -r dist/* /var/www/frontend/
sudo service nginx reload
```

(Use `sudo systemctl reload nginx` if your system uses systemd.)

---

## Directory Structure

```
frontend/
├── src/
├── public/
├── dist/
│   ├── index.html
│   └── assets/
```

The `dist` folder contains the production-ready files served by Nginx.
