#!/bin/bash

# Deployment script for MARMELAT on www.marmelat.kz
# This script should be run on the VPS server

set -e  # Exit on error

echo "🚀 Starting deployment for www.marmelat.kz..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="www.marmelat.kz"
WEB_ROOT="/var/www/marmelat.kz"
NGINX_AVAILABLE="/etc/nginx/sites-available/marmelat.kz"
NGINX_ENABLED="/etc/nginx/sites-enabled/marmelat.kz"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# 1. Update system packages
echo -e "${YELLOW}📦 Updating system packages...${NC}"
apt update

# 2. Check and install nginx if needed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📥 Installing nginx...${NC}"
    apt install -y nginx
else
    echo -e "${GREEN}✓ nginx already installed${NC}"
fi

# 3. Check and install certbot for SSL
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}📥 Installing certbot for SSL...${NC}"
    apt install -y certbot python3-certbot-nginx
else
    echo -e "${GREEN}✓ certbot already installed${NC}"
fi

# 4. Create web root directory
echo -e "${YELLOW}📁 Creating web root directory...${NC}"
mkdir -p $WEB_ROOT
chown -R www-data:www-data $WEB_ROOT
chmod -R 755 $WEB_ROOT
echo -e "${GREEN}✓ Web root created at $WEB_ROOT${NC}"

# 5. Copy nginx configuration
echo -e "${YELLOW}⚙️  Configuring nginx...${NC}"
if [ -f "nginx.conf" ]; then
    cp nginx.conf $NGINX_AVAILABLE

    # Create symbolic link if it doesn't exist
    if [ ! -L $NGINX_ENABLED ]; then
        ln -s $NGINX_AVAILABLE $NGINX_ENABLED
    fi

    echo -e "${GREEN}✓ nginx configuration created${NC}"
else
    echo "⚠️  nginx.conf file not found in current directory"
    echo "Please make sure nginx.conf is in the same directory as this script"
    exit 1
fi

# 6. Test nginx configuration
echo -e "${YELLOW}🔍 Testing nginx configuration...${NC}"
if nginx -t; then
    echo -e "${GREEN}✓ nginx configuration is valid${NC}"
else
    echo "❌ nginx configuration has errors. Please fix and try again."
    exit 1
fi

# 7. Copy website files
echo -e "${YELLOW}📋 Copying website files...${NC}"
if [ -d "dist" ]; then
    rm -rf $WEB_ROOT/*
    cp -r dist/* $WEB_ROOT/
    chown -R www-data:www-data $WEB_ROOT
    echo -e "${GREEN}✓ Website files copied${NC}"
else
    echo "⚠️  dist directory not found!"
    echo "Please make sure you've run 'npm run build' and the dist folder is present"
    exit 1
fi

# 8. Restart nginx
echo -e "${YELLOW}🔄 Restarting nginx...${NC}"
systemctl restart nginx
systemctl enable nginx
echo -e "${GREEN}✓ nginx restarted and enabled${NC}"

# 9. Configure firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
if command -v ufw &> /dev/null; then
    ufw allow 'Nginx Full'
    echo -e "${GREEN}✓ Firewall configured${NC}"
else
    echo "⚠️  ufw not installed, skipping firewall configuration"
fi

# 10. Setup SSL with Let's Encrypt
echo -e "${YELLOW}🔒 Setting up SSL certificate...${NC}"
echo "NOTE: Make sure your domain DNS is pointing to this server's IP!"
read -p "Do you want to setup SSL now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    certbot --nginx -d $DOMAIN -d marmelat.kz --non-interactive --agree-tos --redirect -m admin@marmelat.kz || {
        echo "⚠️  SSL setup failed. You can run it manually later:"
        echo "    certbot --nginx -d $DOMAIN -d marmelat.kz"
    }
fi

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo "Your website should now be accessible at:"
echo "  http://$DOMAIN"
echo "  http://marmelat.kz"
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "  https://$DOMAIN (with SSL)"
    echo "  https://marmelat.kz (with SSL)"
fi
echo ""
echo "📝 Next steps:"
echo "  1. Make sure your domain DNS A records point to this server's IP"
echo "  2. If SSL setup failed, run: sudo certbot --nginx -d $DOMAIN -d marmelat.kz"
echo "  3. Test your website in a browser"
echo ""
